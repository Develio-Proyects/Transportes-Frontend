import './searchBar.scss'
import { Box, FormControl, FormHelperText, TextField, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useFormik } from 'formik'
import PrimaryButton from '../PrimaryButton/PrimaryButton'
import { useWindowResolution } from '../../../hooks/useWindowResolution'

const SearchBarAccordion = ({ onSearch }) => {
    const isMobile = useWindowResolution() < 1200

    const formik = useFormik({
            initialValues: {
                origen: '',
                destino: '',
                fecha: '',
            },
            onSubmit: (values) => {
                onSearch(values)
            }
    })

    const formContent = (
        <Box
            className='searchBar'
            component="form"
            onSubmit={formik.handleSubmit}
        >
        <FormControl className='search-input' error={formik.touched.origen && Boolean(formik.errors.origen)}>
            <TextField
                label="Origen"
                name="origen"
                value={formik.values.origen}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
            />
            {formik.touched.origen && formik.errors.origen && (
                <FormHelperText>{formik.errors.origen}</FormHelperText>
            )}
        </FormControl>

        <FormControl className='search-input' error={formik.touched.destino && Boolean(formik.errors.destino)}>
            <TextField
                label="Destino"
                name="destino"
                value={formik.values.destino}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="small"
            />
            {formik.touched.destino && formik.errors.destino && (
                <FormHelperText>{formik.errors.destino}</FormHelperText>
            )}
        </FormControl>

        <FormControl className='search-input' error={formik.touched.fecha && Boolean(formik.errors.fecha)}>
            <TextField
                label="Fecha"
                type="date"
                name="fecha"
                value={formik.values.fecha}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                slotProps={{
                    inputLabel: { shrink: true }
                }}
                size="small"
            />
            {formik.touched.fecha && formik.errors.fecha && (
                <FormHelperText>{formik.errors.fecha}</FormHelperText>
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
