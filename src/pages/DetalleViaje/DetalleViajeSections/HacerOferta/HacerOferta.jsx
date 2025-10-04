import './hacerOferta.scss'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Button, FormControl, FormHelperText, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { sendOffer } from '../../../../api/services/viajesService'
import { alerta } from '../../../../utils/alerts'

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
                        if (!value) return true

                        let limite = null

                        if (viaje?.lowerOffer != null) {
                            limite = viaje.lowerOffer
                        } else if (viaje?.initialPrice != null) {
                            limite = viaje.initialPrice
                        }

                        if (limite == null) return true
                        if (value < limite) return true

                        return this.createError({
                            message: `El precio debe ser menor a ${limite}`
                        })
                    }
                )
        }),
        onSubmit: async (values, actions) => {
            const response = await sendOffer(id, values.oferta)
            if(response.status === 200){
                alerta("Oferta realizada", response.data.message, "success")
                onOfertaHecha()
            } 
            else alerta("Ocurrió un error", response.data.message, "error")
            actions.resetForm()
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