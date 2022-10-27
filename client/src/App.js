import { CurrencyTicker } from './currency/Ticker'
import styled from 'styled-components'

const AppStyled = styled.div`
  text-align: center;
  max-width: 700px;
  margin: auto;
`

function App() {
  return (
    <AppStyled>
      <h1>Currency Ticker</h1>
      <CurrencyTicker />
    </AppStyled>
  );
}

export default App;
