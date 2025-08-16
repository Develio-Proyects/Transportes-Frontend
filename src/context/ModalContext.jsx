import { createContext, useCallback, useContext, useState } from "react"

const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [modalState, setModalState] = useState({
        modalName: null,
        modalProps: {}
    })

    const openModal = useCallback((name, props = {}) => {
        setModalState({
            modalName: name,
            modalProps: props
        })
    }, [])

    const closeModal = useCallback(() => {
        setModalState({
            modalName: null,
            modalProps: {}
        })
    }, [])

    return (
        <ModalContext.Provider value={{
            ...modalState,
            openModal,
            closeModal
        }}>
            {children}
        </ModalContext.Provider>    
    )
}

export const useModal = () => useContext(ModalContext)