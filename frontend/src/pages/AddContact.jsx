import React, { useState } from "react";
import { Toast } from "react-bootstrap";

import { addContact } from "../api/api";
import ContactForm from "./components/ContactForm";

export default function AddContact() {
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (contact) => {
        addContact(contact).then(
            (res) => {
                setShowToast(true);
            }
        );
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
                <Toast.Header className='bg-success text-white'>
                    <span className='me-auto'>New Contact created!</span>
                </Toast.Header>
            </Toast>

            <ContactForm handleSubmit={handleSubmit} title="Add Contact"/>
        </div>
    );
}
