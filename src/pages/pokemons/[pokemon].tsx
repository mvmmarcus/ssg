import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { Pokemon as PokemonProps } from 'pages'
import Pokemon from 'components/Pokemon'

type Props = {
  data: PokemonProps
}

export default function Products({ data }: Props) {
  const { isFallback } = useRouter()

  return <Pokemon data={data} isFallback={isFallback} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`)
  const data = await response.json()

  const paths = data.results.map((item) => {
    return { params: { pokemon: item.name } }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { pokemon } = context.params

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
  const data = await response.json()

  return {
    props: {
      data: {
        name: data.name,
        url: data.sprites.front_default
      }
    }
  }
}
