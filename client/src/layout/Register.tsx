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
    Form,
    TextInput,
    useLogin,
    useNotify
} from 'react-admin'
import { registration } from '../services/registration'
import { type FormValues } from '../types'

const Register = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const notify = useNotify()
    const login = useLogin()
    const location = useLocation()

    const handleLogin = () => {
        navigate('/login')
    }

    const handleSubmit = async (auth: FormValues) => {
        setLoading(true)
        await registration(auth)
        await login(
            auth,
            location.state != null ? (location.state).nextPathname : '/'
        ).catch((error: any) => {
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
        setLoading(false)
        notify('You have successfully registered', { type: 'success' })
    }

    return (
        <Form onSubmit={handleSubmit} noValidate>
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
                                fullWidth
                                name="email"/>
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                source="password"
                                label="Password"
                                type="password"
                                disabled={loading}
                                fullWidth
                                name="password"/>
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
                            onClick={handleLogin}
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
