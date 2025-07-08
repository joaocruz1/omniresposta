import type { Document, Conversation, AIFlow, SystemMetric, SystemAlert, SystemSetting } from "@prisma/client"

export type { Document, Conversation, AIFlow, SystemMetric, SystemAlert, SystemSetting }

export interface DashboardStats {
  totalConversations: number
  resolutionRate: number
  averageTime: string
  satisfaction: number
  conversationsToday: number
  activeFlows: number
  totalDocuments: number
  vectorsGenerated: number
}

export interface AnalyticsData {
  conversationsData: Conversation[]
  channelData: Array<{
    canal: string
    conversas: number
    crescimento: number
  }>
  topQuestions: Array<{
    question: string
    count: number
    category: string
  }>
  recentInteractions: Array<{
    id: number
    user: string
    query: string
    status: string
    time: string
  }>
}

export interface SystemStatus {
  service: string
  status: "Online" | "Degradado" | "Offline"
  uptime: string
  response: string
}
