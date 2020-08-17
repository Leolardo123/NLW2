import React from 'react';
import {Link} from 'react-router-dom'

import backIcon from '../../Assets/images/icons/back.svg'
import logoImg from '../../Assets/images/logo.svg'
 
import './styles.css'
interface PageHeaderProps {
    title: string,
    description?:string
} 

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={backIcon} alt="Voltar"/>
                    </Link>
                    <img src={logoImg} id="logo" alt="Proffy"/>
                </div>
            
                <div className="header-content">
                <strong>{props.title}</strong>
                {props.description ? <p>{props.description}</p> : null}
                {props.children}
            </div>
            </header>
    )
}

export default PageHeader;