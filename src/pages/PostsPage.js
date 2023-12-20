import React, { Component } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import {getPosts} from "../services/PostsService";
import withBackgroundColor from "../utils/withBackgroundColor";
import PostCard from "../components/PostCard";
import SideFilterBar from "../components/SideFilterBar";

class PostsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
            filter: {}
        };
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        try {
            const { filter } = this.state;
            const posts = await getPosts(filter);
            this.setState({ posts, loading: false });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    handleFilter  = (event) => {
        const { name, value } = event.target;
        const { filter } = this.state;
        let changedFilter = {...filter, [name]: value};
        this.setState({ filter: changedFilter, loading: false });
    }


    render() {
        const { posts, loading } = this.state;

        posts.forEach(post => {
            console.log(`Post Title: ${post.title}`);
        });

        const postCategoryArray = posts.map(post => post.category);

        const filteredPosts = posts.filter(post => post.category === 'React');

        const totalCharacters = posts.reduce((acc, post) => acc + post.title.length, 0);

        return (
            <div className="container mt-5 opacity">
                <h2>Posts</h2>
                <hr className="mb-4 mt-2"/>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="container">
                        {loading ? (
                            <LoadingSpinner />
                        ) : (
                            <div className="container">
                                <div className="row align-items-start">
                                    <SideFilterBar
                                        handleFilter={this.handleFilter}
                                        postCategoryArray={postCategoryArray}
                                        filteredPosts={filteredPosts}/>
                                    <div className="col-9">
                                        <div className="d-flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Find..."
                                                name="title_like"
                                                onInput={this.handleFilter}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => this.getPosts()}
                                                className="btn btn-primary">
                                                Find
                                            </button>
                                        </div>
                                        <ul className="list-group">
                                            {posts.length ?
                                                posts.map((post) => <PostCard key={post.id} post={post}/>
                                            ) : <div>No data...</div>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default withBackgroundColor(PostsPage);
