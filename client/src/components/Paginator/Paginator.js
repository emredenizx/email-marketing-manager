import React, { useContext, useEffect, useState } from 'react'
import { Pagination, Icon } from 'semantic-ui-react'
import { Companies } from '../../context/companies'
import styles from './Paginator.module.scss'

const Paginator = ({ resultsCount }) => {

    const { setPage, params } = useContext(Companies);
    const { itemPerPage } = params.paging;

    const [activePage, setActivePage] = useState(1)
    const totalPages = Math.ceil(resultsCount / itemPerPage);

    useEffect(() => {
        setActivePage(params.paging.pageIndex)
    }, [params.paging.pageIndex])

    const onSetPage = (activePage) => {
        setActivePage(activePage)
        setPage(activePage)
    }

    return (
        <div className={`pagination ${styles.container}`}>
            {
                resultsCount > itemPerPage &&
                <Pagination
                    boundaryRange={window.innerWidth > 768 ? 1 : 0}
                    siblingRange={window.innerWidth > 768 ? 1 : 0}
                    activePage={activePage}
                    ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                    firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                    lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                    prevItem={{ content: <Icon name='angle left' />, icon: true }}
                    nextItem={{ content: <Icon name='angle right' />, icon: true }}
                    onPageChange={(event, { activePage }) => onSetPage(activePage)}
                    totalPages={totalPages}
                />
            }
        </div>
    );
}

export default Paginator;