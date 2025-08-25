"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Archive,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Story } from "@/lib/types";

interface AdminDashboardProps {
  password: string;
}

export function AdminDashboard({ password }: AdminDashboardProps) {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setStories(data || []);
    } catch (err) {
      console.error('Error fetching stories:', err);
      setError('Failed to load stories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateStoryStatus = async (storyId: number, newStatus: Story['status']) => {
    try {
      setActionLoading(storyId);
      
      const updateData: Partial<Story> = { 
        status: newStatus,
        ...(newStatus === 'approved' ? { approved_at: new Date().toISOString() } : {})
      };

      const { data, error } = await supabase.functions.invoke('admin-stories', {
        body: { 
          action: 'update_status',
          storyId,
          status: newStatus,
          password 
        },
      });

      if (error) throw error;

      // Update local state
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { ...story, ...updateData }
          : story
      ));
    } catch (err) {
      console.error('Error updating story status:', err);
      setError('Failed to update story status. Please try again.');
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status: Story['status']) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700 border-yellow-200", icon: Clock },
      approved: { color: "bg-green-100 text-green-700 border-green-200", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-700 border-red-200", icon: XCircle },
      archived: { color: "bg-gray-100 text-gray-700 border-gray-200", icon: Archive }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge variant="secondary" className={`${config.color} flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const StoryCard = ({ story }: { story: Story }) => (
    <Card key={story.id} className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg mb-2">{story.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span>by {story.author}</span>
              <span>•</span>
              <span>{story.language}</span>
              <span>•</span>
              <span>{new Date(story.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="ml-4">
            {getStatusBadge(story.status)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 mb-4 line-clamp-3">{story.excerpt || story.content.substring(0, 200) + '...'}</p>
        
        <div className="flex flex-wrap gap-2">
          {story.status === 'pending' && (
            <>
              <Button
                size="sm"
                onClick={() => updateStoryStatus(story.id, 'approved')}
                disabled={actionLoading === story.id}
                className="bg-green-600 hover:bg-green-700"
              >
                {actionLoading === story.id ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-4 h-4 mr-2" />
                )}
                Approve
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStoryStatus(story.id, 'rejected')}
                disabled={actionLoading === story.id}
              >
                {actionLoading === story.id ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                Reject
              </Button>
            </>
          )}
          
          {story.status === 'approved' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStoryStatus(story.id, 'archived')}
              disabled={actionLoading === story.id}
            >
              {actionLoading === story.id ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Archive className="w-4 h-4 mr-2" />
              )}
              Archive
            </Button>
          )}
          
          {(story.status === 'rejected' || story.status === 'archived') && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateStoryStatus(story.id, 'pending')}
              disabled={actionLoading === story.id}
            >
              {actionLoading === story.id ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Clock className="w-4 h-4 mr-2" />
              )}
              Move to Pending
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Stories</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchStories} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const pendingStories = stories.filter(s => s.status === 'pending');
  const approvedStories = stories.filter(s => s.status === 'approved');
  const rejectedStories = stories.filter(s => s.status === 'rejected');
  const archivedStories = stories.filter(s => s.status === 'archived');

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Story Management</h1>
          <p className="text-gray-600 mt-2">Review and manage community stories</p>
        </div>
        <Button onClick={fetchStories} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingStories.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{approvedStories.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{rejectedStories.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Archived</p>
                <p className="text-2xl font-bold text-gray-600">{archivedStories.length}</p>
              </div>
              <Archive className="w-8 h-8 text-gray-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stories Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingStories.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Approved ({approvedStories.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <XCircle className="w-4 h-4" />
            Rejected ({rejectedStories.length})
          </TabsTrigger>
          <TabsTrigger value="archived" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            Archived ({archivedStories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingStories.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No pending stories to review</p>
            </div>
          ) : (
            pendingStories.map(story => <StoryCard key={story.id} story={story} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedStories.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No approved stories</p>
            </div>
          ) : (
            approvedStories.map(story => <StoryCard key={story.id} story={story} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedStories.length === 0 ? (
            <div className="text-center py-8">
              <XCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No rejected stories</p>
            </div>
          ) : (
            rejectedStories.map(story => <StoryCard key={story.id} story={story} />)
          )}
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          {archivedStories.length === 0 ? (
            <div className="text-center py-8">
              <Archive className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No archived stories</p>
            </div>
          ) : (
            archivedStories.map(story => <StoryCard key={story.id} story={story} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}