import { NextRequest, NextResponse } from "next/server";
import { getFlow } from "@/lib/store";
import { executeFlow } from "@/lib/executor";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const flow = getFlow(id);

  if (!flow) {
    return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
  }
  if (!flow.enabled) {
    return NextResponse.json({ error: "Flow is disabled" }, { status: 400 });
  }
  if (flow.trigger.type !== "webhook") {
    return NextResponse.json({ error: "Flow is not webhook-triggered" }, { status: 400 });
  }

  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    // Body might not be JSON, that's ok
  }

  const log = await executeFlow(flow, payload);

  return NextResponse.json({
    ok: log.status === "success",
    log_id: log.id,
    status: log.status,
    duration: log.duration,
  });
}

// Also accept GET for easy testing
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const flow = getFlow(id);

  if (!flow) {
    return NextResponse.json({ error: "Webhook not found" }, { status: 404 });
  }

  return NextResponse.json({
    flow_id: flow.id,
    flow_name: flow.name,
    trigger_type: flow.trigger.type,
    status: flow.enabled ? "active" : "disabled",
    message: "Send a POST request to trigger this webhook",
  });
}
