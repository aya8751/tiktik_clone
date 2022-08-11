import React from 'react';
import Link from 'next/link';
import { useRouter} from 'next/router';
import {topics} from '../utils/constants'
function Discover() {
  const topicStyle = 'flex items-center justify-center gap-2 cursor-pointer text-black px-3 py-2 rounded hover:bg-primary xl:border-2 xl:border-gray-300 xl:rounded-full';
  const activeTopic = 'flex items-center justify-center gap-2 cursor-pointer text-[#ff1997] px-3 py-2 rounded hover:bg-primary xl:border-2 xl:border-[#f51997] xl:rounded-full';
  //   extract topic from router
    const router = useRouter();
    const {topic} = router.query;
  return (
    <div className='pb-6 xl:border-b-2 xl:border-gray-200'>
        <p className='text-gray-400 font-semibold m-3 mt-4 xl:block hidden'>
            Popular Topics
        </p>
        <div className="flex flex-wrap gap-3">
            {topics.map((item)=>(
                <Link href={`/?topic=${item.name}`} key={item.name}>
                    <div className={topic === item.name ? activeTopic : topicStyle}>
                        <span className='font-bold text-2xl xl:text-md'>
                            {item.icon}
                        </span>
                        <span className='font-medium hidden text-md xl:block capitalize'>
                            {item.name}
                        </span>
                    </div>
                </Link>
           ))}
        </div>
    </div>
  )
}

export default Discover
