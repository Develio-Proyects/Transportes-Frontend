import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { getTrucks } from '../../../api/services/profileDataService'
import VehicleCard from '../../../components/common/VehicleCard/VehicleCard'
import AddButton from '../../../components/common/AddButton/AddButton'

const Vehiculos = () => {
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
                <AddButton name={"Vehículo"}/>
                <p className='data-subtitle'>Gestiona los vehículos asociados a tu cuenta.</p>
            </header>
            <div className="slider-container">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        630: {
                            slidesPerView: 2,
                        },
                        990: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 2,
                        },
                        1280: {
                            slidesPerView: 3,
                        },
                    }}
                >
                {vehicles.map((vec) => (
                    <SwiperSlide key={vec.id}>
                        <VehicleCard vechicle={vec} />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Vehiculos