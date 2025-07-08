"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Bot, Shield, Bell, Database, Palette, Globe } from "lucide-react"
import { useApi } from "@/hooks/use-api"

export function Settings() {
  const { data: settings, loading, error, refetch } = useApi("/api/settings")
  const [formData, setFormData] = useState<any>({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert("Configurações salvas com sucesso!")
        refetch()
      } else {
        throw new Error("Erro ao salvar configurações")
      }
    } catch (error) {
      console.error("Erro ao salvar:", error)
      alert("Erro ao salvar configurações")
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando configurações...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Erro ao carregar configurações: {error}</div>
      </div>
    )
  }

  const selectClassName =
    "w-full p-2 border rounded-md bg-transparent glass-card border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400"

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white">Configurações do Sistema</h2>
        <p className="text-purple-200">Personalize e configure seu OmniResposta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bot className="w-5 h-5 text-purple-300" />
              Configurações de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ai-model" className="text-purple-200">
                Modelo de IA
              </Label>
              <Input
                id="ai-model"
                value={formData.ai_model || ""}
                onChange={(e) => updateSetting("ai_model", e.target.value)}
                className="glass-card border-purple-500/30 text-white"
              />
            </div>

            <div>
              <Label htmlFor="temperature" className="text-purple-200">
                Temperatura (Criatividade)
              </Label>
              <Input
                id="temperature"
                type="number"
                value={formData.temperature || 0.7}
                min="0"
                max="1"
                step="0.1"
                onChange={(e) => updateSetting("temperature", Number.parseFloat(e.target.value))}
                className="glass-card border-purple-500/30 text-white"
              />
            </div>

            <div>
              <Label htmlFor="max-tokens" className="text-purple-200">
                Máximo de Tokens
              </Label>
              <Input
                id="max-tokens"
                type="number"
                value={formData.max_tokens || 2048}
                onChange={(e) => updateSetting("max_tokens", Number.parseInt(e.target.value))}
                className="glass-card border-purple-500/30 text-white"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="auto-learn" className="text-purple-200">
                Aprendizado Automático
              </Label>
              <Switch
                id="auto-learn"
                checked={formData.auto_learn || false}
                onCheckedChange={(checked) => updateSetting("auto_learn", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-purple-300" />
              Segurança e Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-encryption" className="text-purple-200">
                Criptografia de Dados
              </Label>
              <Switch
                id="data-encryption"
                checked={formData.data_encryption || false}
                onCheckedChange={(checked) => updateSetting("data_encryption", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logs" className="text-purple-200">
                Logs de Auditoria
              </Label>
              <Switch
                id="audit-logs"
                checked={formData.audit_logs || false}
                onCheckedChange={(checked) => updateSetting("audit_logs", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="gdpr-compliance" className="text-purple-200">
                Conformidade LGPD
              </Label>
              <Switch
                id="gdpr-compliance"
                checked={formData.gdpr_compliance || false}
                onCheckedChange={(checked) => updateSetting("gdpr_compliance", checked)}
              />
            </div>

            <div>
              <Label htmlFor="data-retention" className="text-purple-200">
                Retenção de Dados (dias)
              </Label>
              <Input
                id="data-retention"
                type="number"
                value={formData.data_retention || 90}
                onChange={(e) => updateSetting("data_retention", Number.parseInt(e.target.value))}
                className="glass-card border-purple-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Bell className="w-5 h-5 text-purple-300" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts" className="text-purple-200">
                Alertas por Email
              </Label>
              <Switch
                id="email-alerts"
                checked={formData.email_alerts || false}
                onCheckedChange={(checked) => updateSetting("email_alerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts" className="text-purple-200">
                Alertas do Sistema
              </Label>
              <Switch
                id="system-alerts"
                checked={formData.system_alerts || false}
                onCheckedChange={(checked) => updateSetting("system_alerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="performance-reports" className="text-purple-200">
                Relatórios de Performance
              </Label>
              <Switch
                id="performance-reports"
                checked={formData.performance_reports || false}
                onCheckedChange={(checked) => updateSetting("performance_reports", checked)}
              />
            </div>

            <div>
              <Label htmlFor="notification-email" className="text-purple-200">
                Email para Notificações
              </Label>
              <Input
                id="notification-email"
                type="email"
                value={formData.notification_email || ""}
                onChange={(e) => updateSetting("notification_email", e.target.value)}
                className="glass-card border-purple-500/30 text-white placeholder:text-purple-300"
              />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Database className="w-5 h-5 text-purple-300" />
              Banco de Dados Vetorial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vector-dimensions" className="text-purple-200">
                Dimensões do Vetor
              </Label>
              <Input
                id="vector-dimensions"
                value={formData.vector_dimensions || 1536}
                readOnly
                className="glass-card border-purple-500/30 text-white"
              />
            </div>

            <div>
              <Label htmlFor="similarity-threshold" className="text-purple-200">
                Limite de Similaridade
              </Label>
              <Input
                id="similarity-threshold"
                type="number"
                value={formData.similarity_threshold || 0.8}
                min="0"
                max="1"
                step="0.1"
                onChange={(e) => updateSetting("similarity_threshold", Number.parseFloat(e.target.value))}
                className="glass-card border-purple-500/30 text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="text-purple-200">
                Backup Automático
              </Label>
              <Switch
                id="auto-backup"
                checked={formData.auto_backup || false}
                onCheckedChange={(checked) => updateSetting("auto_backup", checked)}
              />
            </div>

            <div>
              <Label htmlFor="backup-frequency" className="text-purple-200">
                Frequência do Backup
              </Label>
              <select
                className={selectClassName}
                value={formData.backup_frequency || "Diário"}
                onChange={(e) => updateSetting("backup_frequency", e.target.value)}
              >
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Interface Settings */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Palette className="w-5 h-5 text-purple-300" />
              Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language" className="text-purple-200">
                Idioma
              </Label>
              <select
                className={selectClassName}
                value={formData.language || "Português (BR)"}
                onChange={(e) => updateSetting("language", e.target.value)}
              >
                <option>Português (BR)</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timezone" className="text-purple-200">
                Fuso Horário
              </Label>
              <select
                className={selectClassName}
                value={formData.timezone || "America/Sao_Paulo"}
                onChange={(e) => updateSetting("timezone", e.target.value)}
              >
                <option>America/Sao_Paulo</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card className="glass-card-dark border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Globe className="w-5 h-5 text-purple-300" />
              Integrações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp" className="text-purple-200">
                WhatsApp Business
              </Label>
              <Switch
                id="whatsapp"
                checked={formData.whatsapp_integration || false}
                onCheckedChange={(checked) => updateSetting("whatsapp_integration", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="telegram" className="text-purple-200">
                Telegram
              </Label>
              <Switch
                id="telegram"
                checked={formData.telegram_integration || false}
                onCheckedChange={(checked) => updateSetting("telegram_integration", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="slack" className="text-purple-200">
                Slack
              </Label>
              <Switch
                id="slack"
                checked={formData.slack_integration || false}
                onCheckedChange={(checked) => updateSetting("slack_integration", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="webhook" className="text-purple-200">
                Webhooks
              </Label>
              <Switch
                id="webhook"
                checked={formData.webhook_integration || false}
                onCheckedChange={(checked) => updateSetting("webhook_integration", checked)}
              />
            </div>

            <div>
              <Label htmlFor="webhook-url" className="text-purple-200">
                URL do Webhook
              </Label>
              <Input
                id="webhook-url"
                value={formData.webhook_url || ""}
                onChange={(e) => updateSetting("webhook_url", e.target.value)}
                className="glass-card border-purple-500/30 text-white placeholder:text-purple-300"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 px-8 glow-purple"
        >
          <SettingsIcon className="w-4 h-4 mr-2" />
          {saving ? "Salvando..." : "Salvar Configurações"}
        </Button>
      </div>
    </div>
  )
}
