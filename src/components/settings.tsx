import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SettingsIcon, Bot, Shield, Bell, Database, Palette, Globe } from "lucide-react"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Configurações do Sistema</h2>
        <p className="text-gray-600">Personalize e configure seu OmniResposta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              Configurações de IA
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="ai-model">Modelo de IA</Label>
              <Input id="ai-model" value="GPT-4 Turbo" readOnly />
            </div>

            <div>
              <Label htmlFor="temperature">Temperatura (Criatividade)</Label>
              <Input id="temperature" type="number" value="0.7" min="0" max="1" step="0.1" />
            </div>

            <div>
              <Label htmlFor="max-tokens">Máximo de Tokens</Label>
              <Input id="max-tokens" type="number" value="2048" />
            </div>

            <div>
              <Label htmlFor="system-prompt">Prompt do Sistema</Label>
              <Textarea
                id="system-prompt"
                placeholder="Você é um assistente especializado em atendimento ao cliente..."
                rows={4}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-learn">Aprendizado Automático</Label>
              <Switch id="auto-learn" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Segurança e Privacidade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-encryption">Criptografia de Dados</Label>
              <Switch id="data-encryption" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logs">Logs de Auditoria</Label>
              <Switch id="audit-logs" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="gdpr-compliance">Conformidade LGPD</Label>
              <Switch id="gdpr-compliance" defaultChecked />
            </div>

            <div>
              <Label htmlFor="data-retention">Retenção de Dados (dias)</Label>
              <Input id="data-retention" type="number" value="90" />
            </div>

            <div>
              <Label htmlFor="api-key">Chave da API</Label>
              <div className="flex gap-2">
                <Input id="api-key" value="sk-****************************" readOnly />
                <Button variant="outline">Renovar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Alertas por Email</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts">Alertas do Sistema</Label>
              <Switch id="system-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="performance-reports">Relatórios de Performance</Label>
              <Switch id="performance-reports" defaultChecked />
            </div>

            <div>
              <Label htmlFor="notification-email">Email para Notificações</Label>
              <Input id="notification-email" type="email" placeholder="admin@empresa.com" />
            </div>
          </CardContent>
        </Card>

        {/* Database Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Banco de Dados Vetorial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="vector-dimensions">Dimensões do Vetor</Label>
              <Input id="vector-dimensions" value="1536" readOnly />
            </div>

            <div>
              <Label htmlFor="similarity-threshold">Limite de Similaridade</Label>
              <Input id="similarity-threshold" type="number" value="0.8" min="0" max="1" step="0.1" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup">Backup Automático</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>

            <div>
              <Label htmlFor="backup-frequency">Frequência do Backup</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Interface Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Modo Escuro</Label>
              <Switch id="dark-mode" />
            </div>

            <div>
              <Label htmlFor="language">Idioma</Label>
              <select className="w-full p-2 border rounded-md">
                <option>Português (BR)</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timezone">Fuso Horário</Label>
              <select className="w-full p-2 border rounded-md">
                <option>America/Sao_Paulo</option>
                <option>America/New_York</option>
                <option>Europe/London</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Integration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Integrações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="whatsapp">WhatsApp Business</Label>
              <Switch id="whatsapp" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="telegram">Telegram</Label>
              <Switch id="telegram" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="slack">Slack</Label>
              <Switch id="slack" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="webhook">Webhooks</Label>
              <Switch id="webhook" defaultChecked />
            </div>

            <div>
              <Label htmlFor="webhook-url">URL do Webhook</Label>
              <Input id="webhook-url" placeholder="https://api.empresa.com/webhook" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-[#662d91] hover:bg-[#552470]">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}
