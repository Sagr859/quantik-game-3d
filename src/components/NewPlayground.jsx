import { Canvas } from '@react-three/fiber'
import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei'
import { Grid } from './Grid'
import { PlayerCoin } from './PlayCoins'
import { DebugLabelers } from '../utils/playGroundLabel'
import { useRecoilValue } from 'recoil'
import { gameStatus, playerACoinState, playerBCoinState } from '../recoil_state'
import { useState } from 'react'

export default function NewPlayground() {
  const pACoin = useRecoilValue(playerACoinState)
  const pBCoin = useRecoilValue(playerBCoinState)
  const turnVal   = useRecoilValue(gameStatus)

  const [currActiveCoin, setCurrActiveCoin] = useState(null)
    
  return (
    <Canvas shadows orthographic camera={{ 
      //position : [-15,14,0],
      position: [-15, 6, 0], 
      zoom: 50 }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 20, 0]} castShadow shadow-mapSize={1024} />
      <Grid scale={20} divisions={9} currActiveCoin={currActiveCoin}>
        {
          pACoin.map( el => {
            let pos = [el?.pos[0], 1, el?.pos[1]]
            return <PlayerCoin setCurrActiveCoin={setCurrActiveCoin} position={[...pos]} c={'#fc3003'} name={el.c_shape} coinObj={el} playerId={'A'} 
                dragStatus={turnVal?.turn%2!==0 ? el?.status : true}
              />
          })
        }
        {
          pBCoin.map( el => {
            let pos = [el?.pos[0], 1, el?.pos[1]]
            return <PlayerCoin setCurrActiveCoin={setCurrActiveCoin} position={[...pos]} c={'blue'} name={el.c_shape} coinObj={el} playerId={'B'} 
            dragStatus={turnVal?.turn%2===0 ? el?.status : true}
              />
          })
        }
        <DebugLabelers/>
      </Grid>
      <OrbitControls makeDefault maxZoom={50} minZoom={30} maxDistance={20} enabled={false}
        minAzimuthAngle={-Math.PI / 1}
        maxAzimuthAngle={Math.PI / 2}
        // minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      <GizmoHelper alignment="bottom-right" margin={[100, 100]}>
        <GizmoViewport labelColor="white" axisHeadScale={1}/>
      </GizmoHelper>
    </Canvas>
  )
}
