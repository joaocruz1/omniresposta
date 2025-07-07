"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, Mic, Trash2, Download, Search, Filter, RefreshCw } from "lucide-react"

export function DatabaseManager() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const documents = [
    { id: 1, name: "Manual_Atendimento.docx", type: "docx", size: "2.4 MB", status: "Processado", vectors: 1250 },
    { id: 2, name: "FAQ_Produtos.pdf", type: "pdf", size: "1.8 MB", status: "Processando", vectors: 890 },
    { id: 3, name: "Fluxo_Vendas.json", type: "json", size: "0.5 MB", status: "Processado", vectors: 340 },
    { id: 4, name: "Audio_Treinamento.mp3", type: "audio", size: "15.2 MB", status: "Pendente", vectors: 0 },
    { id: 5, name: "Imagem_Produto.jpg", type: "image", size: "3.1 MB", status: "Processado", vectors: 156 },
  ]

  const handleUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
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

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Documentos</p>
                <p className="text-3xl font-bold text-[#662d91]">1,247</p>
              </div>
              <FileText className="w-8 h-8 text-[#662d91]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vetores Gerados</p>
                <p className="text-3xl font-bold text-[#662d91]">2,636</p>
              </div>
              <div className="w-8 h-8 bg-[#662d91] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">V</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processando</p>
                <p className="text-3xl font-bold text-yellow-600">3</p>
              </div>
              <RefreshCw className="w-8 h-8 text-yellow-600 animate-spin" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Armazenamento</p>
                <p className="text-3xl font-bold text-[#662d91]">89%</p>
              </div>
              <div className="w-8 h-8 bg-[#662d91] rounded-full" />
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
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">{getFileIcon(doc.type)}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.name}</h4>
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
