import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import {GoogleLogin} from 'react-google-login';
import { useRouter } from 'next/router';
import {AiOutlineMenu, AiFillHome} from 'react-icons/ai';
import {MdOutlineCancel} from 'react-icons/md';
import SuggestAccounts from './SuggestAccounts';
import Footer from './Footer';
import Discover from "./Discover";
const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const normalLink = 'flex items-center justify-center xl:justify-start gap-3 cursor-pointer font-semibold text-[#f51997] hover:bg-primary rounded p-3';
  const userLogin = false;
  return (
    <div>
        <div className="block xl:hidden m-2 mt-3 text-xl flex items-center justify-center" onClick={() => {setShowSidebar((prevs)=> !prevs)}}>
            {showSidebar ? <MdOutlineCancel /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
            <div className="w-20 xl:w-400 flex flex-col justify-start mb-10 p-3 border-r-2 border-gray-100 xl:border-0">
                <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                    <Link href="/">
                        <div className={normalLink}>
                            <p className="text-2xl"><AiFillHome /></p>
                            <span className="text-xl hidden xl:block">For You</span>
                        </div>
                    </Link>
                </div>
                {/* {!userLogin && (
                    <div className="px-2 py-4 hidden xl:block">
                        <p className="text-gray-400">log in to link and comment on videos</p>
                        <div className="pr-4"> 
                            <GoogleLogin
                                clientId=""
                                onSuccess={() => {}}
                                onFailure={() => {}}
                                cookiePolicy={'single_host_origin'} 
                                render={renderProps => (
                                    <button 
                                    className="cursor-pointer text-lg text-[#f51997] font-semibold outline-none hover:text-white hover:bg-[#f51997] border-[1px] border-[#f51997] px-6 py-3 rounded-md w-full mt-3"
                                    onClick={renderProps.onClick} 
                                    disabled={renderProps.disabled}>
                                    Log In
                                    </button>
                                )}
                            />
                        </div>
                    </div>
                )} */}
                <Discover />
                <SuggestAccounts />
                <Footer />
            </div>
        )}
    </div>
  )
}

export default Sidebar
