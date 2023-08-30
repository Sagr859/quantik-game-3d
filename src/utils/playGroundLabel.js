import { Billboard, Line, Text } from "@react-three/drei"
import { CoinPositions, PlayPositions } from "./validPositions"
import { playerACoinState, playerBCoinState } from "../recoil_state"
import { useRecoilValue } from "recoil"

export const DebugLabelers = () =>{
  const pACoin = useRecoilValue(playerACoinState)
  const pBCoin = useRecoilValue(playerBCoinState)

    return(
        <>
            <Line position={[0,0,0]} 
              points={[[10,0,-10],[10,0,10],[-10,0,10],[-10,0,-10],[10,0,-10]]} lineWidth={5} color={'red'} />
            {/* <Line position={[0,0,0]} 
              points={[[10,0,-1],[-10,0,-1]]} lineWidth={5} color={'blue'} />
            <Line position={[0,0,0]} 
              points={[[10,0,1],[-10,0,1]]} lineWidth={5} color={'blue'} />
            <Line position={[0,0,0]} 
              points={[[1,0,-10],[1,0,10]]} lineWidth={5} color={'yellow'} />
            <Line position={[0,0,0]} 
              points={[[-1,0,-10],[-1,0,10]]} lineWidth={5} color={'yellow'} /> */}
            {
                pACoin.map((el,i)=>{
                    return(
                        <Billboard
                            follow
                            position={[
                              el?.pos[0],
                              -1,
                              el?.pos[1]
                            ]}
    >
                            <Text
                              fontSize={.5}
                              outlineColor="#000000"
                              outlineOpacity={1}
                              outlineWidth="5%"
                            >
                              {el?.pos[0]} || {el?.pos[1]}
                            </Text>
                        </Billboard>
                    )
                })
            }
            {
                pBCoin.map((el,i)=>{
                    return(
                        <Billboard
                            follow
                            position={[
                              el?.pos[0],
                              -1,
                              el?.pos[1]
                            ]}
    >
                            <Text
                              fontSize={.5}
                              outlineColor="#000000"
                              outlineOpacity={1}
                              outlineWidth="5%"
                            >
                              {el?.pos[0]} || {el?.pos[1]}
                            </Text>
                        </Billboard>
                    )
                })
            }
            {
                PlayPositions.map((el,i)=>{
                    return(
                        <mesh position={[el[0], 0, el[1]]} castShadow receiveShadow rotation={[-Math.PI / 2,0,0]}>
                            <circleGeometry/>
                            <meshStandardMaterial color={'lightblue'}/>
                        </mesh>
                    )
                })
            }
        </>
    )
}