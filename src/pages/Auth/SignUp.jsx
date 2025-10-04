import './auth.scss'
import { 
    Button, FilledInput, FormControl, FormControlLabel, FormHelperText, 
    FormLabel, IconButton, InputAdornment, InputLabel, RadioGroup 
} from '@mui/material'
import { useFormik } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Radio from '@mui/material/Radio';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { ROLESSIGNIN } from '../../api/models/roles'
import { signup } from '../../api/services/userService'
import { useLoginProcess } from '../../hooks/useLoginProcess'

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [status, setStatus] = useState(null)
    const { loginProcess } = useLoginProcess()

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => event.preventDefault()
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
    const handleMouseDownConfirmPassword = (event) => event.preventDefault()

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setSubmitting, setFieldValue } = 
    useFormik({
        initialValues: {
            role: ROLESSIGNIN.UNIPERSONAL, 
            name: '',
            lastname: '',
            documentNumber: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            role: Yup.string().required('Debe seleccionar un tipo de perfil'),
            name: Yup.string().required('Campo obligatorio'),
            lastname: Yup.string().when('role', {
                is: (tipo) => tipo === ROLESSIGNIN.FLOTA,
                then: (schema) => schema.nullable().notRequired(),
                otherwise: (schema) => schema.required('El apellido es obligatorio'),
            }),
            email: Yup.string()
                .email('El email no es válido')
                .required('Email obligatorio'),
            documentNumber: Yup.string()
                .required("Documento requerido")
                .matches(/^\d{8}$/, "Documento inválido"),
            password: Yup.string().required('Contraseña es obligatoria'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required('Campo obligatorio')
        }),
        onSubmit: async (values, actions) => {
            setSubmitting(true)
            setStatus(null)
            try {
                const dataToSend = { ...values, documentNumber: Number(values.documentNumber) }
                delete dataToSend.confirmPassword

                const response = await signup(dataToSend)
                
                if (response.status === 200) {
                    loginProcess({
                        email: values.email,
                        password: values.password
                    })
                } else {
                    setStatus('Algún campo es incorrecto')
                }
            } catch (e) {
                setStatus('Error en la autenticación - ' + e.message)
            } finally {
                setSubmitting(false)
                actions.resetForm()
            }
        }
    })

    const [isFlota, setIsFlota] = useState(values.role === ROLESSIGNIN.FLOTA)

    useEffect(() => {
        setIsFlota(values.role === ROLESSIGNIN.FLOTA)

        if (values.role === ROLESSIGNIN.FLOTA) {
            setFieldValue('lastname', '')
        }
    }, [values.role, setFieldValue])

    return (
        <div className="auth-wrapper">
            <div className="auth-container signin">
                <h2 className="auth-form-title">Crear cuenta</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    
                    {/* Tipo de perfil */}
                    <FormControl fullWidth className='tipoPerfil' error={!!errors.role && touched.role}>
                        <FormLabel id="tipo-perfil-label">Tipo de perfíl</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="tipo-perfil-label"
                            name="role"  
                            value={values.role}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        >
                            <FormControlLabel value={ROLESSIGNIN.UNIPERSONAL} control={<Radio />} label="Unipersonal" />
                            <FormControlLabel value={ROLESSIGNIN.FLOTA} control={<Radio />} label="Flota" />
                        </RadioGroup>
                        <FormHelperText>
                            {errors.role && touched.role && errors.role}
                        </FormHelperText>
                    </FormControl>

                    {/* Nombre / Razón social */}
                    <FormControl 
                        className='auth-input' 
                        fullWidth 
                        variant="filled" 
                        error={!!errors.name && touched.name}
                    >
                        <InputLabel htmlFor="filled-adornment-name">
                            {isFlota ? 'Razón social' : 'Nombre'}
                        </InputLabel>
                        <FilledInput
                            type="text"
                            name="name"
                            label="name"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={!!errors.name && touched.name}
                            aria-describedby="name-helper-text"
                        />
                        <FormHelperText id="name-helper-text">
                            {errors.name && touched.name && errors.name}
                        </FormHelperText>
                    </FormControl>

                    {/* Apellido */}
                    <FormControl 
                        className='auth-input' 
                        fullWidth 
                        variant="filled" 
                        error={!!errors.lastname && touched.lastname}
                    >
                        <InputLabel htmlFor="filled-adornment-lastname">Apellido</InputLabel>
                        <FilledInput
                            type="text"
                            name="lastname"
                            label="lastname"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastname}
                            disabled={isFlota} 
                            error={!!errors.lastname && touched.lastname}
                            aria-describedby="lastname-helper-text"
                        />
                        <FormHelperText id="lastname-helper-text">
                            {errors.lastname && touched.lastname && errors.lastname}
                        </FormHelperText>
                    </FormControl>

                    {/* Documento */}
                    <FormControl 
                        className='auth-input' 
                        fullWidth 
                        variant="filled" 
                        error={!!errors.documentNumber && touched.documentNumber}
                    >
                        <InputLabel htmlFor="filled-adornment-documentNumber">Documento</InputLabel>
                        <FilledInput
                            type="text"
                            name="documentNumber"
                            label="documentNumber"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.documentNumber}
                            error={!!errors.documentNumber && touched.documentNumber}
                            aria-describedby="documentNumber-helper-text"
                        />
                        <FormHelperText id="documentNumber-helper-text">
                            {errors.documentNumber && touched.documentNumber && errors.documentNumber}
                        </FormHelperText>
                    </FormControl>

                    {/* Email */}
                    <FormControl 
                        className='auth-input' 
                        fullWidth 
                        variant="filled" 
                        error={!!errors.email && touched.email}
                    >
                        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                        <FilledInput
                            type="text"
                            name="email"
                            label="email"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={!!errors.email && touched.email}
                            aria-describedby="email-helper-text"
                        />
                        <FormHelperText id="email-helper-text">
                            {errors.email && touched.email && errors.email}
                        </FormHelperText>
                    </FormControl>

                    {/* Contraseña */}
                    <FormControl 
                        className='auth-input' 
                        fullWidth 
                        variant="filled" 
                        error={!!errors.password && touched.password}
                    >
                        <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                        <FilledInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={!!errors.password && touched.password}
                            id="filled-adornment-password"
                            aria-describedby="password-helper-text"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="password-helper-text">
                            {errors.password && touched.password && errors.password}
                        </FormHelperText>
                    </FormControl>

                    {/* Confirmar contraseña */}
                    <FormControl
                        variant="filled"
                        className='auth-input' 
                        fullWidth
                        error={!!errors.confirmPassword && touched.confirmPassword}
                    >
                        <InputLabel htmlFor="filled-adornment-confirm-password">
                            Confirmar contraseña
                        </InputLabel>
                        <FilledInput
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            label="Confirmar contraseña"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                            error={!!errors.confirmPassword && touched.confirmPassword}
                            id="filled-adornment-confirm-password"
                            aria-describedby="confirm-password-helper-text"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownConfirmPassword}
                                    >
                                        {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="confirm-password-helper-text">
                            {errors.confirmPassword &&
                                touched.confirmPassword &&
                                errors.confirmPassword}
                        </FormHelperText>
                    </FormControl>

                    {status && (
                        <div style={{ color: 'var(--red)', margin: '.5rem 0 1rem' }}>{status}</div>
                    )}
                    
                    <Button type="submit" className="auth-btn" size="large" variant="contained">
                        Registrarse
                    </Button>
                </form>

                <span className="auth-link">
                    ¿Ya tienes una cuenta?&nbsp;
                    <Link to="/login" className="auth-link">
                        Iniciar sesión
                    </Link>
                </span>

                <Link to="/" className="comeBack-link">Volver al inicio</Link>
            </div>
        </div>
    )
}

export default SignUp