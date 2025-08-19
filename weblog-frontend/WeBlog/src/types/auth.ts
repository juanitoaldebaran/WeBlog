export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    issuedAt: number;
    updatedAt: number;
}

export interface Subscription {
    id: number;
    subscriptionEmail: string;
    createdAt: number;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    jwtToken: string;
    expiresIn: number;
}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginRequest) => Promise<LoginResponse>;
    register: (credentials: RegisterRequest) => Promise<User>;
    logout: () => void;
    getJwtToken: () => string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface Comment {
  id: number;
  blogId: number;
  authorId: number;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Blog {
    id: number;
    title: string;
    content: string;
    category: 'TECHNOLOGY' | 'HEALTH' | 'FINANCE' | 'TRAVEL' | 'SPORT';
    imageUrl: string;
    description: string;
    commentCount: number;
    createdAt: number;
    views: number;
}