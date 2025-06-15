
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
      <div className="relative flex items-center">
        <Search className="absolute left-4 h-5 w-5 text-gray-400 z-10" />
        <Input
          type="text"
          placeholder="Search for podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-16 py-4 text-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-transparent focus:border-purple-500 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 placeholder:text-gray-400"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 z-10"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
