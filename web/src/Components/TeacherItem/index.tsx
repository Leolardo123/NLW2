import React from 'react'
import './styles.css'
import whatsappIcon from '../../Assets/images/icons/whatsapp.svg'

export interface Teacher {
    avatar: string,
    bio: string,
    cost: number,
    id: number,
    name: string,
    subject: string,
    user_id: number,
    whatsapp: string,
}

interface TeacherItemProps{
    teacher: Teacher
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher}) => {
    return (
        <article className="teacher-item">
                <header>
                <img src={teacher.avatar}/>
                
                        <div>
                            <strong>{teacher.name}</strong>
                            <span>{teacher.subject}</span>
                </div>
                </header>

                        <p>
                            {teacher.bio}
                        </p>

                        <footer>
                            <p>
                            Preço/Hora
                            <strong>R$ {teacher.cost}</strong>
                            </p>
                            <a href={`https://wa.me/${teacher.whatsapp}`}><img src={whatsappIcon} alt="Whatsapp"/>Entrar em Contato</a>
                        </footer>
                </article>
    )
    
}


export default TeacherItem;