import './ayuda.scss'
import { useState } from 'react'
import MenuButton from '../../components/common/MenuButton/MenuButton'
import { useWindowResolution } from '../../hooks/useWindowResolution'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Ayuda = () => {
    const isDesktop = useWindowResolution() < 1024
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <main id='ayuda' className="main expandedContainer">
            <div className="container">
                <header className="page-header">
                    <div className="page-title">
                        <h2>Ayuda</h2>
                    </div>
                    { isDesktop && <MenuButton theme="dark"/> }
                </header>

                <div className="ayuda-container">
                    <section className="faqs">
                        <h2 className="ayuda-title">Preguntas Frecuentes</h2>
                        <div className="faqs-container">
                            <Accordion className='faq' expanded={expanded === 'faq1'} onChange={handleChange('faq1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="faq1-content"
                                    id="faq1-header"
                                >
                                    <Typography component="span">¿Cómo funciona?</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-text'>
                                    Transporta conecta a empresas o personas que necesitan trasladar cargas con transportistas disponibles en tiempo real.<br/>
                                    Solo tenés que crear una cuenta, publicar tu viaje o tu solicitud de carga, y recibir propuestas de empresas y transportes registrados.<br/>
                                    Una vez confirmado el servicio, podés seguir el recorrido y comunicarte con la empresa o transporte desde la plataforma.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='faq' expanded={expanded === 'faq2'} onChange={handleChange('faq2')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="faq2-content"
                                    id="faq2-header"
                                >
                                    <Typography component="span">¿Para quién esta destinada?</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-text'>
                                    La plataforma está pensada tanto para transportes que buscan nuevos viajes o cargas, como para particulares y empresas que necesitan enviar o trasladar productos, materiales o mercadería de forma segura y eficiente.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='faq' expanded={expanded === 'faq3'} onChange={handleChange('faq3')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="faq3-content"
                                    id="faq3-header"
                                >
                                    <Typography component="span">¿Cómo me contacto?</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-text'>
                                    Podés comunicarte con nuestro equipo de atención al cliente por los canales de comunicación indicados.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion className='faq' expanded={expanded === 'faq4'} onChange={handleChange('faq4')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="faq4-content"
                                    id="faq4-header"
                                >
                                    <Typography component="span">¿Cómo me creo una cuenta?</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-text'>
                                    Ingresá a transporta.com.ar<br/>
                                    Hacé clic en “Ingresar” y luego en “Crear cuenta”<br/>
                                    Completá tus datos personales o de empresa<br/>
                                    Confirmá tu correo electrónico<br/>
                                    ¡Listo! Ya podés comenzar a publicar o aceptar viajes.<br/>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </section>
                    <section className="comunication">
                        <h2 className="ayuda-title">Canales de comunicación</h2>
                        <div className="comunication-data">
                            <span className="data"><strong>Atención al cliente:</strong> +54 9 11 5737-8358</span>
                            <span className="data"><strong>Email:</strong> info@transporta.com.ar</span>
                            {/* <span className="data"><strong>Instagram:</strong> @transportarg</span> */}
                        </div>
                    </section>
                    <section className="tutorials">
                        <h2 className="ayuda-title">Videos tutoriales</h2>
                        <div className="tutorials-container">
                            <iframe 
                                className='tutorial-video'
                                src="https://www.youtube.com/embed/8pE1wWHQqbM" 
                                title="Tutorial" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            ></iframe>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default Ayuda