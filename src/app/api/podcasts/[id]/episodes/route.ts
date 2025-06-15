import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Podcast ID is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${id}&entity=podcastEpisode&limit=50`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch podcast episodes");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching podcast episodes:", error);
    return NextResponse.json(
      { error: "Failed to fetch podcast episodes" },
      { status: 500 }
    );
  }
}
