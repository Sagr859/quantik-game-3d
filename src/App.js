import NewPlayground from './components/NewPlayground';
import './App.css';
import { useRecoilValue } from 'recoil';
import { gameStatus, playerACoinState, playerBCoinState } from './recoil_state';

function App() {
  const pACoin = useRecoilValue(playerACoinState)
  const pBCoin = useRecoilValue(playerBCoinState)
  const gameStatusObj = useRecoilValue(gameStatus)

  return (
    <div className="App">
      <NewPlayground/>
      <div style={{ display:'flex', flexDirection:'row', width:'100%', alignItems:'center', justifyContent:'space-between' }}>
        {
          pACoin?.map(el => { return <p>{`${el?.coin_id}:[${el?.pos[0]},${el?.pos[1]}] | `}</p> })
        }
        {
          pBCoin?.map(el => { return <p>{`${el?.coin_id}:[${el?.pos[0]},${el?.pos[1]}] | `}</p> })
        }
      </div>
      {
        gameStatusObj?.gameResult!==null ?
          <p>{gameStatusObj?.p1_status ? 'Red/Player1' : 'Blue/Player2'}{' '}Wins the game</p>
        : null
      }
      <p>*You are not allowed to place a shape in a row, column, or region in which your opponent has a piece of the same shape. The first player to place the fourth different shape in a row, column, or region wins the game.</p>
    </div>
  );
}

export default App;
