import { searchDocs } from "@/lib/search-engine";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return Response.json([]);
  }

  const results = searchDocs(query);
  return Response.json(results);
}
