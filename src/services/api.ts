import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const api = axios.create({
    baseURL: API_URL,
});

export interface Blog {
    id: string;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type NewBlog = Omit<Blog, 'id'>;

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await api.get('/blogs');
    return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
};

export const createBlog = async (blog: NewBlog): Promise<Blog> => {
    const response = await api.post('/blogs', blog);
    return response.data;
};
