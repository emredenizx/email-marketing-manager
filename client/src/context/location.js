import React, { createContext, useEffect, useState, useCallback } from "react";
import { fetchData } from '../api/location.api'
import { map } from '../components/Location/utils'

const init = {
    options: {
        counties: [],
        citytowns: {
            addCompany: [],
            filter: []
        }
    },
    selections: {
        addCompany: {
            county: '',
            county_id: null,
            citytown: '',
            citytown_id: null
        },
        filter: {
            county: '',
            county_id: null,
            citytown: '',
            citytown_id: null
        }
    },
    isLoading: true
}

const paths = {
    counties: '/counties',
    citytowns: (id) => `/counties/${id}`
}

export const Location = createContext();

export const LocationProvider = ({ children }) => {

    const [location, setState] = useState(init);

    const setCountyOptions = useCallback((payload) => {
        setState(state => ({
            ...state,
            options: {
                ...state.options,
                counties: payload
            }
        }))
    }, [])

    useEffect(() => {
        if (location.isLoading) {
            (async () => {
                try {
                    const response = await fetchData(paths.counties);
                    setCountyOptions(map(response.data))
                } catch (error) {
                    console.log(error)
                } finally {
                    setState(state => ({
                        ...state,
                        isLoading: false
                    }))
                }
            })()
        }
    }, [setCountyOptions, location.isLoading])

    const setCitytownOptions = (type, payload) => {
        setState(state => ({
            ...state,
            options: {
                ...state.options,
                citytowns: {
                    ...state.options.citytowns,
                    [type]: payload
                }
            }
        }))
    }

    const setLocationSelection = (type, payload) => {
        setState(state => ({
            ...state,
            selections: {
                ...state.selections,
                [type]: {
                    ...state.selections[type],
                    ...payload
                }
            }
        }))
    }

    const resetLocationSelection = (type) => {
        setState(state => ({
            ...state,
            selections: {
                ...state.selections,
                [type]: init.selections[type]
            }
        }))
    }

    const resetAllLocationSelections = () => {
        setState(state => ({
            ...state,
            selections: init.selections
        }))
    }

    const updateLocations = () => {
        setState(state => ({
            ...state,
            isLoading: true
        }))
    }

    return (
        <Location.Provider value={{
            location,
            setCountyOptions,
            setCitytownOptions,
            setLocationSelection,
            resetLocationSelection,
            resetAllLocationSelections,
            updateLocations
        }}
        >
            {children}
        </Location.Provider>
    );
};