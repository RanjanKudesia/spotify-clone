'use client';

import Image, { StaticImageData } from 'next/image';
import { useGlobalContext } from '@/_context';

interface SongItemProps {
  id: number;
  name: string;
  image: string | StaticImageData;
  desc: string;
}

const SongItem: React.FC<SongItemProps> = ({ name, image, desc, id }) => {
  const { playWithId } = useGlobalContext();

  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] hover:bg-[#ffffff26] p-2 px-3 rounded cursor-pointer"
    >
      <Image className="rounded" src={image} alt={name} width={180} height={180} />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default SongItem;
