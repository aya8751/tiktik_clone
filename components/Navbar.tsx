import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { BiSearch} from "react-icons/bi";
import { useRouter } from "next/router";
import Logo from "../utils/tiktik-logo.png";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  // const userLogin = false;
  const { userProfile, addUser, removeUser} = useAuthStore();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter(); 
  const handleSearch = (e: {preventDefault: () => void}) =>{
    e.preventDefault();
    // push to different page
    if(searchValue){
      router.push(`/search/${searchValue}`)
    }
  }
  return (
    <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 px-2 w-full">
      <Link href="/">
        <div className="w-[100px] md:w-[130px]">
          <Image
            src={Logo}
            className="cursor-pointer"
            alt="Tiktik Logo"
            layout="responsive"
          />
        </div>
      </Link>
      {/* search start */}
      <div className="bg-white">
      <form onSubmit={handleSearch}
      className="relative">
        <input type="text"
        value={searchValue}
        placeholder="Search account and videos"
        onChange={(e)=>{setSearchValue(e.target.value)}}
        className="bg-primary font-medium border-2 pl-4 border-gray-100 p-3 md:text-md focus:outline-none focus:border-2 focus:border-gray-300 rounded-full md:top-0 w-[230px] md:w-[350px] " />
        <button
        onClick={handleSearch}
        className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400 hidden md:block">
          <BiSearch />
        </button>
      </form>
      </div>
      {/* check if user login or not */}
      <div className="">
        {userProfile ? (
          <div className='flex md:gap-10 gap-5'>
            <Link href='/upload'>
              <button className='flex items-center gap-2 font-semibold text-md border-2 px-2 md:px-4'>
                <MdAdd className="text-xl"/>
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
               <Link href='/'>
                <>
                  <Image 
                  width={40}
                  height={40}
                  className='rounded-full'
                  src={userProfile.image}
                  alt='profile photo'
                  />
                </>
             </Link>
            )}
            <button className='px-2'onClick={()=> {googleLogout(); removeUser();}}>
              <AiOutlineLogout color='#f51997' fontSize={31}/>
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser)      
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
