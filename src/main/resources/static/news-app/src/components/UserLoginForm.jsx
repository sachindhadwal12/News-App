// UserRegistrationForm.js

import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import { Button, Col, Container, Row } from "react-bootstrap";
import './UserLoginForm.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const UserLoginForm = (props) => {

    props.toggleHeaderVisibility(false);
    const navigate = useNavigate();

    const themeContext = useContext(ThemeContext);
    themeContext.setMinHeight('min-height-100vh');

    const { login } = useContext(AuthContext);

    const [statusMessageError, setStatusMessageError] = useState('');

    const initialValues = {
        email: "",
        password: ""
    };

    // write your validation logic here
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Email is invalid").required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    // on submit of form this function will be called and a alert box will be shown with form values
    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            setSubmitting(false);
            axios.post('http://localhost:9090/api/v1/auth/login/user', values)
                .then(response => {
                    login(response.data.token);
                    navigate('/home');
                })
                .catch(error => {
                    setStatusMessageError(error.response.data);
                });
        }, 400);
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });

    return (
        <Formik
            initialValues={initialValues}
        >
            <div style={{ padding: '5vw' }}>
                <Container style={{ backgroundColor: 'black', padding: '2vw' }}>
                    <Row>
                        <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
                            {statusMessageError && <div className="text-danger">{statusMessageError}</div>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                    <Form.Label className="label">Email:</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.email && touched.email ? <div className="label">{errors.email}</div> : null}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                    <Form.Label className="label">Password:</Form.Label>
                                    <Form.Control type="password" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                    {errors.password && touched.password ? <div className="label">{errors.password}</div> : null}
                                </Form.Group>
                                <Button variant="primary" type="submit">Login</Button>
                            </Form>
                            <div className="label">You haven't registered. Please <Link aria-current="page" to="/register">register</Link> here</div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Formik>
    );
};

export default UserLoginForm;
