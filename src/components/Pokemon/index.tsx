import * as S from './styles'

const Pokemon = ({ data, isFallback }) => {
  if (isFallback) {
    return (
      <S.Wrapper>
        <h1>Carregando informações do pokemon...</h1>
      </S.Wrapper>
    )
  }

  return (
    <S.Wrapper>
      <img src={data.url} alt={data.name} loading="lazy" />
      <h1>{data.name}</h1>
    </S.Wrapper>
  )
}
export default Pokemon
