import React from 'react';
import { Button, Segment } from 'semantic-ui-react'

const RefreshSingleSends = ({ activeStep, stepNumber, onClick, loading }) => {
    return (
        <Segment
            disabled={stepNumber !== activeStep}
            placeholder
        >
            <Button
                loading={loading}
                disabled={(stepNumber !== activeStep) || loading}
                content="Click to Refresh"
                primary
                onClick={onClick}
            />
        </Segment>
    );
}

export default RefreshSingleSends;