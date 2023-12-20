import React, { Component } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {getPostById, updatePost} from "../services/PostsService";
import {Link} from "react-router-dom";
import '../assets/styles/PostDetailStyle.css'

class PostDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            loading: true,
            params: null
        };
    }

    componentDidMount() {
        this.fetchPostDetail();
    }

    componentDidUpdate(prevProps) {
    }

    componentWillUnmount() {
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error in PostDetailPage component:', error);
    }

    fetchPostDetail = async () => {
        try {
            const postId = this.getPostId();
            const post = await getPostById(postId);
            this.setState({ post, loading: false });
        } catch (error) {
            console.error('Error fetching post detail:', error);
            this.setState({ loading: false });
        }
    };

    getPostId = () => {
        const url = new URL(window.location.href);
        const pathname = url.pathname;
        const pathParts = pathname.split('/');
        const postIndex = pathParts.indexOf('post');
        return pathParts[postIndex + 1];
    }

    markAsRead = async () => {
        let { post } = this.state;
        post.alreadyRead = true;
        const {data: updatedPost} = await updatePost(post.id, post);
        console.log('updatedPost', updatedPost)
        this.setState({ post: updatedPost });
    }

    render() {
        const { post, loading } = this.state;

        return (
            <div className="container post-detail">
                {loading ? (
                    <LoadingSpinner />
                ) : post ? (
                    <>
                        <h2 id="post-title">{post.title}</h2>
                        <hr className="mb-4 mt-2"/>
                        <div>
                            <h2 className="post-detail-title">{post.subTitle}</h2>
                            <span className="post-title">Author: {post.author}</span> <br/>
                            <span className="font-italic">Category: {post.category}</span> <br/>
                            <span className="post-title">{post.alreadyRead ? 'Already read' : ''}</span>
                            <p>{post.description}</p>
                            <div className="d-flex gap-2">
                                <Link to="/posts" className="btn back-button btn-primary">
                                    Back to Home
                                </Link>
                                <button
                                    disabled={post.alreadyRead}
                                    onClick={() => this.markAsRead()}
                                    className="btn back-button btn-primary">
                                    Mark as read
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p>No data found for this post.</p>
                )}
            </div>
        );
    }
}

export default PostDetailPage;
