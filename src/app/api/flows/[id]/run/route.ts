import { NextRequest, NextResponse } from "next/server";
import { getFlow } from "@/lib/store";
import { executeFlow } from "@/lib/executor";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const flow = getFlow(id);
  if (!flow) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  }
  if (!flow.enabled) {
    return NextResponse.json({ error: "Flow is disabled" }, { status: 400 });
  }

  const log = await executeFlow(flow, { source: "manual" });
  return NextResponse.json(log);
}
