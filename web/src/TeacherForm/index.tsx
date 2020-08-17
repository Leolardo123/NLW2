import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom'

import PageHeader from '../Components/PageHeader';
import './styles.css'
import warningIcon from '../Assets/images/icons/warning.svg'
import Input from '../Components/input';
import Textarea from '../Components/Textarea';
import Select from '../Components/select';

import api from '../services/API';

function TeacherForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    
    const [scheduleItems,setScheduleItems] = useState([
        {week_day:0,from:'', to: ''}
        ])

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule:scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/')
        }).catch(() => {
            alert('Erro no Cadastro')
        })

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        });
    }
    
    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,{week_day:0,from:'', to: ''}
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index)=> {
            if (index === position)
            {
                return {...scheduleItem,[field]:value}
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                description="O primeiro passo é preencher esse formulário de inscrição" title="Que bom que você quer dar aulas!"></PageHeader>
            
            <main>
                <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus Dados </legend>

                    <Input name="name" label="Nome Completo" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    
                    <Input name="avatar" label="Avatar" onChange={(e)=>{setAvatar(e.target.value)}}/>
                    
                    <Input name="whatsapp" label="WhatsApp" onChange={(e)=>{setWhatsapp(e.target.value)}}/>
                    
                    <Textarea name="bio" label="Biografia" onChange={(e)=>{setBio(e.target.value)}}/>
                        
                </fieldset>

                <fieldset>
                    <legend>Sobre a aula </legend>

                    
                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e)=>{setSubject(e.target.value)}}
                        options={[
                            {value:'Artes',label:'Artes'},
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Geografia', label: 'Geografia' },
                            {value:'História',label:'História'},
                        ]}
                    />
                    
                    <Input value={cost}
                        onChange={(e) => { setCost(e.target.value) }}
                        name="cost" label="Custo da sua Hora" />
                    
                </fieldset>

                
                <fieldset>
                    <legend>Horários Disponíveis <button type="button" onClick={addNewScheduleItem}> + Novo Horário</button></legend>

                    {scheduleItems.map((scheduleItem,index) => {
                        return (
                            <div className="schedule-item">
                                <Select
                                    key={scheduleItem.week_day}
                                    name="week_day"
                                    value={scheduleItem.week_day}
                                    label="Dia da Semana"
                                    onChange={e => setScheduleItemValue(index,'week_day',e.target.value)}
                                options={[
                                  { value: '0', label:'Segunda-feira'},
                                  { value: '1', label: 'Terça-feira' },
                                  { value: '2', label: 'Quarta-feira' },
                                  { value: '3', label: 'Quinta-feira' },
                                  { value: '4', label: 'Sexta-feira' },
                                  { value: '5', label: 'Sábado' },
                                  {value: '6', label:'Domingo'},
                                ]}
                                />
                                
                                <Input type="time" name="from" label="Das" value={scheduleItem.from}
                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                                <Input type="time" name="to" label="Até" value={scheduleItem.to}
                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                           </div>
                        )
                    })}
                    
                    
                   
                </fieldset>
                <footer>

                    <p><img src={warningIcon} alt="Aviso importante"/> Importante!<br />
                    Preencha todos os dados
                    </p>

                    <button type="submit">Salvar Cadastro</button>
                    </footer>
                    </form>
            </main>
        </div>
        
        
    )
}

export default TeacherForm;