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
    
    const { handleSubmit, handleBlur, handleChange, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            brand: "",
            model: "",
            patent: ""
        },
        validationSchema: Yup.object().shape({
            brand: Yup.string().required("Marca requerida"),
            model: Yup.string().required("Modelo requerido"),
            patent: Yup.string().required("Patente requerida"),
        }),
        onSubmit: async (values, actions) => {
            let response
            if(id !== undefined){
                response = await editTruck(id, values)
            }else{
                response = await createTruck(values)
            }
            
            if(response.status === 200) alerta("Acción realizada", "", "success")
            else alerta("Ocurrió un error", response.data?.message, "error")

            refresh()
            closeModal()
        }
    })

    useEffect(()=>{
        if (id !== undefined) {
            const foundVehicle = vehicles.find(v => v.id === id)
            if (foundVehicle) {
                setFieldValue("brand", foundVehicle.brand || "")
                setFieldValue("model", foundVehicle.model || "")
                setFieldValue("patent", foundVehicle.patent || "")
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
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        fullWidth
                    />
                    <TextField
                        label="Modelo"
                        name="model"
                        value={values.model}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.model && Boolean(errors.model)}
                        helperText={touched.model && errors.model}
                        fullWidth
                    />
                    <TextField
                        label="Patente"
                        name="patent"
                        value={values.patent}
                        onChange={handleChange}
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