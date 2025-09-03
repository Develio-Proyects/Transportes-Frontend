import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import AddButton from '../../../components/common/AddButton/AddButton'
import EmployeeCard from '../../../components/common/EmployeeCard/EmployeeCard'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const Employees = ({employees}) => {

    return (
        <section className="data-section">
            <header className="data-header">
                <h2 className="data-title">Empleados</h2>
                <AddButton name={"Empleado"} />
                <p className="data-subtitle">Administra y organiza tu flota.</p>
            </header>

            <div className="slider-container">
                {employees?.length === 0 ? (
                    <p className="empty-message">
                        <ErrorOutlineIcon /> 
                        No hay empleados cargados todavía.
                    </p>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={2}
                        breakpoints={{
                            680: { slidesPerView: 3 },
                            900: { slidesPerView: 4 },
                            1024: { slidesPerView: 3 },
                            1180: { slidesPerView: 4 },
                            1360: { slidesPerView: 5 },
                        }}
                    >
                        {employees?.map((emp) => (
                            <SwiperSlide key={emp.id}>
                                <EmployeeCard info={emp} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}

export default Employees