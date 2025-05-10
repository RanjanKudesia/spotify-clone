'use client';

import { assets } from '@/_assets/assets';
import Image from 'next/image';
import { useGlobalContext } from '@/_context';

const Player = () => {
    const {
        track,
        playStatus,
        play,
        pause,
        previous,
        next,
        seekBar,
        seekBg,
        seekSong,
        time,
    } = useGlobalContext();

    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            {/* Left: Track Info */}
            <div className="hidden items-center gap-4 lg:flex">
                <Image className="w-12 h-12 rounded" src={track.image} alt={track.name} width={48} height={48} />
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc.slice(0, 12)}</p>
                </div>
            </div>

            {/* Center: Controls */}
            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <Image className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" width={16} height={16} />
                    <Image className="w-4 cursor-pointer" onClick={previous} src={assets.prev_icon} alt="Previous" width={16} height={16} />
                    {playStatus ? (
                        <Image className="w-4 cursor-pointer" onClick={pause} src={assets.pause_icon} alt="Pause" width={16} height={16} />
                    ) : (
                        <Image className="w-4 cursor-pointer" onClick={play} src={assets.play_icon} alt="Play" width={16} height={16} />
                    )}
                    <Image className="w-4 cursor-pointer" onClick={next} src={assets.next_icon} alt="Next" width={16} height={16} />
                    <Image className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" width={16} height={16} />
                </div>

                <div className="flex items-center gap-5 text-sm">
                    <p>
                        {time.currentTime.minute}:{String(time.currentTime.second).padStart(2, '0')}
                    </p>
                    <div
                        onClick={seekSong}
                        ref={seekBg}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <div ref={seekBar} className="h-1 w-0 bg-green-800 rounded-full" />
                    </div>

                    <p>
                        {time.totalTime.minute}:{String(time.totalTime.second).padStart(2, '0')}
                    </p>
                </div>
            </div>

            {/* Right: Additional Controls */}
            <div className="hidden items-center gap-2 opacity-75 lg:flex">
                <Image className="w-4" src={assets.plays_icon} alt="Plays" width={16} height={16} />
                <Image className="w-4" src={assets.mic_icon} alt="Mic" width={16} height={16} />
                <Image className="w-4" src={assets.queue_icon} alt="Queue" width={16} height={16} />
                <Image className="w-4" src={assets.speaker_icon} alt="Speaker" width={16} height={16} />
                <Image className="w-4" src={assets.volume_icon} alt="Volume" width={16} height={16} />
                <div className="w-20 bg-slate-50">
                    <hr className="h-1 bg-slate-50 rounded" />
                </div>
                <Image className="w-4" src={assets.mini_player_icon} alt="Mini Player" width={16} height={16} />
                <Image className="w-4" src={assets.zoom_icon} alt="Zoom" width={16} height={16} />
            </div>
        </div>
    );
};

export default Player;
