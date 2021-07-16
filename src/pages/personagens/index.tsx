import { GetStaticProps } from 'next'
import Link from 'next/link'

import Main from 'components/Main'
import Title from 'components/Title'

export default function Pokemons({ data }) {
  return (
    <Main>
      <Title>Personagens</Title>
      <div>
        {data?.map((item) => {
          return (
            <h1 key={item?.id}>
              <Link href={`/personagens/${item?.id}`}>
                <a>{item?.name}</a>
              </Link>
            </h1>
          )
        })}
      </div>
    </Main>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:1337/characters')
  const data = await response.json()

  return {
    props: {
      data: data
    }
  }
}
