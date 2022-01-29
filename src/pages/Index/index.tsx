import React, { useEffect, useState } from 'react';
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
            <ul>
            {tools.map(tool => (
                <li id='tool-li' key={tool.id}>
                    <text>{tool.title}</text>
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