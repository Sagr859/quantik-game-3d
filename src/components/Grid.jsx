import { Vector3, Plane } from 'three'
import { createContext, useRef, useContext, useCallback, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useRecoilState, useRecoilValue } from 'recoil'
import { gameStatus, openGridState, playerACoinState, playerBCoinState } from '../recoil_state'
import { Block } from './NoBlock'

const v = new Vector3()
const p = new Plane(new Vector3(0, 1, 0), 0)
const posOffset = 0.9
const context = createContext()

export const CheckIfDrop = (v, openBoxes, setOpenBoxes) =>{
  let currCoinPos = { x : v?.x?.toFixed(1), z : v?.z?.toFixed(1)}
  let val = openBoxes?.filter(el => 
    (el?.pos[0]-posOffset < currCoinPos?.x && el?.pos[0]+posOffset > currCoinPos?.x && el?.pos[1]-posOffset < currCoinPos?.z && el?.pos[1]+posOffset > currCoinPos?.z))??null
  console.log('v=>',v,'VAL',val)
  if(val && val[0]){
    let newArr = openBoxes?.filter(el => el!==val[0])
    setOpenBoxes(newArr)
    return val[0] 
  }else{
    return false
  }
} 

function useDrag(onDrag) {
  const controls = useThree((state) => state.controls)
  const activatePlane = useContext(context)
  const [playerACoinArr, setPlayerACoin] = useRecoilState(playerACoinState)
  const [playerBCoinArr, setPlayerBCoin] = useRecoilState(playerBCoinState)
  const [openBoxes, setOpenBoxes]        = useRecoilState(openGridState)
  const [gameStatusObj, setGameStatus]      = useRecoilState(gameStatus)

  const [hovered, hover] = useState(false)
  const [active, activate] = useState(null)
  const [oldPos, setOldPos] = useState([])
  const out = useCallback(() => hover(false), [])
  const over = useCallback((e) => {
    e.stopPropagation() 
    hover(true)
  }, [])

  const getOpponentColor = (v) =>{
    if(v==='A')
      return 'B'
    else 
      return 'A'
  }

  const down = useCallback(
    (e) => {
      e.stopPropagation()
      let coinVal = e?.eventObject?.playerId
      activate(coinVal??null)
      activatePlane(coinVal??null)
      console.log('POS',e?.eventObject?.coinObj?.pos,e)
      setOldPos(e?.eventObject?.coinObj?.pos)
      if (controls) controls.enabled = false
      e.target.setPointerCapture(e.pointerId)
    },
    [controls, activatePlane]
  )

  function replaceItemAtIndex(arr, index, newValue) {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  }

  const up = useCallback(
    (e) => {
      activate(null)
      activatePlane(false)
      console.log('CONTROLS=>',controls)
      console.log('e',e)
      let curCord = CheckIfDrop(v, openBoxes, setOpenBoxes)
      // console.log('v=>',v,'checkif',CheckIfDrop(v))
      console.log('CURCORD',curCord)
      if(curCord){
        if(e.ray.intersectPlane(p, v))
          onDrag({ x: curCord?.pos[0], z : curCord?.pos[1], y : 1})
        let newObj = {
          ...e?.eventObject?.coinObj,
          pos : [ ...curCord?.pos],
          status : true
        }
        if(e?.eventObject?.coinObj?.player_id){
          let idx = playerBCoinArr?.findIndex(el => el?.coin_id===e?.eventObject?.coinObj?.coin_id)
          let arr = replaceItemAtIndex(playerBCoinArr, idx, newObj)
          setPlayerBCoin(arr)
        }else{
          let idx = playerACoinArr.findIndex(el => el?.coin_id===e?.eventObject?.coinObj?.coin_id)
          let arr = replaceItemAtIndex(playerACoinArr, idx, newObj)
          setPlayerACoin(arr)
        }
        let blacklistRows = openBoxes?.filter(el => el.pos[0] === curCord?.pos[0])
        let blacklistCols = openBoxes?.filter(el => el.pos[1] === curCord?.pos[1])
        let blacklistReg  = openBoxes?.filter(el => el?.region===curCord?.region)

        let rowWin = checkIfWon(e?.eventObject, blacklistRows)
        let colWin = checkIfWon(e?.eventObject, blacklistCols)
        let regWin = checkIfWon(e?.eventObject, blacklistReg)

        console.log('BLKRWS',blacklistRows,'BLKCLS',blacklistCols,'BLKREG',blacklistReg,'Win=>',rowWin,colWin,regWin)
        setOpenBoxes(openBoxes?.map(el => 
          (
            (blacklistRows?.includes(el) || blacklistCols?.includes(el) || blacklistReg?.includes(el)) ? 
              { ...el, 
                shapeList   : [...el?.shapeList, { shape : e?.eventObject?.name, player : getOpponentColor(e?.eventObject?.playerId) }],
                cellStatus  : rowWin || colWin || regWin,
                currCoin    : el?.pos[0]===curCord?.pos[0] && el?.pos[1]===curCord?.pos[1] ? 
                  {
                    shape : e?.eventObject?.name, player : e?.eventObject?.playerId
                  }
                  : el?.currCoin
              } 
            : el
          )
        ))
        let winStat = rowWin || colWin || regWin 
        let oldGameObj = {
          gameStatus : winStat ? 0 : 1,
          gameResult : winStat ? 1 : null, // null => game inprogress 1 => won 0 => tie 
          p1_status  : winStat ? gameStatusObj?.turn%2===0 ? 0 : 1 : null, // null => game inprogress, 1=> won/tie, 0=> lost
          p2_status  : winStat ? gameStatusObj?.turn%2!==0 ? 0 : 1 : null, // null => game inprogress, 1=> won/tie, 0=> lost
          turn       : winStat ? gameStatusObj?.turn : gameStatusObj?.turn+1
        }
        setGameStatus({ ...gameStatusObj, ...oldGameObj })
        
      }else{
        if(e.ray.intersectPlane(p, v)){
          console.log('OLDPOS',oldPos)
          onDrag({ x : oldPos[0], z : oldPos[1], y : 1})
        }
        setOldPos([])
      }

      if (controls) controls.enabled = true
      
      e.target.releasePointerCapture(e.pointerId)
    },
    [controls, onDrag, activatePlane, oldPos, playerACoinArr, playerBCoinArr, setPlayerACoin, setPlayerBCoin, openBoxes, setOpenBoxes, gameStatusObj, setGameStatus]
  )

  const move = useCallback(
    (e) => {
      e.stopPropagation()
      if (active && e.ray.intersectPlane(p, v)) onDrag(v)
    },
    [onDrag, active]
  )
  return [
            { 
              onPointerOver : over, 
              onPointerOut  : out, 
              onPointerDown : down, 
              onPointerUp   : up, 
              onPointerMove : move 
            }, active, hovered]
}

