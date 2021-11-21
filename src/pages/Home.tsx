import{useNavigate} from 'react-router-dom'

import LOGOImg from '../assets/images/logo.png'
import googleIcon from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'

import { useContext } from 'react'
import { AuthContext } from '../App'

export function Home(){
    const history = useNavigate();
    const {user,signInWithGoogle} = useContext(AuthContext)
    
    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle()
        }

        history('/rooms/new');
        
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
                    <form >
                        <input 
                            type="text"
                            placeholder ="Digite o código da sala"
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