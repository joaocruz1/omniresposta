import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { SettingsIcon, Bot, Shield, Bell, Database, Palette, Globe } from "lucide-react"

export function Settings() {
  const selectClassName = "w-full p-2 border rounded-md bg-transparent glass-card border-purple-500/30 text-white placeholder:text-purple-300 focus:border-purple-400";

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
              <Label htmlFor="ai-model" className="text-purple-200">Modelo de IA</Label>
              <Input id="ai-model" defaultValue="GPT-4 Turbo" readOnly className="glass-card border-purple-500/30 text-white" />
            </div>

            <div>
              <Label htmlFor="temperature" className="text-purple-200">Temperatura (Criatividade)</Label>
              <Input id="temperature" type="number" defaultValue="0.7" min="0" max="1" step="0.1" className="glass-card border-purple-500/30 text-white" />
            </div>

            <div>
              <Label htmlFor="max-tokens" className="text-purple-200">Máximo de Tokens</Label>
              <Input id="max-tokens" type="number" defaultValue="2048" className="glass-card border-purple-500/30 text-white" />
            </div>

            <div>
              <Label htmlFor="system-prompt" className="text-purple-200">Prompt do Sistema</Label>
              <Textarea
                id="system-prompt"
                placeholder="Você é um assistente especializado em atendimento ao cliente..."
                rows={4}
                className="glass-card border-purple-500/30 text-white placeholder:text-purple-300"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="auto-learn" className="text-purple-200">Aprendizado Automático</Label>
              <Switch id="auto-learn" defaultChecked />
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
              <Label htmlFor="data-encryption" className="text-purple-200">Criptografia de Dados</Label>
              <Switch id="data-encryption" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="audit-logs" className="text-purple-200">Logs de Auditoria</Label>
              <Switch id="audit-logs" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="gdpr-compliance" className="text-purple-200">Conformidade LGPD</Label>
              <Switch id="gdpr-compliance" defaultChecked />
            </div>

            <div>
              <Label htmlFor="data-retention" className="text-purple-200">Retenção de Dados (dias)</Label>
              <Input id="data-retention" type="number" defaultValue="90" className="glass-card border-purple-500/30 text-white" />
            </div>

            <div>
              <Label htmlFor="api-key" className="text-purple-200">Chave da API</Label>
              <div className="flex gap-2">
                <Input id="api-key" defaultValue="sk-****************************" readOnly className="glass-card border-purple-500/30 text-white" />
                <Button variant="outline" className="text-purple-200 border-purple-500/30 hover:bg-purple-500/10 hover:text-white">Renovar</Button>
              </div>
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
              <Label htmlFor="email-alerts" className="text-purple-200">Alertas por Email</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="system-alerts" className="text-purple-200">Alertas do Sistema</Label>
              <Switch id="system-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="performance-reports" className="text-purple-200">Relatórios de Performance</Label>
              <Switch id="performance-reports" defaultChecked />
            </div>

            <div>
              <Label htmlFor="notification-email" className="text-purple-200">Email para Notificações</Label>
              <Input id="notification-email" type="email" placeholder="admin@empresa.com" className="glass-card border-purple-500/30 text-white placeholder:text-purple-300" />
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
              <Label htmlFor="vector-dimensions" className="text-purple-200">Dimensões do Vetor</Label>
              <Input id="vector-dimensions" defaultValue="1536" readOnly className="glass-card border-purple-500/30 text-white" />
            </div>

            <div>
              <Label htmlFor="similarity-threshold" className="text-purple-200">Limite de Similaridade</Label>
              <Input id="similarity-threshold" type="number" defaultValue="0.8" min="0" max="1" step="0.1" className="glass-card border-purple-500/30 text-white" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="text-purple-200">Backup Automático</Label>
              <Switch id="auto-backup" defaultChecked />
            </div>

            <div>
              <Label htmlFor="backup-frequency" className="text-purple-200">Frequência do Backup</Label>
              <select className={selectClassName}>
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
              <Label htmlFor="language" className="text-purple-200">Idioma</Label>
              <select className={selectClassName}>
                <option>Português (BR)</option>
                <option>English</option>
                <option>Español</option>
              </select>
            </div>

            <div>
              <Label htmlFor="timezone" className="text-purple-200">Fuso Horário</Label>
              <select className={selectClassName}>
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
              <Label htmlFor="whatsapp" className="text-purple-200">WhatsApp Business</Label>
              <Switch id="whatsapp" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="telegram" className="text-purple-200">Telegram</Label>
              <Switch id="telegram" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="slack" className="text-purple-200">Slack</Label>
              <Switch id="slack" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="webhook" className="text-purple-200">Webhooks</Label>
              <Switch id="webhook" defaultChecked />
            </div>

            <div>
              <Label htmlFor="webhook-url" className="text-purple-200">URL do Webhook</Label>
              <Input id="webhook-url" placeholder="https://api.empresa.com/webhook" className="glass-card border-purple-500/30 text-white placeholder:text-purple-300" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold h-12 px-8 glow-purple">
          <SettingsIcon className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>
    </div>
  )
}