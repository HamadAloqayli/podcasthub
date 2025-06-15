import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Podcast ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=podcast`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch podcast details");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching podcast details:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast details" },
      { status: 500 }
    );
  }
}
