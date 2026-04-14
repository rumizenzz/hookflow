"use client";

import { useState } from "react";
import type { TriggerType, ActionType, CreateFlowInput } from "@/lib/types";

interface Props {
  onClose: () => void;
  onCreate: (flow: CreateFlowInput) => void;
}

export function CreateFlowModal({ onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [triggerType, setTriggerType] = useState<TriggerType>("manual");
  const [actionType, setActionType] = useState<ActionType>("log");
  const [httpUrl, setHttpUrl] = useState("");
  const [httpMethod, setHttpMethod] = useState<"GET" | "POST">("POST");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [logMessage, setLogMessage] = useState("");
  const [scheduleCron, setScheduleCron] = useState("*/5 * * * *");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onCreate({
      name: name.trim(),
      trigger: {
        type: triggerType,
        scheduleCron: triggerType === "schedule" ? scheduleCron : undefined,
      },
      action: {
        type: actionType,
        httpUrl: actionType === "http" ? httpUrl : undefined,
        httpMethod: actionType === "http" ? httpMethod : undefined,
        emailTo: actionType === "email" ? emailTo : undefined,
        emailSubject: actionType === "email" ? emailSubject : undefined,
        logMessage: actionType === "log" ? logMessage : undefined,
      },
    });
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-card-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-card-border">
          <h2 className="text-lg font-semibold">Create Flow</h2>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Flow Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Notify on new order"
              className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              required
            />
          </div>

          {/* Trigger */}
          <div>
            <label className="block text-sm font-medium mb-2">Trigger</label>
            <div className="grid grid-cols-3 gap-2">
              {(["manual", "webhook", "schedule"] as TriggerType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTriggerType(t)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    triggerType === t
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-card-border hover:border-accent/50"
                  }`}
                >
                  {t === "manual" && "Manual"}
                  {t === "webhook" && "Webhook"}
                  {t === "schedule" && "Schedule"}
                </button>
              ))}
            </div>
            {triggerType === "webhook" && (
              <p className="text-xs text-muted mt-2">
                A unique webhook URL will be generated for this flow.
              </p>
            )}
            {triggerType === "schedule" && (
              <div className="mt-2">
                <input
                  type="text"
                  value={scheduleCron}
                  onChange={(e) => setScheduleCron(e.target.value)}
                  placeholder="*/5 * * * *"
                  className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <p className="text-xs text-muted mt-1">Cron expression (e.g., */5 * * * * = every 5 min)</p>
              </div>
            )}
          </div>

          {/* Action */}
          <div>
            <label className="block text-sm font-medium mb-2">Action</label>
            <div className="grid grid-cols-3 gap-2">
              {(["log", "http", "email"] as ActionType[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setActionType(a)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    actionType === a
                      ? "border-accent bg-accent/20 text-accent"
                      : "border-card-border hover:border-accent/50"
                  }`}
                >
                  {a === "log" && "Log"}
                  {a === "http" && "HTTP Request"}
                  {a === "email" && "Email"}
                </button>
              ))}
            </div>

            {/* Action config */}
            <div className="mt-3 space-y-2">
              {actionType === "http" && (
                <>
                  <div className="flex gap-2">
                    <select
                      value={httpMethod}
                      onChange={(e) => setHttpMethod(e.target.value as "GET" | "POST")}
                      className="px-3 py-2 bg-background border border-card-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </select>
                    <input
                      type="url"
                      value={httpUrl}
                      onChange={(e) => setHttpUrl(e.target.value)}
                      placeholder="https://api.example.com/endpoint"
                      className="flex-1 px-3 py-2 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                      required
                    />
                  </div>
                </>
              )}
              {actionType === "email" && (
                <>
                  <input
                    type="email"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    placeholder="recipient@example.com"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                    required
                  />
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject"
                    className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </>
              )}
              {actionType === "log" && (
                <input
                  type="text"
                  value={logMessage}
                  onChange={(e) => setLogMessage(e.target.value)}
                  placeholder="Custom log message (optional)"
                  className="w-full px-3 py-2 bg-background border border-card-border rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-card-border rounded-lg hover:bg-card-border/30 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 px-4 py-2 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              Create Flow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
