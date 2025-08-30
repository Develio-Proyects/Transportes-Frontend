import { Button, TextField } from '@mui/material'
import './modalTruck.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useModal } from '../../../../context/ModalContext'

const ModalTruck = () => {
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
            values.patent = values.patent.replace(/-/g, "")

            
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

    return (
        <div className="modalTruck">
            <header className="modal-header">
                <h2 className="modal-title">Agregar vehículo</h2>
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
                    Agregar
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ModalTruck