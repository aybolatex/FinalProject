import React, { Component } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {createPost, getPostById, updatePost} from "../services/PostsService";
import {Link} from "react-router-dom";
import {Notice} from "../components/Notice";

class CreatePostPage extends Component {
    constructor(props) {
        super(props);
        const postId = this.getPostId();
        this.state = {
            postId: postId ? postId : null,
            loading: true,
            formData: {
                title: '',
                category: '',
                description: '',
                createdAt: '',
                updatedAt: '',
            },
            notice: {}
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

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value,
            },
        }));
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { formData, postId} = this.state;
        if (formData && postId) {
            this.updatePost(postId, formData);
        } else if (formData) {
            this.createNewPost(formData);
        }
    };

    fetchPostDetail = async () => {
        try {
            if (this.state.postId) {
                const post = await getPostById(this.state.postId);
                this.setState({ formData: post, loading: false });
            } else {
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error('Error fetching post detail:', error);
            this.setState({ loading: false });
        }
    };


    createNewPost = async (formData) => {
        try {
            formData.createdAt = new Date().toLocaleString("kk-KZ", { timeZone: "Asia/Almaty" });
            const res = await createPost(formData);
            if (res.status === 201) {
                const savedPost = res.data;
                this.setState({ notice: { status: 'success', message: 'Post created successfully', visible: true } });
                this.setState({ formData: savedPost, loading: false });
            } else {
                this.setState({ notice: { status: 'danger', message: 'Failed to create post', visible: true } });
                this.setState({ loading: false });
            }
        } catch (error) {
            this.setState({ notice: { status: 'danger', message: 'Failed to create post', visible: true } });
            this.setState({ loading: false });
        }
    };

    updatePost = async (postId, formData) => {
        try {
            formData.updatedAt = new Date().toLocaleString("kk-KZ", { timeZone: "Asia/Almaty" });
            const res = await updatePost(postId, formData);
            if (res.status === 200) {
                const savedPost = res.data;
                this.setState({ notice: { status: 'success', message: 'Post updated successfully', visible: true } });
                this.setState({ formData: savedPost, loading: false });
            } else {
                this.setState({ notice: { status: 'danger', message: 'Failed to update post', visible: true } });
                this.setState({ loading: false });
            }
        } catch (error) {
            this.setState({ notice: { status: 'danger', message: 'Failed to update post', visible: true } });
            this.setState({ loading: false });
        }
    };

    getPostId = () => {
        const url = new URL(window.location.href);
        const pathname = url.pathname;
        const pathParts = pathname.split('/');
        const postIndex = pathParts.indexOf('edit');
        return pathParts[postIndex + 1];
    }

    render() {
        const {postId, formData, notice, loading } = this.state;

        return (
            <div className="container mt-5">
                <Notice {...notice} onClose={() => this.setState({ notice: { ...notice, visible: false } })} />
                {!postId ? <h2>Create post</h2> : <h2>Edit post</h2>}
                <hr className="mb-4 mt-2"/>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className='d-flex justify-content-center'>
                        <form onSubmit={this.handleSubmit}
                              className="needs-validation"
                              style={{minWidth: "600px"}}>
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={formData.title}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Sub title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="subTitle"
                                    value={formData.subTitle}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    className="form-control"
                                    name="category"
                                    value={formData.category}
                                    onChange={this.handleInputChange}
                                    required
                                >
                                    <option></option>
                                    <option>UI/UX</option>
                                    <option>React</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="author"
                                    value={formData.author}
                                    onChange={this.handleInputChange}
                                    required
                                />
                                <div className="invalid-feedback">
                                    Please provide a valid state.
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="description"
                                    value={formData.description}
                                    onChange={this.handleInputChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex gap-2 justify-content-end mt-2">
                                <Link to="/manage/posts" type="submit" className="btn btn-secondary mb-2">
                                    Back
                                </Link>
                                <button type="submit" className="btn btn-primary mb-2">
                                    {!postId ? 'Create' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

export default CreatePostPage;
