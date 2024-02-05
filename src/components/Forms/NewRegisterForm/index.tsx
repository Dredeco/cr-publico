"use client"

import React, { FormEvent, FormEventHandler, SetStateAction, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createRegister, getRegisters, updateRegister } from '@/api/RegisterService'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { AppContext } from '@/context/AppContext'
import { MainRegisterForm, RegisterFormBody, RegisterFormController } from './style'

const motivos = [
    {name: "Usuário solicitou realmente que fosse repassado o chamado"},
    {name: "Sistema Operacional com problemas não sendo possível solucionar."},
    {name: "Repasse realizado conforme o procedimento exige repasse."},
    {name: "Suporte exclusivo local em hardware de TI com defeito ou para substituição."},
    {name: "Suporte local exclusivo em hardware em Telecomunicações."},
    {name: "Fornecer suprimentos tais como papeis, cartuchos ou tonners."},
    {name: "Indisponibilidade do Bomgar."},
    {name: "Indisponibilidade recurso ou sistema (CAOS)"},
    {name: "Inviabilidade de atendimento remoto por lentidão excessiva."},
    {name: "Inviabilidade de atendimento remoto por causa de indisponbilidade da rede no usuário."},
    {name: "Outro motivo (justifique no campo abaixo)."}
]

const classificacoes = [
    {name: "Configurar / Atualizar"},
    {name: "Entregar / Fornecer"},
    {name: "Manifestação"},
    {name: "Orientar / Informar"},
    {name: "Reparar / Prover"},
    {name: "Transferir / Remanejar / Substituir"}
]

const aplicacao = [
    {name: "Aplicativos e Sistemas Diversos"},
    {name: "Impressora / Scanner"},
    {name: "Micro / Windows"},
    {name: "Ponto de Rede / Rede"},
    {name: "Periférico (Teclado / Mouse / Monitor / Diversos)"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const NewRegisterForm = () => {
    const {user, setPage} = useContext(AppContext)
    const router = useRouter()

    const [numero_chamado, setNumeroChamado] = useState('')
    const [sctask, setSctask] = useState('')
    const [analista_chamado, setAnalistaChamado] = useState(user.nome)
    const [classificacao, setClassificacao] = useState(classificacoes[0].name)
    const [sistema, setSistema] = useState(aplicacao[0].name)
    const [motivo, setMotivo] = useState(motivos[0].name)
    const [justificativa, setJustificativa] = useState('')
    const [grupoAtribuicao, setGrupoAtribuicao] = useState('')
    const [data, setData] = useState(Date)


    useEffect(() => {
        let today = new Date()
        setData(today.toISOString().split('T')[0])
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const dataFormatada = data.toString().split('T')[0]
        const novoChamado: any = {
        numero_chamado: numero_chamado,
        sctask: sctask,
        data_chamado: dataFormatada,
        mesa_chamado: grupoAtribuicao,
        analista_chamado: analista_chamado,
        status_chamado: "Aberto",
        equipe_chamado: user.equipe,
        motivo: motivo,
        sistema: sistema,
        classificacao: classificacao,
        justificativa_chamado: justificativa,
        corrigir_artigo: "Não"
    }

    try {
        await createRegister(novoChamado)
        setPage('home')
        router.push('/')
    } catch (error) {
        alert(error)
    }
}

    return (
    <>
    <header>
        <title>Detalhes do Chamado - Controle de Repasses</title>
    </header>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
                <h2>Novo chamado</h2>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        value={numero_chamado}
                        onChange={(e) => setNumeroChamado(e.target.value)}
                        required
                    />
                </li>
                {numero_chamado.includes('RITM') ?
                    <li>
                        <Input 
                            label='Nº da SCTASK'
                            value={sctask}
                            onChange={(e) => setSctask(e.target.value)}
                            required
                        />
                    </li> :
                    <></>
                }
                <li>
                    <Input 
                        label='Data de criação' 
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        type='date'
                    />
                </li>
                <li>
                    <Input 
                        label='Mesa do repasse'
                        value={grupoAtribuicao}
                        onChange={(e) => setGrupoAtribuicao(e.target.value)}
                        required
                    />
                </li>
                
                <li>
                    <Input 
                        name='analista' 
                        label='Analista' 
                        value={user.nome}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='equipe' 
                        label='Equipe' 
                        value={user.equipe}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='supervisor' 
                        label='Supervisor(a)' 
                        value={user.supervisor}
                        disabled
                    />
                </li>
                    
                    <h2>Analise de repasse do {numero_chamado}</h2>
                
                    <li>
                    <Select 
                        name='classificação' 
                        label='Classificação' 
                        options={classificacoes} 
                        value={classificacao}
                        onChange={(e) => setClassificacao(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Sistema, Aplicativo ou Hardware' 
                        options={aplicacao} 
                        value={sistema}
                        onChange={(e) => setSistema(e.target.value)}
                        required
                    />
                </li>
                <li>
                    <Select 
                        label='Motivo do repasse' 
                        options={motivos} 
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                        required
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Textarea 
                        label='Justificativa do repasse:' 
                        placeholder='Descreva o motivo do repasse.'
                        defaultValue={justificativa}
                        onChange={(e) => setJustificativa(e.target.value)}
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                        required
                    />
                </li>
                
                <div className='btnContainer'>
                    <Link className='cancel' href='' onClick={() => setPage('home')}>Cancelar</Link>
                    <Button type='submit' className='send'>Salvar</Button>
                </div>
            </RegisterFormBody>
        </RegisterFormController>
    </MainRegisterForm>
    </>
    )
}

export default NewRegisterForm