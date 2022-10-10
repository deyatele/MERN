import React from 'react';
import { Link } from 'react-router-dom';

export const PopularPosts = ({post}) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link to={post._id}>
      <div className="flex text-xs text-gray-300 p-2 cursor-pointer hover:bg-gray-800 hover:text-white">
        {post.title}
      </div>
      </Link>
    </div>
  );
};
