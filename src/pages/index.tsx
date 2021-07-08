import { GetStaticProps } from 'next'
import Main from 'components/Main'

export type Pokemon = {
  name: string
  url: string
}

type Props = {
  data: Pokemon[]
}

export default function Home({ data }: Props) {
  return <Main data={data} />
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await response.json()
  return {
    props: {
      data: data.results
    }
  }
}
