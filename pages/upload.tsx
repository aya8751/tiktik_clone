import { SanityAssetDocument } from '@sanity/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import {FaCloudUploadAlt} from 'react-icons/fa'
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import { client } from '../utils/client';
import { topics } from '../utils/constants';
const upload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongType, setWrongType] = useState<boolean | undefined>(false);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState(topics[0].name);
  const [stateSavePost, setStateSavePost] = useState(false);
  const {userProfile}: {userProfile: any} = useAuthStore();
  const router = useRouter();
  const uploadVedio = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileType = ['video/mp4', 'video/webm', 'video/ogg'];
    // check if user choose file in right format or not 
    if(fileType.includes(selectedFile.type)){
        client.assets.upload('file', selectedFile, {
            contentType: selectedFile.type,
            filename: selectedFile.name
        }).then((data)=>{
            setVideoAsset(data);
            setIsLoading(false);
        })
    }else{
        setIsLoading(false);
        setWrongType(true);
    }
  }
  const handlePost = async () =>{
    if(caption && videoAsset?._id && category){
        setStateSavePost(true);
        const document = {
            _type: 'post',
            caption,
            video: {
                _type: 'file',
                asset: {
                    _type: 'reference',
                    _ref: videoAsset?._id
                }
            }, 
            userId: userProfile?._id,
            postedBy: {
                _type: 'postedBy',
                _ref: userProfile?._id
            },
            topic: category
        }
        await axios.post(`${BASE_URL}/api/post`,document);
        router.push('/');
    }
  }
  return (
    <div className='flex w-full h-full absolute left-0 top-[60px] bg-[#f8f8f8] justify-center mb-10 pt-10 lg:pt-20'>
        <div className="bg-white rounded-lg flex gap-6 flex-wrap justify-between items-center xl:h-[80vh] p-14 pt-6 lg:w-[60%]">
            <div>
            <div className="">
                <p className='text-2xl font-bold'>Upload</p>
                <p className='text-md text-gray-400 mt-1'>Post a video to your account</p>
            </div>
            <div className="border-dashed border-4 border-gray-200 rounded-xl flex flex-col justify-center items-center mt-10 p-10 w-[260px] h-[460px] hover:border-red-300 hover:bg-gray-100">
            {isLoading ? (
                <p>Uplaoding</p>
            ) : (
                <div>
                    {videoAsset ? (
                    <div className="flex items-center justify-center">
                        <video 
                        src={videoAsset.url}
                        loop
                        controls
                        className='bg-black rounded-xl h-[400px]'
                        ></video>
                    </div>) : (
                        <label className='cursor-pointer'>
                            <div className="flex flex-col items-center justify-center h-full">
                                {/* <div className="flex flex-col items-center justify-center"> */}
                                    <p className='font-bold text-6xl'><FaCloudUploadAlt className='text-gray-300 text-6xl'/></p>
                                    <p className='font-semibold'>Upload Video</p>
                                    <p className='mt-10 text-sm text-gray-400 leading-8 text-center'>
                                        MP4 or WebM or ogg <br />
                                        720x1280 or higher <br />
                                        Up to 10 minutes <br />
                                        Less than 2GB
                                    </p>
                                    <p className='bg-[#f51997] text-center mt-10 text-white text-md font-medium w-52 outline-none rounded p-2'>Select File</p>
                                {/* </div> */}
                            </div>
                            <input type="file" name="uplaod-video" className='w-0 h-0' onChange={uploadVedio}/>
                        </label>
                    )}
                </div>
            )}
            {
                wrongType && (
                    <p className="text-red-400 font-semibold mt-4 text-center text-xl w-[250px]">Please select a video file</p>
                )
            }
            </div>
            </div>
            <div className="flex flex-col gap-3 pb-10">
                <label className='text-md font-medium'>Caption</label>
                <input type="text" value={caption} onChange={(e)=>{setCaption(e.target.value)}} className="rounded outline-none text-md p-2 border-gray-200 border-2"/>
                <label className='text-md font-medium'>Choose a Category</label>
                <select className='rounded outline-none text-md p-2 border-gray-200 border-2 capitalize cursor-pointer' onChange={(e)=>{setCategory(e.target.value)}}>
                    {topics.map((topic)=>(
                        <option
                        key={topic.name}
                        value={topic.name}
                        className='capitalize text-gray-700 text-md p-2 hover:bg-slate-300'>
                            {topic.name}
                        </option>
                    ))}
                </select>
                <div className="flex gap-6 mt-10">
                    <button className='outline-none w-28 lg:w-44 rounded p-2 text-md font-medium border-2 border-gray-300'
                    onClick={()=>{}}>Discard</button>
                    <button className='outline-none w-28 lg:w-44 rounded p-2 text-md font-medium border-2 border-gray-300 bg-[#f51997] text-white'
                    onClick={handlePost}>Post</button>

                </div>
            </div>
        </div>
    </div>
  )
}

export default upload