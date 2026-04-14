import { NextRequest, NextResponse } from "next/server";
import { getFlow, getFlowLogs } from "@/lib/store";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const flow = getFlow(id);
  if (!flow) {
    return NextResponse.json({ error: "Flow not found" }, { status: 404 });
  }

  const logs = getFlowLogs(id);
  return NextResponse.json(logs);
}
