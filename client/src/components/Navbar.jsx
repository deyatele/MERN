import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
export default function Navbar() {
  const isAuth = useSelector(checkIsAuth);
  const dispath = useDispatch();

  const activeStyle = ({ isActive }) => (isActive ? { color: 'white' } : undefined);

  const logoutHandler = () => {
    dispath(logout());
    window.localStorage.removeItem('token');
    toast('Вы вышли');
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to="/">
        <span className="flex justify-center items-center bg-gray-600 text-white rounded-sm px-4 py-2 cursor-pointer uppercase">
          Мой блог
        </span>
      </Link>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink to={'/'} end className=" text-gray-400 hover:text-white" style={activeStyle}>
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink to={'/posts'} style={activeStyle} className=" text-gray-400 hover:text-white">
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink to={'/new'} style={activeStyle} className="text-gray-400 hover:text-white">
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-white rounded-sm px-4 py-2 cursor-pointer">
        {isAuth ? <button onClick={logoutHandler}>Выйти</button> : <Link to={'/login'}>Войти</Link>}
      </div>
    </div>
  );
}
