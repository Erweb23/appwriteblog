import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

const PostCard = ({ $id, title, featuredImage }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const result = await appwriteService.getFilePreview(featuredImage);
        setImageUrl(result);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          {imageUrl ? (
            <img src={imageUrl} alt={title} className='rounded-xl' />
          ) : (
            <div className="w-full h-40 bg-gray-300 rounded-xl animate-pulse"></div>
          )}
        </div>
        <h2 className='text-xl font-bold'>{title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
