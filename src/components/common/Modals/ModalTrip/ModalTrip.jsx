import './modalTrip.scss'
import { useModal } from "../../../../context/ModalContext"
import { Box, MenuItem, TextField } from "@mui/material"
import { useFormik } from 'formik'
import * as Yup from "yup"
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { createTrip, updateTrip } from '../../../../api/services/viajesService'
import { getBackName, TIPO_CARGA } from '../../../../api/models/tipoCarga'
import { alerta } from '../../../../utils/alerts'
import { useEffect } from 'react'
import { TIPO_UNIDAD } from '../../../../api/models/tipoUnidad'

const cargoTypes = Object.values(TIPO_CARGA).map(tipo => tipo.frontName)
const unitTypes = Object.values(TIPO_UNIDAD)

const ModalTrip = ({ refresh, id, viaje, edit }) => {
    const { closeModal } = useModal()

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            origin: "",
            destination: "",
            departureDate: "",
            basePrice: "",
            cargoType: "",
            unitType: "",
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
            basePrice: edit
                ? Yup.number().min(0) 
                : Yup.number().min(0).required("Precio requerido"),
            cargoType: Yup.string().required("Tipo requerido"),
            unitType: Yup.string().required("Tipo de unidad requerido"),
            weight: Yup.number().min(0).required("Peso requerido"),
            dimensions: Yup.object({
                width: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Ancho requerido"),
                high: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Alto requerido"),
                long: Yup.number().min(0, "Debe ser mayor o igual a 0").required("Largo requerido")
            }),
            observations: Yup.string().max(255, "Máximo 255 caracteres")
        }),
        onSubmit: async (values) => {
            const payload = {
                origin: values.origin,
                destination: values.destination,
                departureDate: new Date(values.departureDate).toISOString(),
                cargoType: getBackName(values.cargoType),
                unitType: values.unitType,
                weight: Number(values.weight),
                dimensions: {
                    width: Number(values.dimensions.width),
                    high: Number(values.dimensions.high),
                    long: Number(values.dimensions.long)
                },
                observations: values.observations
            }

            if (!edit || values.basePrice) {
                payload.basePrice = Number(values.basePrice)
            }
            
            const response = edit
                ? await updateTrip(id, payload)
                : await createTrip(payload)

            if (response.status === 200) {
                alerta(edit ? "Publicación actualizada" : "Publicación creada", response.data.message, "success")
                refresh()
            } else {
                alerta("Ocurrió un error", response.data.message, "error")
            }
            closeModal()
        }
    })

    useEffect(() => {
        if (edit && viaje) {
            setFieldValue("origin", viaje.origin || "")
            setFieldValue("destination", viaje.destination || "")
            setFieldValue("departureDate", viaje.departureDate.substring(0,10) || "")
            setFieldValue("cargoType", viaje.cargoType || "")
            setFieldValue("unitType", viaje.unitType || "");
            setFieldValue("weight", viaje.weight || "")
            setFieldValue("dimensions", viaje.dimensions || { width: '', high: '', long: '' })
            setFieldValue("observations", viaje.observations || "")
        }
    }, [])

    const disabledFields = edit ? ["basePrice"] : []
    const isDisabled = (field) => disabledFields.includes(field)

    return (
        <div className="modalTrip">
            <h2 className='modal-title'>{edit ? "Editar publición" : "Crear publición"}</h2>
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
                    label="Fecha de carga"
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
                    disabled={isDisabled("basePrice")}
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
                    select
                    label="Tipo de unidad"
                    name="unitType"
                    value={values.unitType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.unitType && errors.unitType}
                    helperText={touched.unitType && errors.unitType}
                    fullWidth
                >
                    {unitTypes.map(type => (
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
                    {edit ? "Guardar cambios" : "Publicar viaje"}
                </PrimaryButton>
            </form>
        </div>
    )
}

export default ModalTrip