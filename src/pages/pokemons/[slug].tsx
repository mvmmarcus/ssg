import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Main from 'components/Main'

export default function PokemonPage({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <Main>
        <h1>Carregando as informações do pokemon...</h1>
      </Main>
    )
  }

  return (
    <Main>
      <img src={data.imgUrl} alt={data.name} loading="lazy" />
      <h1>{data.name}</h1>
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
  const data = await response.json()

  const paths = data.results.map((item) => {
    return { params: { slug: item.name } }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`)
  const data = await response.json()

  return {
    props: {
      data: {
        name: data.name,
        imgUrl: data.sprites.front_default
      }
    }
  }
}
