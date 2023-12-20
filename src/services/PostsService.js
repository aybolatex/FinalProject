import axios from 'axios';

const API_URL = 'http://localhost:3004/posts';

export const getPosts = async (params) => {
    try {
        const response = await axios.get(API_URL, {
            params: params
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostById = async (postId) => {
    try {
        const response = await axios.get(`${API_URL}/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post detail:', error);
        throw error;
    }
};

export const createPost = async (formData) => {
    try {
        return await axios.post(API_URL, formData);
    } catch (error) {
        console.error('Error fetching post detail:', error);
        throw error;
    }
};

export const updatePost = async (postId, formData) => {
    try {
        return await axios.put(`${API_URL}/${postId}`, formData);
    } catch (error) {
        console.error('Error fetching post detail:', error);
        throw error;
    }
};


export const deletePost = async (postId) => {
    try {
        const response = await axios.delete(`${API_URL}/${postId}`);
        return response;
    } catch (error) {
        console.error('Error fetching post detail:', error);
        throw error;
    }
};
