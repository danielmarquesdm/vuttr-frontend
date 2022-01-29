import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import api from '../../services/api';
import { ITool } from '../../models/ITool'
import { IToolRequest } from '../../models/IToolRequest';
import './index.css';


export default function Index({history}) {
    const [tools, setTools] = useState<ITool[]>([]);
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState(false);
    const [titleFilter, setTitleFilter] = useState(false);
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [id, setId] = useState('');
    const [toolRequest, setToolRequest] = useState<IToolRequest>();
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleDeleteModal = () => setShow(!show);
    const handleAddModal = () => setAddShow(!addShow);

    useEffect(() => {
        loadTools()
    }, []);

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
        handleAddModal()
        history.push("/v1/tools")
    }

    async function loadTools() {
        const response = await api.get("/v1/tools");
        setTools(response.data);
        console.log(response.data);
    }

    async function searchTools() {
        if(tagFilter) {
            const response = await api.get("/v1/tools", {params: {tag: search}});
            setTools(response.data);
            console.log(response.data);
        } else if(titleFilter) {
            const response = await api.get("/v1/tools", {params: {title: search}});
            setTools(response.data);
            console.log(response.data);
        } 
    }

    async function removeTool(id: string) {
        const response = await api.delete(`v1/tools/${id}`);  
        console.log(response) 
        loadTools()
    }

    return (
        <div className='main-container'>
            <div className='header-container'>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Control type="text" placeholder="Search" onKeyPress={searchTools} onChange={e => setSearch(e.target.value)}/>
                    <Form.Check type="checkbox" label="By tags only" onChange={e => setTagFilter(true)}/>
                    <Form.Check type="checkbox" label="By title only" onChange={e => setTitleFilter(true)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleAddModal}>
                    Add Tool
                </Button>
            </div>
            <Modal show={addShow} onHide={handleAddModal}>
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
            </Modal>
            <ul>
            {tools.map(tool => (
                <li id='tool-li' key={tool.id}>
                    <a href='{tool.link}'>{tool.title}</a>
                    <button onClick={e => {setId(tool.id);handleDeleteModal()}}>remove</button>
                    <p>{tool.description}</p>
                    <footer><b>
                    {tool.tags.map(tag => (
                        <li id='tag-li' key={tag}>{tag = "#" + tag}</li>
                    ))}
                    </b></footer>
                </li>
            ))}
            </ul>
            <Modal show={show} onHide={handleDeleteModal}>
                <Modal.Header closeButton>
                <Modal.Title>Remove Tool</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remove this Tool?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleDeleteModal}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={e => {removeTool(id);handleDeleteModal()}}>
                    Yes, remove
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}