import React, {AllHTMLAttributes, MouseEventHandler, useContext, useEffect} from 'react'
import { SidebarMain } from './styles'
import { AppContext } from '@/context/AppContext'
import { redirect, useRouter } from 'next/navigation'
import { ChamadosIcon } from '../../../public/icons/ChamadosIcon'
import { ChamadosFinalizadosIcon } from '../../../public/icons/ChamadosFinalizadosIcon'
import { TarefasIcon } from '../../../public/icons/TarefasIcon'
import { EquipeIcon } from '../../../public/icons/EquipeIcon'
import { SairIcon } from '../../../public/icons/SairIcon'

interface SidebarProps extends AllHTMLAttributes<HTMLLIElement> {
  handleClick: (value: string) => string | void
}

const Sidebar = (props: SidebarProps) => {
  const {page, setPage, setUser} = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    if(page == "home"){
      document.getElementById("home")?.classList.add("selected")
    } else if(page == "register") {
      document.getElementById("conclusion")?.classList.add("selected")
    } else if(page == "new") {
      document.getElementById("new")?.classList.add("selected")
    } else {
      document.getElementById("info")?.classList.add("selected")
    }
  }, [])
  
  const handleHome = () => {
    setPage("home")
    document.getElementById("home")?.classList.add("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("new")?.classList.remove("selected")
  }

  const handleNew = () => {
    setPage("new")
    document.getElementById("new")?.classList.add("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("home")?.classList.remove("selected")
  }

  const handleClosed = () => {
    setPage("register")
    document.getElementById("conclusion")?.classList.add("selected")
    document.getElementById("home")?.classList.remove("selected")
    document.getElementById("info")?.classList.remove("selected")
    document.getElementById("new")?.classList.remove("selected")
  }

  const handleInfo = () => {
    setPage("info")
    document.getElementById("info")?.classList.add("selected")
    document.getElementById("home")?.classList.remove("selected")
    document.getElementById("conclusion")?.classList.remove("selected")
    document.getElementById("new")?.classList.remove("selected")
  }

  const logoff = () => {
    localStorage.setItem('user', JSON.stringify({}))
    setUser('')
    router.push("/")
  }

  return (
    <SidebarMain>
        <ul>
            <li onClick={handleHome}>
              <ChamadosIcon /><span id='home'>
                  Meus chamados
                </span>
            </li>
            <li onClick={handleNew}>
              <TarefasIcon /><span id='new'>
                  Novo chamado
                </span>
            </li>
            <li onClick={handleClosed}>
            <ChamadosFinalizadosIcon /><span id="conclusion">
                Chamados Encerrados
              </span>
            </li>
            <li>
            <EquipeIcon /><span id="info">
                Dados da equipe
              </span>
            </li>
            <li onClick={logoff}>
            <SairIcon /><span>
                Sair
              </span>
            </li>
        </ul>
    </SidebarMain>
  )
}

export default Sidebar