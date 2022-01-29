import React, { ChangeEvent, useState } from 'react';
import {Button, Form} from 'react-bootstrap';
import { ITool } from '../../models/ITool';



export default function ToolForm(){
    const [tool, setTool] = useState<ITool>()

    function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log()
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Tool Name</Form.Label>
                    <Form.Control type="text" placeholder="Tool Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLink">
                    <Form.Label>Tool Link</Form.Label>
                    <Form.Control type="text" placeholder="Tool Link" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Label>Tool Description</Form.Label>
                    <Form.Control type="text" placeholder="Tool Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicTags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" placeholder="Tags" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Tool
                </Button>
            </Form>
        </div>
    );
}