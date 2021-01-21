import React, { useContext } from 'react'
import fileDownload from 'js-file-download'
import { Companies } from '../../../context/companies'
import { exportToCSV } from '../../../api/exportToCSV.api'
import PrimaryButton from '../../UI/Buttons/PrimaryButton'
import styles from './ExportToCSV.module.scss'

const ExportToCSV = () => {

    const { data, params } = useContext(Companies);
    const { filterCount } = data;

    const onClick = async () => {
        const { data, firstRecordDate, lastRecordDate, selectedActivities, selectedLocation } = await exportToCSV(params)
        fileDownload(data, `${selectedActivities}_${selectedLocation}_${lastRecordDate}_${firstRecordDate}.csv`)
    }

    return (
        <>
            <div className={styles.exportToCSV}>
                <div className={styles.resultsText}>{'Number of Results: ' + filterCount}</div>
                <div className={styles.button}>
                    <PrimaryButton
                        label='Export to Csv'
                        icon='file alternate'
                        onClick={onClick}
                    />
                </div>
            </div>
        </>
    );
}

export default ExportToCSV