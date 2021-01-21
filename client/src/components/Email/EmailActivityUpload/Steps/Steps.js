import React from 'react';
import { Step, Icon } from 'semantic-ui-react'

const Steps = ({ stepNumber, activeStep, icon, title, description, }) => {
    return (
        <>
            <Step
                active={activeStep === stepNumber}
                disabled={activeStep !== stepNumber}
            >
                <Icon name={icon} />
                <Step.Content >
                    <Step.Title>{title}</Step.Title>
                    <Step.Description>{description}</Step.Description>
                </Step.Content>
            </Step>

        </>
    );
}

export default Steps;