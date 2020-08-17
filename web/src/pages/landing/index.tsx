import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import logoImg from '../../Assets/images/logo.svg'
import landingImg from '../../Assets/images/landing.svg'
import studyIcon from '../../Assets/images/icons/study.svg'
import giveClassesIcon from '../../Assets/images/icons/give-classes.svg'
import purpleHearthIcon from '../../Assets/images/icons/purple-heart.svg'
import './styles.css'
import api from '../../services/API';
function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    useEffect(() => {
        api.get('connections').then(response => {
            const { total } = response.data;
            console.log(response.data);
            setTotalConnections(total)
        })
    },[totalConnections])

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online.</h2>
                </div>

                <img src={landingImg} alt="Plataforma de estudos" className="hero-image" />

                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="Estudar"/>Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="Dar aulas"/>Dar Aulas
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas <img src={purpleHearthIcon} alt="Coração Roxo"/>
                </span>

            </div>
        </div>
    )
}

export default Landing;