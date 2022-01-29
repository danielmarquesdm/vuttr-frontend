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

const Index: React.FC = () => {

    const [tools, setTools] = useState<ITool[]>([]);

    useEffect(() => {
        loadTools()
    }, []);

    async function loadTools() {
        const response = await api.get("/v1/tools");
        setTools(response.data);
        console.log(response.data);
    }

    return (
        <div className='main-container'>
            <div className='header-container'>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"></InputGroup.Text>
                    <img src="src\assets\lupa.svg" alt="lupa" />
                    <FormControl
                    placeholder="search"
                    aria-label="search"
                    aria-describedby="basic-addon1"
                    />
                </InputGroup>
                <button className='button-plus'>
                    <img src='src\assets\plus.svg' alt='plus'></img>
                    Add</button>
            </div>
            <ul>
            {tools.map(tool => (
                <li id='tool-li' key={tool.id}>
                    <strong>{tool.title}</strong>
                    <a href={tool.link}>{tool.link}</a>
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

export default Index;