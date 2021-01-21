import React from 'react';
import { Button, Segment, Icon, Header } from 'semantic-ui-react'

const ProcessActivity = ({ activeStep, stepNumber, data, processActivities, loading }) => {
    return (
        <Segment
            disabled={stepNumber !== activeStep}
            placeholder>
            <Header icon>
                <Icon name='file alternate outline' />
                {data.name ? data.name : ' No CSV files are uploaded yet.'}
            </Header>
            <Button
                loading={loading}
                disabled={(stepNumber !== activeStep) || loading}
                primary
                content="PROCESS ACTIVITY"
                labelPosition="left"
                icon="upload"
                onClick={processActivities}
            />
        </Segment>
    );
}

export default ProcessActivity;