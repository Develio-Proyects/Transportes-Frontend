import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'
import { ModalContainer } from '../common/Modals/ModalContainer'

const Layout = () => {
  return (
    <div id="start">
        <Header />
        <Outlet />
        <ModalContainer />
        <Footer />
    </div>
  )
}

export default Layout