import './hacerOferta.scss'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Button, FormControl, FormHelperText, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { sendOffer } from '../../../../api/services/viajesService'

const HacerOferta = ({viaje, id, onOfertaHecha}) => {
    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setSubmitting } = useFormik({
        initialValues: {
            oferta: ""
        },
        validationSchema: Yup.object().shape({
            oferta: Yup.number()
              .typeError('Debe ser un número')
                .positive('El precio debe ser mayor a 0')
                .required('El precio es obligatorio')
                .test(
                    'menor-que-lowerOffer',
                    'El precio debe ser menor a la oferta más baja',
                    function (value) {
                        if (viaje?.lowerOffer == null) return true // no valida si no existe lowerOffer
                        if (value < viaje.lowerOffer) return true

                        return this.createError({
                        message: `El precio debe ser menor a ${viaje.lowerOffer}`
                        })
                    }
                )
        }),
        onSubmit: async (values, actions) => {
            const response = await sendOffer(id, values.oferta)
            if(response.status === 200){
                onOfertaHecha()
            }
            actions.resetForm
        }

    })

    return (
        <section id='oferta-viaje' className="dv-section">
            <div className="dv-s-header">
                <div className="dv-s-header-title">
                    <LocalOfferIcon className='icon'/>
                    <h2>Hacer una oferta</h2>
                </div>
            </div>
            <div className="oferta">
                <FormControl className='input-price' variant="filled" error={!!errors.oferta && touched.oferta}>
                    <TextField 
                        type="number"
                        name="oferta"
                        label="Tu oferta ($)"
                        className='field-input'
                        onChange={handleChange}
                        size="small"
                        onBlur={handleBlur}
                        value={values.oferta}
                        error={!!errors.oferta && touched.oferta} 
                        aria-describedby="oferta-helper-text"
                    />
                    <FormHelperText id="oferta-helper-text">
                        {errors.oferta && touched.oferta && errors.oferta}
                    </FormHelperText>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit}>Ofertar</Button>
            </div>
        </section>
    )
}

export default HacerOferta