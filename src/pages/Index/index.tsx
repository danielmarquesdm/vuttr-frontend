import React, { useEffect, useState } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import api from '../../services/api';
import './index.css';

interface ITool {
    id: string;
    title: string;
    link: string;
    description: string;
    tags: string[]
}

export default function Index({history}) {
    const [tools, setTools] = useState<ITool[]>([]);

    useEffect(() => {
        loadTools()
    }, []);

    async function loadTools() {
        const response = await api.get("/v1/tools");
        setTools(response.data);
        console.log(response.data);
    }

    async function addTool() {
        history.push("/v1/tools/:id")
    }

    async function removeTool(id: string) {
        const response = await api.delete("v1/tools/:id", {
            params: id
        });
    }

    return (
        <div className='main-container'>
            <div className='header-container'>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    {/* <img src="src\assets\lupa.svg" alt="lupa" /> */}
                    <FormControl
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <input type='checkbox'/>
                <p>by tags only</p>
                <button className='button-plus' onClick={e => addTool()}>
                    {/* <img src='src\assets\plus.svg' alt='plus'></img> */}
                    Add
                </button>
            </div>
            <ul>
            {tools.map(tool => (
                <li id='tool-li' key={tool.id}>
                    <a href='{tool.link}'>{tool.title}</a>
                    <button onClick={e => removeTool(tool.id)}>remove</button>
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