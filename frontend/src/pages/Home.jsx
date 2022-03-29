import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faStar as favStar,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import * as api from "../api/api";

export default function Home() {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    // Sort contact
    function compare(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        api.getContacts().then((res) => {
            setContacts(res.data.data.sort(compare));
        });
    }, []);

    const favouriteContacts = contacts
        .filter((contact) => contact.favourite === 1)
        .sort(compare);

    const updateFavourite = (id, favourite) => () => {
        api.updateFavourite(id, favourite).then((res) => {
            const newContacts = contacts.map((contact) => {
                if (contact.id === res.data.data.id) return res.data.data;
                return contact;
            });
            setContacts(newContacts);
        });
    };

    const deleteContact = (id) => () => {
        if (!window.confirm("Delete contact?")) return;
        console.log(id);
        api.deleteContact(id).then((res) => {
            if (res.status === 204) {
                const newContacts = contacts.filter(
                    (contact) => contact.id !== id
                );
                setContacts(newContacts);
            }
        });
    };

    const ContactBody = ({ label, data }) => {
        return (
            <>
                <tr className="contact-subheading">
                    <td>
                        {label} ({data.length})
                    </td>
                </tr>

                {data.map((contact) => (
                    <tr key={contact.id}>
                        <td>
                            <img
                                src={
                                    contact.photograph
                                        ? `https://firebasestorage.googleapis.com/v0/b/contact-manager-fee8f.appspot.com/o/${contact.photograph}?alt=media`
                                        : "/default-user-image.png"
                                }
                                alt="contact"
                                className="home-image-display"
                            />
                            {contact.name}
                        </td>
                        <td>{contact.email}</td>
                        <td>{contact.phone[0] ? contact.phone[0][1] : null}</td>
                        <td>{contact.address}</td>
                        <td>
                            {/* Show different star if favourite */}
                            {contact.favourite === 1 ? (
                                <FontAwesomeIcon
                                    icon={favStar}
                                    size={"1x"}
                                    className="mx-2 cursor-pointer"
                                    onClick={updateFavourite(contact.id, false)}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={faStar}
                                    size={"1x"}
                                    className="mx-2 cursor-pointer"
                                    onClick={updateFavourite(contact.id, true)}
                                />
                            )}

                            <FontAwesomeIcon
                                icon={faEdit}
                                size={"1x"}
                                className="mx-2 cursor-pointer"
                                onClick={() => {
                                    navigate(`/update/${contact.id}`);
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                size={"1x"}
                                className="mx-2 cursor-pointer"
                                onClick={deleteContact(contact.id)}
                            />
                        </td>
                    </tr>
                ))}
            </>
        );
    };

    return (
        <Container>
            <div className="mt-4">
                <h2>Contact list</h2>
            </div>
            <hr />
            <Table borderless hover className="text-start">
                <thead className="border-bottom">
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <ContactBody
                        label="Favourite Contacts"
                        data={favouriteContacts}
                    />
                </tbody>
                <tbody>
                    <ContactBody label="Contacts" data={contacts} />
                </tbody>
            </Table>
        </Container>
    );
}
