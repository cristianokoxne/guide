import{Link, useHistory} from 'react-router-dom'


import logoImg from '..//assets/images/logo.png';

import {FormEvent, useState} from 'react';

import '../styles/auth.scss'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import userEvent from '@testing-library/user-event';
//import { AuthContext } from '../contexts/AuthContext';


export function NewRoom()
{
    const {user} = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] =useState(''); 

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        

        if(newRoom.trim() ==='')
        {
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
        

    }

    return (
        <div id = "page-auth">
            <aside>
                <strong> Auxílio a perguntas e respostas</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas  </p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                   <h2>Crie uma nova sala</h2>
                  
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder = "Nome da sala"
                            onChange ={event=> setNewRoom(event.target.value)}
                            value ={newRoom}
                        />

                        <Button type= "submit">
                            Criar sala
                        </Button>

                    
                    </form>
                    <p>
                        Quer entrar em uma sala existente <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>

        </div>
    )
}