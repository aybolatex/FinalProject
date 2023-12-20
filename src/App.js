import './App.css';
import './assets/styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import ManagePage from "./pages/ManagePage";
import CreatePostPage from "./pages/CreatePostPage";
import {DynamicContextProvider} from "./utils/DynamicContextProvider";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";

function App() {
    return (
        <DynamicContextProvider>
            <Router>
                <Header/>
                <div style={{marginBottom: "100px"}}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/posts" element={<PostsPage />} />
                        <Route path="/post/:postId" element={<PostDetailPage />} />
                        <Route path="/manage/posts" element={<ManagePage />} />
                        <Route path="/manage/posts/create" element={<CreatePostPage />} />
                        <Route path="/manage/posts/edit/:postId" element={<CreatePostPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        {/*<Route path="/about" element={<About />} />*/}
                    </Routes>
                </div>
                <Footer />
            </Router>
        </DynamicContextProvider>
    );
}

export default App;
