import React, { useState } from "react";
import { Form, Button, Card, Alert, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <>
            <Col md={{ span: 4, offset: 4 }} className="col-center">
                <Card
                    className="card-shadow w-100 bg-lightBlue"
                    style={{ maxWidth: "400px" }}
                >
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign in</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit} className="user-form">
                            <Form.Group id="email" className='mb-3'>
                                <Form.Label>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        size={"1x"}
                                        className="me-1"
                                    />
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
                            <Form.Group id="password" className='mb-3'>
                                <Form.Label>
                                    <FontAwesomeIcon
                                        icon={faKey}
                                        size={"1x"}
                                        className="me-1"
                                    />
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
                            <Button
                                className="w-50 mt-3"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Form>

                        <div className="w-100 text-center mt-2">
                            New user? <Link to="/signup">Sign up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </>
    );
}
