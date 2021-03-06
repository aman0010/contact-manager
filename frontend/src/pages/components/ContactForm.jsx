import React, { useEffect, useState } from "react";
import {
    Button,
    Col,
    Container,
    FloatingLabel,
    Form,
    Row,
} from "react-bootstrap";

import PhoneInput from "./PhoneInput";

export default function ContactForm({ handleSubmit, data, title }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState([["", ""]]);
    const [image, setImage] = useState(null);

    const [imageDisplay, setImageDisplay] = useState("/default-user-image.png");

    useEffect(() => {
        // Only updating data that are available
        if (!data) return;
        if (data.name) setName(data.name);
        if (data.email) setEmail(data.email);
        if (data.address) setAddress(data.address);
        if (data.phone && data.phone.length>0) setPhone(data.phone);
        if (data.photograph) {
            setImage(data.photograph);
            // Show in image display if available
            setImageDisplay(`https://firebasestorage.googleapis.com/v0/b/contact-manager-fee8f.appspot.com/o/${data.photograph}?alt=media`)
        }
    }, [data]);

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

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setImage(img);
            setImageDisplay(URL.createObjectURL(img));
        }
    };

    const cleanPhone = (phone) => {
        return phone.filter((p) => p[0] || p[1]);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit({ name, email, address, phone: cleanPhone(phone) }, image);
    };

    return (
        <div>
            <Container>
                <Col md={{ span: 8, offset: 2 }} className="py-4 text-start">
                    <h3>{title}</h3>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Row className="align-items-center">
                                <Col md={8}>
                                    <Form.Control
                                        type="file"
                                        placeholder="photo"
                                        onChange={onImageChange}
                                    />
                                </Col>
                                <Col className="text-center">
                                    <img
                                        src={imageDisplay}
                                        alt="contact"
                                        className="image-display"
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                        <hr />

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

                        <Button variant="primary" type="submit">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
