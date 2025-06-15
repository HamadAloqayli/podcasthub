import { type NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return new Response(JSON.stringify({ error: "Podcast ID is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=podcast`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch podcast details");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch podcast details" }),
      { status: 500 }
    );
  }
}
