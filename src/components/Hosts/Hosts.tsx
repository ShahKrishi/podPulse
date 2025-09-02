import React from 'react';
import Post from '../post/Post';
import Upcoming from '../../assets/images/upcoming.jpg'

const Hosts: React.FC = () => {
    return (
        <div className="flex gap-10 ml-12 my-4">
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec mattis."
                variant='alt'
            />
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec mattis."
                variant='alt'
            />
            <Post
                firstname="john"
                lastname="doe"
                profilePic={Upcoming}
                image={Upcoming}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec mattis."
                variant='alt'
            />
        </div>
    );
};

export default Hosts;
