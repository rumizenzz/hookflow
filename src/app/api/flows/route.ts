import { NextRequest, NextResponse } from "next/server";
import { getUser, getUserFlows, createFlow } from "@/lib/store";
import type { CreateFlowInput } from "@/lib/types";

export async function GET() {
  const user = getUser();
  const flows = getUserFlows(user.id);
  return NextResponse.json(flows);
}

export async function POST(request: NextRequest) {
  try {
    const user = getUser();
    const body: CreateFlowInput = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json({ error: "Flow name is required" }, { status: 400 });
    }
    if (!body.trigger?.type) {
      return NextResponse.json({ error: "Trigger type is required" }, { status: 400 });
    }
    if (!body.action?.type) {
      return NextResponse.json({ error: "Action type is required" }, { status: 400 });
    }

    const flow = createFlow(user.id, body);
    return NextResponse.json(flow, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create flow" }, { status: 500 });
  }
}
