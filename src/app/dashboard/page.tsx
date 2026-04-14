"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Flow, CreateFlowInput } from "@/lib/types";
import { FlowCard } from "@/components/FlowCard";
import { CreateFlowModal } from "@/components/CreateFlowModal";

export default function DashboardPage() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFlows = useCallback(async () => {
    try {
      const res = await fetch("/api/flows");
      if (res.ok) setFlows(await res.json());
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlows();
  }, [fetchFlows]);

  async function handleCreate(input: CreateFlowInput) {
    const res = await fetch("/api/flows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) {
      setShowCreate(false);
      fetchFlows();
    }
  }

  async function handleToggle(id: string, enabled: boolean) {
    await fetch(`/api/flows/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });
    fetchFlows();
  }

  async function handleDelete(id: string) {
    await fetch(`/api/flows/${id}`, { method: "DELETE" });
    fetchFlows();
  }

  async function handleRun(id: string) {
    await fetch(`/api/flows/${id}/run`, { method: "POST" });
  }

  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="border-b border-card-border px-4 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="text-accent">Hook</span>flow
          </Link>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors text-sm"
          >
            + New Flow
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Your Flows</h1>
            <span className="text-sm text-muted">{flows.length} flow{flows.length !== 1 ? "s" : ""}</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
            </div>
          ) : flows.length === 0 ? (
            <div className="text-center py-20 bg-card border border-card-border rounded-xl">
              <div className="text-4xl mb-4">&#x1f517;</div>
              <h2 className="text-xl font-semibold mb-2">No flows yet</h2>
              <p className="text-muted mb-6">
                Create your first flow to start automating.
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors"
              >
                Create Your First Flow
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {flows.map((flow) => (
                <FlowCard
                  key={flow.id}
                  flow={flow}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onRun={handleRun}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Create modal */}
      {showCreate && (
        <CreateFlowModal
          onClose={() => setShowCreate(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
