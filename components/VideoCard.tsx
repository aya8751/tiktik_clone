import React, { useEffect, useRef, useState } from 'react';
import { Video } from '../types';
import Image from 'next/image';
import Link from 'next/link';
import {HiVolumeUp} from 'react-icons/hi';
import {IoMdVolumeOff} from 'react-icons/io';
import {BsFillPlayFill, BsFillPauseFill, BsPlay} from 'react-icons/bs';
import {GoVerified} from 'react-icons/go';

interface IProp {
    post: Video;
}
const VideoCard = ({post} : IProp) => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () =>{
    if(isPlaying){
      videoRef?.current?.pause();
      setIsPlaying(false);
    }else{
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  }
  useEffect(()=>{
    if(videoRef?.current){
      videoRef.current.muted = isVideoMuted;
    }
  },[isVideoMuted])
  // const onVideoMuted = () =>{
  //   if(isVideoMuted){
  //     videoRef?.current?.muted();
  //     setIsVideoMuted(false);
  //   }else{
      
  // }

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
    <div className="">
      <div className="flex gap-3 p-2 rounded font-semibold">
        <div className="md:w-16 md:h-16 w-10 h-10">
          <Link href={`/profile/${post.postedBy._id}`}>
            <>
              <Image 
              width={62}
              height={62}
              className='rounded-full'
              src={post.postedBy.image}
              alt='profile photo'
              layout='responsive'
              />
            </>
          </Link>
        </div>
        <div className="">
          <Link href={`/profile/${post.postedBy._id}`}>
            <div className="flex items-center gap-2">
              <p className='flex items-center gap-2 md:text-md font-bold text-primary'>{post.postedBy.userName}<GoVerified className='text-blue-400 text-md' /></p>
              <p className='capitalize hidden md:block font-medium text-xs text-gray-500'>{post.postedBy.userName}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
    <div className="relative">
      <div className="rounded-3xl"
      onMouseEnter={()=>{setIsHover(true)}}
      onMouseLeave={()=>{setIsHover(false)}}
      >
        <Link href={`/detail/${post._id}`}>
        <video 
        ref={videoRef}
        src={post.video.asset.url}
        loop
        className='cursor-pointer bg-gray-100
        lg:h-[530px] lg:w-[700px] md:h-[400px] w-[200px] h-[300px] rounded-2xl lg:ml-20'
        ></video>
        </Link>

        {isHover && (
          <div className="flex gap-10 justify-center absolute cursor-pointer bottom-6 lg:left-20">
            {
            isPlaying ?
            (
            <button onClick={onVideoPress}><BsFillPauseFill className='text-black text-2xl lg:text-4xl'/></button>):
            (<button onClick={onVideoPress}><BsFillPlayFill
            className='text-black text-2xl lg:text-4xl'/></button>)}
            {
            isVideoMuted ? (<button onClick={()=>{setIsVideoMuted(false); 
            }}><IoMdVolumeOff  className='text-black text-2xl lg:text-4xl' /></button>):(
            <button onClick={()=>{setIsVideoMuted(true)
            }}><HiVolumeUp className='text-black text-2xl lg:text-4xl' /></button>)
            }
          </div>
        )}
      </div>
    </div>
  </div>
  )
}

export default VideoCard