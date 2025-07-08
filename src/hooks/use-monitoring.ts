"use client"

import { useState, useEffect } from "react"
import { useApi } from "./use-api"
import type { SystemStatusResponse, SystemAlert, RealTimeMetrics, MonitoringHookReturn } from "@/lib/types"

export function useMonitoring(): MonitoringHookReturn {
  const [realTimeMetrics, setRealTimeMetrics] = useState<RealTimeMetrics>({
    cpu: 0,
    memory: 0,
    network: 0,
    storage: 0,
  })

  const {
    data: systemStatus,
    loading: statusLoading,
    error: statusError,
    refetch: refetchStatus,
  } = useApi<SystemStatusResponse>("/api/system/status")

  const {
    data: alerts,
    loading: alertsLoading,
    error: alertsError,
    refetch: refetchAlerts,
  } = useApi<SystemAlert[]>("/api/system/alerts")

  // Simular métricas em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeMetrics({
        cpu: Math.floor(Math.random() * 30) + 50, // 50-80%
        memory: Math.floor(Math.random() * 20) + 60, // 60-80%
        network: Math.floor(Math.random() * 20) + 20, // 20-40 MB/s
        storage: 89, // Fixo por enquanto
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const createAlert = async (type: string, message: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/system/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message }),
      })

      if (response.ok) {
        await refetchAlerts()
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao criar alerta:", error)
      return false
    }
  }

  const dismissAlert = async (alertId: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/system/alerts/${alertId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolvido" }),
      })

      if (response.ok) {
        await refetchAlerts()
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao resolver alerta:", error)
      return false
    }
  }

  const recordMetric = async (metricName: string, metricValue: number, metricUnit?: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/system/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metricName,
          metricValue,
          metricUnit,
        }),
      })

      return response.ok
    } catch (error) {
      console.error("Erro ao registrar métrica:", error)
      return false
    }
  }

  return {
    systemStatus,
    alerts,
    realTimeMetrics,
    loading: statusLoading || alertsLoading,
    error: statusError || alertsError,
    actions: {
      refetchStatus,
      refetchAlerts,
      createAlert,
      dismissAlert,
      recordMetric,
    },
  }
}
