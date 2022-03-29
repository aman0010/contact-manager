import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
} from "react-bootstrap";

import PhoneInput from "./PhoneInput";

export default function ContactForm({ handleSubmit, data, title }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState([["", ""]]);

    useEffect(() => {
        // Only updating data that are available
        if (!data) return
        if (data.name) setName(data.name)
        if (data.email) setEmail(data.email)
        if (data.address) setAddress(data.address)
        if (data.phone) setPhone(data.phone)
    }, [data])

    const handlePhoneChange = (index, type) => (event) => {
        const value = event.target.value;
        let newPhone = phone;
        newPhone[index][type === "label" ? 0 : 1] = value;
        setPhone([...newPhone]);
    };

    const handleAddPhone = () => {
        setPhone([...phone, ["", ""]]);
    };

    const handleRemovePhone = (index) => {
        const newPhone = [...phone];
        newPhone.splice(index, 1);
        setPhone(newPhone);
    };

    const cleanPhone = (phone) => {
        return phone.filter((p) => p[0] || p[1]);
    };

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit({name, email, address, phone: cleanPhone(phone)})
    }

    return (
        <div>
            <Container>
                <Col md={{ span: 8, offset: 2 }} className="py-4 text-start">
                    <h3>{title}</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAddress">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="address"
                                    value={address}
                                    onChange={(event) =>
                                        setAddress(event.target.value)
                                    }
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <PhoneInput
                            phone={phone}
                            handlePhoneChange={handlePhoneChange}
                            handleAddPhone={handleAddPhone}
                            handleRemovePhone={handleRemovePhone}
                        />

                        <Form.Group className="mb-3" controlId="formPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="file" placeholder="photo" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
