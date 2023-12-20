import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HeaderStyle.css'

const PostCard = ({post}) => {
    return (
        <li className="list-group-item">
            <div className="row">
                <div>
                    <div className="d-flex justify-content-between">
                        <div>
                            <h3>{post.title}</h3>
                            <span className="font-italic">{post.category}</span>
                        </div>
                        <div>
                            <span className="font-italic">{!!post.alreadyRead ? 'Already read' : ''}</span>
                        </div>
                    </div>
                    <p>{post.subTitle}</p>
                    <Link to={`/post/${post.id}`} className="btn btn-primary">
                        Read More
                    </Link>
                </div>
            </div>
        </li>
    );
};

export default PostCard;
