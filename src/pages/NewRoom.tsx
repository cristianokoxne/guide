
import{FormEvent, useState} from 'react'
import LOGOImg from '../assets/images/logo.png'
import { Link , useNavigate} from 'react-router-dom'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import userEvent from '@testing-library/user-event';

export function NewRoom(){
    
    const {user} = useAuth();
    const history = useNavigate();

    const[newRoom, setNewRoom] = useState('');
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        console.log(newRoom);

        if(newRoom.trim()==='')
        {
            return;
        }
        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        history(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id= "page-auth">
            <aside>
               <div></div>
               <strong>Auxilio a perguntas e respostas</strong>
               <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className ="main-content">
                    <img src={LOGOImg} alt="logo GUIDE"/>
                   <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder ="Nome da sala"
                            onChange ={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to ="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}