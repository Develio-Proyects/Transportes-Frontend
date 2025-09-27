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
                            <h2>Por qué elegirnos como Flota</h2>
                            <ul>
                                <li>
                                    <span className='lineMark'></span>
                                    Gestiona vehículos y conductores en un solo lugar.
                                </li>
                                <li>
                                    <span className='lineMark'></span>
                                    Crea, asigna y hace seguimiento de los viajes.
                                </li>
                                <li>
                                    <span className='lineMark'></span>
                                    Postúlate a viajes de otras flotas y aprovecha mejor la flota.
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section className="whyChooseUsSection">
                        <div className="whyChooseUsImg">
                            <img src="/whyConductor.jpg" alt="" />
                        </div>
                        <div className="whyChooseUsText">
                            <h2>Por qué elegirnos como Transportista</h2>
                            <ul>
                                <li>
                                    <span className='lineMark'></span>
                                    Administra su vehículo y disponibilidad.
                                </li>
                                <li>
                                    <span className='lineMark'></span>
                                    Postúlate a viajes publicados por flotas.
                                </li>
                                <li>
                                    <span className='lineMark'></span>
                                    Controla y sigue el estado de cada viaje hasta su finalización.
                                </li>
                            </ul>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    )
}

export default WhyChooseUsSection