import{useNavigate} from 'react-router-dom'

import LOGOImg from '../assets/images/logo.png'
import googleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'


import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home(){
    const history = useNavigate();
    const {user,signInWithGoogle} = useAuth()
    const[roomCode, setRoomCode] = useState('')
    
    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }

        history('/rooms/new');
        
    }
    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if(roomCode.trim()==='')
        {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()) {
            alert('room does not exists');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room alredy closed.');
            return;
        }

        history(`rooms/${roomCode}`);
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
                    <button onClick = {handleCreateRoom} className ="create-room">
                        <img src={googleIcon} alt="logo google"/>
                        Crie sua sala com o Google
                    </button>
                    <div className = "separator">ou entre em uma sala</div>
                    <form onSubmit = {handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder ="Digite o código da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}