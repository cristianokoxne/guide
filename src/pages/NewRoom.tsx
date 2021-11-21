import LOGOImg from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import {AuthContextProvider} from '../contexts/AuthContext';
export function NewRoom(){
    

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
                    <form >
                        <input 
                            type="text"
                            placeholder ="Nome da sala"
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