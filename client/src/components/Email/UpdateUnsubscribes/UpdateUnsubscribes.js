import React, { useContext, useState } from 'react'
import styles from './UpdateUnsubscribes.module.scss'
import { updateUnsubscribes } from '../../../api/companies.api'
import { toastSuccess } from '../../../utils/toasts';
import { Companies } from '../../../context/companies'
import PrimaryButton from "../../UI/Buttons/PrimaryButton";

const UpdateUnsubscribes = () => {

    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const { updateCompanies } = useContext(Companies)   

    const onClick = async () => {
        setLoading(true)
        try {
            const response = await updateUnsubscribes();
            setUpdated(true);
            toastSuccess(response.data);
            updateCompanies();
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.updateUnsubscribes}>
            <PrimaryButton
                loading={loading}
                disabled={updated}
                icon='refresh'
                label='UPDATE UNSUBSCRIBES'
                onClick={onClick}
            />
        </div>
    );
}

export default UpdateUnsubscribes;