import React, { createContext, useCallback, useReducer, useEffect } from 'react'
import { fetchCompanies } from "../api/companies.api";
import * as actions from '../context/actions'
import CompaniesReducer from '../reducers/CompaniesReducer'
import { formatDate } from '../utils/common'

const init = {
    data: {
        companies: [],
        totalCount: 0,
        filterCount: 0,
    },
    params: {
        sort: {
            orderBy: 'created_at',
            direction: 'desc'
        },
        paging: {
            itemPerPage: 10,
            pageIndex: 1,
            offset: 0
        }
    },
    isLoading: true
}

export const Companies = createContext(init);

export const CompaniesProvider = ({ children }) => {

    const [state, dispatch] = useReducer(CompaniesReducer, init);

    const setCompanies = useCallback((data) => {
        dispatch({
            type: actions.SET_COMPANIES,
            payload: data
        })
    }, [])

    useEffect(() => {
        if (state.isLoading) {
            (async () => {
                try {
                    const response = await fetchCompanies({ ...state.params })
                    const companies = response.data.companies.map(company => (
                        {
                            ...company,
                            created_at: formatDate(company.created_at),
                            updated_at: formatDate(company.updated_at),
                            processed_at: formatDate(company.processed_at)
                        }
                    ))

                    const totalCount = parseInt(response.data.count);
                    const filterCount = parseInt(response.data.filterCount)

                    setCompanies({
                        companies,
                        totalCount,
                        filterCount
                    });

                } catch (error) {
                    setCompanies({
                        companies: [],
                        totalCount: 0,
                        filterCount: 0
                    });
                }
            })();
        }
    }, [setCompanies, state.isLoading, state.params])

    const setFilters = (filters) => {
        dispatch({
            type: actions.SET_FILTERS,
            payload: filters
        })
    }

    const resetFilters = () => {
        dispatch({
            type: actions.RESET_FILTERS
        })
    }

    const setSearch = (fields) => {
        dispatch({
            type: actions.SET_SEARCH,
            payload: fields
        })
    }

    const resetSearch = () => {
        dispatch({
            type: actions.RESET_SEARCH
        })
    }

    const setSorting = (params) => {
        dispatch({
            type: actions.SET_SORTING,
            payload: params
        })
    }

    const setPage = (page) => {
        dispatch({
            type: actions.SET_PAGE,
            payload: page
        })
    }

    const updateCompanies = () => {
        dispatch({
            type: actions.UPDATE_COMPANIES
        })
    }

    return (
        <Companies.Provider value={{
            params: state.params,
            data: state.data,
            isLoading: state.isLoading,
            setCompanies,
            setSorting,
            setPage,
            setSearch,
            resetSearch,
            setFilters,
            resetFilters,
            updateCompanies
        }}>
            {children}
        </Companies.Provider>
    );
}
