import './modalTrip.scss'
import { useModal } from "../../../../context/ModalContext"
import { Box, MenuItem, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { createTrip } from '../../../../api/services/viajesService'
import { getBackName, TIPO_CARGA } from '../../../../api/models/tipoCarga'

const cargoTypes = Object.values(TIPO_CARGA).map(tipo => tipo.frontName)

const ModalTrip = ({ onTripCreated }) => {
    const { closeModal } = useModal()

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setSubmitting } = useFormik({
        initialValues: {
            origin: "",
            destination: "",
            departureDate: "",
            basePrice: "",
            cargoType: cargoTypes[0],
            weight: "",
              dimensions: {
                width: 0,
                high: 0,
                long: 0
            },
            observations: ""
        },
        validationSchema: Yup.object().shape({
            origin: Yup.string().required("Origen requerido"),
            destination: Yup.string().required("Destino requerido"),
            departureDate: Yup.date()
                .required("Fecha requerida")
                .min(new Date(), "La fecha no puede ser anterior a hoy")
                .max(
                    new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                    "La fecha no puede superar 1 año desde hoy"
                ),
            basePrice: Yup.number().min(0).required("Precio requerido"),
            cargoType: Yup.string().required("Tipo requerido"),
            weight: Yup.number().min(0).required("Peso requerido"),
            dimensions: Yup.object({
                width: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Ancho requerido"),
                high: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Alto requerido"),
                long: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Largo requerido")
            }),
            observations: Yup.string()
        }),
        onSubmit: async (values, actions) => {
            const payload = {
                origin: values.origin,
                destination: values.destination,
                departureDate: new Date(values.departureDate).toISOString(),
                basePrice: Number(values.basePrice),
                cargoType: getBackName(values.cargoType),
                weight: Number(values.weight),
                dimensions: {
                  width: Number(values.dimensions.width),
                  high: Number(values.dimensions.high),
                  long: Number(values.dimensions.long)
                },
                observations: values.observations
            }
            const response = await createTrip(payload)
            if(response.status === 200){
                onTripCreated()
            }
            closeModal()
        }
    })

    return (
        <div className="modalTrip">
            <h2 className='modal-title'>Crear publición</h2>
            <form onSubmit={handleSubmit} className="modal-form">
                <TextField
                    label="Origen"
                    name="origin"
                    value={values.origin}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.origin && errors.origin}
                    helperText={touched.origin && errors.origin}
                    fullWidth
                />
                <TextField
                    label="Destino"
                    name="destination"
                    value={values.destination}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.destination && errors.destination}
                    helperText={touched.destination && errors.destination}
                    fullWidth
                />
                <TextField
                    type='date'
                    label="Fecha de salida"
                    name="departureDate"
                    value={values.departureDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.departureDate && errors.departureDate}
                    helperText={touched.departureDate && errors.departureDate}
                    fullWidth
                    slotProps={{
                        inputLabel: { shrink: true }
                    }}
                />
                <TextField
                    label="Precio base"
                    name="basePrice"
                    value={values.basePrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.basePrice && errors.basePrice}
                    helperText={touched.basePrice && errors.basePrice}
                    fullWidth
                />
                <TextField
                    select
                    label="Tipo de carga"
                    name="cargoType"
                    value={values.cargoType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.cargoType && errors.cargoType}
                    helperText={touched.cargoType && errors.cargoType}
                    fullWidth
                >
                    {cargoTypes.map(type => (
                        <MenuItem key={type} value={type}>{type}</MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Peso (kg)"
                    name="weight"
                    type="number"
                    value={values.weight}
                    onChange={handleChange}
                    error={touched.weight && errors.weight}
                    helperText={touched.weight && errors.weight}
                    fullWidth
                />
                <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                    <TextField
                        label="Ancho (m)"
                        name="dimensions.width"
                        type='number'
                        value={values.dimensions?.width}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dimensions?.width && errors.dimensions?.width}
                        helperText={touched.dimensions?.width && errors.dimensions?.width}
                    />
                    <TextField
                        label="Alto (m)"
                        name="dimensions.high"
                        type='number'
                        value={values.dimensions?.high}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dimensions?.high && errors.dimensions?.high}
                        helperText={touched.dimensions?.high && errors.dimensions?.high}
                    />
                    <TextField
                        label="Largo (m)"
                        name="dimensions.long"
                        value={values.dimensions?.long}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dimensions?.long && errors.dimensions?.long}
                        helperText={touched.dimensions?.long && errors.dimensions?.long}
                    />
                </Box>
                <TextField
                    label="Observaciones"
                    name="observations"
                    value={values.observations}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.observations && errors.observations}
                    helperText={touched.observations && errors.observations}
                    fullWidth
                    multiline
                    maxRows={4}
                />
                <PrimaryButton type="submit">
                    Publicar viaje
                </PrimaryButton>
            </form>
        </div>
    )
}

export default ModalTrip