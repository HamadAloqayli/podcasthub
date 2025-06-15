import { ExternalLink, Star, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";

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

interface PodcastCardProps {
  podcast: Podcast;
  onClick: () => void;
}

const PodcastCard = ({ podcast, onClick }: PodcastCardProps) => {
  const handleExternalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(podcast.collectionViewUrl, "_blank");
  };

  return (
    <Card className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl overflow-hidden">
      <div onClick={onClick} className="p-6">
        {/* Artwork */}
        <div className="relative mb-4 overflow-hidden rounded-xl">
          <img
            src={podcast.artworkUrl600 || podcast.artworkUrl100}
            alt={podcast.collectionName}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {podcast.collectionName}
          </h3>

          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-1">
            by {podcast.artistName}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
              {podcast.primaryGenreName}
            </span>
            <span className="flex items-center space-x-1">
              <Copy className="h-3 w-3" />
              <span>{podcast.trackCount} episodes</span>
            </span>
          </div>

          {podcast.averageUserRating && (
            <div className="flex items-center space-x-1 text-xs text-yellow-600 dark:text-yellow-400">
              <Star className="h-3 w-3 fill-current" />
              <span>{podcast.averageUserRating.toFixed(1)}</span>
              {podcast.userRatingCount && (
                <span className="text-gray-500">
                  ({podcast.userRatingCount})
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* External Link Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleExternalClick}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 px-4 rounded-xl hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 text-sm font-medium"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Listen on Apple Podcasts</span>
        </button>
      </div>
    </Card>
  );
};

export default PodcastCard;
