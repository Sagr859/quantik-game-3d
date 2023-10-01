import React, { useMemo } from "react";
import { BoxBufferGeometry, DoubleSide, Group, Mesh, Vector3 } from 'three';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export function Block(props) {
  const geometry = useMemo(() => {
    const firstGeo = new BoxBufferGeometry(.2, 2, .1);
    const secondGeo = new BoxBufferGeometry(.2, 2, .1);

    firstGeo.rotateZ(40);
    secondGeo.rotateZ(-40);

    return mergeBufferGeometries([firstGeo, secondGeo]);
}, []);      
    return (
      <>
        <mesh position={props?.position} castShadow receiveShadow rotation={[-Math.PI / 2,0,0]} geometry={geometry}>
          <meshStandardMaterial color={'rgb(252,128,121)'}/>
        </mesh>
      </>
    );
  }