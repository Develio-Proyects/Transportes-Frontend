import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SideBarProvider = ({children}) => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSideBar = () => {
        setIsOpen(!isOpen);
    }

    const closeSidebar = () => {
        if (isOpen) {
            setIsOpen(false);
        }
    }

    return (
        <SidebarContext.Provider value={{
            isOpen,
            toggleSideBar,
            closeSidebar
        }}>
            {children}
        </SidebarContext.Provider>
    )
}

export const useSideBar = () => useContext(SidebarContext)