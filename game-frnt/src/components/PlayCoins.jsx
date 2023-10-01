import * as THREE from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Grid'

export function CoinDrag(position, ref, c, currStatus){
  // const round = Math.round;
  // const clamp = THREE.MathUtils.clamp
  // const ref = useRef()
  const pos = useRef(position)
  const onDrag = useCallback(({ x, y, z }) => {
      return (
        pos.current = [
          x < -10 ? -10 : x > 10 ? 10 : x,
          y < 1 ? 1 : y,
          z < -20 ? -20 : z > 20 ? 20 : z
        //  round(clamp(x, -5, 4)) + 1, y, round(clamp(z, -5, 4)) + 1
        ]
      )
    },
    [])
  const [events, active, hovered] = useDrag(onDrag)
  useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])
  useFrame((state, delta) => {
    easing.damp3(ref.current.position, pos.current, 0.1, delta)
    easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : c, 0.1, delta)
  })

  let emptyEvents = { 
    onPointerOver : events?.onPointerOver, 
    onPointerOut  : events?.onPointerOut, 
    onPointerDown : ()=>{}, 
    onPointerUp   : ()=>{}, 
    onPointerMove : ()=>{} 
  }

  return currStatus ? emptyEvents : events
}

export function PlayerCoin({...props}) {
  if(props.name==='cube')
    return <CubeCoin {...props}/>
  else if(props.name==='cone')
    return <PyramidCoin {...props}/>
  else if(props.name==='cylinder')
    return <CylinderCoin {...props}/>
  else 
    return <SphereCoin {...props}/>
}

export function CubeCoin({ position = [0.5, 0.5, -0.5], c = new THREE.Color(), round = Math.round, clamp = THREE.MathUtils.clamp, ...props }) {
  const ref = useRef()
  const events = CoinDrag(position, ref, c, props?.dragStatus)
  console.log('props',props)
    return (
      <mesh ref={ref} castShadow receiveShadow 
        {...events} 
        onPointerDown={(e)=>{
          events?.onPointerDown(e)
          props?.setCurrActiveCoin({color : props?.playerId, shape : props?.name})
        }}

        onPointerUp={(e)=>{
          events?.onPointerUp(e)
          props?.setCurrActiveCoin(null)
        }}
        {...props} name='cube'>
        <boxGeometry/>
        <meshPhongMaterial/>
      </mesh>
    )
}

export function CylinderCoin({ position = [0.5, 0.5, -0.5], c = new THREE.Color(), round = Math.round, clamp = THREE.MathUtils.clamp, ...props }) {
    const ref = useRef()
    const events = CoinDrag(position, ref, c, props?.dragStatus)
    return (
      <mesh ref={ref} castShadow receiveShadow {...events} 
        onPointerDown={(e)=>{
          events?.onPointerDown(e)
          props?.setCurrActiveCoin({color : props?.playerId, shape : props?.name})
        }}

        onPointerUp={(e)=>{
          events?.onPointerUp(e)
          props?.setCurrActiveCoin(null)
        }}
        {...props} scale={.7} name='cylinder'>
        <cylinderGeometry  args={[1, 1, 2]}/>
        <meshStandardMaterial />
      </mesh>
    )
  }

export function PyramidCoin({ position = [0.5, 0.5, -0.5], c = new THREE.Color(), round = Math.round, clamp = THREE.MathUtils.clamp, ...props }) {
    const ref = useRef()
    const events = CoinDrag(position, ref, c, props?.dragStatus)
    return (
      <mesh ref={ref} castShadow receiveShadow {...events} 
        onPointerDown={(e)=>{
          events?.onPointerDown(e)
          props?.setCurrActiveCoin({color : props?.playerId, shape : props?.name})
        }}

        onPointerUp={(e)=>{
          events?.onPointerUp(e)
          props?.setCurrActiveCoin(null)
        }}
        {...props} name='cone'>
        <coneGeometry args={[0.7, 0.9, 20]}/>
        <meshStandardMaterial />
      </mesh>
    )
  }

export function SphereCoin({ position = [0.5, 1, -0.5], c = new THREE.Color(), round = Math.round, clamp = THREE.MathUtils.clamp, ...props }) {
  const ref = useRef()
  const events = CoinDrag(position, ref, c, props?.dragStatus)
    return (
      <mesh ref={ref} castShadow receiveShadow {...events} 
        onPointerDown={(e)=>{
          events?.onPointerDown(e)
          props?.setCurrActiveCoin({color : props?.playerId, shape : props?.name})
        }}

        onPointerUp={(e)=>{
          events?.onPointerUp(e)
          props?.setCurrActiveCoin(null)
        }}
        {...props} scale={.7} name='sphere'>
        <sphereGeometry/>
        <meshStandardMaterial />
      </mesh>
    )
  }