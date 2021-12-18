import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { RoomCode } from '../contexts/RoomCode';
import '../styles/room.scss';
import {useHistory, useParams} from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import {FormEvent, useState} from 'react'
import { Question } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
import marcaX from '../assets/images/marca-x.png'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';
import Modal1 from 'react-modal';
import Modal2 from 'react-modal';
import Modal3 from 'react-modal';
import Modal4 from 'react-modal';
import { useAuth } from '../hooks/useAuth'
import ilustra from '../assets/images/ilustration.png'


/*regra escrever no fire base*/
/*"auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)||"*/

type RoomParams ={
    id: string;
}
export function AdminRoom(){

    const [respQuestion, setRespQuestion] = useState('');
   const [selectedQuestion, setSelectedQuestion] = useState('');
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId =  params.id;
    const {title, questions} = useRoom( roomId);

    const [setAuthor, author] = useState('');

    const [modalIsOpen1, setIsOpen1] = useState(false);
    const [modalIsOpen2, setIsOpen2] = useState(false);
    const [modalIsOpen3, setIsOpen3] = useState(false);
    const [modalIsOpen4, setIsOpen4] = useState(false);
    const [newResp, setNewResp] = useState ('');


    
    const {user} =useAuth();
    
    function openModal1() {
        setIsOpen1(true);
        console.log(roomId);
    }
    function closeModal1() { setIsOpen1(false);}
    
    function openModal2() {
        closeModal4();
        return setIsOpen2(true);}
    function closeModal2() {setIsOpen2(false);}

    function openModal3() {setIsOpen3(true);}
    function closeModal3() { setIsOpen3(false);}
    function openModal4() {setIsOpen4(true);}
    function closeModal4() { setIsOpen4(false);}



    function responderPergunta(authorName: string, quenstionId: string, respondida: boolean){
        
        setRespQuestion(quenstionId);
        author(authorName);
        if(respondida === true){
            openModal4();
            return;

        }
        else{
            openModal2();
        }
        
    }
    async function marcarRespondida(questionID: string){
        await database.ref(`rooms/${roomId}/questions/${questionID}`).update({
            isAnswered: true,
            })

    }
    async function SendNewResposta(event: FormEvent){

        event.preventDefault();

        if(newResp==='')
        {
            return;
        }
        if(!user){
            throw new Error('You must be logged in');
        }
        const question ={
            resposta: newResp,
            authorResp: {
                name: user.name,
                avatar: user.avatar
            },
            estaRespondida: true,
        }
        console.log(respQuestion);
        await database.ref(`rooms/${roomId}/questions/${respQuestion}`).update(question);
        
        setNewResp('');
        closeModal2();
        
    }
   

    async function handleDeleteSala()
    {
        
        await database.ref(`rooms/${roomId}`).update(
            {
                endedAt:new Date(),
            }
        )
        history.push('/');
    }

    async function handleDeleteQuestion(questionId: string)
    {
        openModal3();
        setSelectedQuestion(questionId);
        

    }
    
    async function excluirPergunta(){
        
        await database.ref(`rooms/${roomId}/questions/${selectedQuestion}`).remove();
        closeModal3();
    }
    async function voltar(){
        history.push('/');
    }
    

    return(
        <> 
        <Modal1
            //className ="modalDelete"
            isOpen={modalIsOpen1}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal1}
            className = "excluirSala"
            contentLabel="Example Modal"
        > 
           <div>
                <img src={marcaX} alt="icone de deletar sala" />
                <h1><strong>Encerrar sala</strong></h1>
                <p>Tem certeza que você deseja encerrar esta sala?</p>
           </div>
            
            <aside>
                <button  className ="b1" onClick ={closeModal1}> Cancelar</button>
                <button   className ="b2"onClick={() =>  handleDeleteSala() }> Sim, encerrar</button>
            </aside>
            

        </Modal1>
        <Modal2
            //className ="modalDelete"
            isOpen={modalIsOpen2}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal2}
            className = "modalResposta"
            contentLabel="Example Modal"
        > 
            <aside>
                <h1>Responder a: {setAuthor} </h1>
                <button onClick ={SendNewResposta}> Enviar </button>
            </aside>
            
            <form >
                <textarea  
                    placeholder ="   Insira a sua respsosta..."
                    onChange ={event => setNewResp(event.target.value)}
                    value = {newResp}
                />
            </form>

        </Modal2>

        <Modal3
            //className ="modalDelete"
            isOpen={modalIsOpen3}
            //onAfterOpen={afterOpenModal}
            onRequestClose={closeModal3}
            contentLabel="Example Modal"
            className ="excluirPergunta"
            
        > 
            <div>
                <img src={deleteImg} alt="icone de deletar" />
                <h1>Excluir pergunta</h1>
                <p>Tem certeza que deseja excluir essa pergunta?</p>
            </div>
           
           
            <aside>
               
                <button  className ="b1" onClick ={closeModal3}> Cancelar</button>
                <button className ="b2" onClick={() => excluirPergunta()}>  Sim, excluir</button>
            </aside>
            

        </Modal3>
        <Modal4
             //className ="modalDelete"
             isOpen={modalIsOpen4}
             //onAfterOpen={afterOpenModal}
             onRequestClose={closeModal4}
             contentLabel="Example Modal"
             className ="perguntaResp"
        >
            <div>
                <img src="https://img.icons8.com/ios/50/000000/stop-gesture.png"/>
                <h1>Pergunta ja respondida</h1>
                <p>Deseja mudar sua resposta?</p>
            </div>
            <aside>
               
               <button  className ="b1" onClick ={closeModal4}> Cancelar</button>
               <button className ="b2" onClick={() => openModal2()}>  Sim, mudar</button>
           </aside>

        </Modal4>
        
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} onClick={() =>voltar()} alt="guide" />

                    <div className="div">
                        <RoomCode code={roomId}></RoomCode>
                        <Button onClick={openModal1}>
                            Encerrar sala
                        </Button>
                    </div>

                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>{title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                {questions.length === 0 && (
                <img src={ilustra} alt="ilustração sem perguntas" />
                )}
                <div className="question-list">
                    {questions.map(question => 
                        {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                                resposta= {question.resposta}
                                authorResp={question.authorResp}
                                estaRespondida={question.estaRespondida}

                            >
                                {!question.isAnswered && (

                                    <>
                                        <button
                                            type='button'
                                            onClick= {() =>  marcarRespondida(question.id)}
                                        >
                                            <img src={checkImg} alt="Marcar pergunta como respondida" />
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => responderPergunta(question.author.name, question.id, question.estaRespondida)}
                                        >
                                            <img src={answerImg} alt="Dar destaque a pergunta" />
                                        </button>
                                    </>
                                )}
                                <button
                                    type='button'
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
                        );
                    })}

                </div>
                

            </main>
        </div></>
    );             
}