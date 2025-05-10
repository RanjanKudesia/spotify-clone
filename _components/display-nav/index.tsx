'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import { assets } from '@/_assets/assets';

const DisplayNav: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <Image
            onClick={() => router.back()}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt="Back"
            width={32}
            height={32}
          />
          <Image
            onClick={() => router.forward?.()} // optional chaining to avoid error in older Next versions
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt="Forward"
            width={32}
            height={32}
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block">
            Explore Premium
          </p>
          <p className="bg-black py-1 px-3 rounded-2xl text-[15px]">Install App</p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            D
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <p className="bg-white text-black px-4 py-1 rounded-2xl">All</p>
        <p className="bg-black px-4 py-1 rounded-2xl">Music</p>
        <p className="bg-black px-4 py-1 rounded-2xl">Podcasts</p>
      </div>
    </>
  );
};

export default DisplayNav;
