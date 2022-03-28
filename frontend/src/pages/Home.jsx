import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as favStar } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

import * as api from "../api/api";

export default function Home() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        api.getContact().then((res) => {
            setContacts(res.data.data);
        });
    }, []);

    const favouriteContacts = contacts.filter((contact) => contact.favourite === 1)

    const ContactBody = ({data}) => {
        return (
            <>
                <tr className="contact-subheading">
                    <td>Favourite Contacts ({data.length})</td>
                </tr>

                {data.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.phone[0][1]}</td>
                        <td>{contact.address}</td>
                        <td>
                            <FontAwesomeIcon
                                icon={
                                    contact.favourite === 1 ? favStar : faStar
                                }
                                size={"1x"}
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
                    <ContactBody label='Favourite Contacts' data={favouriteContacts} />
                </tbody>
                <tbody>
                    <ContactBody label='Contacts' data={contacts} />
                </tbody>
            </Table>
        </Container>
    );
}
