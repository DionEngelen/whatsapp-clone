import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function Contacts() {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ListGroup variant='flush'>
            {conversations.map(({ recipients, selected }, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() => selectConversationIndex(index)}
                  active={selected}>
                    {recipients.map(recipient => {
                      return recipient.name
                    }).join(', ')}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

