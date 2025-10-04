import { Button, TextField } from '@mui/material'
import './modalTruck.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useModal } from '../../../../context/ModalContext'
import { createTruck, editTruck } from '../../../../api/services/truckService'
import { useEffect } from 'react'
import { alerta } from '../../../../utils/alerts'

const ModalTruck = ({id, vehicles, refresh}) => {
    const {closeModal} = useModal()
    
    const { handleSubmit, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            brand: "",
            model: "",
            patent: ""
        },
        validationSchema: Yup.object().shape({
            brand: Yup.string().required("Marca requerida"),
            model: Yup.string().required("Modelo requerido"),
            patent: Yup.string()
            .matches(
                /^([A-Z]{3}-\d{3}|[A-Z]{2}-\d{3}-[A-Z]{2})$/,
                "Formato inválido. Ej: ABC-123 o AB-123-CD"
            )
            .required("Patente requerida"),
        }),
        onSubmit: async (values, actions) => {
            let response
            values.patent = values.patent.replace(/-/g, "")
            if(id !== undefined){
                response = await editTruck(id, values)
            }else{
                response = await createTruck(values)
            }
            
            if(response.status === 200) alerta("Acción realizada", response.data.message, "success")
            else alerta("Ocurrió un error", response.data.message, "error")

            refresh()
            closeModal()
        }
    })

    const handlePatentChange = (e) => {
        let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")

        if (value.length > 7) {
            value = value.slice(0, 7)
        }

        if (/^[A-Z]{3}\d{0,3}$/.test(value)) {
            if (value.length > 3) {
                value = value.slice(0, 3) + "-" + value.slice(3)
            }
        }
     
        else if (/^[A-Z]{2}\d{0,3}[A-Z]{0,2}$/.test(value)) {
            value =
                value.slice(0, 2) +
                (value.length > 2 ? "-" + value.slice(2, 5) : "") +
                (value.length > 5 ? "-" + value.slice(5) : "")
        }

        setFieldValue("patent", value.trim());
    }

    const formatPatent = (patent) => {
        if (!patent) return ""
        patent = patent.toUpperCase()
        if (/^[A-Z]{3}\d{3}$/.test(patent)) {
          return `${patent.slice(0,3)}-${patent.slice(3)}`
        } else if (/^[A-Z]{2}\d{3}[A-Z]{2}$/.test(patent)) {
          return `${patent.slice(0,2)}-${patent.slice(2,5)}-${patent.slice(5)}`
        }
        return patent
      }

    useEffect(()=>{
        if (id !== undefined) {
            const foundVehicle = vehicles.find(v => v.id === id)
            if (foundVehicle) {
                setFieldValue("brand", foundVehicle.brand || "")
                setFieldValue("model", foundVehicle.model || "")
                setFieldValue("patent", formatPatent(foundVehicle.patent) || "")
            }
        }
    }, [])


    return (
        <div className="modalTruck">
            <header className="modal-header">
                <h2 className="modal-title">{id != null ? "Editar vehículo" : "Agregar vehículo"}</h2>
            </header>
            <div className="modal-content">
                <form className="modal-form">
                    <TextField
                        label="Marca"
                        name="brand"
                        value={values.brand}
                        onChange={(e) => setFieldValue("brand", e.target.value)}
                        onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        fullWidth
                    />
                    <TextField
                        label="Modelo"
                        name="model"
                        value={values.model}
                        onChange={(e) => setFieldValue("model", e.target.value)}
                        onBlur={handleBlur}
                        error={touched.model && Boolean(errors.model)}
                        helperText={touched.model && errors.model}
                        fullWidth
                    />
                    <TextField
                        label="Patente"
                        name="patent"
                        value={values.patent}
                        onChange={handlePatentChange}
                        onBlur={handleBlur}
                        error={touched.patent && Boolean(errors.patent)}
                        helperText={touched.patent && errors.patent}
                        fullWidth
                    />
                </form>
            </div>
            <div className="modal-controls">
                <Button variant="contained" className="cancelBtn" onClick={closeModal}>
                    Cancelar
                </Button>
                <PrimaryButton onClick={handleSubmit}>
                    {id != null ? "Editar" : "Agregar"}
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ModalTruck