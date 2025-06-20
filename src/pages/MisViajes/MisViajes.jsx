import { useSideBar } from "../../context/SideBarContext"

const MisViajes = () => {
    const {toggleSideBar} = useSideBar()
  return (
    <>
        <div>MisViajes</div>
        <button onClick={toggleSideBar} style={{marginLeft: '90%'}}>Open</button>
    </>
  )
}

export default MisViajes