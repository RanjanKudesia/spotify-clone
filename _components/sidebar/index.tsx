'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { assets } from '@/_assets/assets';

const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div
          onClick={() => router.push('/')}
          className="flex items-center gap-3 pl-8 cursor-pointer"
        >
          <Image src={assets.home_icon} alt="Home" width={24} height={24} />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 text-white pl-8">
          <Image src={assets.search_icon} alt="Search" width={24} height={24} />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src={assets.stack_icon} alt="Library" width={32} height={32} />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <Image src={assets.arrow_icon} alt="Arrow" width={20} height={20} />
            <Image src={assets.plus_icon} alt="Plus" width={20} height={20} />
          </div>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy, we'll help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Create playlist
          </button>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
            Browse podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
