import './auth.scss'
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useLoginProcess } from '../../hooks/useLoginProcess';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState(null)
    const { loginProcess } = useLoginProcess()

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setSubmitting } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email('El correo electrónico no es válido')
                .required('El correo electrónico es obligatorio'),
            password: Yup.string()
                .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, actions) => {
            setSubmitting(true)
            setStatus(null)
            try {
                const response = loginProcess(values)
                if(response.status !== 200){
                    setStatus('Usuario o contraseña incorrecta')
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
                <h2 className="auth-form-title">Iniciar sesión</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormControl className='auth-input' variant="filled" error={!!errors.email && touched.email}>
                        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                        <FilledInput
                            type="text"
                            name="email"
                            label="email"
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

                    <FormControl className='auth-input' variant="filled" error={!!errors.password && touched.password}>
                        <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                        <FilledInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
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

                    {status && <span className='error'>{status}</span>}
                    <Button type={'submit'} className="auth-btn" size={"large"} variant='contained'>Ingresar</Button>
                </form>
                
                <span className="auth-link">
                    ¿No tienes cuenta?&nbsp;
                    <Link to="/signup" className="auth-link">Regístrate</Link>
                </span>

                <Link to="/" className="comeBack-link">Volver al inicio</Link>
            </div>
        </div>
    )
}

export default Login