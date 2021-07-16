import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import Main from 'components/Main'

export default function PokemonPage({ data }) {
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <Main>
        <h1>Carregando as informações do personagem...</h1>
      </Main>
    )
  }

  return (
    <Main>
      <img src={data.photo} alt={data.name} loading="lazy" />
      <h1>{data.name}</h1>
    </Main>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    `http://localhost:1337/characters?_limit=10&_sort=created_at:ASC`
  )
  const data = await response.json()

  const paths = data?.map((item) => {
    return { params: { id: item.id.toString() } }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params

  const response = await fetch(`http://localhost:1337/characters/${id}`)
  const data = await response.json()

  return {
    props: {
      data: {
        name: data.name,
        photo: `http://localhost:1337${data.photo.url}`
      }
    },
    revalidate: 10
  }
}
