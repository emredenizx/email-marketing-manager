import React, { useState, useEffect, useCallback } from 'react'
import Activity from "../Activity";
import { fetchSingleSend } from '../../../../api/emailsends.api'
import styles from './Detail.module.scss'

const Detail = ({ companyId, sendId }) => {

    const [singlesend, setSingleSend] = useState([])
    const setState = useCallback((data) => {
        setSingleSend(data)
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchSingleSend({ companyId, sendId });
                setState(response.data);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [companyId, sendId, setState])

    return (
        <div className={styles.emailSendsDetail}>
            {singlesend.map(send =>
                <Activity
                    key={send.id}
                    activity={send}
                />
            )}
        </div>
    );
}

export default Detail;