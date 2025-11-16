import { NextRequest, NextResponse } from "next/server";
import { handleWebhookUpdate } from "@/lib/telegram-bot";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Verify it's a Telegram update
    if (!body.update_id) {
      return NextResponse.json(
        { error: "Invalid update format" },
        { status: 400 }
      );
    }
    
    // Handle webhook update
    await handleWebhookUpdate(body);
    
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // For webhook verification (if needed)
  return NextResponse.json({ message: "Telegram webhook endpoint" });
}
