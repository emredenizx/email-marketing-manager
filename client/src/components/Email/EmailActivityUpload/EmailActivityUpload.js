import React, { useState, useContext } from 'react'
import axios from 'axios';
import { URL } from '../../../api/api.config'
import { Modal, Button, Step, Segment } from 'semantic-ui-react'
import PrimaryButton from "../../UI/Buttons/PrimaryButton";
import Steps from './Steps'
import RefreshSingleSends from "./Segments/RefreshSingleSends";
import UploadCSV from "./Segments/UploadCSV";
import ProcessActivity from "./Segments/ProcessActivity";
import { Companies } from '../../../context/companies'
import { toastSuccess } from "../../../utils/toasts";
import styles from './EmailActivityUpload.module.scss'

const initLoading = {
    refresh: false,
    process: false,
    upload: false
}

const EmailActivityUpload = () => {

    const [modal, setModal] = useState(false);
    const [file, setFile] = useState('')
    const [data, getFile] = useState({
        name: ''
    })

    const [activeStep, setActiveStep] = useState(1)
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(initLoading)
    const [extensionError, setExtensionError] = useState('')

    const { updateCompanies } = useContext(Companies)   

    const refreshSingleSends = async () => {
        try {
            setLoading(prev => ({
                ...prev,
                refresh: true
            }))
            await axios.get(`${URL}/refresh/singlesends`)
            setActiveStep(activeStep + 1)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(prev => ({
                ...prev,
                refresh: false
            }))
        }
    }

    const onBrowse = (event) => {
        setProgress(0);
        const file = event.target.files[0];
        if (file) {
            if (!['application/vnd.ms-excel', 'text/csv'].includes(file.type)) {
                setExtensionError('Please select a .csv file')
                return;
            } else {
                setExtensionError('')
                setFile(file);
            }
        }
    }

    const uploadFile = async () => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoading(prev => ({
                ...prev,
                upload: true
            }))
            const response = await axios.post(`${URL}/upload/emailactivity`, formData, {
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100);
                    setProgress(progress);
                }
            })
            setActiveStep(activeStep + 1)
            getFile({
                name: response.data
            })
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(prev => ({
                ...prev,
                upload: false
            }))
        }
    }

    const processActivities = async () => {
        try {
            setLoading(prev => ({ ...prev, process: true }))
            const file = data.name.split('.')[0]
            await axios.post(`${URL}/process/emailactivities`, { file })
            setActiveStep(activeStep + 1)
            toastSuccess('Email Activities Updated!')
            updateCompanies()
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(prev => ({ ...prev, process: false }))
        }
    }

    const onClose = () => {
        setFile('');
        getFile({
            name: ''
        })
        setExtensionError('');
        setProgress(0)
        setActiveStep(1)
        setModal(false)
    }

    const onImportClick = () => {
        setModal(true);
    }

    return (
        <div className={styles.emailActivity}>
            <PrimaryButton
                label='Import Activity'
                icon='upload'
                onClick={onImportClick}
            />
            <Modal
                className={styles.emailActivityModal}
                size='large'
                onClose={onClose}
                onOpen={() => setModal(true)}
                open={modal}
                closeOnEscape={false}
                closeOnDimmerClick={false}
            >
                <Modal.Header>Import Email Activity</Modal.Header>
                <Modal.Content>
                    <div className={styles.steps}>
                        <Step.Group >
                            <Steps
                                title='Refresh Single Sends List'
                                description='Click below to refresh'
                                icon='refresh'
                                activeStep={activeStep}
                                stepNumber={1}
                            />
                            <Steps
                                title='Upload Activity Report'
                                description='Select .csv file'
                                icon='file'
                                activeStep={activeStep}
                                stepNumber={2}
                            />
                            <Steps
                                title='Import CSV'
                                icon='file'
                                activeStep={activeStep}
                                stepNumber={3}
                            />
                        </Step.Group>
                    </div>
                    <div className={styles.segments}>
                        <Segment.Group horizontal>
                            <RefreshSingleSends
                                activeStep={activeStep}
                                stepNumber={1}
                                onClick={refreshSingleSends}
                                loading={loading.refresh}
                            />
                            <UploadCSV
                                activeStep={activeStep}
                                stepNumber={2}
                                progress={progress}
                                onBrowse={onBrowse}
                                file={file}
                                uploadFile={uploadFile}
                                loading={loading.upload}
                                error={extensionError}
                            />
                            <ProcessActivity
                                activeStep={activeStep}
                                stepNumber={3}
                                data={data}
                                processActivities={processActivities}
                                loading={loading.process}
                            />
                        </Segment.Group>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        disabled={loading.process || loading.refresh || loading.upload}
                        content={activeStep > 3 ? 'Done' : 'Cancel'}
                        icon={activeStep > 3 ? 'check' : 'cancel'}
                        color={activeStep > 3 ? 'green' : 'red'}
                        onClick={onClose}
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
}

export default EmailActivityUpload;