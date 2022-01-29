import React, { ChangeEvent, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import { IToolRequest } from '../../models/IToolRequest';
import api from '../../services/api';


export default function ToolForm({history}){
    const [toolRequest, setToolRequest] = useState<IToolRequest>();
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setToolRequest({
            title,
            link,
            description,
            tags
        });
        console.log(toolRequest)
        const response = await api.post("/v1/tools", toolRequest)
        console.log(response)
        history.push("/v1/tools")
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Tool Name</Form.Label>
                    <Form.Control type="text" placeholder="Tool Name" 
                    onChange={e => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Form.Label>Tool Link</Form.Label>
                    <Form.Control type="text" placeholder="Tool Link" 
                    onChange={e => setLink(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Tool Description</Form.Label>
                    <Form.Control type="text" placeholder="Tool Description" 
                    onChange={e => setDescription(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Tags" 
                    onChange={e => setTags(e.target.value.split(","))}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Tool
                </Button>
            </Form>
        </div>
    );
}