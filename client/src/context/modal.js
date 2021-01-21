import React, { useReducer, createContext } from "react";
import ModalReducer from '../reducers/ModalReducer'
import * as actions from '../context/actions'

const init = {
  display: false,
  action: '',
  title: '',
  content: {
    data: {},
    fields: []
  },
  api: () => { },
  validation: () => { }
}

export const Modal = createContext();

export const ModalProvider = ({ children }) => {

  const [modal, dispatch] = useReducer(ModalReducer, init);

  const displayModal = (status) => {
    dispatch({
      type: actions.TOGGLE_MODAL,
      payload: status
    })
  }

  const setModal = (content) => {
    dispatch({
      type: actions.SET_MODAL,
      payload: content
    })
  }

  const resetModal = () => {
    const{display, ...rest} = init;
    dispatch({
      type: actions.RESET_MODAL,
      payload: rest
    })
  }

  return (
    <Modal.Provider value={{
      modal: modal,
      displayModal,
      setModal,
      resetModal
    }}
    >
      {children}
    </Modal.Provider>
  );
};