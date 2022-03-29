import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Toast } from "react-bootstrap";

import ContactForm from "./components/ContactForm";
import { getContact, updateContact, updateImage } from "../api/api";

export default function UpdateContact() {
    const [contact, setContact] = useState({phone: []})
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        getContact(id).then((res) => {
            setContact(res.data.data);
        });
    }, [id])

    const handleSubmit = (contact, image) => {
        updateContact(id, contact).then((res) => {
            if (image) {
                updateImage(res.data.data.id, image).then((resp) => {
                    setShowToast(true);
                });
            } else {
                setShowToast(true);
            }
        });
    };

    return (
        <div>
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                position="top-end"
                className="p-3 m-3 ms-auto bg-success"
                delay={5000}
                autohide
            >
                <Toast.Header className="bg-success text-white">
                    <span className="me-auto">Contact updated!</span>
                </Toast.Header>
            </Toast>

            <ContactForm handleSubmit={handleSubmit} data={contact} title="Update Contact"/>
        </div>
    );
}
