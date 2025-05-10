'use client';

import Image from 'next/image';
import { albumsData, assets, songsData } from '@/_assets/assets';
import { useGlobalContext } from '@/_context';
import DisplayNav from '@/_components/display-nav';
import { use } from 'react';

const DisplayAlbum = ({params}:{params:Promise<{id:string}>}) => {

  const {id} = use(params);
  const albumId = id;
  const albumData = albumsData[Number(albumId)];
  const { playWithId } = useGlobalContext();

  if (!albumData) return <div className="text-white p-4">Album not found</div>;

  return (
    <div
      style={{
        background: `linear-gradient(${albumData.bgColor}, #121212)`,
      }}
      className="w-full m-2 px-6 pt-4 rounded text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <DisplayNav />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <Image className="w-48 rounded" src={albumData.image} alt="" width={192} height={192} />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <Image className="inline-block w-5" src={assets.spotify_logo} alt="" width={20} height={20} />
            <b> Spotify</b> • 1,323,154 likes • <b>50 songs,</b> about 2 hr 30 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <Image className="m-auto w-4" src={assets.clock_icon} alt="" width={16} height={16} />
      </div>

      <hr />

      {songsData.map((item, index) => (
        <div
          key={index}
          onClick={() => playWithId(item.id)}
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <Image className="inline w-10 mr-5" src={item.image} alt="" width={40} height={40} />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayAlbum;