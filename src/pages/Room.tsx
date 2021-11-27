//import React, { FormEvent, useEffect, useState } from 'react';
import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { RoomCode } from '../contexts/RoomCode';
import '../styles/room.scss';
import {useParams} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
//import { database } from '../services/firebase';
//import { Question } from '../components/Questions';
//import { useRoom } from '../hooks/useRoom';
//import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';


export function Room(){

    const {user} =useAuth();
    const {roomId} = useParams()as {roomId: string};
    /*const [newQuestion, setNewQuestion] = useState ('');*/

    
    //const {title, questions} = useRoom(roomId); 

   /* async function handleSendNewQuestion(event: FormEvent){

        event.preventDefault();

        if(newQuestion.trim()===' ')
        {
            return;
        }
        if(!user){
            throw new Error('You must be logged in');
        }
        const question ={
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');
    }*/

    /*async function handleLikeQuestion(questionId: string, likedId : string|undefined){
        
        if(likedId)
        {
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likedId}`).remove()
        }
        else{
            await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
                authorId:user?.id,
            })
        }


    }*/

    return(
        <div id="page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="guide" />
                    <RoomCode code = {roomId}></RoomCode>
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>sala react</h1>
                    <span>Nº pergunta(s)</span>
                </div>

                <form /*onSubmit={handleSendNewQuestion}*/>
                    <textarea 
                        placeholder ="O que você quer perguntar?"
                        /*onChange ={event => setNewQuestion(event.target.value)}*/
                        /*value = {newQuestion}*/
                    />
                    <div className ="form-footer">
                        {user ? (
                            <div className = "user-info">
                                 <img src={user.avatar} alt={user.name} />
                                 <span>{user.name}</span>
                            
                            </div> 
                        ) : (
                            <span> Para Enviar uma pergunta, <button>faça seu login</button>.</span>
                        ) }

                        <Button >Enviar pergunta</Button>
                    </div>
                </form>

            
            </main>
        </div>
    );

}