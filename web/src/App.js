import React, { useEffect, useState } from 'react';
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

// Componente: Função que retorna bloco isolado de html, css e javascript)
    // Usamos quando estamos repetindo muito código OU
    // Quando é possível isolar uma parte da aplicação que não afeta outras partes

// Propriedades (são como do html): Informações que o componente pai passa para o componente filho
// Estado: Informação que o componente vai manipular

function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs(){
            const response = await api.get('/devs')

            setDevs(response.data)
        }

        loadDevs()
    }, [])

    async function handleAddDev(data){
        const response = await api.post('/devs', data)

        setDevs([...devs, response.data])
    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
