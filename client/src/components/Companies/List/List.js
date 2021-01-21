import React, { useContext, useState } from 'react'
import { Table, Segment, Dimmer, Loader } from 'semantic-ui-react'
import Sort from "../../Sort";
import Paginator from '../../Paginator'
import ModalCompanyDetail from '../../Modal/CompanyDetail'
import Cell from "./Cell";
import HeaderCell from "./HeaderCell";
import TableAddEditButtons from "../../UI/Buttons/TableAddEditButtons";
import { Companies } from '../../../context/companies'
import { Modal as ModalContext } from '../../../context/modal'
import { TableColumns } from '../../../context/table.columns'
import { removeCompany } from '../../../api/companies.api'
import { toastSuccess } from '../../../utils/toasts';
import { modal_editCompany } from "../../Modal/AddEdit/utils/modal_actions";
import styles from './List.module.scss'

const emailActivity = {
    delivered: true,
    click: true,
    open: true,
    unsubscribe: false,
    bounce: false,
    drop: false,
}

const List = () => {
    
    const { data, params, isLoading, updateCompanies } = useContext(Companies);
    const { companies, filterCount } = data;
    const { offset } = params.paging;

    const { setModal } = useContext(ModalContext);
    const { columns } = useContext(TableColumns);

    const [modalCompanyDetail, setModalCompanyDetail] = useState(false)
    const [company, setCompany] = useState([])

    const columnFilters = columns.reduce((columns, column) => {
        return {
            ...columns,
            [column.name]: column.value
        }
    }, {})

    const onEdit = ({ id, county, citytown, email, name }) => {
        const content = modal_editCompany({ id, county, citytown, email, name })
        setModal(content)
    }

    const onCompanyClick = ({ id, name, email, county, citytown }) => {
        const content = {
            id,
            data: [
                { label: 'Name', data: name },
                { label: 'Email', data: email },
                { label: 'County', data: county },
                { label: 'City/Town', data: citytown }
            ]
        }
        setCompany(content);
        setModalCompanyDetail(true)
    }

    const onRemove = async (id) => {
        try {
            const response = await removeCompany(id)
            toastSuccess(response.data);
            updateCompanies();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className={`list ${styles.container}`}>
                {companies.length > 0 ?
                    <Segment>
                        <Dimmer
                            active={isLoading}
                            inverted>
                            <Loader size='small'>Loading</Loader>
                        </Dimmer>
                        <Table celled fixed selectable>
                            <Table.Header>
                                <Table.Row>
                                    <HeaderCell width='1' className='numbers' >#</HeaderCell>
                                    <HeaderCell width='4'><div className={styles.sortableCell}>Name <Sort column={'name'} /></div></HeaderCell>
                                    <HeaderCell width='4'><div className={styles.sortableCell}>Email <Sort column={'email'} /></div></HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.citytown} width='1'> <div className={styles.sortableCell}>City/Town <Sort column={'citytown'} /></div></HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.county} width='1'> <div className={styles.sortableCell}>County <Sort column={'county'} /></div></HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.event_name} width='1'>Last Event </HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.event_type} width='1'>Event Type</HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.event_processed_at} width='1'>Processed At</HeaderCell>
                                    <HeaderCell isHidden={!columnFilters.has_unsubscribed} width='1'>Global Unsubs.</HeaderCell>
                                    <HeaderCell width='1'><div className={styles.sortableCell}>Added <Sort column={'created_at'} /></div></HeaderCell>
                                    <HeaderCell width='1'><div className={styles.sortableCell}>Update <Sort column={'updated_at'} /></div></HeaderCell>
                                    <HeaderCell width='1' className='editdelete' >Edit/Del</HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body data-testid='tableBody' >
                                {companies.map((company, index) =>
                                    <Table.Row
                                        key={company.id}
                                        negative={company.has_unsubscribed}
                                    >
                                        <Cell
                                            data={index + 1 + offset}
                                        />
                                        <Cell
                                            data={company.name}
                                            data-testid='companyName'
                                            className={styles.linkCompanyDetails}
                                            onClick={() => onCompanyClick(company)}
                                        />
                                        <Cell
                                            data={company.email}
                                            data-testid='companyEmail'
                                        />
                                        <Cell
                                            data={company.citytown}
                                            isHidden={!columnFilters.citytown}
                                        />
                                        <Cell
                                            data={company.county}
                                            isHidden={!columnFilters.county}
                                        />
                                        <Cell
                                            data={company.event_name ? company.event_name : 'n/a'}
                                            isHidden={!columnFilters.event_name}
                                            negative={company.event_name && !emailActivity[company.event_name]}
                                            positive={company.event_name && emailActivity[company.event_name]}
                                        />
                                        <Cell
                                            data={company.event_type ? company.event_type : 'n/a'}
                                            isHidden={!columnFilters.event_type}
                                        />
                                        <Cell
                                            data={company.processed_at ? company.processed_at : 'n/a'}
                                            isHidden={!columnFilters.event_processed_at}
                                            className={styles.dateAdded}
                                        />
                                        <Cell
                                            data={company.has_unsubscribed ? 'Yes' : 'No'}
                                            isHidden={!columnFilters.has_unsubscribed}
                                        />
                                        <Cell
                                            data={company.created_at}
                                            className={styles.dateAdded}
                                        />
                                        <Cell
                                            data={company.updated_at}
                                            className={styles.dateAdded}
                                        />
                                        <Table.Cell className='editdelete' >
                                            <TableAddEditButtons
                                                onEdit={() => onEdit(company)}
                                                onRemove={() => onRemove(company.id)}
                                            />
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Segment>
                    :
                    <Segment>
                        <Dimmer
                            active={isLoading}
                            inverted>
                            <Loader size='small'>Loading</Loader>
                        </Dimmer>
                        <div className={styles.noResults}>
                            No Results Found
                        </div>
                    </Segment>
                }
            </div>
            <Paginator resultsCount={filterCount} />
            <ModalCompanyDetail
                status={modalCompanyDetail}
                setStatus={setModalCompanyDetail}
                company={company}
            />
        </>
    );
}

export default List;