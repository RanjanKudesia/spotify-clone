'use client';

import {
  createContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { songsData, Song } from '@/_assets/assets';
import Sidebar from '@/_components/sidebar';
import Player from '@/_components/player';

// ─── Types ─────────────────────────────────────────────
interface TimeType {
  currentTime: { second: number; minute: number };
  totalTime: { second: number; minute: number };
}

interface GlobalContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  seekBg: React.RefObject<HTMLDivElement | null>;
  seekBar: React.RefObject<HTMLDivElement | null>;
  track: Song;
  setTrack: React.Dispatch<React.SetStateAction<Song>>;
  playStatus: boolean;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  play: () => void;
  pause: () => void;
  previous: () => Promise<void>;
  next: () => Promise<void>;
  playWithId: (id: number) => Promise<void>;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  time: TimeType;
}

// ─── Context Setup ────────────────────────────────────
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within GlobalContextProvider');
  }
  return context;
};

// ─── Provider ─────────────────────────────────────────
interface Props {
  children: ReactNode;
}

const GlobalContextProvider = ({ children }: Props) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement | null>(null);
  const seekBar = useRef<HTMLDivElement | null>(null);

  const [track, setTrack] = useState<Song>(songsData[0]);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<TimeType>({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.volume = 0.1;
      setPlayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      setTrack(songsData[track.id - 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      setTrack(songsData[track.id + 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  const playWithId = async (id: number) => {
    setTrack(songsData[id]);
    if (audioRef.current) {
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current && seekBg.current) {
      const offsetX = e.nativeEvent.offsetX;
      const width = seekBg.current.offsetWidth;
      const duration = audioRef.current.duration;
      audioRef.current.currentTime = (offsetX / width) * duration;
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (seekBar.current && audioRef?.current?.duration) {
            const progress =
              (audioRef.current.currentTime * 100) /
              audioRef.current.duration;
            seekBar.current.style.width = `${Math.floor(progress)}%`;

            setTime({
              currentTime: {
                second: Math.floor(audioRef.current.currentTime % 60),
                minute: Math.floor(audioRef.current.currentTime / 60),
              },
              totalTime: {
                second: Math.floor(audioRef.current.duration % 60),
                minute: Math.floor(audioRef.current.duration / 60),
              },
            });
          }
        };
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const contextValue: GlobalContextType = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    play,
    pause,
    previous,
    next,
    playWithId,
    seekSong,
    time,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <div className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        {children}
        </div>
      </div>
      <Player />
      <audio ref={audioRef} preload="auto" src={track.file}></audio>
    </div>
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
