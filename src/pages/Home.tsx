import {useHistory} from 'react-router-dom'
import logoImg from '..//assets/images/logo.png';
import googleIconImg from '..//assets/images/google-icon.svg';

import{ auth, database, firebase} from '../services/firebase';

import '../styles/auth.scss'
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

export function Home(){
    const history = useHistory();
    const {user, signInWithGoogle } = useAuth()
    const[roomCode, setRoomCode] = useState('')

    async  function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
           
        }
        history.push('/rooms/new');
       
      
    }
    async function handleJoinRoom(event:FormEvent) {
        event.preventDefault();

        if(roomCode.trim()=='')
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

        history.push(`rooms/${roomCode}`);
    }
 
    return (
        <div id = "page-auth">
            <aside>
                <strong> Auxílio a perguntas e respostas</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas </p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button onClick ={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Logo do google" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> ou entre em uma sala</div>
                    <form  onSubmit = {handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder = "Digite o código da sala"
                            onChange = {event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />

                        <Button type= "submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>

        </div>
    )
}