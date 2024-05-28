// UserRegistrationForm.js

import { Formik, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import { Button, Col, Container, Row } from "react-bootstrap";
import './UserRegistrationForm.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";

const UserRegistrationForm = (props) => {

  props.toggleHeaderVisibility(false);

  const [statusMessageSuccess, setStatusMessageSuccess] = useState('');
  const [statusMessageError, setStatusMessageError] = useState('');

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  // write your validation logic here
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters long.").required("Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setSubmitting(false);
      axios.post('http://localhost:9090/api/v1/auth/user', values)
        .then(response => {
          setStatusMessageSuccess("User registered successfully. Please login.");
          setStatusMessageError("");
        })
        .catch(error => {
          setStatusMessageError(error.response.data);
          setStatusMessageSuccess("");
        });
    }, 400);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: onSubmit
  });

  const themeContext = useContext(ThemeContext);
  themeContext.setMinHeight('min-height-100vh');

  return (
    <Formik
      initialValues={initialValues}
    >
      <div style={{ padding: '5vw' }}>
        <Container style={{ backgroundColor: 'black', padding: '2vw' }}>
          <Row>
            <Col md={{ span: 10, offset: 1 }} lg={{ span: 10, offset: 1 }} xs={{ span: 10, offset: 1 }}>
              {statusMessageError && <div className="text-danger">{statusMessageError}</div>}
              {statusMessageSuccess && <div className="text-success">{statusMessageSuccess}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label className="label">Name:</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
                  {errors.name && touched.name ? <div className="label">{errors.name}</div> : null}
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                  <Form.Label className="label">Confirm Password:</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} />
                  {errors.confirmPassword && touched.confirmPassword ? <div className="label">{errors.confirmPassword}</div> : null}
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
              </Form>
              <div className="label">Already registered. Please <Link aria-current="page" to="/">login</Link> here</div>
            </Col>
          </Row>
        </Container>
      </div>
    </Formik>
  );
};

export default UserRegistrationForm;
