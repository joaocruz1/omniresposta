"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, Mic, Trash2, Download, Search, Filter, RefreshCw } from "lucide-react"
import { useApi } from "@/hooks/use-api"
import type { Document } from "@/lib/types"

export function DatabaseManager() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const { data: documents, loading, error, refetch } = useApi<Document[]>("/api/documents")

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          refetch() // Recarregar dados após upload
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "docx":
      case "pdf":
      case "json":
        return <FileText className="w-5 h-5" />
      case "image":
        return <ImageIcon className="w-5 h-5" />
      case "audio":
        return <Mic className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processado":
        return "bg-green-100 text-green-800"
      case "Processando":
        return "bg-yellow-100 text-yellow-800"
      case "Pendente":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Carregando documentos...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400">Erro ao carregar documentos: {error}</div>
      </div>
    )
  }

  // Calcular estatísticas
  const totalDocuments = documents?.length || 0
  const totalVectors = documents?.reduce((sum, doc) => sum + doc.vectors, 0) || 0
  const processingCount = documents?.filter((doc) => doc.status === "Processando").length || 0

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card Total de Documentos */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Total de Documentos</p>
                <p className="text-3xl font-bold text-white mt-1">{totalDocuments.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 glass-card">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Vetores Gerados */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Vetores Gerados</p>
                <p className="text-3xl font-bold text-white mt-1">{totalVectors.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 gradient-purple rounded-full flex items-center justify-center glow-purple">
                <span className="text-white text-lg font-bold">V</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Processando */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Processando</p>
                <p className="text-3xl font-bold text-white mt-1">{processingCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-orange-500/10 glass-card">
                <RefreshCw className="w-8 h-8 text-yellow-400 animate-spin" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card Armazenamento */}
        <Card className="glass-card-dark border-purple-500/20 glow-hover relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-5" />
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-200">Armazenamento</p>
                <p className="text-3xl font-bold text-white mt-1">89%</p>
              </div>
              <div className="relative w-12 h-12">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-purple-500/20"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="text-purple-400"
                    strokeDasharray="89, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload de Documentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Arraste arquivos aqui ou clique para selecionar</p>
            <p className="text-sm text-gray-500 mb-4">Suporte para DOCX, PDF, JSON, MP3, JPG, PNG (máx. 50MB)</p>
            <Button onClick={handleUpload} className="bg-[#662d91] hover:bg-[#552470]" disabled={isUploading}>
              {isUploading ? "Enviando..." : "Selecionar Arquivos"}
            </Button>

            {isUploading && (
              <div className="mt-4">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500 mt-2">{uploadProgress}% concluído</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Banco de Dados Vetorial</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input placeholder="Buscar documentos..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={refetch}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents?.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-600 ">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(doc.type)}</div>
                  <div>
                    <h4 className="font-medium text-white">{doc.name}</h4>
                    <p className="text-sm text-gray-500">
                      {doc.size} • {doc.vectors} vetores gerados
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
