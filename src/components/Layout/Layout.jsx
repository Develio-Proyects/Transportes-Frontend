import Header from './Header/Header'
import Footer from './Footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div id="start">
        <Header />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Layout