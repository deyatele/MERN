import { Routes, Route, Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import MainPage from './pages/MainPage';
import PostsPage from './pages/PostsPage';
import PostPage from './pages/PostPage';
import AddPostPage from './pages/AddPostPage';
import EditPostPage from './pages/EditPostPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthRoute } from './hook/authRote';
import NoFound from './pages/404';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path=":id" element={<PostPage />} />
      <Route path="nofound" element={<NoFound />} />
      <Route element={<AuthRoute />}>
        <Route path="posts" element={<PostsPage />} />
        <Route path=":id/edit" element={<EditPostPage />} />
        <Route path="new" element={<AddPostPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
