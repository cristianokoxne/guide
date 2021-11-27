import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { RoomCode } from '../contexts/RoomCode';
import '../styles/room.scss';
import {useNavigate, useParams} from 'react-router-dom'
/*import { useAuth } from '../hooks/useAuth';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';*/


//import { Question } from '../components/Questions';
//import { useRoom } from '../hooks/useRoom';
//import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';



export function AdminRoom(){

    //const {user} = useAuth();
    const history = useNavigate();
    const {roomId} = useParams()as {roomId: string};
    //const roomId =  params;
    //const {title, questions} = useRoom( roomId); 

    async function handleEndRoom() {

        await database.ref(`rooms/${roomId}`).update(
            {
                endesAt:new Date(),
            }
        )
        history('/');
        
    }

    /*async function handleDeleteQuestion(questionId: string)
    {
        if(window.confirm('Tem certeza que deseja excluir essa pergunta?'))
        {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAwnswered(questionId: string)
    {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
    }

    async function handleHighlightQuestion(questionId: string)
    {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlit: true,
        })
    }*/
    return(
        <div id="page-room">
            <header>
                <div className ="content">
                    <img src={logoImg} alt="guide" />

                    <div className = "div">
                        <RoomCode code = {roomId}></RoomCode>
                        <Button isOutlined onClick ={handleEndRoom}>Encerrar sala</Button>
                    </div>
                    
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>sala de perguntas</h1>
                     <span>numero de pergunta(s)</span>
                </div>

                <div className ="question-list">
                

                </div>

            </main>
        </div>
    );

}