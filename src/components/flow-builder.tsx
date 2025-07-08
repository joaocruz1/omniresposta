"use client";

import React, { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import { Save, Plus, Zap } from "lucide-react";
import { useApi } from "@/hooks/use-api"; // Importando seu hook
import { toast } from "sonner"; // Usando sonner para notificações

// Definindo o tipo para os dados do fluxo que virão da API
interface FlowData {
  nodes: Node[];
  edges: Edge[];
}

export function FlowBuilder() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Buscar dados do fluxo da API
  const { data: flowData, loading, error } = useApi<FlowData>("/api/ai-flows");

  // Efeito para carregar os dados da API no estado do ReactFlow
  useEffect(() => {
    if (flowData) {
      setNodes(flowData.nodes);
      setEdges(flowData.edges);
    }
  }, [flowData]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  // Função para salvar o fluxo via API
  const saveFlow = async () => {
    setIsSaving(true);
    toast.loading("Salvando o fluxo...");

    try {
      const response = await fetch("/api/flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar o fluxo. Tente novamente.");
      }

      toast.success("Fluxo salvo com sucesso!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
      toast.error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const addNode = () => {
    const newNode: Node = {
      id: `node_${Date.now()}`,
      data: { label: "Novo Bloco" },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      type: "default", // ou outro tipo customizado
    };
    setNodes((nds) => [...nds, newNode]);
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900">
        <p className="text-white">Carregando o construtor de fluxo...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900">
        <p className="text-red-400">
          Erro ao carregar o fluxo: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-200px)] w-full rounded-lg border border-purple-500/20 bg-black relative glow-hover">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        className="bg-grid-pattern"
      >
        <Background color="#4a0e78" gap={16} />
        <Controls className="react-flow__controls-dark" />
      </ReactFlow>
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          onClick={addNode}
          variant="outline"
          className="glass-button-dark border-purple-500/30 text-purple-200 hover:bg-purple-500/20 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Bloco
        </Button>
        <Button
          onClick={saveFlow}
          disabled={isSaving}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
}