import './Login.style.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import loginPic from '../../assets/pictures/loginPic.svg';

const schema = yup.object().shape({
    nickname: yup.string().required('Пожалуйста, введите логин'),
    password: yup.string().length(8, (error) => `Пароль должен содержать минимум ${error.length} символов`).required('Пожалуйста, введите пароль')
})

export const Login = () => {
    return (
        <div className="loginWrapper">
            <div>
                <img src={loginPic} width={400}/>
            </div>
            <div>
                <h1 className='loginTitle'>Войти</h1>
                <Formik
                    initialValues={{ nickname: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                        alert(JSON.stringify(values, null, 2))
                    }}
                >
                    {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => {
                        return (
                            <form onSubmit={handleSubmit} className='loginForm'>
                                <Form.Control
                                    type='text'
                                    name='nickname'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.nickname}
                                    isInvalid={errors.nickname}
                                    touched={touched.nickname}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.nickname}
                                </Form.Control.Feedback>
                                <Form.Control
                                    type='password'
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    isInvalid={errors.password}
                                    touched={touched.password}
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
    )
}