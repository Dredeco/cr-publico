import { getRegisterByNumber, getRegistersNumber } from '@/api/RegisterService';
import RegisterForm from '@/components/Forms/RegisterForm'
import { GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react'

interface ChamadoData {
  numeroChamado: string;
}

export async function getStaticPaths() {
  const numeroChamados = await getRegistersNumber()

  return {
    paths: numeroChamados.map((numero: string) => ({
      params: {numeroChamado: numero}
    })),
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ numeroChamado?: string }>) => {
  if (!params || !params.numeroChamado) {
    return {
      notFound: true,
    };
  }

  const chamadoData: ChamadoData = await getRegisterByNumber(params.numeroChamado);

  return {
    props: {
      chamadoData,
    },
    revalidate: 60,
  };
};

const ChamadoInfo = ({ chamadoData }: { chamadoData: any }) => {
  
  return (
    <RegisterForm numeroChamado={chamadoData.numero_chamado}/>
  )
}

export default ChamadoInfo

