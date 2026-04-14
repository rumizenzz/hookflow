import { v4 as uuidv4 } from "uuid";
import type { Flow, FlowLog } from "./types";
import { addLog } from "./store";

export async function executeFlow(
  flow: Flow,
  triggerPayload?: unknown
): Promise<FlowLog> {
  const start = Date.now();
  const logEntry: FlowLog = {
    id: uuidv4(),
    flowId: flow.id,
    triggeredAt: new Date().toISOString(),
    triggerType: flow.trigger.type,
    actionType: flow.action.type,
    status: "success",
    duration: 0,
  };

  try {
    switch (flow.action.type) {
      case "http": {
        const url = flow.action.httpUrl;
        if (!url) throw new Error("HTTP URL is required");

        const res = await fetch(url, {
          method: flow.action.httpMethod || "POST",
          headers: {
            "Content-Type": "application/json",
            ...flow.action.httpHeaders,
          },
          body:
            flow.action.httpMethod === "GET"
              ? undefined
              : flow.action.httpBody ||
                JSON.stringify({
                  flow_id: flow.id,
                  flow_name: flow.name,
                  triggered_at: logEntry.triggeredAt,
                  trigger_type: flow.trigger.type,
                  payload: triggerPayload,
                }),
        });

        logEntry.detail = `${flow.action.httpMethod || "POST"} ${url} -> ${res.status} ${res.statusText}`;
        if (!res.ok) {
          logEntry.status = "failure";
          logEntry.error = `HTTP ${res.status}: ${res.statusText}`;
        }
        break;
      }

      case "log": {
        const message =
          flow.action.logMessage ||
          `Flow "${flow.name}" triggered at ${logEntry.triggeredAt}`;
        logEntry.detail = `Logged: ${message}`;
        if (triggerPayload) {
          logEntry.detail += ` | Payload: ${JSON.stringify(triggerPayload).substring(0, 200)}`;
        }
        break;
      }

      case "email": {
        // For MVP, simulate email sending (would use Resend in production)
        const to = flow.action.emailTo;
        if (!to) throw new Error("Email recipient is required");

        logEntry.detail = `Email simulated to: ${to} | Subject: ${flow.action.emailSubject || "Hookflow Notification"}`;
        // In production: await resend.emails.send({...})
        break;
      }

      default:
        throw new Error(`Unknown action type: ${flow.action.type}`);
    }
  } catch (error) {
    logEntry.status = "failure";
    logEntry.error =
      error instanceof Error ? error.message : "Unknown error";
  }

  logEntry.duration = Date.now() - start;
  addLog(logEntry);
  return logEntry;
}
