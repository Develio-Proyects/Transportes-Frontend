import './detalleTransporte.scss'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllInfoUserById } from '../../api/services/userService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Button } from '@mui/material'
import { ROLES } from '../../api/models/roles'
import { useModal } from '../../context/ModalContext'

const DetalleTransporte = () => {
    const { id } = useParams()
    const location = useLocation()
    const isDesktop = useWindowResolution() < 1024
    const [infoUser, setInfoUser] = useState()
    const {openModal} = useModal()
    const from = location.state?.from ?? "/viajes"
    
    const fetchInfo = async () => {
        const response = await getAllInfoUserById(id)
        if(response.status === 200){
            setInfoUser(response.data)
        }
    }

    useEffect(()=>{
        fetchInfo()
    }, [])

    return (
        <main id='detalle-usuario' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <Link to={from}><KeyboardBackspaceIcon /></Link>
                        <h2>Detalle transporte</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>
                <div className="section-container">

                    <section id='transport-info' className='data-section'>
                        <AccountCircleIcon className='icon'/>
                        <span className="t-fullname">{infoUser.name}</span>
                        <span className='t-role'>{infoUser.rol}</span>
                    </section>

                    <section id='transport-documents' className='data-section'>
                        <h3 className="section-title">Documentos</h3>
                        <div className="slider-container">
                            {infoUser?.documents?.length === 0 ? (
                                <p className="empty-message">
                                    <ErrorOutlineIcon className='icon'/> 
                                    No hay documentos cargados todavía.
                                </p>
                            ) : (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={16} 
                                    className='swiper-slider'
                                    slidesPerView={1}
                                    breakpoints={{
                                        630: { slidesPerView: 2},
                                        990: { slidesPerView: 3 },
                                        1024: { slidesPerView: 2 },
                                        1280: { slidesPerView: 3 }
                                    }}
                                >
                                    {infoUser?.documents.map((doc) => (
                                        <SwiperSlide key={doc.id}>
                                            <div className="t-doc-card">
                                                <div className="doc-info">
                                                    <span className="doc-name">{doc.documentName}</span>
                                                    {infoUser.rol === ROLES.FLOTA &&
                                                        <span className="doc-user-name">{doc.name} {doc.lastname}</span>
                                                    }
                                                </div>
                                                <Button 
                                                    variant='contained' 
                                                    className='watchBtn' 
                                                    onClick={()=>openModal("modalDocumentImage", {
                                                        img: doc.fileLink
                                                    })}
                                                >
                                                    Ver
                                                </Button>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </section>
                    <section id='transport-trucks' className='data-section'>
                        <h3 className="section-title">Vehículos</h3>
                        <div className="slider-container">
                            {infoUser?.trucks?.length === 0 ? (
                                <p className="empty-message">
                                    <ErrorOutlineIcon className='icon'/> 
                                    No hay vehículos cargados todavía.
                                </p>
                            ) : (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={16}
                                    className='swiper-slider'
                                    slidesPerView={1}
                                    breakpoints={{
                                        630: { slidesPerView: 2},
                                        990: { slidesPerView: 3 },
                                        1024: { slidesPerView: 2 },
                                        1280: { slidesPerView: 3 }
                                    }}
                                >
                                    {infoUser?.trucks.map((truck) => (
                                        <SwiperSlide key={truck.id}>
                                            <div className="t-truck-card">
                                                <span className="truck-name">{truck.brand}</span>
                                                <span className="truck-model">{truck.model}</span>
                                                <span className="patent">{truck.patent}</span>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </section>
                    <section id='transport-trips' className='data-section'>
                        <h3 className="section-title">Viajes completados</h3>
                        <div className="slider-container">
                            {infoUser?.completedTrips?.length === 0 ? (
                                <p className="empty-message">
                                    <ErrorOutlineIcon className='icon'/> 
                                    No hay viajes completados todavía.
                                </p>
                            ) : (
                                <Swiper
                                    modules={[Navigation]}
                                    spaceBetween={16}
                                    className='swiper-slider'
                                    slidesPerView={1}
                                    breakpoints={{
                                        630: { slidesPerView: 2},
                                        990: { slidesPerView: 3 },
                                        1024: { slidesPerView: 2 },
                                        1280: { slidesPerView: 3 }
                                    }}
                                >
                                    {infoUser?.completedTrips.map((trip) => (
                                        <SwiperSlide key={trip.id}>
                                            <div className="t-trip-card">
                                                <span className='date'>{trip.departureDate.substring(0,10)}</span>
                                                <span className='origin'><strong>Origen: </strong> {trip.origin}</span>
                                                <span className='destination'><strong>Destino: </strong> {trip.destination}</span>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default DetalleTransporte