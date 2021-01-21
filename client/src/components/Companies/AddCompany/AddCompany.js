import React, { useContext } from 'react';
import { toastError } from '../../../utils/toasts';
import { Modal } from '../../../context/modal'
import { Location as LocationContext } from '../../../context/location'
import Location from '../../Location'
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import { modal_addCompany } from "../../Modal/AddEdit/utils/modal_actions";
import styles from './AddCompany.module.scss'

const AddCompany = () => {

    const { setModal } = useContext(Modal);
    const { location } = useContext(LocationContext);

    const { county, citytown, county_id, citytown_id } = location.selections.addCompany;

    const onAddCompany = () => {
        if (county && citytown) {
            const content = modal_addCompany({ county, citytown, county_id, citytown_id });
            setModal(content)
        } else {
            const message = 'County AND City/Town should BOTH be selected!'
            toastError(message);
        }
    }

    return (
        <div className={styles.container}>
            <Location type='addCompany' addEditButtons={true} />
            <PrimaryButton
                label='Add Company'
                icon='plus'
                onClick={onAddCompany}
            />
        </div>
    );
}

export default AddCompany;