import React, { useState, useEffect } from 'react'
import AccordionTab from '../../../UI/AccordionTab'
import Detail from "../Detail";
import { fetchEmailSends } from '../../../../api/emailsends.api'
import { formatDate } from '../../../../utils/common'
import styles from './EmailSendsList.module.scss'

const List = ({ companyId }) => {

    const [emailSends, setEmailSends] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await fetchEmailSends({ companyId });
                setEmailSends(response.data)
            } catch (error) {
                console.log(error)
            }

        })()
    }, [companyId])

    return (
        <div className={styles.emailSendsList}>
            {
                emailSends.length > 0 ?
                    emailSends.map((send) =>
                        <AccordionTab
                            key={send.id}
                            title={
                                <div className={styles.sendTitle}>
                                    <div className={styles.sendName}>{send.name}</div>
                                    <div className={styles.sendDate}>{formatDate(send.created_at)}</div>
                                </div>
                            }
                        >
                            <Detail
                                companyId={companyId}
                                sendId={send.id}
                            />
                        </AccordionTab>
                    )
                    :
                    'No Activity exists for this company yet!'
            }
        </div>
    );
}

export default List;