export interface Story {
  id: number;
  created_at: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string;
  neighborhood: string | null;
  language: string;
  translator_available: boolean;
  translator_language: string | null;
  is_anonymous: boolean;
  wants_meetup_notifications: boolean;
  contact_method: string | null;
  email: string | null;
  phone: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  approved_at: string | null;
  interested: number;
  likes: number;
  responses: number;
}