import Banner from '../../components/banner/Banner';
import NavbarComp from '../../components/navbar/NavbarComp';
// import RecentOutEpisodes from '../../components/recentOutEpisodes/RecentOutEpisodes';
import styles from './HomePage.module.scss';

const HomePage = () => {

    return (
        <div>
            <div className={styles.container}>
                <NavbarComp />
                <Banner />
            </div>

            <div>
                {/* <RecentOutEpisodes /> */}
            </div>
        </div>
    )
}

export default HomePage
