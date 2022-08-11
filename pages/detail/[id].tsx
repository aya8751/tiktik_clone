import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, {useState, useEffect, useRef} from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import { HiVolumeUp } from 'react-icons/hi'
import { IoMdVolumeOff } from 'react-icons/io'
import { MdOutlineCancel } from 'react-icons/md'
import { Video } from '../../types'
import { BASE_URL } from '../../utils'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

// type of postDetails
interface IProp{
  postDetails: Video
}
const Detail = ({postDetails}: IProp) => {
  // to update any thing in postDetails
  const [videoDetail, setVideoDetail] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const {userProfile} : any = useAuthStore();
  const [comment, setComment] = useState('');
  const [postingComment, setPostingComment] = useState(false);
  const onVideoPress = () =>{
    if(playing){
      videoRef?.current?.pause();
      setPlaying(false);
    }else{
      videoRef?.current?.play();
      setPlaying(true);
    }
  }
  useEffect(()=>{
    if(videoDetail && videoRef?.current){
      videoRef.current.muted = isVideoMuted;
    }
  },[videoDetail, isVideoMuted]);

  // pass to likeBtn
  const handleLike =async (like:boolean) => {
    //if have a user =  trigger like btn
    if(userProfile){ 
      // put req to update like of post
      //endpoint
      const {data} = await axios.put(`${BASE_URL}/api/like`,{
        // things needed for update
        userId: userProfile._id,
        postId: videoDetail._id,
        like
      })
      setVideoDetail({ ...videoDetail, likes: data.likes});
    }
  }
  const addComment =async (e) => {
    e.preventDefault();
    if(userProfile && comment){
      setPostingComment(true);
      const {data} = await axios.put(`${BASE_URL}/api/post/${videoDetail._id}`,{
        userId: userProfile._id,
        comment
      });
      // update video details
      setVideoDetail({ ...videoDetail, comments: data.comments});
      setComment(''); //clear inp field
      setPostingComment(false); //to not post anymore
    }
  }
  console.log("comm",videoDetail)
  // must by in last 
  if(!videoDetail) return null;

  return (
    <div className='flex w-full bg-white flex-wrap lg:flex-nowrap absolute left-0 top-0'>
      <div className="relative w-[1000px] lg:w-9/12 bg-black flex items-center justify-center flex-2">
        <div className="absolute top-4 left-2 lg:left-6 lg:top-6 z-50">
          <p className='cursor-pointer' onClick={()=>{router.back()}}>
            <MdOutlineCancel className='text-white text-[35px]'/>
          </p>
        </div>
        <div className="lg:h-[100vh] h-[60vh] relative">
          <video 
          src={videoDetail.video.asset.url}
          ref={videoRef}
          loop
          onClick={onVideoPress}
          className='h-full cursor-pointer'
          >
          </video>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!playing && (
              <button onClick={onVideoPress}><BsFillPlayFill className='text-white text-6xl lg:text-8xl'/></button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
        {
          isVideoMuted ? (
          <button onClick={()=>{setIsVideoMuted(false); 
          }}><IoMdVolumeOff  className='text-white text-4xl lg:text-4xl' /></button>) : (
          <button onClick={()=>{setIsVideoMuted(true)
          }}><HiVolumeUp className='text-white text-4xl lg:text-4xl' /></button>)
        }
        </div>
      </div>
      <div className="lg:w-[700px] md:w-[900px] w-[1000px] relative">
        <div className="lg:mt-20 mt-10">
          {/* userName and image start here */}
          <div className="flex gap-3 p-2 rounded font-semibold">
            <div className="md:w-20 md:h-20 w-16 h-16 ml-4">
              <Link href='/'>
                <>
                  <Image 
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={videoDetail.postedBy.image}
                  alt='profile photo'
                  layout='responsive'
                  />
                </>
              </Link>
            </div>
            <div className="">
              <Link href='/'>
                <div className="flex flex-col mt-1 gap-1">
                  <p className='flex items-center gap-2 md:text-md font-bold text-primary'>{videoDetail.postedBy.userName}<GoVerified className='text-blue-400 text-md' /></p>
                  <p className='capitalize hidden md:block font-medium text-xs text-gray-400'>{videoDetail.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div>
          <p className='px-10 text-lg py-4 text-gray-600'>{videoDetail.caption}</p>
          <div className="mt-5 px-10">
            {
              userProfile && (
                <LikeButton 
                likes={videoDetail.likes}
                handlelike = {()=> handleLike(true)}
                handleDislike= {()=> handleLike(false)}
                
                />
              )
            }
          </div>
          <Comments
          comment={comment}
          setComment={setComment}
          addComment={addComment} 
          isPostingComment ={postingComment}
          comments={videoDetail.comments}
          />
        </div>
      </div>
    </div>
  )
}
// This gets called on every request
export  const getServerSideProps = async ({
    params: {id}
} : {params: {id: string}}) => {
    // Fetch data from external API
    const {data} = await axios.get(`${BASE_URL}/api/post/${id}`)
  
    // Pass data to the page via props
    return {
      props: {postDetails: data }
    }
  }

export default Detail
// function useEffect(arg0: () => void, arg1: (boolean | Video)[]) {
//   throw new Error('Function not implemented.')
// }

