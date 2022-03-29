import React from "react";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faPlusSquare } from "@fortawesome/free-regular-svg-icons";

export default function PhoneInput({
    phone,
    handlePhoneChange,
    handleAddPhone,
    handleRemovePhone
}) {
    const lastElement = phone.length - 1;

    return (
        <Form.Group controlId="formPhone">
            {phone.map((num, index) => (
                <Row className="align-items-center mb-3" key={"contact" + index}>
                    <Col md={3}>
                        <Form.Group controlId="formPhoto">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Label"
                            >
                                <Form.Control
                                    type="text"
                                    list="contact-lable"
                                    value={num[0]}
                                    onChange={handlePhoneChange(index, "label")}
                                />
                                <datalist id="contact-lable">
                                    <option>Home</option>
                                    <option>Mobile</option>
                                    <option>Work</option>
                                    <option>Other</option>
                                </datalist>
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col>
                        <FloatingLabel controlId="floatingInput" label="Phone">
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                value={num[1]}
                                onChange={handlePhoneChange(index, "number")}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={1}>
                        {index === lastElement ? (
                            <FontAwesomeIcon
                                icon={faPlusSquare}
                                size={"2x"}
                                className="cursor-pointer"
                                onClick={handleAddPhone}
                            />
                        ) : (
                            <FontAwesomeIcon
                                icon={faMinusSquare}
                                size={"2x"}
                                className="cursor-pointer"
                                onClick={() => handleRemovePhone(index)}
                            />
                        )}
                    </Col>
                </Row>
            ))}
        </Form.Group>
    );
}
