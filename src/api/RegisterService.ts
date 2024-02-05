import { IRegister } from "@/types/Registers";
import { AxiosError, AxiosResponse, ResponseType } from "axios";
import { ServerResponse } from "http";
import { ApiError } from "next/dist/server/api-utils";

const axios = require('axios');

export const createRegister = async (chamado: IRegister) => {
    const {data} = await axios.post('http://localhost:5000/api/chamados', {
        numero_chamado: chamado.numero_chamado,
        sctask: chamado.sctask,
        data_chamado: chamado.data_chamado,
        mesa_chamado: chamado.mesa_chamado,
        analista_chamado: chamado.analista_chamado,
        status_chamado: chamado.status_chamado,
        equipe_chamado: chamado.equipe_chamado,
        motivo_chamado: chamado.motivo,
        sistema_chamado: chamado.sistema,
        classificacao_chamado: chamado.classificacao,
        justificativa_chamado: chamado.justificativa_chamado,
        corrigir_artigo: chamado.corrigir_artigo,
    }).catch((error: any) => {
        alert(error.response.data.message)
    })
    
    return alert(`Chamado ${chamado.numero_chamado} criado com sucesso.`)
}

export const getRegisters = async() => {
    const response = await axios.get('http://localhost:5000/api/chamados')
    .then((res: any) => res.data.registers)
    
    return response
}

export const getRegisterByNumber = async(numero: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/${numero}`)
    .then((res: any) => res.data)

    return response
}

export const getRegistersNumber = async() => {
    const response = await axios.get('http://localhost:5000/api/chamados/numero')
    .then((res: any) => res.data.registers)

    return response.map((chamado: any) => chamado.numero_chamado)
}

export const getUserRegisters = async(name: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/analista/${name}`)
    .then((res: Response) => res)

    return (response.data)
}

export const getTeamRegisters = async(equipe: string) => {
    const response = await axios.get(`http://localhost:5000/api/chamados/${equipe}`)
    .then((res: Response) => res)

    return (response.data)
}


export const updateRegister = async (chamado: IRegister) => {
    const response = await axios.patch(`http://localhost:5000/api/chamados/${chamado.numero_chamado}`, {
        id: chamado.id,
        numero_chamado: chamado.numero_chamado,
        analista_chamado: chamado.analista_chamado,
        equipe_chamado: chamado.equipe_chamado,
        data_chamado: chamado.data_chamado,
        status_chamado: chamado.status_chamado,
        mesa_chamado: chamado.mesa_chamado,
        justificativa_chamado: chamado.justificativa_chamado,
        n1_resolveria: chamado.n1_resolveria,
        analise_supervisor: chamado.analise_supervisor,
        analise_sniper: chamado.analise_sniper,
        repasse_indevido: chamado.repasse_indevido,
        analise_conclusao: chamado.analise_conclusao,
        corrigir_artigo: chamado.corrigir_artigo,
        nome_artigo: chamado.nome_artigo,
        solicitacao_artigo: chamado.solicitacao_artigo,
        validacao_artigo: chamado.validacao_artigo,
        justificativa_artigo: chamado.justificativa_artigo
    }).catch((error: any) => console.log(error))
    
    console.log(response)

    return alert(`Chamado ${chamado.numero_chamado} atualizado com sucesso.`)
}