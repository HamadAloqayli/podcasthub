interface Episode {
  trackId: number;
  trackName: string;
  description: string;
  episodeUrl: string;
  releaseDate: string;
  trackTimeMillis: number;
  artworkUrl60: string;
  artworkUrl160: string;
  artworkUrl600: string;
}

export async function getPodcastEpisodes(
  podcastId: number
): Promise<Episode[]> {
  try {
    const response = await fetch(`/api/podcasts/${podcastId}/episodes`);

    if (!response.ok) {
      throw new Error("Failed to fetch podcast episodes");
    }

    const data = await response.json();
    // Filter out the podcast info (first result) and return only episodes
    return (
      data.results?.filter((item: any) => item.kind === "podcast-episode") || []
    );
  } catch (error) {
    console.error("Error fetching podcast episodes:", error);
    throw error;
  }
}
