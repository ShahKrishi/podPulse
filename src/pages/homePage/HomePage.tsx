import Episodes from '../../components/Episodes/Episodes';
import Hosts from '../../components/Hosts/Hosts';
import NavbarComp from '../../components/navbar/NavbarComp';
import RecentOutEpisodes from '../../components/recentOutEpisodes/RecentOutEpisodes';
import styles from './HomePage.module.scss';

const HomePage = () => {

    return (
        <div>
            <div className={styles.container}>
                <NavbarComp />

                <span className="font-semibold flex justify-center text-lg">Get All Episodes</span>
                <div className="bg-[#fffae8]">
                    <Episodes />
                </div>

                <span className="font-semibold flex justify-center text-lg">Get All Hosts</span>
                <div>
                    <Hosts />
                </div>

                <span className="font-semibold flex justify-center text-lg">Get All Recently Out Episodes</span>
                <div className="ml-10">
                    <RecentOutEpisodes />
                </div>

            </div>
        </div>
    )
}

export default HomePage
