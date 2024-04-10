import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const { contacts } = useContacts();
  const { createConversation } = useConversations();

  const handleSubmit = e => {
    e.preventDefault();
    createConversation(selectedContactIds);
    closeModal();
  };

  const handleCheckBoxChange = contactId => {
    setSelectedContactIds(prevSelectedContactIds => {
      if (prevSelectedContactIds.includes(contactId)) {
        return prevSelectedContactIds.filter(prevId => {
          return prevId !== contactId;
        });
      }
      return [...prevSelectedContactIds, contactId];
    })
  }

  return (
    <>
      <Modal.Header closeButton>Start New Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(({ id, name }) => (
            <Form.Group
              controlId={id}
              key={id}>
              <Form.Check
                type='checkbox'
                value={selectedContactIds.includes(id)}
                label={name}
                onChange={() => handleCheckBoxChange(id)} />
            </Form.Group>
          ))}
          <Button type='submit'>Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}
