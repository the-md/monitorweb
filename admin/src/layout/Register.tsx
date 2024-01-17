import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardActions,
    CircularProgress,
} from '@mui/material';
import Box from '@mui/material/Box';
import {
    Form,
    TextInput,
} from 'react-admin';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
    };

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
                    backgroundSize: 'cover',
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: '6em' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
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
                            />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                source="password"
                                label="Password"
                                type="password"
                                disabled={loading}
                                fullWidth
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
                                <CircularProgress size={25} thickness={2} />
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
                            color: theme => theme.palette.grey[500],
                        }}
                    >
                        Already have an account?
                    </Box>
                    <CardActions sx={{ padding: '1em' }}>
                        <Button
                            variant="outlined"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            onClick={handleLogin}
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            Login
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    );
};

export default Register;