import React, { useState } from "react";
import { Form, Button, Card, Alert, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

import * as api from '../api/api'

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            return setError("Passwords do not match");
        }

        try {
            setError("");
            api.signup(email, password).then(res => {
                console.log(res)
                navigate("../", { replace: true });
            }).catch(err => setError(err.response.data.error.message))
        } catch {
            setError("Failed to create an account");
        }
    }

    return (
        <>
            <Col md={{ span: 4, offset: 4 }} className="col-center">
                <Card className="card-shadow w-100">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="user-form">
                            <Form.Group id="email">
                                <Form.Label>
                                    <FontAwesomeIcon icon={faEnvelope} size={"1x"} className='me-1'/>
                                    Email
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(event) => {
                                        setEmail(event.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>
                                    <FontAwesomeIcon icon={faKey} size={"1x"} className='me-1'/>
                                    Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>
                                    <FontAwesomeIcon icon={faKey} size={"1x"} className='me-1'/>
                                    Confirm Password
                                </Form.Label>
                                <Form.Control
                                    type="password"
                                    value={passwordConfirm}
                                    onChange={(event) => {
                                        setPasswordConfirm(event.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Button
                                // disabled={loading}
                                className="w-50 mt-3"
                                type="submit"
                            >
                                Sign Up
                            </Button>
                        </Form>
                        <div className="w-100 text-center mt-2">
                            Already a user? <Link to="/login">Sign In</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}
