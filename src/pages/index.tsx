import styled from 'styled-components'
import Login from './Login'

const MainContainer = styled.main`
  width: 100%;
  display: flex;
  min-height: calc(100vh - 14rem);
  `

export default function Home() {

  return (
    <MainContainer>
      <Login />
    </MainContainer>
  )
}