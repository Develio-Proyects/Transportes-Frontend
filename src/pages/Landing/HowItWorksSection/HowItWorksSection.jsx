import './howItWorksSection.scss'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ApartmentIcon from '@mui/icons-material/Apartment';
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from 'react';

const HowItWorksSection = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className="expandedCotainer howItWorksBackground">
            <div className="container howItWorksContainer">
                <div className="howItWorkIntro">
                    <span className='lineMark'></span>
                    <h2 className='text-d'>Como funciona TuTransporte?</h2>
                    <p className='text-d'>Facilitamos la logística al vincular empresas que necesitan enviar productos con conductores listos para transportarlos. Todo en una experiencia eficiente y segura.</p>
                </div>
                <div className="howItWorksInfo">
                    <Accordion className='howItWorksAccordion' expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component="span" className='text-d'><ApartmentIcon className='accordion-icon'/> Para empresas</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='text-d accordion-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='howItWorksAccordion' expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span" className='text-d'><LocalShippingIcon className='accordion-icon'/> Para conductores</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='text-d accordion-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className='howItWorksAccordion' expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            <Typography component="span" className='text-d'><HttpsIcon className='accordion-icon'/> Pago seguro</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='text-d accordion-text'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default HowItWorksSection