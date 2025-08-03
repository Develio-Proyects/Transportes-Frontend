import DocumentCard from '../../../components/common/DocumentCard/DocumentCard'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { useEffect, useState } from 'react'
import { getDocuemntsById } from '../../../api/services/profileDataService'
import AddButton from '../../../components/common/AddButton/AddButton'

const Documentos = ({user}) => {
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
                <AddButton name={"Documento"}/>
                <p className='data-subtitle'>Gestiona tus documentos personales y verifica su estado.</p>
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
                {documents.map((doc) => (
                    <SwiperSlide key={doc.id}>
                        <DocumentCard document={doc} />
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Documentos