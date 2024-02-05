export interface IRegister {
    id: string,
    numero_chamado: string,
    sctask?: string,
    tarefas?: [],
    analista_chamado: string,
    equipe_chamado?: string,
    data_chamado: Date,
    mesa_chamado: string,
    status_chamado: string,
    motivo?: string,
    classificacao?: string,
    sistema?: string,
    justificativa_chamado?: string,
    n1_resolveria?: string,
    analise_supervisor?: string,
    analise_sniper?: string,
    repasse_indevido?: string,
    analise_conclusao?: string,
    corrigir_artigo?: string,
    nome_artigo?: string,
    solicitacao_artigo?: string,
    validacao_artigo?: string,
    justificativa_artigo?: string
}