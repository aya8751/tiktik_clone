import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md';
import useAuthStore from '../store/authStore';

// to define function and what return
interface IProp {
  handlelike: () => void;
  handleDislike: () => void;
  likes: any[];
}

const LikeButton = ({handleDislike, handlelike, likes}: IProp) => {
    const [liked, setIsLiked] = useState(false);
    const {userProfile}: any = useAuthStore(); 
    // check if likes array contain like from certain user
    const filterLikes = likes?.filter(item => item._ref === userProfile?._id )
    // console.log("xx",filterLikes);
    // called whenever likes array change
    useEffect(()=>{
      if(filterLikes.length > 0 ){
        setIsLiked(true);
      }else {
        setIsLiked(false);
      }
    },[filterLikes, likes])

  return (
    <div className='flex'>
      <div className="flex justify-center items-center cursor-pointer mt-4 flex-col">
        {liked ? (
            <div className="bg-primary rounded-full p-2 md:p-4 text-[#f51997]" onClick={handleDislike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
        ) : (
            <div className="bg-primary rounded-full p-2 md:p-4" onClick={handlelike}>
                <MdFavorite className='text-lg md:text-2xl'/>
            </div>
        )}
        <p className='text-md font-semibold'>{likes?.length || 0}</p>
      </div>
    </div>
  )
}

export default LikeButton
