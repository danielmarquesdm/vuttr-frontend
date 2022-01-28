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
    }

    return (
        <div className='container'>
            {tools.map(tool => {
                <ul key={tool.id}>
                    <li>{tool.title}</li>
                    <li>{tool.link}</li>
                    <li>{tool.description}</li>
                    <li>{tool.tags}</li>
                </ul>
            })}
        </div>
    );
}

export default Index;