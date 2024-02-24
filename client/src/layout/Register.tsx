import React, { useState } from 'react'
import {
    useLocation,
    useNavigate
} from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CircularProgress
} from '@mui/material'
import Box from '@mui/material/Box'
import {
    Form, required,
    TextInput,
    useLogin,
    useNotify
} from 'react-admin'
import { registration } from '../services/registration'
import { type FormValues } from '../types'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({ email: null, password: null })

    const notify = useNotify()
    const login = useLogin()
    const location = useLocation()
    const navigate = useNavigate()

    const handleRouteLogin = () => {
        navigate('/login')
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (auth: FormValues) => {
        setLoading(true)
        registration(auth)
            .then(async () => {
                return await login(
                    auth,
                    location.state != null ? (location.state).nextPathname : '/'
                )
            })
            .then(() => {
                setLoading(false)
                notify('You have successfully registered', { type: 'success' })
            })
            .catch((error: any) => {
                setLoading(false)
                notify(
                    typeof error === 'string'
                        ? error
                        : (typeof error === 'undefined' || error.message != null)
                            ? 'ra.auth.sign_in_error'
                            : error.message,
                    {
                        type: 'error',
                        messageArgs: {
                            _:
                                typeof error === 'string'
                                    ? error
                                    : error?.message ?? undefined
                        }
                    }
                )
            })
    }

    const validateUserLogin = (values: FormValues) => {
        const errors: any = {}
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (values.email === null || values.email === undefined) {
            errors.email = 'ra.validation.required'
        } else if (values.email !== undefined && !regexEmail.test(values.email)) {
            errors.email = 'ra.validation.email'
        }
        if (values.password === null || values.password === undefined) {
            errors.password = 'ra.validation.required'
        }
        return errors
    }

    return (
        <Form onSubmit={() => {
            handleSubmit(form)
        }} validate={validateUserLogin} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    background:
                        'url(https://source.unsplash.com/featured/1600x900)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: '6em' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            fontSize: '1em'
                        }}
                    >
                        Create account
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="email"
                                label="Email"
                                type="email"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                source="password"
                                label="Password"
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2}/>
                            )}
                            Sign up
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 300, marginTop: '1em' }}>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: theme => theme.palette.grey[500]
                        }}
                    >
                        Already have an account?
                    </Box>
                    <CardActions sx={{ padding: '1em' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            onClick={handleRouteLogin}
                        >
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    )
}

export default Register
