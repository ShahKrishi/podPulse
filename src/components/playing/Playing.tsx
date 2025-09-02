// import Upcoming from '../../assets/images/upcoming.jpg'
// import PlayIcon from '../../assets/icons/play-colored.svg'

// interface PlayingProps {
//     title?: string;
//     username?: string;
//     time?: string;
// }

// const Playing: React.FC<PlayingProps> = ({ }) => {
//     return (
//         <div className="m-5 p-3 border flex items-center gap-5">
//             <img src={Upcoming} alt="" className="h-20 w-20" />

//             <div className="flex flex-col">
//                 <span>title will here</span>
//                 <span>John Doe</span>
//             </div>

//             <button
//                 aria-label="Play Video"
//                 className="absolute flex items-center justify-center w-10 h-10 bg-yellow-400 border border-black rounded-full transition-all duration-300"
//             >
//                 <img src={PlayIcon} alt="Play" className="w-4 h-4" />
//             </button>

//         </div>

//     )
// }

// export default Playing

import Upcoming from '../../assets/images/upcoming.jpg'
import PlayIcon from '../../assets/icons/play-colored.svg'

interface PlayingProps {
    title?: string;
    username?: string;
    time?: string;
}

const Playing: React.FC<PlayingProps> = ({ title, username, time }) => {
    return (
        <div className="relative m-5 p-3 border flex items-center gap-5">
            <img src={Upcoming} alt="Upcoming" className="h-20 w-20 object-cover" />

            <div className="flex flex-col">
                <span>{title || "Title will be here"}</span>
                <span>{username || "John Doe"}</span>
                {time && <span>{time}</span>}
            </div>

            <button
                aria-label="Play Video"
                className="absolute left-75 flex items-center justify-center w-10 h-10 bg-yellow-400 border border-black rounded-full hover:scale-105 transition-all duration-300"
            >
                <img src={PlayIcon} alt="Play" className="w-4 h-4" />
            </button>
        </div>
    )
}

export default Playing;
