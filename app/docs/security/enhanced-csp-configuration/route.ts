import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. On récupère la requête entrante
  try {
    // 2. On construit une URL absolue en combinant le chemin cible et le domaine d'origine
    const targetUrl = new URL("/docs/security/csp", request.url);

    return NextResponse.redirect(targetUrl);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to redirect" }, { status: 500 });
  }
}
