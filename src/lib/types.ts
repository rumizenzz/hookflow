export type TriggerType = "manual" | "webhook" | "schedule";
export type ActionType = "http" | "log" | "email";

export interface Flow {
  id: string;
  userId: string;
  name: string;
  enabled: boolean;
  trigger: TriggerConfig;
  action: ActionConfig;
  createdAt: string;
  updatedAt: string;
}

export interface TriggerConfig {
  type: TriggerType;
  webhookUrl?: string;
  scheduleCron?: string;
}

export interface ActionConfig {
  type: ActionType;
  httpUrl?: string;
  httpMethod?: "GET" | "POST" | "PUT" | "DELETE";
  httpHeaders?: Record<string, string>;
  httpBody?: string;
  emailTo?: string;
  emailSubject?: string;
  emailBody?: string;
  logMessage?: string;
}

export interface FlowLog {
  id: string;
  flowId: string;
  triggeredAt: string;
  triggerType: TriggerType;
  actionType: ActionType;
  status: "success" | "failure";
  duration: number;
  detail?: string;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CreateFlowInput {
  name: string;
  trigger: TriggerConfig;
  action: ActionConfig;
}
