import React, { useEffect } from 'react';
import { PopularPosts } from '../components/PopularPosts';
import { PostItem } from './../components/PostItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from './../redux/features/post/postSlice';

export default function MainPage() {
  const { posts, popularPosts } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  useEffect(() => {    
    dispatch(getAllPosts());
  }, [dispatch]);

  !posts.length && <div className="text-xl text-center text-white py-10">Постов нет</div>;

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post) => (
            <PostItem post={post} key={post._id} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярное:</div>
          {popularPosts?.map((post, idx) => (
            <PopularPosts post={post} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
