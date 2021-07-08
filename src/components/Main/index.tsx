import Link from 'next/link'

import * as S from './styles'

const Main = ({ data }) => {
  return (
    <S.Wrapper>
      {data.map((item, index) => (
        <h1 key={item.name}>
          {index + 1}{' '}
          <Link href={`/pokemons/${item.name}`}>
            <a>{item.name}</a>
          </Link>
        </h1>
      ))}
    </S.Wrapper>
  )
}

export default Main
