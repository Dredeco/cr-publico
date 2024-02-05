import React, { useContext, useEffect, useRef, useState } from 'react'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { AppContext } from '@/context/AppContext'
import Link from 'next/link'
import { Search } from '../../../../public/icons/search'
import { Input } from '../../Input'
import { getRegisters, getUserRegisters } from '@/api/RegisterService'
import { DownloadSheet } from '@/hooks/DownloadSheet'
import { SheetIcon } from '../../../../public/icons/sheetIcon'
import { IRegister } from '@/types/Registers'

const ClosedRegistersList = () => {
  const {user, setUser} = useContext(AppContext)
  const [chamadosEncerrados, setChamadosEncerrados] = useState(Array<IRegister>)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<IRegister>)
  const [filter, setFilter] = useState('')
  const tableRef = useRef(null)
  const filename = "Chamados encerrados"
  

  useEffect(() => {
    const getData = async () => {
      if(user.funcao != "OPERADOR TECNICO" || user.chave == 'AAXR') {
        const chamadosEquipe = await getRegisters()
        setChamadosEncerrados(chamadosEquipe.filter((chamado: IRegister) => chamado.status_chamado == 'Fechado'))
      } else {
          const chamadosUsuarioLogado = await getUserRegisters(user.nome)
          setChamadosEncerrados(chamadosUsuarioLogado.filter((chamado: IRegister) => chamado.status_chamado == 'Fechado'))
        }
    }
    getData()

    const getFilter = async () => {
      const result = chamadosEncerrados.filter((res: IRegister) => res.numero_chamado.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = chamadosEncerrados.filter((res: IRegister) => res.analista_chamado.toLowerCase().includes(filter.toLowerCase()))
        setChamadosFiltrados(result2)
      } else 
      setChamadosFiltrados(result)
    }
    getFilter()
  }, [filter])

  const converterData = (dataString: any) => {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembrando que os meses começam do zero no JavaScript
    const ano = data.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <DashboardMain>
      <DashboardContainer>
        <div>
          <div className='title'>
            <h1>CHAMADOS ENCERRADOS |</h1>
            <button title={`${filename} - Exportar XLS`} onClick={DownloadSheet(tableRef.current, filename, filename)}><SheetIcon /></button>
          </div>
          <Input placeholder='Filtrar por Nº Chamado / Nome' onChange={(e) => setFilter(e.target.value)} />
        </div>
        <DashboardWrapper ref={tableRef}>
        <thead>
            <tr key='Header'>
            <th>Buscar no ServiceNow</th>
              <th>Nº do chamado</th>
              <th>Status</th>
              <th>Data</th>
              <th>Grupo de atribuição</th>
              <th>Nome do Analista</th>
              <th>Análise de conclusão</th>
            </tr>
          </thead>
          <tbody>
          {chamadosFiltrados.length == 0 ? chamadosEncerrados.map((chamado: IRegister) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>
              <Link id={chamado.numero_chamado} href={`./Dashboard/Chamado/${chamado.numero_chamado}`}>{chamado.numero_chamado}</Link>
              </td>
              <td>{chamado.status_chamado == "Aberto" ? 'Em andamento' : 'Encerrado'}</td>
              <td>{converterData(chamado.data_chamado)}</td>
              <td>{chamado.mesa_chamado}</td>
              <td>{chamado.analista_chamado}</td>
              <td>{chamado.analise_conclusao}</td>
            </tr>
          )) : 
          chamadosFiltrados.map((chamado: IRegister) => (
            <tr key={chamado.numero_chamado}>
              <td>
                <Link target='_blank' href={`https://petrobras.service-now.com/now/nav/ui/classic/params/target/incident_list.do%3Fsysparm_first_row%3D1%26sysparm_query%3DGOTOnumber%253d${chamado.numero_chamado}`}><Search /></Link>
              </td>
              <td>
              <Link id={chamado.numero_chamado} href={`./Dashboard/Chamado/${chamado.numero_chamado}`}>{chamado.numero_chamado}</Link>
              </td>
              <td>{chamado.status_chamado == "Aberto" ? 'Em andamento' : 'Encerrado'}</td>
              <td>{converterData(chamado.data_chamado)}</td>
              <td>{chamado.mesa_chamado}</td>
              <td>{chamado.analista_chamado}</td>
              <td>{chamado.analise_conclusao}</td>
            </tr> ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default ClosedRegistersList