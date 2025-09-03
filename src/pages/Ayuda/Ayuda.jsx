import './ayuda.scss'
import { useState } from 'react'
import MenuButton from '../../components/common/SideBarButton/MenuButton'
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
                                    <Typography component="span">¿Como funciona?</Typography>
                                </AccordionSummary>
                                <AccordionDetails className='accordion-text'>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
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
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </section>
                    <section className="comunication">
                        <h2 className="ayuda-title">Canales de comunicación</h2>
                        <div className="comunication-data">
                            <span className="data"><strong>Contacto:</strong> +54 1138554684</span>
                            <span className="data"><strong>Email:</strong> info@transporta.com</span>
                            <span className="data"><strong>Instagram:</strong> @transportarg</span>
                        </div>
                    </section>
                    {/* <section className="tutorials">
                        <h2 className="ayuda-title">Videos tutoriales</h2>
                        <div className="tutorials-container">
                            
                        </div>
                    </section> */}
                </div>
            </div>
        </main>
    )
}

export default Ayuda