export const checkIfWon = (currCoin, arr) =>{
  let win = ['cube', 'cylinder','sphere','cone']
  console.log('CHECKIFWON1',currCoin,arr)
  if(arr && arr?.length>0){
    for(let i=0; i<arr?.length; ++i){
      let newArr = win
      win = newArr?.filter(el => arr[i]?.currCoin?.shape!==el)
      console.log('CHECKIFWON1.5,NEWARR',win,newArr,arr[i]?.currCoin?.shape)
    }
    
    console.log('CHECKIFWON2',currCoin,arr, win)
    if(win?.length===1 && win[0]===currCoin?.name)
      return true
    else 
      return false
  }else{
    return false
  }
  
} 

function Grid({ children, scale, divisions = 10, ...props }) {
  const grid = useRef()
  const plane = useRef()
  const planeA = useRef()
  const planeB = useRef()
  const [active, activate] = useState(null)

  const openBoxes = useRecoilValue(openGridState)
  const turnVal   = useRecoilValue(gameStatus)

  useFrame((state, delta) => {
    easing.damp(grid.current.material, 'opacity', active ? 1 : 0.9, 0.1, delta)
    easing.damp(plane.current.material, 'opacity', active ? 1 : 0.25, 0.1, delta)

    // easing.damp(planeA.current.material, 'opacity', active==='A' ? 1 : 0.25, 0.1, delta)
    // easing.damp(planeB.current.material, 'opacity', active==='B' ? 1 : 0.25, 0.1, delta)
  })
  return (
    <group {...props}>
      <mesh receiveShadow ref={planeA} rotation-x={-Math.PI / 2} scale={[20,5,5]} position={[0,0,-15]}>
        <planeGeometry/>
        <meshStandardMaterial color={'rgb(71,3,1)'} transparent opacity={turnVal?.turn%2!==0 ? 1 : 0.25}
          polygonOffset polygonOffsetUnits={1} polygonOffsetFactor={1} 
        />
      </mesh>
      <group scale={scale}>
        <gridHelper ref={grid} args={[1, divisions, '#888', '#bbb']} />
        <mesh receiveShadow ref={plane} rotation-x={-Math.PI / 2}>
          <planeGeometry/>
          <meshStandardMaterial transparent color="lightblue" 
            polygonOffset polygonOffsetUnits={1} polygonOffsetFactor={1} 
          />
        </mesh>
      </group>
      <mesh receiveShadow ref={planeB} rotation-x={-Math.PI / 2} scale={[20,5,5]} position={[0,0,15]} >
        <planeGeometry/>
        <meshStandardMaterial transparent color={'rgb(2,26,122)'}  opacity={turnVal?.turn%2===0 ? 1 : 0.25}
          polygonOffset polygonOffsetUnits={1} polygonOffsetFactor={1} 
        />
      </mesh>
      <context.Provider value={activate}>{children}</context.Provider>
      {
        openBoxes.map((el, k) => {

          let activeElem = { shape : props?.currActiveCoin?.shape, player : props?.currActiveCoin?.color}
          if(!el?.cellStatus && active && el?.shapeList && 
            el?.shapeList?.some(lm => lm?.shape===activeElem?.shape && lm?.player===activeElem?.player))
            return <Block position={[el?.pos[0], 0.1, el?.pos[1]]} />
          else
          return(
            <mesh receiveShadow rotation-x={-Math.PI / 2} key={k} scale={2} position={[el.pos[0],0.1,el.pos[1]]} >
              <planeGeometry/>
                <meshStandardMaterial transparent color={
                  el?.cellStatus ? "orange" : 
                  active ? el?.shapeList && 
                  el?.shapeList?.some(lm => lm?.shape===activeElem?.shape && lm?.player===activeElem?.player) ?
                  "yellow" : "green" : "lightblue"} 
                  polygonOffset polygonOffsetUnits={1} polygonOffsetFactor={1} 
                />
            </mesh>
          )
        })
      }
      
    </group>
  )
}

export { Grid, useDrag }
