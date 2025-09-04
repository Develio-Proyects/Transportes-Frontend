import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import VehicleCard from '../../../components/common/VehicleCard/VehicleCard'
import AddButton from '../../../components/common/AddButton/AddButton'
import { useModal } from '../../../context/ModalContext'
import { getTrucks } from '../../../api/services/truckService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Vehiculos = () => {
    const {openModal} = useModal()
    const [vehicles, setVehicles] = useState([])
    
    const getInfo = async () => {
        const vehiclesResponse = await getTrucks()
        if(vehiclesResponse.status == 200){
            setVehicles(vehiclesResponse.data)
        }
    }

    useEffect(()=>{
        getInfo()
    }, [])

    return (
        <section className="data-section">
            <header className="data-header">
                <h2 className='data-title'>Vehículos registrados</h2>
                <AddButton 
                    name={"Vehículo"} 
                    onClick={()=> openModal("modalTruck", {vehicles: vehicles, refresh: ()=> getInfo()})}
                />
                <p className='data-subtitle'>Gestiona los vehículos asociados a tu cuenta.</p>
            </header>
            <div className="slider-container">
                {
                    vehicles.length === 0? (
                        <p className="empty-message">
                            <ErrorOutlineIcon /> 
                            No hay vehículos cargados todavía.
                        </p>
                    ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            630: { slidesPerView: 2 },
                            990: { slidesPerView: 3 },
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3 }
                        }}
                    >
                        {vehicles.map((vec) => (
                            <SwiperSlide key={vec.id}>
                                <VehicleCard vehicle={vec} refresh={()=> getInfo()}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    )
                }
            </div>
        </section>
    )
}

export default Vehiculos