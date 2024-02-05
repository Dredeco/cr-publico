"use client"

import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getRegisterByNumber, updateRegister } from '@/api/RegisterService'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { AppContext } from '@/context/AppContext'
import { MainRegisterForm, RegisterFormBody, RegisterFormController } from './style'
import { IRegister } from '@/types/Registers'

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

const atualizar = [
    {name: "Não"},
    {name: "Sim"}
]

const tipoAtualizacao = [
    {name: "Atualizar"},
    {name: "Desativar"}
]

const statusOpcoes = [
    {name: "Aberto"},
    {name: "Fechado"}
]

interface IRegisterForm extends FormEvent<HTMLFormElement> {
}

const RegisterForm = (numeroChamado: any) => {
    const [id, setId] = useState('')
    const [chamado, setChamado] = useState(Object)
    const [analise_supervisor, setAnaliseSupervisor] = useState('')
    const [analise_sniper, setAnaliseSniper] = useState('')
    const [analise_conclusao, setAnaliseConclusao] = useState('')
    const [classificacao, setClassificacao] = useState('')
    const [grupoAtribuicao, setGrupoAtribuicao] = useState('')
    const [sistema, setSistema] = useState('')
    const [motivo, setMotivo] = useState('')
    const [justificativa, setJustificativa] = useState('')
    const [corrigir_artigo, setCorrigirArtigo] = useState(atualizar[0].name)
    const [data, setData] = useState('')
    const [n1_resolveria, setN1Resolveria] = useState('')
    const [status, setStatus] = useState('')

    const [repasse_indevido, setRepasseIndevido] = useState('')
    const [nome_artigo, setNomeArtigo] = useState('')
    const [solicitacao_artigo, setSolicitacaoArtigo] = useState('')
    const [validacao_artigo, setValidacaoArtigo] = useState('')
    const [justificativa_artigo, setJustificativaArtigo] = useState('')

    const {user} = useContext(AppContext)
    const router = useRouter()

    useEffect(() => {
        const getIncData = async () => {
            const dadosChamado = await getRegisterByNumber(numeroChamado.numeroChamado)
            setChamado(dadosChamado)

            let formatedDate = dadosChamado.data_chamado.toString().split('T')[0]
            setClassificacao(dadosChamado.classificacao_chamado)
            setMotivo(dadosChamado.motivo_chamado)
            setSistema(dadosChamado.sistema_chamado)
            setData(formatedDate)
            setStatus(dadosChamado.status_chamado)
            setJustificativa(dadosChamado.justificativa_chamado)
            setAnaliseConclusao(dadosChamado.analise_conclusao)
            setAnaliseSupervisor(dadosChamado.analise_supervisor)
            setAnaliseSniper(dadosChamado.analise_sniper)
            setRepasseIndevido(dadosChamado.repasse_indevido)
            setN1Resolveria(dadosChamado.n1_resolveria)
            setCorrigirArtigo(dadosChamado.corrigir_artigo)
            setNomeArtigo(dadosChamado.nome_artigo)
            setSolicitacaoArtigo(dadosChamado.solicitacao_artigo)
            setValidacaoArtigo(dadosChamado.validacao_artigo)
            setJustificativaArtigo(dadosChamado.justificativa_artigo)
        }
        getIncData()
    }, [])

    const handleSubmit = async (e: IRegisterForm) => {
        e.preventDefault()
        const register: IRegister = {
        id: chamado.id,
        numero_chamado: chamado.numero_chamado,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        data_chamado: chamado.data_chamado,
        mesa_chamado: chamado.mesa_chamado,
        status_chamado: status,
        motivo: motivo,
        sistema: sistema,
        classificacao: classificacao,
        justificativa_chamado: justificativa,
        n1_resolveria: n1_resolveria,
        analise_conclusao: analise_conclusao,
        analise_supervisor: analise_supervisor,
        analise_sniper: analise_sniper,
        repasse_indevido: repasse_indevido,
        corrigir_artigo: corrigir_artigo,
        nome_artigo: nome_artigo,
        solicitacao_artigo: solicitacao_artigo,
        validacao_artigo: validacao_artigo,
        justificativa_artigo: justificativa_artigo
        }
            updateRegister(register)
            router.push("/Dashboard")
    }


    return (
    <>
    <header>
        <title>Detalhes do Chamado - Controle de Repasses</title>
    </header>
    <MainRegisterForm>
        <RegisterFormController onSubmit={(e) => handleSubmit(e)}>
                <h2>Dados do chamado {chamado.numero_chamado}</h2>
            <RegisterFormBody>
                <li>
                    <Input 
                        label='Nº do Chamado'
                        value={chamado.numero_chamado}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        label='Data' 
                        value={data}
                        type='date' 
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        label='Mesa do chamado'
                        value={chamado.mesa_chamado}
                        disabled
                    />
                </li>
                <li>
                    <Select
                        label='Status do chamado'
                        options={statusOpcoes} 
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </li>
                <li>
                    <Input 
                        name='analista' 
                        label='Nome do Analista' 
                        value={chamado.analista_chamado}
                        disabled
                    />
                </li>
                <li>
                    <Input 
                        name='equipe' 
                        label='Equipe' 
                        value={chamado.equipe_chamado}
                        disabled
                    />
                </li>
                {user.funcao == 'OPERADOR TECNICO' ?                 
                <li>
                    <Input 
                        name='supervisor' 
                        label='Supervisor' 
                        value={user.supervisor}
                        disabled
                    />
                </li> : <></>
                }
                    
                    <h2>Analise de repasse do {chamado.numero_chamado}</h2>
                
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
                        defaultValue={chamado.justificativa_chamado}
                        onChange={(e) => setJustificativa(e.target.value)}
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Análise da Supervisão:' 
                    defaultValue={chamado.analise_supervisor}
                    onChange={(e) => setAnaliseSupervisor(e.target.value)}
                    disabled={user.funcao == "SUPERVISOR TÉCNICO" ? false : true}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Análise do Sniper:' 
                    defaultValue={chamado.analise_sniper}
                    onChange={(e) => setAnaliseSniper(e.target.value)}
                    disabled={user.funcao == "SNIPER TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select
                        label='Repasse incorreto'
                        options={atualizar} 
                        value={repasse_indevido}
                        onChange={(e) => setRepasseIndevido(e.target.value)}
                        disabled={user.funcao == "SNIPER TECNICO" ? false : true}
                    />
                </li>

                {chamado.status_chamado == "Fechado" ? 
                <>
                <h2>Analise de conclusão do {chamado.numero_chamado}</h2>
                <li>
                    <Textarea 
                    label='Análise de Conclusão:' 
                    placeholder='Informe o que foi feito para resolver o problema.'
                    defaultValue={chamado.analise_conclusao}
                    onChange={(e) => setAnaliseConclusao(e.target.value)}
                    disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select
                        label='Poderia ser resolvido no N1'
                        options={atualizar} 
                        value={n1_resolveria}
                        onChange={(e) => setN1Resolveria(e.target.value)}
                        disabled={user.funcao == "OPERADOR TECNICO" ? false : true}
                    />
                </li>
                <li>
                    <Select 
                        name='corrigir artigo' 
                        label='Artigo a corrigir'
                        options={atualizar} 
                        value={corrigir_artigo}
                        onChange={(e) => setCorrigirArtigo(e.target.value)}
                    />
                </li>
                {corrigir_artigo == "Não" ? 
                <></>
                : // ATUALIZAÇÃO DO ARTIGO
                <>
                <h2>Atualização do Artigo:</h2>
                <li>
                    <Input 
                        name='nome artigo' 
                        label='Nome do Artigo' 
                        onChange={(e) => setNomeArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Select 
                        name='tipo atualizacao' 
                        label='Tipo da atualização'
                        options={tipoAtualizacao} 
                        value={solicitacao_artigo}
                        onChange={(e) => setSolicitacaoArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Select 
                        name='valudacao do atigo' 
                        label='Houve validação pelo Responsável Técnico'
                        options={atualizar} 
                        value={validacao_artigo}
                        onChange={(e) => setValidacaoArtigo(e.target.value)}
                    />
                </li>
                <li>
                    <Textarea 
                    label='Justificativa da atualização:' 
                    placeholder=''
                    value={justificativa_artigo}
                    onChange={(e) => setJustificativaArtigo(e.target.value)}
                    />
                </li>
                </>
                }
                </>
                :
                <></>}
                <div className='btnContainer'>
                    <Link className='cancel' href='../'>Cancelar</Link>
                    <Button type='submit' className='send'>Salvar</Button>
                </div>
            </RegisterFormBody>
        </RegisterFormController>
    </MainRegisterForm>
    </>
    )
}

export default RegisterForm




/* 
1- Analista que repassou vai classificar e justificar o repasse do chamado
2- SPOC irá realizar a análise do chamado

*/