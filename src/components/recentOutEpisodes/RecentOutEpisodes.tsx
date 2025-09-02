import React from 'react';
import Polaroid from '../polaroid/Polaroid';
import podcastGirl from '../../assets/images/podcast-girl.jpg'
import podcastBoy from '../../assets/images/podcast-boy.jpg'

const RecentOutEpisodes: React.FC = () => {
    return (
        <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
            <Polaroid
                src={podcastGirl}
                title="Beach Vibes"
                by="me"
                on="13th May 2025"
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
                category='fresh'
            />
            <Polaroid
                src={podcastBoy}
                title="City Nights"
                by="you"
                on="15th May 2025"
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
                category='tomatoes'
            />

            <Polaroid
                src={podcastGirl}
                title="Beach Vibes"
                by="me"
                on="13th May 2025"
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
                category='fresh'
            />
            <Polaroid
                src={podcastBoy}
                title="City Nights"
                by="you"
                on="15th May 2025"
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.'
                category='tomatoes'
            />
        </div>
    );
};

export default RecentOutEpisodes;
