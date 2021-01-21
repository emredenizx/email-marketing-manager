import React from 'react';

import TopBar from '../../components/TopBar';
import TopMenu from '../../components/TopMenu';
import Table from '../../components/Table';
import Modal from '../../components/Modal/AddEdit';

import { ModalProvider } from '../../context/modal';
import { CompaniesProvider } from '../../context/companies';
import { LocationProvider } from '../../context/location'
import { TableColumnsProvider } from '../../context/table.columns';

const Main = () => {
    return (
        <div className='main'>
            <CompaniesProvider>
                <LocationProvider>
                    <TableColumnsProvider>
                        <ModalProvider>
                            <TopBar />
                            <TopMenu />
                            <Table />
                            <Modal />
                        </ModalProvider>
                    </TableColumnsProvider>
                </LocationProvider>
            </CompaniesProvider>

        </div>
    );
}

export default Main;
