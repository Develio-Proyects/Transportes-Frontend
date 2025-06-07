import './auth.scss'
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from '../../api/services/authService';

const Login = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [status, setStatus] = useState(null)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const { handleSubmit, handleChange, handleBlur, touched, values, errors, setSubmitting } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .required('El nombre de usuario obligatorio'),
            password: Yup.string()
                .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, actions) => {
            setSubmitting(true)
            setStatus(null)
            try {
                const response = await login(values)
                
                if (response.status === 200) {
                    navigate('/perfil/mis-viajes')
                } else {
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
                <h2 className="auth-form-title text-d">Iniciar sesión</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <FormControl variant="filled" error={!!errors.username && touched.username}>
                        <InputLabel htmlFor="filled-adornment-username">Usuario</InputLabel>
                        <FilledInput
                            type="text"
                            name="username"
                            label="username"
                            className='input-login'
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

                    <FormControl variant="filled" error={!!errors.password && touched.password}>
                        <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                        <FilledInput
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            label="Password"
                            className='input-login'
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

                    {status && <div style={{color: "var(--red)", margin: ".5rem 0 1rem"}}>{status}</div>}
                    <Button type={'submit'} className="login-btn" size={"large"} variant='contained'>Ingresar</Button>
                </form>
                
                <span className="auth-link">
                    ¿No tienes cuenta?&nbsp;
                    <Link to="/signup" className="auth-link">Regístrate</Link>
                </span>
            </div>
        </div>
    )
}

export default Login