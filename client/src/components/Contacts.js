import React from 'react';
import { useContacts } from '../contexts/ContactsProvider';
import { ListGroup } from 'react-bootstrap';

export default function Contacts() {
    const { contacts } = useContacts()

    return (
        <ListGroup variant='flush'>
            {contacts.map(({ id, name }) => (
                <ListGroup.Item key={id}>
                    {name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
