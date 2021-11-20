import LOGOImg from '../assets/images/logo.png'
import googleIcon from '../assets/images/google-icon.svg'


import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home(){
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
                    <button className ="create-room">
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