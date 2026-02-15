import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { downloadLocation } = await request.json();

  if (!downloadLocation) {
    return NextResponse.json({ error: "Download location required" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
