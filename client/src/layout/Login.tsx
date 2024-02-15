import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'

import {
    Button,
    Card,
    CardActions,
    CircularProgress
} from '@mui/material'
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify
} from 'react-admin'
import { type FormValues } from '../types'
import Box from '@mui/material/Box'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const translate = useTranslate()

    const notify = useNotify()
    const login = useLogin()
    const location = useLocation()
    const navigate = useNavigate()

    const handleCreateAccount = () => {
        navigate('/register')
    }

    const handleSubmit = (auth: FormValues) => {
        setLoading(true)
        login(
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
                        Login
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="email"
                                label="Email"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                                name="email"/>
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                source="password"
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                validate={required()}
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
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ minWidth: 300, marginTop: '1em' }}>
                    <CardActions sx={{ padding: '1em' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            onClick={handleCreateAccount}
                        >
                            create account
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    )
}

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string
}

export default Login
