import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from './../redux/features/post/postSlice';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

export default function EditPostPage() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/post/${params.id}`);
    setTitle(data.title);
    setText(data.text);
    setImage(data.imgUrl);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = async () => {
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      data.append('image', image);
      data.append('id', params.id);      
      await dispatch(updatePost(data));
      toast('Пост был изменен')
      navigate('/'+params.id);
    } catch (e) {
      console.log(e);
    }
  };  

  return (
    <form className="w-1/3 mx-auto py-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение:
        <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <div className="flex object-cover py-2">
        {image &&
          (typeof image === 'string' ? (
            <img src={`http://localhost:3001/${image}`} alt="pictures" className="object-cover w-full" />
          ) : (
            <img src={URL.createObjectURL(image)} alt="image1" />
          ))}
      </div>
      <label htmlFor="" className="text-xs text-white opacity-70">
        Заголовок поста:
        <input
          type="text"
          placeholder="Введите заголовок"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>
      <label htmlFor="" className="text-xs text-white opacity-70">
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
          onClick={submitHandler}
        >
          Изменить
        </button>
        <button
          onClick={()=>navigate(-1)}
          className="flex items-center justify-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
}
