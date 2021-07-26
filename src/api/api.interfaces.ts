export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserApiResponse {
  user: {
    id: number;
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}

export interface UserUpdateRequest {
  token: string;
  email?: string;
  username?: string;
  bio?: string;
  image?: string;
}

export interface UserUpdateResponse {
  user: {
    id: number;
    username: string;
    email: string;
    bio: string;
    image: string;
  };
}

export interface ArticleCredentials {
  title: string;
  description: string;
  slug?: string;
  body: string;
  tagList: string[];
}

export interface ArticleApiResponse {
  title: string;
  description: string;
  slug: string;
  body: string;
  taglist: string[];
  comments: string[];
  id: number;
  created: number;
  updated: number;
  favoriteCount: number;
}
