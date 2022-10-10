import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NoFound() {
  const navigate = useNavigate();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate('/', { replace: true });
      return clearTimeout(timeOut)
    },5000);
  });
  return (
    <div className="m-auto">
      <div className="text-6xl text-center mt-48 uppercase font-bold text-white">404</div>
      <h1 className="text-5xl text-center mt-8 uppercase font-bold text-white">Страница не найдена!</h1>

      <h2 className="mt-16 text-3xl text-center uppercase font-bold text-white">
        Перейдите на{' '}
        <Link to={'/'} className="text-blue-600">
          главную
        </Link>
      </h2>
    </div>
  );
}


