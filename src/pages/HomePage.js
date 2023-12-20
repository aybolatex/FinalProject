import React, { Component } from 'react';
import {getPosts} from "../services/PostsService";
import {Link} from "react-router-dom";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            alreadyReadPosts: []
        };
    }

    getPosts = async () => {
        try {
            const { filter } = this.state;
            const posts = await getPosts(filter);
            const alreadyReadPosts = posts.filter(item => item.alreadyRead === true)
            this.setState({ posts, alreadyReadPosts, loading: false });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    componentDidMount() {
        this.getPosts();
    }

    render() {
        const {posts, alreadyReadPosts} = this.state;
        return (
            <div>
                <div className="header-content">
                    <div className="container">
                        <h1 className="display-3">The best articles of our IT Blog</h1>
                        <p style={{maxWidth: '800px'}}>
                            Welcome to the world of IT technologies! On our blog, you'll find valuable articles, tips, and news
                            to dive deeper into the realm of development and technologies. Use it as a starting point to
                            create something truly unique.
                        </p>
                        <Link className="btn btn-primary btn-lg" to="/posts">Learn more »</Link>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row mt-4">
                        <div className="col-sm-2">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Total posts</h5>
                                    <p className="card-text" style={{fontSize: '100px'}}>{posts.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Already read</h5>
                                    <p className="card-text" style={{fontSize: '100px'}}>{alreadyReadPosts.length}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="card">
                                <div className="card-header">
                                    Quote
                                </div>
                                <div className="card-body">
                                    <blockquote className="blockquote mb-0">
                                        <p>Your time is limited, don't waste it living someone else's life. Don't be trapped by dogma, which is living the result of other people's thinking. Don't let the noise of others' opinions drown your own inner voice. And most important, have the courage to follow your heart and intuition, they somehow already know what you truly want to become. Everything else is secondary.</p>
                                        <footer className="blockquote-footer">Steve Jobs <cite title="Source Title">Co-founder of Apple Inc.</cite></footer>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
