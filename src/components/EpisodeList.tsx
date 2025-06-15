import { useState, useEffect } from "react";
import { Play, Tv, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPodcastEpisodes } from "@/utils/podcastEpisodesApi";

interface Episode {
  trackId: number;
  trackName: string;
  episodeUrl: string;
  description?: string;
  releaseDate: string;
  trackTimeMillis?: number;
}

interface EpisodeListProps {
  podcastId: number;
  onPlayEpisode: (episode: Episode) => void;
}

const EpisodeList = ({ podcastId, onPlayEpisode }: EpisodeListProps) => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        const episodeData = await getPodcastEpisodes(podcastId);
        setEpisodes(episodeData);
      } catch (err) {
        setError("Failed to load episodes");
        console.error("Error fetching episodes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [podcastId]);

  const formatDuration = (milliseconds?: number) => {
    if (!milliseconds) return "";
    const minutes = Math.floor(milliseconds / 60000);
    return `${minutes} min`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">
          Loading episodes...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">
          No episodes available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Recent Episodes ({episodes.length})
      </h3>

      {episodes.map((episode) => (
        <Card
          key={episode.trackId}
          className="p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 mb-2">
                {episode.trackName}
              </h4>

              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <div className="flex items-center space-x-1">
                  <Tv className="h-3 w-3" />
                  <span>{formatDate(episode.releaseDate)}</span>
                </div>

                {episode.trackTimeMillis && (
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{formatDuration(episode.trackTimeMillis)}</span>
                  </div>
                )}
              </div>

              {episode.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {episode.description.replace(/<[^>]*>/g, "")}
                </p>
              )}
            </div>

            <Button
              onClick={() => onPlayEpisode(episode)}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white flex-shrink-0"
            >
              <Play className="h-4 w-4 mr-1" />
              Play
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EpisodeList;
