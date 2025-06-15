
import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';
import PodcastCard from './PodcastCard';
import { searchPodcasts } from '@/utils/podcastApi';

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

interface TrendingSectionProps {
  onPodcastClick: (podcast: Podcast) => void;
}

const TrendingSection = ({ onPodcastClick }: TrendingSectionProps) => {
  const [trendingPodcasts, setTrendingPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingPodcasts = async () => {
      try {
        setLoading(true);
        // Fetch trending podcasts using popular search terms
        const trendingTerms = ['joe rogan', 'true crime', 'business', 'comedy'];
        const allPodcasts: Podcast[] = [];
        
        for (const term of trendingTerms) {
          const results = await searchPodcasts(term);
          allPodcasts.push(...results.slice(0, 4)); // Take 4 from each category
        }
        
        // Remove duplicates and limit to 16
        const uniquePodcasts = allPodcasts.filter((podcast, index, self) => 
          index === self.findIndex(p => p.collectionId === podcast.collectionId)
        ).slice(0, 16);
        
        setTrendingPodcasts(uniquePodcasts);
      } catch (error) {
        console.error('Error fetching trending podcasts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPodcasts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Flame className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Trending Podcasts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Flame className="h-6 w-6 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Trending Podcasts
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
        {trendingPodcasts.map((podcast) => (
          <PodcastCard
            key={podcast.collectionId}
            podcast={podcast}
            onClick={() => onPodcastClick(podcast)}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
