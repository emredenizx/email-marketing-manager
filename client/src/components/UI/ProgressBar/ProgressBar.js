import React from 'react'
import { Progress } from 'semantic-ui-react'
import styles from './ProgressBar.module.scss'

const ProgressBar = ({ percent, size, disabled }) => {
    return (
        <div className={styles.progressBar}>
            <Progress
                disabled={disabled}
                size={size}
                percent={percent}
                indicating
                progress
                success={percent === 100}
            />
        </div>
    );
}

export default ProgressBar;