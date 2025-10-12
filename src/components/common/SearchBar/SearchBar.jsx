import './searchBar.scss'
import { Box, FormControl, FormHelperText, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useFormik } from 'formik'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { useWindowResolution } from '../../../hooks/useWindowResolution'

const SearchBarAccordion = ({ setFilters }) => {
    const isMobile = useWindowResolution() < 1200

    const formik = useFormik({
            initialValues: {
                origin: '',
                destination: '',
                departureDate: '',
            },
            onSubmit: (values) => {
                setFilters(values)
            }
    })

    const formContent = (
        <Box
            className='searchBar'
            component="form"
            onSubmit={formik.handleSubmit}
        >
        <FormControl className='search-input' error={formik.touched.origin && Boolean(formik.errors.origin)}>
            <TextField
                label="Origen"
                name="origin"
                value={formik.values.origin}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
            />
            {formik.touched.origin && formik.errors.origin && (
                <FormHelperText>{formik.errors.origin}</FormHelperText>
            )}
        </FormControl>

        <FormControl className='search-input' error={formik.touched.destination && Boolean(formik.errors.destination)}>
            <TextField
                label="Destino"
                name="destination"
                value={formik.values.destination}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
            />
            {formik.touched.destination && formik.errors.destination && (
                <FormHelperText>{formik.errors.destination}</FormHelperText>
            )}
        </FormControl>

        <FormControl className='search-input' error={formik.touched.departureDate && Boolean(formik.errors.departureDate)}>
            <TextField
                label="Fecha"
                type="date"
                name="departureDate"
                value={formik.values.departureDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                size="small"
            />
            {formik.touched.departureDate && formik.errors.departureDate && (
                <FormHelperText>{formik.errors.departureDate}</FormHelperText>
            )}
        </FormControl>

        <PrimaryButton type="submit" className="search-btn">
            Buscar
        </PrimaryButton>
        </Box>
    )

    return isMobile ? (
        <Accordion className="search-accordion">
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Filtrar viajes</Typography>
        </AccordionSummary>
        <AccordionDetails>
            {formContent}
        </AccordionDetails>
        </Accordion>
    ) : (
        formContent
    )
}

export default SearchBarAccordion
