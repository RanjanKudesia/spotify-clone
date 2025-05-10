'use client';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

interface AlbumItemProps {
  id: number;
  image: string | StaticImageData;
  name: string;
  desc: string;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ image, name, desc, id }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/album/${id}`)}
      className="min-w-[180px] hover:bg-[#ffffff26] p-2 px-3 rounded cursor-pointer"
    >
      <Image
        className="rounded"
        src={image}
        alt={name}
        width={180}
        height={180}
        style={{ objectFit: 'cover' }}
      />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default AlbumItem;
