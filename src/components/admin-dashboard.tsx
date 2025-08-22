"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Archive, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Users,
  Coffee,
  Languages,
  Calendar,
  MapPin
} from "lucide-react";

interface StorySubmission {
  id: number;
  title: string;
  content: string;
  author: string;
  language: string;
  translatorAvailable: boolean;
  translatorLanguage?: string;
  isAnonymous: boolean;
  wantsMeetupNotifications: boolean;
  contactMethod?: 'email' | 'phone';
  email?: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  submittedAt: string;
  approvedAt?: string;
  interested: number;
  neighborhood?: string;
}

// Sample data - in real app this would come from your backend
const sampleSubmissions: StorySubmission[] = [
  {
    id: 1,
    title: "The Corner Store That Saved My Day",
    content: "I was having the worst day when I realized I'd locked myself out. The owner of the corner store on Irving let me use his phone and even offered me tea while I waited for a locksmith...",
    author: "Sarah M.",
    language: "English",
    translatorAvailable: false,
    isAnonymous: false,
    wantsMeetupNotifications: true,
    contactMethod: 'email',
    email: "sarah.m@email.com",
    status: 'pending',
    submittedAt: "2024-01-15T10:30:00Z",
    interested: 0,
    neighborhood: "Inner Sunset"
  },
  {
    id: 2,
    title: "Learning English Through Kindness",
    content: "When I first moved here from China, I was so scared to speak English. My neighbor Mrs. Chen would invite me for tea every week and patiently help me practice...",
    author: "Wei L.",
    language: "Mandarin",
    translatorAvailable: true,
    translatorLanguage: "English",
    isAnonymous: false,
    wantsMeetupNotifications: true,
    contactMethod: 'phone',
    phone: "(415) 555-0123",
    status: 'approved',
    submittedAt: "2024-01-14T15:45:00Z",
    approvedAt: "2024-01-14T16:00:00Z",
    interested: 3,
    neighborhood: "Richmond"
  },
  {
    id: 3,
    title: "The Dog Park Connection",
    content: "My rescue dog was so anxious around other dogs. The regulars at the dog park were so patient and helpful. Now he has doggy friends and I have human ones!",
    author: "Anonymous",
    language: "English",
    translatorAvailable: false,
    isAnonymous: true,
    wantsMeetupNotifications: false,
    status: 'approved',
    submittedAt: "2024-01-13T09:15:00Z",
    approvedAt: "2024-01-13T11:30:00Z",
    interested: 7,
    neighborhood: "Mission"
  }
];

interface AdminDashboardProps {
  onClose?: () => void;
}

export function AdminDashboard({ onClose }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<StorySubmission[]>(sampleSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStory, setSelectedStory] = useState<StorySubmission | null>(null);

  const handleApprove = (id: number) => {
    setSubmissions(prev => prev.map(story => 
      story.id === id 
        ? { ...story, status: 'approved' as const, approvedAt: new Date().toISOString() }
        : story
    ));
  };

  const handleReject = (id: number) => {
    setSubmissions(prev => prev.map(story => 
      story.id === id 
        ? { ...story, status: 'rejected' as const }
        : story
    ));
  };

  const handleArchive = (id: number) => {
    setSubmissions(prev => prev.map(story => 
      story.id === id 
        ? { ...story, status: 'archived' as const }
        : story
    ));
  };

  const filteredSubmissions = submissions.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || story.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge variant="secondary" className="bg-green-100 text-green-700"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-700"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'archived':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-700"><Archive className="w-3 h-3 mr-1" />Archived</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    return {
      pending: submissions.filter(s => s.status === 'pending').length,
      approved: submissions.filter(s => s.status === 'approved').length,
      rejected: submissions.filter(s => s.status === 'rejected').length,
      archived: submissions.filter(s => s.status === 'archived').length,
      totalInterest: submissions.reduce((sum, s) => sum + s.interested, 0)
    };
  };

  const stats = getStats();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Story Admin Dashboard</h1>
            <p className="text-gray-600">Manage story submissions and community engagement</p>
          </div>
        </div>
        {onClose && (
          <Button variant="outline" onClick={onClose}>
            Close Admin
          </Button>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.approved}</div>
            <div className="text-sm text-gray-600">Live Stories</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Archive className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.archived}</div>
            <div className="text-sm text-gray-600">Archived</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalInterest}</div>
            <div className="text-sm text-gray-600">Total Interest</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search stories</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="search"
              placeholder="Search by title, author, or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="sm:w-48">
          <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {filteredSubmissions.map((story) => (
          <Card key={story.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{story.title}</h3>
                    {getStatusBadge(story.status)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>by {story.author}</span>
                    <span className="flex items-center gap-1">
                      <Languages className="w-3 h-3" />
                      {story.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(story.submittedAt)}
                    </span>
                    {story.neighborhood && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {story.neighborhood}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {story.interested > 0 && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      <Users className="w-3 h-3 mr-1" />
                      {story.interested} interested
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{story.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {story.translatorAvailable && (
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      Translator: {story.translatorLanguage}
                    </Badge>
                  )}
                  {story.isAnonymous && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      Anonymous
                    </Badge>
                  )}
                  {story.wantsMeetupNotifications && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                      <Coffee className="w-3 h-3 mr-1" />
                      Wants meetups
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedStory(story)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  {story.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleApprove(story.id)}
                        className="text-green-600 border-green-300 hover:bg-green-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(story.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {story.status === 'approved' && story.interested >= 3 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleArchive(story.id)}
                      className="text-gray-600 border-gray-300 hover:bg-gray-50"
                    >
                      <Archive className="w-4 h-4 mr-1" />
                      Archive
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Story Detail Modal would go here */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{selectedStory.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedStory(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>by {selectedStory.author}</span>
                  <span>{selectedStory.language}</span>
                  <span>{formatDate(selectedStory.submittedAt)}</span>
                  {getStatusBadge(selectedStory.status)}
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{selectedStory.content}</p>
                </div>

                {!selectedStory.isAnonymous && selectedStory.wantsMeetupNotifications && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <p className="text-sm text-gray-600">
                      {selectedStory.contactMethod === 'email' ? selectedStory.email : selectedStory.phone}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  {selectedStory.status === 'pending' && (
                    <>
                      <Button
                        onClick={() => {
                          handleApprove(selectedStory.id);
                          setSelectedStory(null);
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Story
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleReject(selectedStory.id);
                          setSelectedStory(null);
                        }}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject Story
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}