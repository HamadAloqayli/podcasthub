
import { Card } from '@/components/ui/card';

interface GenreCardProps {
  genre: string;
  icon: string;
  onClick: (genre: string) => void;
  isSelected?: boolean;
}

const GenreCard = ({ genre, icon, onClick, isSelected = false }: GenreCardProps) => {
  return (
    <Card 
      className={`group cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:shadow-lg ${
        isSelected 
          ? 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800/40 dark:to-indigo-800/40 border-purple-500 dark:border-purple-400 shadow-lg' 
          : 'bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700'
      }`}
      onClick={() => onClick(genre)}
    >
      <div className="p-4 text-center">
        <div className="text-2xl mb-2">{icon}</div>
        <h3 className={`font-semibold transition-colors ${
          isSelected
            ? 'text-purple-700 dark:text-purple-300'
            : 'text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400'
        }`}>
          {genre}
        </h3>
      </div>
    </Card>
  );
};

export default GenreCard;
