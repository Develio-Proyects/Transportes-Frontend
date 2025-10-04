import '../ModalTruck/modalTruck.scss'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useModal } from '../../../../context/ModalContext'
import { createEmployee } from '../../../../api/services/employeeService'
import { alerta } from '../../../../utils/alerts'

const ModalEmployee = ({refresh}) => {
    const {closeModal} = useModal()
    
    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            name: "",
            lastname: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Nombre requerido"),
            lastname: Yup.string().required("Apellido requerido")
        }),
        onSubmit: async (values, actions) => {
            const response = await createEmployee(values);
                
            if(response.status === 200) alerta("Acción realizada", response.data.message, "success")
            else alerta("Ocurrió un error", response.data.message, "error")
        
            refresh()
            closeModal()
        }
    })

    return (
        <div className="modalTruck">
            <header className="modal-header">
                <h2 className="modal-title">Agregar empleado</h2>
            </header>
            <div className="modal-content">
                <form className="modal-form">
                    <TextField
                        label="Nombre"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                    />
                    <TextField
                        label="Apellido"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lastname && Boolean(errors.lastname)}
                        helperText={touched.lastname && errors.lastname}
                        fullWidth
                    />
                </form>
            </div>
            <div className="modal-controls">
                <Button variant="contained" className="cancelBtn" onClick={closeModal}>
                    Cancelar
                </Button>
                <PrimaryButton onClick={handleSubmit}>
                    Confirmar
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ModalEmployee