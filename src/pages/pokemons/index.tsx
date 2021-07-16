import { GetStaticProps } from 'next'
import Link from 'next/link'

import Main from 'components/Main'

export default function Pokemons({ data }) {
  return (
    <Main>
      {data?.slice(0, 10)?.map((item) => {
        return (
          <h1 key={item?.name}>
            <Link href={`/pokemons/${item?.name}`}>
              <a>{item?.name}</a>
            </Link>
          </h1>
        )
      })}
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon')
  const data = await response.json()

  return {
    props: {
      data: data?.results
    }
  }
}
