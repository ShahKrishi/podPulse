import React from 'react';
import PlayIcon from '../../assets/icons/play-colored.svg'
import ClockIcon from '../../assets/icons/clock.svg';

type PostProps = {
    firstname: string;
    lastname: string;
    profilePic?: string;
    image?: string;
    description?: string;
    category?: string;
    title?: string;
    time?: string;
    variant: 'default' | 'alt';
};

const Post: React.FC<PostProps> = ({
    firstname,
    lastname,
    profilePic,
    image,
    description,
    category,
    title,
    time,
    variant = 'default',
}) => {
    if (variant === 'alt') {
        return (
            <div className="border rounded-2xl bg-white shadow-sm p-4 max-w-md my-4">
                <div className="flex items-start">
                    <img
                        src={profilePic}
                        alt={`${firstname}'s profile`}
                        className="w-40 h-40 rounded-lg object-cover mr-4"
                    />
                    <div className="flex flex-col justify-start">
                        <span className="font-semibold text-lg mb-2">{firstname} {lastname}</span>
                        <p className="text-sm text-gray-700 mb-4">{description}</p>
                        <button className="flex items-center gap-2 bg-[#02C7AD] text-black font-semibold px-3 py-2 rounded-xl w-fit">
                            <img src={PlayIcon} alt="Play icon" className="w-4 h-4" />
                            Listen Now
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-[350px] max-w-sm bg-white border border-gray-300 rounded-xl shadow-sm my-4 overflow-hidden mx-2">
            <div className="relative group">
                <img
                    src={image}
                    alt="Post"
                    className="w-full max-h-64 object-cover"
                />

                <button
                    aria-label="Play Video"
                    className="absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-300"
                >
                    <img src={PlayIcon} alt="Play" className="w-4 h-4" />
                </button>

            </div>

            <div className="flex items-center px-4 pt-3 pb-2">
                <img
                    src={profilePic}
                    alt={`${firstname}'s profile`}
                    className="w-8 h-8 rounded-full mr-3"
                />
                <span className="font-semibold">{firstname} {lastname}</span>
                <span className="ml-auto text-sm text-gray-500 border rounded-sm p-1">{category}</span>
            </div>

            <div className="px-4 text-lg font-semibold text-gray-800 capitalize mb-2">
                {title}
                <div className="flex items-center gap-4 text-sm text-gray-600 my-4">
                    <img src={ClockIcon} alt="Time" className="w-4 h-4" />
                    <span>{time}</span>
                </div>
            </div>
        </div>
    );

};

export default Post;
