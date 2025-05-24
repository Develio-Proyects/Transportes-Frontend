import './whyChooseUsSection.scss'
import { Link } from "react-router-dom"

const WhyChooseUsSection = () => {
    return (
        <div className="expandedCotainer">
            <div className="container">
                <section className="whyChooseUs">
                    <section className="whyChooseUsSection">
                        <div className="whyChooseUsImg">
                            <img src="/whyEmpresa.jpg" alt="" />
                        </div>
                        <div className="whyChooseUsText">
                            <h2 className='text-d'>Por qué elegirnos como empresa</h2>
                            <ul>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Compará precios y elegí la mejor oferta.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Accedé a perfiles con historial y reputación.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Publicá un viaje y recibí propuestas al instante.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Encontrá transportes en todo el país.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Gestioná todos tus envíos desde un solo lugar.
                                </li>
                            </ul>
                            <Link to="/signUp">
                                Empezá ahora
                            </Link>
                        </div>
                    </section>
                    <section className="whyChooseUsSection">
                        <div className="whyChooseUsImg">
                            <img src="/whyConductor.jpg" alt="" />
                        </div>
                        <div className="whyChooseUsText">
                            <h2 className='text-d'>Por qué elegirnos como conductor</h2>
                            <ul>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Accedé a múltiples viajes todos los días.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Proponé tu precio y negociá directo.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Mejorá tu perfil y conseguí más trabajo.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Elegí viajes según tu zona y disponibilidad.
                                </li>
                                <li className='text-d'>
                                    <span className='lineMark'></span>
                                    Conectá con empresas sin intermediarios.
                                </li>
                            </ul>
                            <Link to="/signUp">Sumate Hoy</Link>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default WhyChooseUsSection