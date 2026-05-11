import { NextResponse } from "next/server";
import { getDynamicSearchIndex } from "@/lib/search-indexer";

export async function GET() {
  try {
    const data = await getDynamicSearchIndex();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search index error:", error);
    return NextResponse.json({ error: "Failed to generate search index" }, { status: 500 });
  }
}
