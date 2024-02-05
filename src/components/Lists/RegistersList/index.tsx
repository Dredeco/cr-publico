import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AppContext } from '@/context/AppContext'
import { DashboardContainer, DashboardMain, DashboardWrapper } from './styles'
import { Search } from '../../../../public/icons/search'
import { Input } from '../../Input'
import { getRegisters, getTeamRegisters, getUserRegisters } from '@/api/RegisterService'
import { DownloadSheet } from '@/hooks/DownloadSheet'
import { SheetIcon } from '../../../../public/icons/sheetIcon'
import { IRegister } from '@/types/Registers'

const RegistersList = () => {
  const {user} = useContext(AppContext)
  const [chamadosJustificados, setChamadosJustificados] = useState(Array<IRegister>)
  const [chamadosFiltrados, setChamadosFiltrados] = useState(Array<IRegister>)
  const [filter, setFilter] = useState('')
  const tableRef = useRef(null)
  const filename = "Chamados repassados"
  let atualizarPagina = 0
  

  useEffect(() => {
    const getData = async () => {
      if(user.funcao != "OPERADOR TECNICO" || user.chave == 'AAXR') {
        const chamadosEquipe = await getRegisters()
        setChamadosJustificados(chamadosEquipe)
      } else {
        const chamadosUserLogado = await getUserRegisters(user.nome)
        setChamadosJustificados(chamadosUserLogado);
      }
    }
    getData()

    
    const getFilter = async () => {
      const result = chamadosJustificados.filter((res: IRegister) => res.numero_chamado.toLowerCase().includes(filter.toLowerCase()))
      if(!result.length) {
        const result2 = chamadosJustificados.filter((res: IRegister) => res.analista_chamado.toLowerCase().includes(filter.toLowerCase()))
        setChamadosFiltrados(result2)
      } else 
      setChamadosFiltrados(result)
    }
    getFilter()

    if(chamadosJustificados == null) {
      getData()
      atualizarPagina++
    }
  }, [filter, atualizarPagina])


  const converterData = (dataString: Date) => {
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
            <h1>CHAMADOS REPASSADOS |</h1>
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
              <th>Justificativa do repasse</th>
            </tr>
          </thead>
          <tbody>
            {chamadosFiltrados.length == 0 ? chamadosJustificados.map((chamado: IRegister) => (
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
              <td>{chamado.justificativa_chamado}</td>
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
              <td>{chamado.justificativa_chamado}</td>
            </tr> ))}
          </tbody>
        </DashboardWrapper>
      </DashboardContainer>
    </DashboardMain>
  )
}

export default RegistersList