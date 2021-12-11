import logoImg from '../assets/images/logo.png';
import { Button } from '../components/Button';
import { RoomCode } from '../contexts/RoomCode';
import '../styles/room.scss';
import {useHistory, useParams} from 'react-router-dom'
//import { useAuth } from '../hooks/useAuth';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import {useState} from 'react'
import { Question } from '../components/Questions';
import { useRoom } from '../hooks/useRoom';
import marcaX from '../assets/images/marca-x.png'
import deleteImg from '../assets/images/delete.svg'
import { database } from '../services/firebase';
import Modal1 from 'react-modal';
import Modal2 from 'react-modal';
import Modal3 from 'react-modal';




const customStyles = {

    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      
      
    },
}
type RoomParams ={
    id: string;
}
export function AdminRoom(){

   var id: string;
    const history = useHistory();
    const params = useParams<RoomParams>();
    const roomId =  params.id;
    const {title, questions} = useRoom( roomId);

    

        
        const [modalIsOpen1, setIsOpen1] = useState(false);
        const [modalIsOpen2, setIsOpen2] = useState(false);
        const [modalIsOpen3, setIsOpen3] = useState(false);
        
        
        
        function openModal1() {setIsOpen1(true);}
        function closeModal1() { setIsOpen1(false);}
       
        function openModal2() {
            return setIsOpen2(true);
        }
        function closeModal2() {setIsOpen2(false);}

        function openModal3() {setIsOpen3(true);}
        function closeModal3() { setIsOpen3(false);}

    async function responderPergunta()
    {
        openModal2();
        
    }
    async function marcarRespondida(questionID: string){
        await database.ref(`rooms/${roomId}/questions/${questionID}`).update({
            isAnswered: true,
            })

    }
    async function handleHighlightQuestion(questionId: string, isHighlighted : boolean){
        if(isHighlighted){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({isHighlighted:true});
        }
        else{
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({isHighlighted:false});
        }
    }
      
        function afterOpenModal() {
          // references are now sync'd and can be accessed.

        }
      
        
        async function handleDeleteSala()
        {
            await database.ref(`rooms/${roomId}`).update(
                {
                    endesAt:new Date(),
                }
            )
            history.push('/');
        }

    async function handleDeleteQuestion(questionId: string)
    {
        openModal3();
        eval ("questionId = 'id';");
           
    }
    async function excluirPergunta(id: string){
        await database.ref(`rooms/${roomId}/questions/${id}`).remove();
    }
    

    

 
    return(
        <> 
        <Modal1
            //className ="modalDelete"
            isOpen={modalIsOpen1}
            onAfterOpen={afterOpenModal}
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
                <button   className ="b2"onClick={() => handleDeleteSala()}> Sim, encerrar</button>
            </aside>
            

        </Modal1>
        <Modal2
            //className ="modalDelete"
            isOpen={modalIsOpen2}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal2}
            className = "modalResposta"
            contentLabel="Example Modal"
        > 
            <aside>
                <h1>Responder a: </h1>
                <button  > Enviar </button>
            </aside>
            
            
                <textarea  
                    placeholder ="   Insira a sua respsosta..."
                />

        </Modal2>

        <Modal3
            //className ="modalDelete"
            isOpen={modalIsOpen3}
            onAfterOpen={afterOpenModal}
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
                <button className ="b2" onClick={()=>excluirPergunta(id)}>  Sim, excluir</button>
            </aside>
            

        </Modal3>
        
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="guide" />

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
                                            onClick={() => responderPergunta()}
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
                                <button
                                className={`highlight-button ${question.isHighlighted? 'starred' : ''}`}
                                type = "button"
                                aria-label = "Destacar pergunta"
                                onClick={()=>handleHighlightQuestion(question.id,question.isHighlighted)}>
                                </button>

                            </Question>
                        );
                    })}

                </div>

            </main>
        </div></>
    );             
}
