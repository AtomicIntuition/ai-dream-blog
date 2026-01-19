const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dream-analysis-t3ub.onrender.com';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  category: string;
  tags: string[];
  meta_title?: string;
  meta_description?: string;
  generation_type: string;
  generated_dream?: {
    title: string;
    content: string;
    mood: string;
    tags: string[];
    isLucid: boolean;
    setting: string;
    characters: string[];
    emotionalTone: string;
  };
  dream_analysis?: {
    interpretation: string;
    symbols: Array<{
      name: string;
      meaning: string;
      significance: string;
    }>;
    emotions: Array<{
      name: string;
      intensity: number;
      color: string;
    }>;
    themes: string[];
    advice: string;
  };
  status: string;
  published_at: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  post_count: number;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    next: { revalidate: 60 }, // Revalidate every minute
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();

  if (!json.success || !json.data) {
    throw new Error(json.error || 'Unknown error');
  }

  return json.data;
}

export async function getPosts(page = 1, limit = 12): Promise<{
  posts: BlogPost[];
  pagination: PaginationInfo;
}> {
  return fetchApi(`/api/blog/posts?page=${page}&limit=${limit}`);
}

export async function getPost(slug: string): Promise<{ post: BlogPost }> {
  return fetchApi(`/api/blog/posts/${slug}`);
}

export async function getPostsByCategory(
  category: string,
  page = 1,
  limit = 12
): Promise<{
  posts: BlogPost[];
  pagination: PaginationInfo;
}> {
  return fetchApi(`/api/blog/posts/category/${category}?page=${page}&limit=${limit}`);
}

export async function getFeaturedPosts(limit = 6): Promise<{ posts: BlogPost[] }> {
  return fetchApi(`/api/blog/posts/featured?limit=${limit}`);
}

export async function getRecentPosts(limit = 6): Promise<{ posts: BlogPost[] }> {
  return fetchApi(`/api/blog/posts/recent?limit=${limit}`);
}

export async function getCategories(): Promise<{ categories: BlogCategory[] }> {
  return fetchApi('/api/blog/categories');
}

export async function searchPosts(
  query: string,
  page = 1,
  limit = 12
): Promise<{
  posts: BlogPost[];
  pagination: PaginationInfo;
}> {
  return fetchApi(`/api/blog/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
}
