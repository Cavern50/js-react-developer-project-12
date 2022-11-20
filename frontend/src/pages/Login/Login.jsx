import React from 'react';
import './Login.style.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import loginPic from '../../assets/pictures/loginPic.svg';
import { api } from 'api/api';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthContext } from 'utils/auth';
import Alert from 'react-bootstrap/Alert';

const schema = yup.object().shape({
    username: yup.string().required('Пожалуйста, введите логин'),
    password: yup.string().required('Пожалуйста, введите пароль')
})

export const Login = () => {

    const [authError, setAuthError] = React.useState(null);

    const navigate = useNavigate();
    const auth = useAuthContext();


    const onSubmit = async ({ username, password }) => {
        try {
            const data = await api.login({ username, password });
            localStorage.setItem('auth', JSON.stringify(data));
            navigate('/');
        } catch(e) {
            console.log(e);
            setAuthError(e);
        }
    }

    if (auth) return <Navigate to="/" replace />

    return (
        <>
            <Alert variant='danger' show={Boolean(authError)} >
                {authError?.message}
            </Alert>
            <div className="loginWrapper">
                <div>
                    <img src={loginPic} width={400} />
                </div>
                <div>
                    <h1 className='loginTitle'>Войти</h1>
                    <Formik
                        initialValues={{ username: '', password: '' }}
                        validationSchema={schema}
                        onSubmit={onSubmit}
                    >
                        {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                            return (
                                <form onSubmit={handleSubmit} className='loginForm'>
                                    <Form.Control
                                        type='text'
                                        name='username'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                        isInvalid={errors.username}
                                        touched={touched.username?.toString()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                    <Form.Control
                                        type='password'
                                        name='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                        isInvalid={errors.password}
                                        touched={touched.password?.toString()}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <Button as="input" type="submit" value="Авторизация" />
                                </form>
                            )
                        }}
                    </Formik>
                </div>

            </div>
        </>
    )
}