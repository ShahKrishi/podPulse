import React from 'react';
import Post from '../post/Post';
import Upcoming from '../../assets/images/upcoming.jpg'

const Episodes: React.FC = () => {
    return (
        <div className="flex gap-4 my-4 p-4">
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                title="Episode: 05 Lorem ipsum dolor"
                category="Tomatoes"
                variant='default'
                time="2:00"
            />
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                title="Episode: 05 Lorem ipsum dolor sit"
                category="Fresh"
                variant='default'
                time="4:00"
            />
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                title="Episode: 05 Lorem ipsum dolor sit"
                category="Tomatoes"
                variant='default'
                time="20:00"
            />
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                title="Episode: 05 Lorem ipsum dolor sit"
                category="Fresh"
                variant='default'
                time="30:00"
            />
        </div>
    );
};

export default Episodes;
