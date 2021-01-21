import React, { useContext, useEffect, useState, useReducer } from 'react'
import { Modal, Message } from 'semantic-ui-react'
import { Modal as ModalContext } from '../../../context/modal'
import { Location } from '../../../context/location'
import { Companies } from '../../../context/companies'
import { formatDuplicateMsg } from '../../../utils/common'
import { toastSuccess } from '../../../utils/toasts';
import AddEditContentGenerator from "../AddEditContentGenerator";
import AccordionTab from "../../UI/AccordionTab";
import SecondaryButton from "../../UI/Buttons/SecondaryButton";
import Search from '../../Search';
import styles from './AddEdit.module.scss'

const initialState = {
    id: '',
    county: '',
    citytown: '',
    email: '',
    name: ''
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'onChange':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'onLoad':
            return {
                ...state,
                ...action.payload
            }
        case 'reset':
            return initialState
        case 'resetNameEmailOnly':
            return {
                ...state,
                name: '',
                email: ''
            }
        default:
            return state;
    }
}

const AddEdit = () => {

    const { modal, displayModal, resetModal } = useContext(ModalContext);
    const { resetAllLocationSelections, updateLocations } = useContext(Location)
    const { resetFilters, updateCompanies } = useContext(Companies)

    const [validationErrors, setValidationErrors] = useState([])
    const [fields, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        dispatch({
            type: 'onLoad',
            payload: modal.content.data
        })
    }, [modal.content.data]);

    const onChange = (event) => {
        const { name, value } = event.target;
        dispatch({
            type: 'onChange',
            payload: { name, value }
        })
        setValidationErrors([])
    }

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSave(modal.action)
        } else {
            return;
        }
    }

    const onAddEdit = async (resetFn, modalStatus) => {

        const errors = modal.validation(fields)

        if (errors.length > 0) {
            setValidationErrors(errors)
            return;
        } else {
            try {
                const response = await modal.api(fields);
                toastSuccess(response.data);
            } catch (error) {
                const duplicateMsg = error.response.data.detail;
                if (duplicateMsg) {
                    const error = [formatDuplicateMsg(duplicateMsg)]
                    setValidationErrors(error)
                }
                return;
            }
        }

        resetFn();
        clearModal(modalStatus);
    }

    const onSave = async (action) => {
        switch (action) {
            case 'ADD_COUNTY':
            case 'EDIT_COUNTY':
            case 'ADD_CITYTOWN':
            case 'EDIT_CITYTOWN':
                onAddEdit(onAddEditLocationReset);
                break;
            case 'ADD_COMPANY':
                onAddEdit(onAddCompanyReset, 'keepModal')
                break;
            case 'EDIT_COMPANY':
                onAddEdit(onEditCompanyReset)
                break;
            default:
                break;
        }
    }

    const onAddEditLocationReset = () => {
        resetAllLocationSelections();
        updateLocations();
        resetFilters();
    }

    const onEditCompanyReset = () => updateCompanies();
    const onAddCompanyReset = () => resetFilters();

    const clearModal = (status) => {
        setValidationErrors([]);
        if (status !== 'keepModal') {
            dispatch({
                type: 'reset'
            });
            resetModal();
            displayModal(false);
        } else {
            dispatch({
                type: 'resetNameEmailOnly'
            })
        }
    }

    const onCancel = () => {
        displayModal(false);
        setValidationErrors([])
    }

    const onClear = () => {
        dispatch({
            type: 'resetNameEmailOnly'
        })
        setValidationErrors([])
    }

    return (
        <Modal
            closeOnEscape
            closeIcon
            size='tiny'
            onClose={onCancel}
            onOpen={() => displayModal(true)}
            open={modal.display}
            closeOnDimmerClick={false}
        >
            <Modal.Header>{modal.title}</Modal.Header>
            <Modal.Content>
                <div className={styles.formContainer}>
                    {modal.title === 'Add Company' &&
                        <AccordionTab title='SEARCH'>
                            <div className={styles.search}>
                                <Search container='Add Company' />
                            </div>
                        </AccordionTab>
                    }
                    <AddEditContentGenerator
                        fields={modal.content.fields}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        state={fields}
                    />
                </div>
                {validationErrors.length > 0 &&
                    <Message negative>
                        <Message.Header>Errors</Message.Header>
                        <Message.List className={styles.errorMessages}>
                            {validationErrors.map((error, index) =>
                                <Message.Item key={index}>{error}</Message.Item>
                            )}
                        </Message.List>
                    </Message>
                }
            </Modal.Content>
            <Modal.Actions>
                <div className={styles.footer}>
                    <SecondaryButton
                        icon='checkmark'
                        color='blue'
                        label='Save'
                        onClick={() => onSave(modal.action)}
                    />
                    {
                        ['ADD_COMPANY', 'EDIT_COMPANY'].includes(modal.action) &&
                        <SecondaryButton
                            icon='delete'
                            label='Clear'
                            onClick={onClear}
                        />
                    }

                </div>
            </Modal.Actions>
        </Modal>
    );
}

export default AddEdit;