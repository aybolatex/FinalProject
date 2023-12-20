import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HeaderStyle.css'
import {DynamicContext} from "../utils/DynamicContextProvider";

const Header = () => {
    const { theme, toggleTheme } = useContext(DynamicContext);


    return (
        <nav className={`navbar navbar-expand-lg navbar-${theme} header-bg bg-${theme}`}>
            <div className="container">
                <Link to="/" className="navbar-brand">
                    IT Blog
                </Link>
                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse"
                        data-target="#navbars" aria-controls="navbars" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbars">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/posts" className="nav-link">
                                Posts
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                               data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Manage
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to="/manage/posts" className="dropdown-item">
                                    Manage posts
                                </Link>

                                <Link to="/manage/posts/create" className="dropdown-item">
                                    Create post
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/faq" className="nav-link">
                                FAQ
                            </Link>
                        </li>
                    </ul>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={toggleTheme}  type="button" className={`btn btn-dark`}>Dark</button>
                        <button onClick={toggleTheme}  type="button" className={`btn btn-light`}>Light</button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
