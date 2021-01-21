import React from 'react'
import { Modal } from 'semantic-ui-react'
import Detail from '../../Companies/Detail'
import EmailSends from "../../Email/EmailSends/List";
import styles from './CompanyDetail.module.scss'

const ModalCompanyDetail = ({ status, setStatus, company }) => {
    return (
        <Modal
            closeIcon
            size='large'
            open={status}
            closeOnEscape={false}
            closeOnDimmerClick={false}
            onClose={() => setStatus(false)}
        >
            <Modal.Header>Company Details</Modal.Header>
            <Modal.Content scrolling className={styles.modalCompanyDetails}>
                <div className={styles.companyDetails}>
                    <div className={styles.info}>
                        <Detail company={company} />
                    </div>
                    <div className={styles.sends}>
                        <div className={styles.sendsTitle}>EMAIL SENDS</div>
                        <div className={styles.sendsHeader}>
                            <div>NAME</div>
                            <div>DATE</div>
                        </div>
                        <EmailSends companyId={company.id} />
                    </div>

                </div>
            </Modal.Content>
        </Modal>
    )
}

export default ModalCompanyDetail;