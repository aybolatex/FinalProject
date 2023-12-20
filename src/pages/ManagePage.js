import React, { Component } from 'react';
import {deletePost, getPosts} from "../services/PostsService";
import {Link} from "react-router-dom";
import {Notice} from "../components/Notice";

class ManagePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            notice: {}
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        try {
            const params = {}
            const posts = await getPosts(params);
            this.setState({ posts, loading: false });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    onDelete = async (postId) => {
        try {
            const response = await deletePost(postId);
            if (response) {
                this.setState({ notice: { status: 'success', message: 'Post deleted successfully', visible: true } });
                const posts = await getPosts();
                this.setState({posts, loading: false });
            } else {
                this.setState({ loading: false });
                this.setState({ notice: { status: 'danger', message: 'Failed to delete post', visible: true } });
            }
        } catch (error) {
            this.setState({ loading: false });
            this.setState({ notice: { status: 'danger', message: 'An error occurred while deleting post', visible: true } });
        }
    }

    render() {
        const { posts, notice } = this.state;
        return (
            <div className="container mt-5">
                <Notice {...notice} onClose={() => this.setState({ notice: { ...notice, visible: false } })} />
                <h2>Manage posts</h2>
                <hr className="mb-4 mt-2"/>
                <div className="d-flex justify-content-end">
                    <Link type="button"
                          className="btn btn-primary mb-2"
                          to="/manage/posts/create">Create</Link>
                </div>
                <table className="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id}>
                            <th width="50px" scope="row">{index + 1}</th>
                            <td width="100px">{post.id}</td>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.category}</td>
                            <td width="230px">{post.createdAt}</td>
                            <td width="100px">
                                <div className="btn-group btn-group-sm" role="group" aria-label="...">
                                    <Link to={`/manage/posts/edit/${post.id}`} type="button" className="btn btn-outline-dark">Edit</Link>
                                    <button type="button" className="btn btn-danger" onClick={() => this.onDelete(post.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ManagePage;
