"use client";

import { useState } from "react";
import type { Flow, FlowLog } from "@/lib/types";

interface Props {
  flow: Flow;
  onToggle: (id: string, enabled: boolean) => void;
  onDelete: (id: string) => void;
  onRun: (id: string) => void;
}

const triggerLabels = { manual: "Manual", webhook: "Webhook", schedule: "Schedule" };
const actionLabels = { http: "HTTP Request", log: "Log", email: "Email" };
const triggerColors = {
  manual: "bg-info/20 text-info",
  webhook: "bg-accent/20 text-accent",
  schedule: "bg-warning/20 text-warning",
};

export function FlowCard({ flow, onToggle, onDelete, onRun }: Props) {
  const [logs, setLogs] = useState<FlowLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);
  const [running, setRunning] = useState(false);

  async function handleRun() {
    setRunning(true);
    onRun(flow.id);
    // Fetch logs after a short delay to show the new entry
    setTimeout(async () => {
      await fetchLogs();
      setRunning(false);
      setShowLogs(true);
    }, 500);
  }

  async function fetchLogs() {
    try {
      const res = await fetch(`/api/flows/${flow.id}/logs`);
      if (res.ok) setLogs(await res.json());
    } catch {
      // ignore
    }
  }

  async function toggleLogs() {
    if (!showLogs) await fetchLogs();
    setShowLogs(!showLogs);
  }

  return (
    <div className="bg-card border border-card-border rounded-xl overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-semibold text-lg truncate">{flow.name}</h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${triggerColors[flow.trigger.type]}`}>
                {triggerLabels[flow.trigger.type]}
              </span>
              <span className="text-muted text-xs">&rarr;</span>
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-success/20 text-success">
                {actionLabels[flow.action.type]}
              </span>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => onToggle(flow.id, !flow.enabled)}
            className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
              flow.enabled ? "bg-success" : "bg-muted/40"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                flow.enabled ? "left-6" : "left-0.5"
              }`}
            />
          </button>
        </div>

        {/* Webhook URL */}
        {flow.trigger.type === "webhook" && flow.trigger.webhookUrl && (
          <div className="mt-3 p-2 bg-background rounded-lg">
            <div className="text-xs text-muted mb-1">Webhook URL:</div>
            <code className="text-xs text-accent break-all font-mono">
              {typeof window !== "undefined" ? window.location.origin : ""}{flow.trigger.webhookUrl}
            </code>
          </div>
        )}

        {/* Action details */}
        {flow.action.type === "http" && flow.action.httpUrl && (
          <div className="mt-2 text-xs text-muted truncate">
            {flow.action.httpMethod || "POST"} {flow.action.httpUrl}
          </div>
        )}
        {flow.action.type === "email" && flow.action.emailTo && (
          <div className="mt-2 text-xs text-muted">
            To: {flow.action.emailTo}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={handleRun}
            disabled={!flow.enabled || running}
            className="px-3 py-1.5 text-sm bg-accent hover:bg-accent-light text-white rounded-lg transition-colors disabled:opacity-40"
          >
            {running ? "Running..." : "Run Now"}
          </button>
          <button
            onClick={toggleLogs}
            className="px-3 py-1.5 text-sm border border-card-border hover:border-accent/50 rounded-lg transition-colors"
          >
            {showLogs ? "Hide Logs" : "View Logs"}
          </button>
          <button
            onClick={() => onDelete(flow.id)}
            className="px-3 py-1.5 text-sm text-danger hover:bg-danger/10 rounded-lg transition-colors ml-auto"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Logs */}
      {showLogs && (
        <div className="border-t border-card-border bg-background/50 p-4 max-h-60 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-sm text-muted text-center py-4">
              No execution logs yet. Run the flow to see logs here.
            </p>
          ) : (
            <div className="space-y-2">
              {logs.slice(0, 20).map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-3 text-xs p-2 rounded-lg bg-card/50"
                >
                  <span
                    className={`shrink-0 w-2 h-2 rounded-full mt-1 ${
                      log.status === "success" ? "bg-success" : "bg-danger"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-muted">
                        {new Date(log.triggeredAt).toLocaleTimeString()}
                      </span>
                      <span className={log.status === "success" ? "text-success" : "text-danger"}>
                        {log.status}
                      </span>
                      <span className="text-muted">{log.duration}ms</span>
                    </div>
                    {log.detail && (
                      <div className="text-foreground/70 mt-0.5 break-all">
                        {log.detail}
                      </div>
                    )}
                    {log.error && (
                      <div className="text-danger mt-0.5">{log.error}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
