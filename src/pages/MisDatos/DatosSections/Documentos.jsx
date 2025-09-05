import 'swiper/css'
import 'swiper/css/navigation'
import DocumentCard from '../../../components/common/DocumentCard/DocumentCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import AddButton from '../../../components/common/AddButton/AddButton'
import { getDocuemntsById } from '../../../api/services/documentService'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { useModal } from '../../../context/ModalContext'

const Documentos = ({user, employees}) => {
    const {openModal} = useModal()
    const [documents, setDocuemnts] = useState([])
    
    const getInfo = async () => {
        const documentsResponse = await getDocuemntsById(user?.id)
        setDocuemnts(documentsResponse.data)
    }

    useEffect(()=>{
        getInfo()
    }, [])

    return (
        <section className="data-section">
            <header className="data-header">
                <h2 className='data-title'>Documentos</h2>
                <AddButton 
                    name={"Documento"} 
                    onClick={()=> openModal("modalDocument", {idUser: user.id, employees: employees, refresh: ()=> getInfo()})}
                />
                <p className='data-subtitle'>Gestiona tus documentos personales y verifica su estado.</p>
            </header>
            <div className="slider-container">
                {documents?.length === 0 ? (
                    <p className="empty-message">
                        <ErrorOutlineIcon className='icon'/> 
                        No hay documentos cargados todavía.
                    </p>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={16}
                        slidesPerView={1}
                        breakpoints={{
                            630: { slidesPerView: 2},
                            990: { slidesPerView: 3 },
                            1024: { slidesPerView: 2 },
                            1280: { slidesPerView: 3 }
                        }}
                    >
                        {documents.map((doc) => (
                            <SwiperSlide key={doc.id}>
                                <DocumentCard document={doc} employees={employees} refresh={() => getInfo()}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    )
}

export default Documentos