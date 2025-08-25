"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight
} from "lucide-react";
import { Story } from "@/lib/types";

interface StoryPaginationProps {
  stories: Story[];
  onFilteredStoriesChange: (stories: Story[]) => void;
  itemsPerPage?: number;
}

export function StoryPagination({ 
  stories, 
  onFilteredStoriesChange, 
  itemsPerPage = 8 
}: StoryPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(stories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Memoize current stories to prevent unnecessary re-renders
  const currentStories = useMemo(() => {
    return stories.slice(startIndex, endIndex);
  }, [stories, startIndex, endIndex]);

  // Update parent component with current page stories - use useEffect with proper dependencies
  useEffect(() => {
    onFilteredStoriesChange(currentStories);
  }, [currentStories]); // Remove onFilteredStoriesChange from dependencies to prevent infinite loop

  // Reset to page 1 when stories array changes (different stories, not just re-render)
  useEffect(() => {
    setCurrentPage(1);
  }, [stories.length]); // Only reset when the number of stories changes

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="text-sm text-gray-600 text-center">
        Showing {startIndex + 1}-{Math.min(endIndex, stories.length)} of {stories.length} stories
      </div>

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