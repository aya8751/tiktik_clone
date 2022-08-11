import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react'
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import NoResult from './NoResult';

interface IProp{
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}
interface IComment {
  comment: string;
  lenght?: number;
  _key: string;
  postedBy: {
    _ref:string;
    _id:string;
  };
}
const Comments = ({isPostingComment, comments, addComment, setComment, comment} : IProp) => {
  const {userProfile, allUsers} = useAuthStore();
  // console.log(comments)
  return (
    <>
    <div className='border-t-2 relative border-gray-200 pt-4 px-10 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className="overflow-scroll lg:h-[363px]">
        {/* can't read proberty of null so add ? */}
        {comments?.length ? (
          comments.map((item, index)=>(
            <>
            {allUsers.map((user: IUser)=>(
              user._id === (item.postedBy._id || item.postedBy._ref) && (
                <div className="p-2 items-center" key={index}>
                  <Link href={`/profile/${user._id}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8">
                      <Image
                        width={34}
                        height={34}
                        src={user.image}
                        className='rounded-full'
                        alt='user image'
                        layout='responsive'
                        />
                      </div>
                      <div className="hidden xl:block">
                        <p className="flex gap-1 text-md font-bold text-primary lowercase items-center">
                          {user.userName.replaceAll(' ','')}
                          <GoVerified className='text-blue-400'/>
                        </p>
                        <p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
                      </div>
                    </div>
                  </Link>
                  <div className='mt-2'>
                    <p className="text-md font-normal text-primary">{item.comment}</p>
                  </div>
                </div>
              )
            ))}
            </>
          ))
          // <div className="">videos</div>
        ) : (
          <NoResult text='No comments yet'/>
        )}
      </div>
    </div>
    {
        userProfile && (
          <div className="m-4">
            <form onSubmit={addComment} className="flex gap-4">
              <input onChange={(e)=>{setComment(e.target.value)}}
              value={comment} 
              placeholder="Add comment ..."
              className="bg-primary px-6 py-4 text-md font-medium border-2 border-gray-100  focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg lg:w-[350px] md:w-[700px] w-[250px]"/>
              <button 
              onClick={addComment}
              className="text-md text-gray-400">{isPostingComment ? "Commenting" : "Comment"}</button>
            </form>
          </div>
        )
      }
    </>
  )
}

export default Comments