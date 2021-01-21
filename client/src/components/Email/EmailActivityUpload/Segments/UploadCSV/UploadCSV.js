import React, { useRef } from 'react';
import { Button, Segment } from 'semantic-ui-react'
import SecondaryButton from "../../../../UI/Buttons/SecondaryButton";
import ProgressBar from "../../../../UI/ProgressBar";
import styles from './UploadCSV.module.scss'


const UploadCSV = ({ activeStep, stepNumber, progress, onBrowse, file, uploadFile, loading, error }) => {

    const inputRef = useRef();

    return (
        <Segment
            disabled={stepNumber !== activeStep}
            placeholder>
            <div className={styles.container}>
                <div className={styles.browse}>
                    Select File :
                    <SecondaryButton
                        disabled={stepNumber !== activeStep || loading}
                        label='Browse...'
                        icon='file'
                        color='grey'
                        onClick={() => inputRef.current.click()}
                    />
                    <input
                        ref={inputRef}
                        type="file"
                        hidden
                        onChange={onBrowse}
                    />
                </div>
                {
                    error &&
                    <div className={styles.error}>
                        {error}
                    </div>
                }
                <div className={styles.selectedFile}>
                    {file.name}
                </div>
                <div className={styles.upload}>
                    <Button
                        loading={loading}
                        disabled={stepNumber !== activeStep || loading || !file.name}
                        primary
                        content="Click to Upload"
                        onClick={uploadFile}
                    />
                    {progress > 0 &&
                        <ProgressBar
                            disabled={stepNumber !== activeStep}
                            size='small'
                            percent={progress} />
                    }
                </div>
            </div>
        </Segment>
    );
}

export default UploadCSV;