import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../components/loader/Loader';
import { PostItem } from './../components/PostItem';
import { getAllPosts } from './../redux/features/post/postSlice';


export default function PostsPage() {
  const [postsUser,setPostsUser] = useState(null)
  const { posts, loading } = useSelector((data) => {
    return data.post;
  });
  
  const { user,isLoading } = useSelector((data) => {
    return data.auth;
  });

  const dispatch = useDispatch();

  useEffect(() => { 
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(()=>{  
    if(posts?.length && user){
      setPostsUser(posts?.filter((post) => user.posts.includes(post._id)))
    }

  },[posts, user])  

  if(loading || isLoading) return <Loader/>
 
  if (!postsUser)
    return <div className="flex justify-center my-10 text-xl text-white"> Постов нет</div>; 

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10">
      {postsUser.map((post, indx) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </div>
  );
}
