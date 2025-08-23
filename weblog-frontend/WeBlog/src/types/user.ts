export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    issuedAt: string;
    updatedAt: string;
}

export interface UserStats {
    totalBlog: number;
    totalComment: number;
    totalView: number;
}