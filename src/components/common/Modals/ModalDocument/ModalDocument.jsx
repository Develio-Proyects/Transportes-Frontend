import './modalDocument.scss'
import { Button, MenuItem, TextField, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import PrimaryButton from '../../PrimaryButton/PrimaryButton'
import { useModal } from '../../../../context/ModalContext'
import { useEffect, useState } from 'react'
import { DOCUMENTOS } from '../../../../api/models/documentos';
import { createDocument, editDocument } from '../../../../api/services/documentService';
import { alerta } from '../../../../utils/alerts';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1
})

const ModalDocument = ({ idUser, document, employees, refresh }) => {
    const { closeModal } = useModal()
    const [preview, setPreview] = useState(null)

    const validationSchemaFields = {
        name: Yup.string().required("Tipo documento requerido")
    }

    if (employees != null) {
        validationSchemaFields.idUser = Yup.string().required("Empleado requerido")
    }

    if (document === undefined || !document.fileLink) {
        validationSchemaFields.image = Yup.mixed().required("Documento requerido")
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setFieldValue } = useFormik({
        initialValues: {
            idUser: employees != null ? "" : idUser,
            name: "",
            image: ""
        },
        validationSchema: Yup.object().shape(validationSchemaFields),
        onSubmit: async (values, actions) => {
            let response
            if (document === undefined) {
                response = await createDocument(values)
            } else {
                response = await editDocument(document.id, values)
            }
            
            if(response.status === 200) alerta("Acción realizada", response.data.message, "success")
            else alerta("Ocurrió un error", response.data.message, "error")
         
            refresh()
            closeModal()
        }
    })

    const handleFileChange = (event) => { 
        const file = event.currentTarget.files[0] 
        if (file) { 
            setFieldValue("image", file) 
            setPreview(URL.createObjectURL(file)) 
        } 
    }

    useEffect(()=>{
        if (document !== undefined) {
            setFieldValue("idUser", document.idUser)
            setFieldValue("name", document.documentName)
            setFieldValue("image",  null)

            if (document.fileLink) {
                setPreview(document.fileLink)
            }
        }
    }, [])


    return (
        <div className="modalDocument">
            <header className="modal-header">
                <h2 className="modal-title">{document !== undefined ? "Editar documento" : "Agregar documento"}</h2>
            </header>
            <div className="modal-content">
                <form className="modal-form">
                    {employees && 
                        <TextField
                            select
                            label="Empleado"
                            name="idUser"
                            value={values.idUser || ''}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.idUser && Boolean(errors.idUser)}
                            helperText={touched.idUser && errors.idUser}
                            fullWidth
                        >
                            {Object.values(employees).map(emp => (
                                <MenuItem key={emp.id} value={emp.id}>{emp.name} {emp.lastname}</MenuItem>
                            ))}
                        </TextField>
                    }
                    <TextField
                        select
                        label="Tipo documento"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                        fullWidth
                    >
                        {Object.values(DOCUMENTOS).map(type => (
                            <MenuItem key={type} value={type}>{type}</MenuItem>
                        ))}
                    </TextField>

                    <Box className="input-file-container">
                        <Button
                            fullWidth
                            component="label"
                            variant="contained"
                            className="input-file"
                            startIcon={<CloudUploadIcon />}
                        >
                            Subir Imagen
                            <VisuallyHiddenInput
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                        {touched.image && errors.image && (
                            <Typography color="error" variant="caption" display="block" sx={{margin: '3px 14px 0'}}>
                                {errors.image}
                            </Typography>
                        )}
                    </Box>

                    {preview && (
                        <Box>
                            <Typography variant="body2">Vista previa</Typography>
                            <img
                                src={preview}
                                alt="preview"
                                style={{ width: "100%", maxHeight: "200px", objectFit: "contain", marginTop: "8px" }}
                            />
                        </Box>
                    )}
                </form>
            </div>
            <div className="modal-controls">
                <Button variant="contained" className="cancelBtn" onClick={closeModal}>
                    Cancelar
                </Button>
                <PrimaryButton onClick={handleSubmit}>
                    {document !== undefined ? "Editar" : "Agregar"}
                </PrimaryButton>
            </div>
        </div>
    )
}

export default ModalDocument