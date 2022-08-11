import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore'
import {IUser} from '../types'
function SuggestAccounts() {
  const {fetchAllUser, allUsers} = useAuthStore();

  useEffect(()=>{
    fetchAllUser();
  },[fetchAllUser])

  return (
    <div className='pb-4 xl:border-b-2 border-gray-200'>
      <p className="text-gray-500 font-semibold hidden xl:block m-3 mt-4">Suggested Accounts</p>
      <div className="">
      {allUsers.slice(0, 6).map((user: IUser)=>(
           <Link href={`/profile/${user._id}`} key={user._id}>
           <div className="flex gap-3 cursor-pointer p-2 font-semibold items-center rounded hover:bg-primary ">
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
      ))}
      </div>
    </div>
  )
}

export default SuggestAccounts
{/* <Link href={`/profile/${user._id}`} key={user._id}>
<div className="flex gap-3 cursor-pointer p-2 font-semibold rounded hover:bg-primary">
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
</div>
</Link> */}