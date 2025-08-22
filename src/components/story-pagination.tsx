"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter,
  Languages,
  MapPin,
  Users,
  SortAsc,
  SortDesc
} from "lucide-react";

interface Story {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  neighborhood: string;
  language: string;
  translatorAvailable: boolean;
  likes: number;
  responses: number;
  interested: number;
}

interface StoryPaginationProps {
  stories: Story[];
  onFilteredStoriesChange: (stories: Story[]) => void;
  itemsPerPage?: number;
}

type SortOption = 'newest' | 'oldest' | 'most-interested' | 'alphabetical';

export function StoryPagination({ 
  stories, 
  onFilteredStoriesChange, 
  itemsPerPage = 8 
}: StoryPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const [neighborhoodFilter, setNeighborhoodFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values for filters
  const languages = Array.from(new Set(stories.map(s => s.language)));
  const neighborhoods = Array.from(new Set(stories.map(s => s.neighborhood)));

  // Filter and sort stories
  const getFilteredAndSortedStories = () => {
    let filtered = stories.filter(story => {
      const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           story.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage = languageFilter === "all" || story.language === languageFilter;
      const matchesNeighborhood = neighborhoodFilter === "all" || story.neighborhood === neighborhoodFilter;
      
      return matchesSearch && matchesLanguage && matchesNeighborhood;
    });

    // Sort stories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id; // Assuming higher ID = newer
        case 'oldest':
          return a.id - b.id;
        case 'most-interested':
          return b.interested - a.interested;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredStories = getFilteredAndSortedStories();
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStories = filteredStories.slice(startIndex, endIndex);

  // Update parent component with current page stories
  React.useEffect(() => {
    onFilteredStoriesChange(currentStories);
  }, [currentStories, onFilteredStoriesChange]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, languageFilter, neighborhoodFilter, sortBy]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLanguageFilter("all");
    setNeighborhoodFilter("all");
    setSortBy('newest');
    setCurrentPage(1);
  };

  const activeFiltersCount = [
    searchTerm !== "",
    languageFilter !== "all",
    neighborhoodFilter !== "all",
    sortBy !== 'newest'
  ].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search stories by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-base"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-700">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>

          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredStories.length)} of {filteredStories.length} stories
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Language Filter */}
              <div>
                <Label htmlFor="language-filter" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <Languages className="w-4 h-4" />
                  Language
                </Label>
                <select
                  id="language-filter"
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="all">All Languages</option>
                  {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              {/* Neighborhood Filter */}
              <div>
                <Label htmlFor="neighborhood-filter" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Neighborhood
                </Label>
                <select
                  id="neighborhood-filter"
                  value={neighborhoodFilter}
                  onChange={(e) => setNeighborhoodFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="all">All Neighborhoods</option>
                  {neighborhoods.map(neighborhood => (
                    <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <Label htmlFor="sort-by" className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                  <SortAsc className="w-4 h-4" />
                  Sort By
                </Label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="most-interested">Most Interest</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Active filters:</span>
                  {searchTerm && <Badge variant="secondary">Search: "{searchTerm}"</Badge>}
                  {languageFilter !== "all" && <Badge variant="secondary">Language: {languageFilter}</Badge>}
                  {neighborhoodFilter !== "all" && <Badge variant="secondary">Area: {neighborhoodFilter}</Badge>}
                  {sortBy !== 'newest' && <Badge variant="secondary">Sort: {sortBy}</Badge>}
                </div>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {filteredStories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              const showPage = page === 1 || 
                              page === totalPages || 
                              Math.abs(page - currentPage) <= 1;
              
              if (!showPage && page === 2 && currentPage > 4) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              
              if (!showPage && page === totalPages - 1 && currentPage < totalPages - 3) {
                return <span key={page} className="px-2 text-gray-400">...</span>;
              }
              
              if (!showPage) return null;

              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}