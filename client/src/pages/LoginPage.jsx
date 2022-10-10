import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const isAuth = useSelector(checkIsAuth);
  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status) toast(status);
    isAuth && navigate('/');
  }, [status, navigate, isAuth]);

  const handleSubmit = () => {
    try {
      dispatch(loginUser({ username, password }));
      setUserName('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-gray-400">
        Имя пользователя:
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          placeholder="Введите имя"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-gray-400">
        Пароль:
        <input
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-w px-4"
          onClick={handleSubmit}
        >
          Войти
        </button>
        <Link to="/register" className="flex justify-center items-center text-xs text-white">
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
}
