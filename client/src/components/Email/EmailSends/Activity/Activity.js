import React from 'react'
import { formatDate } from "../../../../utils/common";
import styles from './Activity.module.scss'

const Activity = ({ activity }) => {
    return (
        <div className={`${styles.singleActivity} ${styles[activity.event_name]}`}>
            <div className={styles.header}>
                <div className={styles.eventName}>{activity.event_name}</div>
                <div>{formatDate(activity.processed_at)}</div>

            </div>
            {activity.event_type && <div className={styles.type}>
                {activity.event_type}
            </div>}
            {activity.event_reason && <div className={styles.reason}>
                {activity.event_reason}
            </div>}

        </div>
    );
}

export default Activity;