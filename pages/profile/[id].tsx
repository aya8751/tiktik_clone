import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { GoVerified } from 'react-icons/go'
import NoResult from '../../components/NoResult'
import VideoCard from '../../components/VideoCard'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'

interface Iprops {
    data: {
        user: IUser,
        userVideos: Video[],
        userLikedVideos: Video[]
    }
}
const Profile = ({data} : Iprops) => {
    const {user, userVideos, userLikedVideos} = data;
    const [showUserVideos, setShowUserVideos] = useState(true);
    const [videoList, setVideoList] = useState<Video[]>([])
    const video = showUserVideos ? 'border-black border-b-2' : 'text-gray-400';
    const like = !showUserVideos ? 'border-black border-b-2' : 'text-gray-400';
    useEffect(()=>{
        if(showUserVideos){
            setVideoList(userVideos);
        } else{
            setVideoList(userLikedVideos);
        }
    },[showUserVideos, userVideos, userLikedVideos])
  return (
    <div className='w-full'>
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
            <div className="w-16 h-16 md:w-28 md:h-28">
               <Image
               width={128}
               height={128}
               src={user.image}
               className='rounded-full'
               alt='user image'
               layout='responsive'
               />
             </div>
             <div className="flex flex-col justify-center">
              <p className="md:text-2xl tracking-wider flex gap-1 text-md font-bold text-primary lowercase items-center">
                {user.userName.replaceAll(' ','')}
                <GoVerified className='text-blue-400'/>
              </p>
              <p className='capitalize text-gray-400 md:text-xl text-xs'>{user.userName}</p>
             </div>
        </div>
        <div className="flex gap-10 mt-10 mb-10 border-b-2 bg-white border-gray-200 w-full">
            <p className={`text-xl font-semibold cursor-pointer ${video}`}
            onClick={()=>setShowUserVideos(true)}>Videos</p>
            <p className={`text-xl font-semibold cursor-pointer ${like}`}
            onClick={()=>setShowUserVideos(false)}>Liked</p>
        </div>
        <div className="flex gap-6 flex-wrap md:justify-start">
            {videoList.length > 0 ? (
                videoList.map((post:Video, index:number) => (
                    <VideoCard post={post} key={index}/>
                ))
            ) : (
                <NoResult text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}/>
            )}
        </div>
    </div>
  )
}
export const getServerSideProps =async ({params:{id}} : 
    {params:{id: string}}
    ) => {
    const res = await axios.get(`${BASE_URL}/api/profile/${id}`)
    return{
        props : {data: res.data}
    }
}

export default Profile
