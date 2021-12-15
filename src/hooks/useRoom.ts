import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType ={
   
    id: string;
    author:{
        name:string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likeCount: number;
    likedId: string | undefined;
    resposta?: string;
    authorResp?:{
        name: string;
        avatar: string;
    };
    estaRespondida: boolean;

}

type FirebaseQuestions = Record<string, {
    author:{
        name:string;
        avatar: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
    resposta?: string;
    authorResp?:{
        name: string;
        avatar: string;
    };
    estaRespondida: boolean;

}>


export function useRoom(roomId: {}){

    const {user} = useAuth();
    const[questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room=>{

            const databaseRoom =room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions??{};
            
            const parsedQuestions = Object.entries(firebaseQuestions ).map(([key, value]) =>{
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount:Object.values(value.likes ?? {}).length,
                    likedId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
                    resposta: value.resposta,
                    authorResp:value.authorResp,
                    estaRespondida: value.estaRespondida,
                }
                    
            })

            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })


        return()  =>{
            roomRef.off('value');
        }
    }, [roomId, user?.id])

    return({questions, title});
}