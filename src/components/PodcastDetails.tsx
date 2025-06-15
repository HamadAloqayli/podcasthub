import { useState } from "react";
import { X, ExternalLink, Star, Copy, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import EpisodeList from "./EpisodeList";
import AudioPlayer from "./AudioPlayer";

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
  episodeUrl: string;
  description?: string;
  releaseDate: string;
  trackTimeMillis?: number;
}

interface PodcastDetailsProps {
  podcast: Podcast;
  onClose: () => void;
}

const PodcastDetails = ({ podcast, onClose }: PodcastDetailsProps) => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  const handleExternalClick = () => {
    window.open(podcast.collectionViewUrl, "_blank");
  };

  const handlePlayEpisode = (episode: Episode) => {
    setCurrentEpisode(episode);
  };

  const handleClosePlayer = () => {
    setCurrentEpisode(null);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 animate-scale-in">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Podcast Details
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Artwork and Basic Info */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={podcast.artworkUrl600 || podcast.artworkUrl100}
                  alt={podcast.collectionName}
                  className="w-48 h-48 object-cover rounded-2xl shadow-lg mx-auto md:mx-0"
                />
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {podcast.collectionName}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    by {podcast.artistName}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Copy className="h-4 w-4" />
                    <span>{podcast.trackCount} episodes</span>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <Tv className="h-4 w-4" />
                    <span>{podcast.primaryGenreName}</span>
                  </div>

                  {podcast.averageUserRating && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{podcast.averageUserRating.toFixed(1)} rating</span>
                    </div>
                  )}

                  {podcast.userRatingCount && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                      <Copy className="h-4 w-4" />
                      <span>{podcast.userRatingCount} reviews</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  onClick={handleExternalClick}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Listen on Apple Podcasts
                </Button>
              </div>
            </div>

            {/* Description */}
            {podcast.description && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  About this podcast
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {podcast.description}
                </p>
              </div>
            )}

            {/* Episodes List */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <EpisodeList
                podcastId={podcast.collectionId}
                onPlayEpisode={handlePlayEpisode}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Audio Player */}
      {currentEpisode && (
        <AudioPlayer episode={currentEpisode} onClose={handleClosePlayer} />
      )}
    </>
  );
};

export default PodcastDetails;
