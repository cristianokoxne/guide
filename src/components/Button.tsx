import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

// essa foi a mudança que eu fiz parte 2


export function Button(props: ButtonProps){
    return(
        <button className="button" {...props}>

        </button>
    )
}