import '../ModalTruck/modalTruck.scss'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useModal } from '../../../../context/ModalContext'
import { updatePassword } from '../../../../api/services/authService'
import { alerta } from '../../../../utils/alerts'

const ModalPassword = () => {
    const {closeModal} = useModal()
    
    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: ""
        },
        validationSchema: Yup.object().shape({
            oldPassword: Yup.string()
                .required("La contraseña actual es requerida"),
                // .min(6, "La contraseña debe tener al menos 6 caracteres"),
            newPassword: Yup.string()
                .required("La nueva contraseña es requerida")
                // .min(8, "La contraseña debe tener al menos 8 caracteres")
                // .matches(
                //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                //     "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
                // )
                .notOneOf(
                    [Yup.ref('oldPassword')], 
                    "La nueva contraseña no puede ser igual a la anterior"
                )
        }),
        onSubmit: async (values, actions) => {
            const response = await updatePassword(values)
            
            if(response.status === 200) alerta("Acción realizada", response.data.message, "success")
            else alerta("Ocurrió un error", response.data.message, "error")
            
            closeModal()
        }
    })

    return (
        <div className="modalTruck">
            <header className="modal-header">
                <h2 className="modal-title">Actualización de contraseña</h2>
            </header>
            <div className="modal-content">
                <form className="modal-form">
                    <TextField
                        label="Contraseña anterior"
                        name="oldPassword"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.brand && Boolean(errors.brand)}
                        helperText={touched.brand && errors.brand}
                        fullWidth
                    />
                    <TextField
                        label="Nueva contraseña"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
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

export default ModalPassword