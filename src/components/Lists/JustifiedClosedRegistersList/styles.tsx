import styled from "styled-components"

export const DashboardMain = styled.section`
  width: fit-content;
  min-width: 100%;
  min-height: 50%;
  max-height: 50%;
  padding: 2rem 2%;
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 1rem;
  overflow-y: auto;
`

export const DashboardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  div{
    display: flex;
    align-items: center;
    gap: .5rem;

    button {
        cursor: pointer;
        background-color: transparent;

        :hover{
          fill: green;
        }
    }

    h1 {
      font-size: 2rem;
      color: #7772b4;
    }
  }

`

export const DashboardWrapper = styled.table`
  min-width: fit-content;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  text-align: center;

  thead{
    border-start-start-radius: 10px;
    border-start-end-radius: 10px;
  }

  > thead {
    background-color: #a59eee;
    tr {
      font-size: 1.35rem;
    }
  }

  > tbody {
    > :nth-child(2n + 2){
      background-color: #a59eee;
    }
  }


  tr{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-size: 1.2rem;
    border-bottom: 1px solid #000;

    th, td {
      background-color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 20rem;
      max-width: 20rem;
      padding: .5rem .5rem;

      p {
        font-weight: bold;
        padding-left: 5px;
      }
    }

    :nth-child(2){
    font-weight: bold;
    }
    
    :nth-child(3){
    font-weight: bold;
    }
  }
`