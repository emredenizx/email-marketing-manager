import * as actions from '../context/actions'

const ModalReducer = (state, action) => {
    switch (action.type) {
        case actions.TOGGLE_MODAL:
            return {
                ...state,
                display: action.payload
            };
        case actions.SET_MODAL:
            return {
                ...state,
                display: true,
                ...action.payload
            };
        case actions.RESET_MODAL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default ModalReducer;