export interface Blog {
    id: number;
    title: string;
    content: string;
    category: 'TECHNOLOGY' | 'HEALTH' | 'FINANCE' | 'TRAVEL' | 'SPORT';
    imageUrl: string;
    description: string;
    commentCount: number;
    createdAt: string;
    views: number;
}

export interface CreateBlogRequest {
    title: string;
    content: string;
    category: 'TECHNOLOGY' | 'HEALTH' | 'FINANCE' | 'TRAVEL' | 'SPORT';
    imageUrl: string;
    description: string;
}