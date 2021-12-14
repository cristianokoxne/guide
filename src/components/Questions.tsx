import '../styles/question.scss';
import {ReactNode } from 'react';

type QuestionProps={
    content: string;
    author:{
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
    resposta?: string;
    authorResp?:{
        name: string;
        avatar: string;
    };
    estaRespondida?: boolean;
}


export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
    resposta,
    authorResp,
    estaRespondida = false,
}:QuestionProps){  
    return(
        <div>
            <div  className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted ?'highlighted' : '' }`}>
                <p>{content}</p>
                <footer>
                    <div className = "user-info">
                        <img src={author.avatar} alt={author.name} />
                    <div>{author.name}</div>
                    </div>
                    <div>
                        {children}
                    </div>
                </footer>
            </div>
            <div className = "resposta">
                <p> Lorem  simply dummy t imply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includs </p>
                <div className="dados">
                    <aside>
                        <p>{author.name}</p>
                        <img src={author.avatar} alt={author.name} />
                    </aside>
                    
                </div>
               
               
            </div>
            
           
        </div>
        
    );
}