import React, { useCallback, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useConversations } from '../contexts/ConversationsProvider';

export default function OpenConversation() {
    const [text, setText] = useState('');
    const setRef = useCallback((node => {
        if (node) {
            node.scrollIntoView({ smooth: true })
        }
    }), [])
    const { sendMessage, selectedConversation } = useConversations();

    const handleSubmit = e => {
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map(r => r.id), text);
        setText('');
    };

    return (
        <div className='d-flex flex-column flex-grow-1'>
        <div className='flex-grow-1 overflow-auto'>
            <div className='d-flex flex-column 
                align-items-start justify-content-end px-3'>
                {selectedConversation.messages.map(({ text, fromMe, senderName }, index) => {
                    const lastMessage = selectedConversation.messages.length - 1 === index;
                    return (
                    <div
                        ref={lastMessage ? setRef : null}
                        key={index}
                        className={`my-1 d-flex flex-column 
                            ${fromMe ? 'align-self-end align-items-end' : 'align-items-start'}`} >
                        <div className={`rounded px-2 py-1 
                            ${fromMe ? 'bg-primary text-white' : 'border'}`}>{text}</div>
                        <div className={`text-muted small 
                            ${fromMe ? 'text-right' : ''}`}>{fromMe ? 'You' : senderName}</div>
                    </div>
                )})}
            </div>
        </div>
        <Form onSubmit={handleSubmit}>
            <Form.Group className='m-2'>
                <InputGroup>
                    <Form.Control
                        as="textarea"
                        value={text}
                        required
                        onChange={e => setText(e.target.value)}
                        style={{
                            height: "75px",
                            resize: "none"
                        }} />
                    <Button type='submit'>Send</Button>
                </InputGroup>
            </Form.Group>
        </Form>
        </div>
    )
}
