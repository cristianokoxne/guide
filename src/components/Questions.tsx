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
    estaRespondida: boolean;
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
            {estaRespondida && (
    
            <div className = "resposta">
                <p>{resposta}</p>
                <div className="dados">
                    <aside>
                        <p>{authorResp?.name}</p>
                        <img src={authorResp?.avatar} alt={author.name} />
                      
                    </aside>
                    
                </div>
               
               
            </div>
            )}
           
        </div>
        
    );
}