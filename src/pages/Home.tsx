import LOGOImg from '../assets/images/logo.png'
import googleIcon from '../assets/images/google-icon.svg'

export function Home(){
    return(
        <div>
            <aside>
               <div></div>
               <strong>Auxilio a perguntas e respostas</strong>
               <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div>
                    <img src={LOGOImg} alt="logo GUIDE"/>
                    <button>
                        <img src={googleIcon} alt="logo google"/>
                        Crie sua sala com o Google
                    </button>
                    <div>ou entre em uma sala</div>
                    <form >
                        <input 
                            type="text"
                            placeholder ="Digite o código da sala"
                        />
                        <button type="submit">
                            Entrar na sala
                        </button>
                    </form>
                </div>
            </main>
        </div>
    )
}