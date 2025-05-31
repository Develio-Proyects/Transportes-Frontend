import './auth.scss'
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../api/services/authService'
import * as Yup from 'yup'
import { ROLES } from '../../api/models/roles'

const SignUp = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [status, setStatus] = useState(null)
    const [tipoPerfil, setTipoPerfil] = useState(null)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)
    const handleMouseDownConfirmPassword = (event) => {
        event.preventDefault()
    }

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        setSubmitting
    } = useFormik({
        initialValues: {
            tipoPerfil: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object().shape({
            tipoPerfil: Yup.string().required('Debes seleccionar un tipo de perfil'),
            username: Yup.string().required('El nombre de usuario obligatorio'),
            email: Yup.string()
                .email('El correo electrónico no es válido')
                .required('El correo electrónico es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required('Campo obligatorio')
        }),
        onSubmit: async (values, actions) => {
            setSubmitting(true)
            setStatus(null)
            try {
                const response = await signup(values)
                if (response.status === 200) {
                    navigate('/perfil')
                } else {
                    setStatus('Algún campo es incorrecto')
                }
            } catch (e) {
                setStatus('Error en la autenticación -' + e.message)
            } finally {
                setSubmitting(false)
                actions.resetForm()
            }
        }
    })

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <h2 className="auth-form-title">Registrarse</h2>
                <div className="type-profile-select">
                    <button 
                        type="button"
                        className={"profile-btn" + (values.tipoPerfil === ROLES.FLETERO ? ' active' : '') + (errors.tipoPerfil && touched.tipoPerfil ? ' error' : '')}
                        onClick={() => handleChange({ target: { name: 'tipoPerfil', value: ROLES.FLETERO } })}
                    >
                        Fletero
                    </button>

                    <button 
                        type="button"
                        className={"profile-btn" + (values.tipoPerfil === ROLES.TRANSPORTE ? ' active' : '') + (errors.tipoPerfil && touched.tipoPerfil ? ' error' : '')} 
                        onClick={() => handleChange({ target: { name: 'tipoPerfil', value: ROLES.TRANSPORTE } })}
                    >
                        Transporte
                    </button>

                    {errors.tipoPerfil && touched.tipoPerfil && (
                        <div className="type-profile-error">{errors.tipoPerfil}</div>
                    )}
                </div>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormControl variant="filled" error={!!errors.username && touched.username}>
                        <InputLabel htmlFor="filled-adornment-username">Nombre</InputLabel>
                        <FilledInput
                            type="text"
                            name="username"
                            label="username"
                            className="input-login"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            error={!!errors.username && touched.username}
                            aria-describedby="username-helper-text"
                        />
                        <FormHelperText id="username-helper-text">
                            {errors.username && touched.username && errors.username}
                        </FormHelperText>
                    </FormControl>

                    <FormControl variant="filled" error={!!errors.email && touched.email}>
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

                    <FormControl variant="filled" error={!!errors.password && touched.password}>
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

                    <FormControl
                        variant="filled"
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
                    <Button type="submit" className="login-btn" size="large" variant="contained">
                        Ingresar
                    </Button>
                </form>

                <span className="auth-link">
                    ¿Ya tienes una cuenta?&nbsp;
                    <Link to="/login" className="auth-link">
                        Iniciar sesión
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default SignUp