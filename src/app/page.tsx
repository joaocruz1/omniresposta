"use client"

import { useState } from "react"
import { ModernSidebar } from "@/components/modern-sidebar"
import { ModernHeader } from "@/components/modern-header"
import { DatabaseManager } from "@/components/database-manager"
import { FlowBuilder } from "@/components/flow-builder"
import { Analytics } from "@/components/analytics"
import { Settings } from "@/components/settings"
import { Monitoring } from "@/components/monitoring"
import { ModernDashboard } from "@/components/modern-dashboard"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <ModernDashboard />
      case "database":
        return <DatabaseManager />
      case "flows":
        return <FlowBuilder />
      case "analytics":
        return <Analytics />
      case "monitoring":
        return <Monitoring />
      case "settings":
        return <Settings />
      default:
        return <ModernDashboard />
    }
  }

  return (
    <div className="flex h-screen gradient-bg overflow-hidden">
      <ModernSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ModernHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
