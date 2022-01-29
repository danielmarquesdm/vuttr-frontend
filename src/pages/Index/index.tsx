import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../services/api';
import { ITool } from '../../models/ITool'
import './index.css';



export default function Index({history}) {
    const [tools, setTools] = useState<ITool[]>([]);
    const [search, setSearch] = useState('');
    const [tagFilter, setTagFilter] = useState(false);
    const [titleFilter, setTitleFilter] = useState(false);

    useEffect(() => {
        loadTools()
    }, []);

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

    async function addTool() {
        history.push("/v1/tools/form");
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
                <Button variant="primary" type="submit" onClick={addTool}>
                    Add Tool
                </Button>
            </div>
            <ul>
            {tools.map(tool => (
                <li id='tool-li' key={tool.id}>
                    <a href='{tool.link}'>{tool.title}</a>
                    <button onClick={() => removeTool(tool.id)}>remove</button>
                    <p>{tool.description}</p>
                    <footer><b>
                    {tool.tags.map(tag => (
                        <li id='tag-li' key={tag}>{tag = "#" + tag}</li>
                    ))}
                    </b></footer>
                </li>
            ))}
            </ul>
        </div>
    );
}