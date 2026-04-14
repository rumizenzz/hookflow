import { v4 as uuidv4 } from "uuid";
import type { Flow, FlowLog, User, CreateFlowInput } from "./types";

// In-memory store (replace with Supabase for production)
const users: Map<string, User> = new Map();
const flows: Map<string, Flow> = new Map();
const logs: Map<string, FlowLog[]> = new Map();

// Demo user for MVP (no real auth)
const DEMO_USER: User = {
  id: "demo-user",
  email: "demo@hookflow.dev",
  name: "Demo User",
};
users.set(DEMO_USER.id, DEMO_USER);

export function getUser(): User {
  return DEMO_USER;
}

export function getUserFlows(userId: string): Flow[] {
  return Array.from(flows.values())
    .filter((f) => f.userId === userId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getFlow(id: string): Flow | undefined {
  return flows.get(id);
}

export function createFlow(userId: string, input: CreateFlowInput): Flow {
  const id = uuidv4();
  const now = new Date().toISOString();

  const flow: Flow = {
    id,
    userId,
    name: input.name,
    enabled: true,
    trigger: {
      ...input.trigger,
      webhookUrl:
        input.trigger.type === "webhook"
          ? `/api/webhook/${id}`
          : undefined,
    },
    action: input.action,
    createdAt: now,
    updatedAt: now,
  };

  flows.set(id, flow);
  logs.set(id, []);
  return flow;
}

export function updateFlow(
  id: string,
  updates: Partial<Pick<Flow, "name" | "enabled" | "trigger" | "action">>
): Flow | null {
  const flow = flows.get(id);
  if (!flow) return null;

  const updated = {
    ...flow,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  flows.set(id, updated);
  return updated;
}

export function deleteFlow(id: string): boolean {
  logs.delete(id);
  return flows.delete(id);
}

export function addLog(log: FlowLog): void {
  const flowLogs = logs.get(log.flowId) || [];
  flowLogs.unshift(log);
  if (flowLogs.length > 100) flowLogs.pop();
  logs.set(log.flowId, flowLogs);
}

export function getFlowLogs(flowId: string): FlowLog[] {
  return logs.get(flowId) || [];
}
