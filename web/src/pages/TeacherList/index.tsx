import React, { useState, FormEvent } from 'react';

import PageHeader from '../../Components/PageHeader';
import TeacherItem,{Teacher} from '../../Components/TeacherItem';

import './styles.css';
import Input from '../../Components/input';
import Select from '../../Components/select';
import api from '../../services/API';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  
  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
    setTeachers(
      response.data
    )
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">

        
        
        <form id="search-teachers" onSubmit={searchTeachers}>
        <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value)
                        }}
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
          <Select
                        name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => {
                          setWeek_day(e.target.value)
                        }}
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
          <Input
          value={time}
          onChange={(e) => {
            setTime(e.target.value)
            }}
            name="time" type="time" label="Hora"
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher}/>
        })}
      </main>
    </div>
  );
}

export default TeacherList;