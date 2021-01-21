import React, { useState } from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import styles from './AccordionTab.module.scss'

const AccordionTab = ({ title, children }) => {

    const [visibility, setVisibility] = useState(false);

    const onClick = () => {
        setVisibility(!visibility)
    };

    return (
        <div className={styles.accordionTab}>
            <Accordion>
                <Accordion.Title
                    active={visibility}
                    index={0}
                    onClick={onClick}
                >
                    <Icon name='dropdown' />{title}
                </Accordion.Title>
                <Accordion.Content active={visibility}>
                    {children}
                </Accordion.Content>
            </Accordion>
        </div>
    );
}

export default AccordionTab;