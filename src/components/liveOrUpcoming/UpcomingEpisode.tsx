import styles from './Upcoming.module.scss';
import UpcomingImg from '../../assets/images/upcoming.jpg'
import CalendarSvg from '../../assets/icons/calender-blue.svg'
import ClockSvg from '../../assets/icons/clock.svg'
import HeartSvg from '../../assets/icons/red-heart.svg'
import ShareSvg from '../../assets/icons/share.svg'
import Icon from '../icon/Icon';

const UpcomingEpisode = () => {
    return (
        <div>
            <div className={styles.yellowCard}>
                <div>
                    <img src={UpcomingImg} alt="" />
                </div>

                <span className={styles.title}>Live Podcast Recording: The Innovator Mindset</span>

                <div className={styles.details}>
                    <Icon name={CalendarSvg} />
                    <span>23 Dec</span>
                    <Icon name={ClockSvg} />
                    <span>7pm - 9pm</span>
                </div>
            </div>

            <div className={styles.whiteCard}>
                <Icon name={HeartSvg} />
                <Icon name={ShareSvg} />
            </div>
        </div>
    )
}

export default UpcomingEpisode;
