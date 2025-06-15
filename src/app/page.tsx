"use client";
import { useState, useEffect, useCallback } from "react";
import { Search, Moon, Sun, Headphones } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetails from "@/components/PodcastDetails";
import { searchPodcasts } from "@/utils/podcastApi";
import { Button } from "@/components/ui/button";
import GenreCard from "@/components/GenreCard";
import TrendingSection from "@/components/TrendingSection";

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

const Home = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isManualSearch, setIsManualSearch] = useState(false);

  const genres = [
    { name: "True Crime", icon: "🔍" },
    { name: "Comedy", icon: "😄" },
    { name: "Business", icon: "💼" },
    { name: "Technology", icon: "💻" },
    { name: "Health", icon: "🏥" },
    { name: "Sports", icon: "⚽" },
    { name: "History", icon: "📚" },
    { name: "Science", icon: "🔬" },
    { name: "News", icon: "📰" },
    { name: "Education", icon: "🎓" },
    { name: "Arts", icon: "🎨" },
    { name: "Music", icon: "🎵" },
  ];

  const handleSearch = useCallback(async (term: string) => {
    console.log("handleSearch called with term:", term);

    if (!term.trim()) {
      console.log("Empty search term, clearing results");
      setPodcasts([]);
      setSelectedGenre(null);
      setSearchTerm("");
      setIsManualSearch(false);
      return;
    }

    setLoading(true);
    setError(null);
    setSearchTerm(term);

    try {
      const results = await searchPodcasts(term);
      setPodcasts(results);
    } catch (err) {
      setError("Failed to search podcasts. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGenreClick = (genre: string) => {
    setSelectedGenre(genre);
    setIsManualSearch(false);
    handleSearch(genre.toLowerCase());
  };

  // Update the search bar to track manual searches
  const handleManualSearch = useCallback(
    async (term: string) => {
      setIsManualSearch(true);
      setSelectedGenre(null);
      handleSearch(term);
    },
    [handleSearch]
  );

  console.log("Render state:", {
    loading,
    searchTerm,
    isManualSearch,
    selectedGenre,
    podcastsLength: podcasts.length,
    shouldShowGenreCards: !isManualSearch,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 transition-all duration-500">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-purple-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              PodcastHub
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
            Discover Amazing Podcasts
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Search through millions of podcasts and find your next favorite show
          </p>

          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleManualSearch} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 pb-12">
        {/* Error handling */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-12">
            {/* Show genre cards during loading if it's a genre search */}
            {!isManualSearch && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Explore by Genre
                  </h2>
                  <p className="text-gray-600">
                    Discover podcasts by your favorite topics
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {genres.map((genre) => (
                    <GenreCard
                      key={genre.name}
                      genre={genre.name}
                      icon={genre.icon}
                      onClick={handleGenreClick}
                      isSelected={selectedGenre === genre.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Loading skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No results state */}
        {!loading && searchTerm && podcasts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎙️</div>
            <p className="text-xl text-gray-600">
              No podcasts found for "{searchTerm}"
            </p>
            <p className="text-gray-500 mt-2">
              Try searching for something else
            </p>
          </div>
        )}

        {/* Search results */}
        {!loading && podcasts.length > 0 && (
          <div className="space-y-12">
            {/* Genre Cards - show when not manual search */}
            {!isManualSearch && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Explore by Genre
                  </h2>
                  <p className="text-gray-600">
                    Discover podcasts by your favorite topics
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {genres.map((genre) => (
                    <GenreCard
                      key={genre.name}
                      genre={genre.name}
                      icon={genre.icon}
                      onClick={handleGenreClick}
                      isSelected={selectedGenre === genre.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.collectionId}
                  podcast={podcast}
                  onClick={() => setSelectedPodcast(podcast)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Default state - show genre cards and trending when no search term */}
        {!loading && !searchTerm && (
          <div className="space-y-12">
            {/* Genre Cards */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Explore by Genre
                </h2>
                <p className="text-gray-600">
                  Discover podcasts by your favorite topics
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {genres.map((genre) => (
                  <GenreCard
                    key={genre.name}
                    genre={genre.name}
                    icon={genre.icon}
                    onClick={handleGenreClick}
                    isSelected={selectedGenre === genre.name}
                  />
                ))}
              </div>
            </div>

            {/* Trending Podcasts */}
            <TrendingSection onPodcastClick={setSelectedPodcast} />
          </div>
        )}
      </section>

      {/* Podcast Details Modal */}
      {selectedPodcast && (
        <PodcastDetails
          podcast={selectedPodcast}
          onClose={() => setSelectedPodcast(null)}
        />
      )}
    </div>
  );
};

export default Home;
