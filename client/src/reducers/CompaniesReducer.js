import * as actions from '../context/actions'

const CompaniesReducer = (state, action) => {
    switch (action.type) {
        case actions.SET_COMPANIES:
            return {
                ...state,
                data: {
                    ...action.payload
                },
                isLoading: false
            }
        case actions.SET_SORTING:
            return {
                ...state,
                params: {
                    ...state.params,
                    sort: {
                        ...state.sort,
                        ...action.payload
                    }
                },
                isLoading: true
            }
        case actions.SET_PAGE:
            const { itemPerPage } = state.params.paging;
            const offset = (action.payload - 1) * itemPerPage;
            return {
                ...state,
                params: {
                    ...state.params,
                    paging: {
                        ...state.params.paging,
                        pageIndex: action.payload,
                        offset: offset
                    }
                },
                isLoading: true
            }
        case actions.SET_SEARCH:            
            return {
                ...state,
                params: {
                    ...state.params,
                    search: {
                        ...action.payload
                    },
                    paging: {
                        ...state.params.paging,
                        pageIndex: 1,
                        offset: 0
                    }
                },
                isLoading: true
            }
        case actions.RESET_SEARCH:
            const { search, ...restParams } = state.params;
            return {
                ...state,
                params: {
                    ...restParams,
                    paging: {
                        ...state.params.paging,
                        pageIndex: 1,
                        offset: 0
                    }
                },
                isLoading: true
            }
        case actions.SET_FILTERS:
            return {
                ...state,
                params: {
                    ...state.params,
                    filters: {
                        ...state.filters,
                        ...action.payload
                    }
                },
                isLoading: true
            }
        case actions.RESET_FILTERS:
            const { filters, ...rest } = state.params;
            return {
                ...state,
                params: {
                    ...rest,
                    paging: {
                        ...state.params.paging,
                        pageIndex: 1,
                        offset: 0
                    }
                },
                isLoading: true
            };
        case actions.UPDATE_COMPANIES:
            return {
                ...state,
                isLoading: true
            }
        default:
            return state;
    }
}

export default CompaniesReducer;