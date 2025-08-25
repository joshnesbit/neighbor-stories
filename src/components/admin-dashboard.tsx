"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Archive, 
  Search, 
  Eye,
  Users,
  Coffee,
  Languages,
  Calendar,
  MapPin,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Story } from "@/lib/types";

interface AdminDashboardProps {
  onClose?: () => void;
  password?: string;
}

export function AdminDashboard({ onClose, password }: AdminDashboardProps) {
  const [submissions, setSubmissions] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      if (!password) {
        setError("Admin password not provided.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const { data, error: invokeError } = await supabase.functions.invoke('admin-stories', {
          method: 'GET',
          headers: { Authorization: `Bearer ${password}` }
        });

        if (invokeError) throw invokeError;
        setSubmissions(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch stories.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, [password]);

  const updateStoryStatus = async (id: number, status: 'approved' | 'rejected' | 'archived') => {
    if (!password) return;

    const originalSubmissions = [...submissions];
    
    // Optimistically update UI
    const updatedSubmissions = submissions.map(story => 
      story.id === id 
        ? { ...story, status, approved_at: status === 'approved' ? new Date().toISOString() : story.approved_at }
        : story
    );
    setSubmissions(updatedSubmissions);
    if (selectedStory?.id === id) {
      setSelectedStory(updatedSubmissions.find(s => s.id === id) || null);
    }

    try {
      const { error: invokeError } = await supabase.functions.invoke('admin-stories', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${password}` },
        body: { id, status }
      });
      if (invokeError) throw invokeError;
    } catch (err) {
      console.error("Failed to update story status:", err);
      // Revert UI on error
      setSubmissions(originalSubmissions);
      alert("Failed to update story. Please try again.");
    }
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = {
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
    rejected: submissions.filter(s => s.status === 'rejected').length,
    archived: submissions.filter(s => s.status === 'archived').length,
    totalInterest: submissions.reduce((sum, s) => sum + (s.interested || 0), 0)
  };

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
        <Card><CardContent className="p-4 text-center"><Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{stats.pending}</div><div className="text-sm text-gray-600">Pending Review</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{stats.approved}</div><div className="text-sm text-gray-600">Live Stories</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><XCircle className="w-6 h-6 text-red-500 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{stats.rejected}</div><div className="text-sm text-gray-600">Rejected</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Archive className="w-6 h-6 text-gray-500 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{stats.archived}</div><div className="text-sm text-gray-600">Archived</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><Users className="w-6 h-6 text-blue-500 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{stats.totalInterest}</div><div className="text-sm text-gray-600">Total Interest</div></CardContent></Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="search" className="sr-only">Search stories</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input id="search" placeholder="Search by title, author, or content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </div>
        <div className="sm:w-48">
          <Label htmlFor="status-filter" className="sr-only">Filter by status</Label>
          <select id="status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stories List */}
      {isLoading ? (
        <div className="text-center py-12"><Loader2 className="w-12 h-12 mx-auto animate-spin text-gray-400" /></div>
      ) : error ? (
        <div className="text-center py-12 text-red-600">{error}</div>
      ) : (
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
                      <span className="flex items-center gap-1"><Languages className="w-3 h-3" />{story.language}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(story.created_at)}</span>
                      {story.neighborhood && (<span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{story.neighborhood}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {story.interested > 0 && (<Badge variant="secondary" className="bg-blue-100 text-blue-700"><Users className="w-3 h-3 mr-1" />{story.interested} interested</Badge>)}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{story.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {story.translator_available && (<Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">Translator: {story.translator_language}</Badge>)}
                    {story.is_anonymous && (<Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">Anonymous</Badge>)}
                    {story.wants_meetup_notifications && (<Badge variant="secondary" className="text-xs bg-green-100 text-green-700"><Coffee className="w-3 h-3 mr-1" />Wants meetups</Badge>)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStory(story)}><Eye className="w-4 h-4 mr-1" />View</Button>
                    {story.status === 'pending' && (
                      <>
                        <Button variant="outline" size="sm" onClick={() => updateStoryStatus(story.id, 'approved')} className="text-green-600 border-green-300 hover:bg-green-50"><CheckCircle className="w-4 h-4 mr-1" />Approve</Button>
                        <Button variant="outline" size="sm" onClick={() => updateStoryStatus(story.id, 'rejected')} className="text-red-600 border-red-300 hover:bg-red-50"><XCircle className="w-4 h-4 mr-1" />Reject</Button>
                      </>
                    )}
                    {story.status === 'approved' && story.interested >= 3 && (
                      <Button variant="outline" size="sm" onClick={() => updateStoryStatus(story.id, 'archived')} className="text-gray-600 border-gray-300 hover:bg-gray-50"><Archive className="w-4 h-4 mr-1" />Archive</Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredSubmissions.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4"><Search className="w-12 h-12 mx-auto" /></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{selectedStory.title}</CardTitle>
                <Button variant="ghost" onClick={() => setSelectedStory(null)}>×</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>by {selectedStory.author}</span>
                  <span>{selectedStory.language}</span>
                  <span>{formatDate(selectedStory.created_at)}</span>
                  {getStatusBadge(selectedStory.status)}
                </div>
                <div className="prose max-w-none"><p className="text-gray-700 leading-relaxed">{selectedStory.content}</p></div>
                {!selectedStory.is_anonymous && selectedStory.wants_meetup_notifications && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                    <p className="text-sm text-gray-600">{selectedStory.contact_method === 'email' ? selectedStory.email : selectedStory.phone}</p>
                  </div>
                )}
                <div className="flex gap-2 pt-4">
                  {selectedStory.status === 'pending' && (
                    <>
                      <Button onClick={() => { updateStoryStatus(selectedStory.id, 'approved'); }} className="bg-green-600 hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-2" />Approve Story</Button>
                      <Button variant="outline" onClick={() => { updateStoryStatus(selectedStory.id, 'rejected'); }} className="text-red-600 border-red-300 hover:bg-red-50"><XCircle className="w-4 h-4 mr-2" />Reject Story</Button>
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