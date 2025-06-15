interface Podcast {
  collectionId: number;
  collectionName: string;
  artistName: string;
  collectionViewUrl: string;
  artworkUrl100: string;
  artworkUrl600: string;
  primaryGenreName: string;
  trackCount: number;
  description?: string;
  averageUserRating?: number;
  userRatingCount?: number;
}

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

export async function searchPodcasts(query: string): Promise<Podcast[]> {
  try {
    const response = await fetch(
      `/api/podcasts?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch podcasts");
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching podcasts:", error);
    throw error;
  }
}

export async function getPodcastById(id: number): Promise<Podcast> {
  try {
    const response = await fetch(`/api/podcasts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch podcast");
    }

    const data = await response.json();
    return data.results?.[0];
  } catch (error) {
    console.error("Error fetching podcast:", error);
    throw error;
  }
}

export async function getPodcastEpisodes(id: number): Promise<Episode[]> {
  try {
    const response = await fetch(`/api/podcasts/${id}/episodes`);

    if (!response.ok) {
      throw new Error("Failed to fetch podcast episodes");
    }

    const data = await response.json();
    // Filter out the podcast itself from the results (it's usually the first item)
    return (
      data.results?.filter((item: any) => item.kind === "podcast-episode") || []
    );
  } catch (error) {
    console.error("Error fetching podcast episodes:", error);
    throw error;
  }
}
