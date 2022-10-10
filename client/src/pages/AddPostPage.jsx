import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from './../redux/features/post/postSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      dispatch(createPost(data));
      toast('Пост добавлен');
      navigate('/posts');
    } catch (e) {
      toast('Ошибка добавления поста');
      console.log(e);
    }
  };
  const clearForm = () => {
    setTitle('');
    setText('');
    setImage('');
    navigate('/');
  };

  return (
    <form className="w-1/3 mx-auto py-10">
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение:
        <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt="image1" />}
      </div>
      <label className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          placeholder="Введите заголовок"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label className="text-xs text-white opacity-70">
        Текст поста:
        <textarea
          placeholder="Введите текст поста"
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="resize-none h-40 mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          className="flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
          onClick={(e) => submitHandler(e)}
        >
          Добавить
        </button>
        <button
          onClick={clearForm}
          className="flex items-center justify-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
}
