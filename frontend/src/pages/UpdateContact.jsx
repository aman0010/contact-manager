import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";

import ContactForm from "./components/ContactForm";
import { getContact, updateContact } from "../api/api";
import { useParams } from "react-router-dom";

export default function UpdateContact() {
    const [contact, setContact] = useState({phone: []})
    const [showToast, setShowToast] = useState(false);
    const { id } = useParams()

    useEffect(() => {
        getContact(id).then((res) => {
            setContact(res.data.data);
        });
    }, [id])

    const handleSubmit = (contact) => {
        updateContact(id, contact).then((res) => {
            setShowToast(true);
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
