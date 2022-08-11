import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { GoVerified } from 'react-icons/go'
import NoResult from '../../components/NoResult'
import VideoCard from '../../components/VideoCard'
import useAuthStore from '../../store/authStore'
import { IUser, Video } from '../../types'
import { BASE_URL } from '../../utils'
// responsable for fetch all video and account that match search value
const search = ({videos}: {videos: Video[]}) => {
    const [isAccounts, setIsAccounts] = useState<boolean>(false);
    const {allUsers} = useAuthStore();
    const router = useRouter();
    const {searchValue}:any = router.query;
    const account = isAccounts ? 'border-black border-b-2' : 'text-gray-400';
    const video = !isAccounts ? 'border-black border-b-2' : 'text-gray-400';
    const searchedAccounts = allUsers.filter((user: IUser) => user.userName.toLowerCase().includes(searchValue.toLowerCase()))
  return(
    <div className="w-full">
         <div className="flex gap-10 mt-10 mb-10 border-b-2 bg-white border-gray-200 w-full">
            <p className={`text-xl font-semibold cursor-pointer ${account}`}
            onClick={()=>setIsAccounts(true)}>Accounts</p>
            <p className={`text-xl font-semibold cursor-pointer ${video}`}
            onClick={()=>setIsAccounts(false)}>Videos</p>
        </div>
        {isAccounts ? (
            <div className="md:mt-10">
                {searchedAccounts.length ? (
                    searchedAccounts.map((user:IUser, index: number) => (
                        <Link href={`/profile/${user._id}`} key={index}>
                        <div className="flex cursor-pointer font-semibold rounded border-b-2 border-gray-200 gap-3 my-4">
                            <div className="">
                                <Image
                                width={50}
                                height={50}
                                src={user.image}
                                className='rounded-full'
                                alt='user image'
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
                    ))
                ) : (
                    <NoResult text={`No account result for ${searchValue}`}/>
                )}
            </div>
        ) : (
            <div className="flex flex-wrap gap-6 md:mt-10 md:justify-start">
                {videos.length ? (
                    videos.map((video:Video, index: number) => (
                        <VideoCard post={video} key={index}/>
                    ))
                ) : (
                    <NoResult text={`No video result for ${searchValue}`}/>
                )}

            </div>
        )}
    </div>
  )
}
export const getServerSideProps =async ({params:{searchValue}} : 
    {params:{searchValue: string}}
    ) => {
    const res = await axios.get(`${BASE_URL}/api/search/${searchValue}`)
    return{
        props : {videos: res.data}
    }
}

export default search

