import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import { useHistory } from 'react-router-dom';

import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();
    const [schedule, setSchedule] = useState([
        { week_day: 0, from: '', to: '' }]
    );

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    function addNewScheduleItem() {
        setSchedule([
            ...schedule,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name, avatar, whatsapp, bio, subject, cost: Number(cost), schedule
        }).then(() => {
            alert("Cadastro Realizado");
            history.push('/')
        }).catch(() => {
            alert("Erro no Cadastro")
        });
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedschedule = schedule.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value }
            }
            return scheduleItem;
        })

        setSchedule(updatedschedule);
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aula"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => { 
                                setWhatsapp(e.target.value) 
                            }}
                        />
                        <Textarea
							name="bio"
							label="Biografia"
							value={bio}
							onChange={(e) => {
                                setBio(e.target.value)
                            }}
						/>

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={[
                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Física", label: "Física" },
                                { value: "Ed. Física", label: "Ed. Física" },
                                { value: "Matemática", label: "Matemática" },
                                { value: "Português", label: "Português" },
                                { value: "História", label: "História" },
                                { value: "Química", label: "Química" },
                            ]}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Horários Disponíveis
                        <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>

                        {schedule.map((scheduleItem, index) => {
                            return (
                                <div key={index} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={(e) => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-feira" },
                                            { value: "2", label: "Terça-feira" },
                                            { value: "3", label: "Quarta-feira" },
                                            { value: "4", label: "Quinta-feira" },
                                            { value: "5", label: "Sexta-feira" },
                                            { value: "6", label: "Sábado" },
                                        ]}
                                    />

                                    <Input
                                        value={scheduleItem.from}
                                        onChange={(e) =>
                                            setScheduleItemValue(index, 'from', e.target.value)}
                                        name="from" label="Das"
                                        type="time"
                                    />
                                    <Input
                                        value={scheduleItem.to}
                                        onChange={(e) =>
                                            setScheduleItemValue(index, 'to', e.target.value)}
                                        name="to" label="Até"
                                        type="time"
                                    />
                                </div>
                            );

                        })}

                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso Importante" />
                        Importante <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar Cadastro
                    </button>
                    </footer>
                </form>

            </main>
        </div>
    )
}

export default TeacherForm; 