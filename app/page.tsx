'use client';

import React from 'react';
import { albumsData, songsData } from '@/_assets/assets';
import AlbumItem from '@/_components/album-item';
import SongItem from '@/_components/song-item';
import DisplayNav from '@/_components/display-nav';

const DisplayHome: React.FC = () => {
  return (
    <>
      <DisplayNav />

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today&apos;s biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item) => (
            <SongItem
              key={item.id}
              id={item.id}
              name={item.name}
              desc={item.desc}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
