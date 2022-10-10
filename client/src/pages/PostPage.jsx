import React, { useCallback, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import axios from '../utils/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removePost } from './../redux/features/post/postSlice';
import { toast } from 'react-toastify';
import Loader from '../components/loader/Loader';


export default function PostPage() {
  const [post, setPost] = useState();
  const { user } = useSelector((state) => state.auth);

  const params = useParams();

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await axios.get(`/post/${params.id}`);
      setPost(data);
    } catch (error) {
      navigate('/nofound');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removePostHandler = async () => {
    try {
      dispatch(removePost(params.id));
      toast('Пост удален');
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (!post) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Назад
        </button>
      </div>

      <div className="flex justify-center py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div className={post?.imgUrl ? 'flex rounded-sm' : 'flex rounded-sm'}>
              {post?.imgUrl && (
                <img src={`http://localhost:3001/${post.imgUrl}`} alt="pictures" className="object-cover w-full" />
              )}
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} local="ru" format="D MMMM YYYY" />
            </div>
          </div>
          <div className="text-xl text-white">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <Link to={`edit`}>
                  <button className="flex items-center justify-center gap-2 text-white opacity-50">
                    <AiTwotoneEdit />
                  </button>
                </Link>
                <button
                  onClick={removePostHandler}
                  className="flex items-center justify-center gap-2 text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
