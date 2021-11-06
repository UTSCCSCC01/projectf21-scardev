import { Canvas } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { Suspense } from "react";
import { OrbitControls, Center } from "@react-three/drei";

const TrophyModel = () => {
    return (
        <div style={{width: 150, height: 150}}>
            <Canvas shadows camera={{position: [100,0,0]}}>
                <ambientLight color="yellow" intensity={3} />
                <directionalLight color="white" position={[5, -2, 2]} intensity={1} />
                <directionalLight color="white" position={[-5, -2, 2]} intensity={1} />
                <color attach="background" args={['white']} />
                <Suspense fallback={null}>
                    <Center intensity={1}>
                        <Model scale={1.5} />
                    </Center>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={13} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
        </div>
    )
}

const Model = ({ scale }) => {
    const gltf = useLoader(GLTFLoader, "./trophy/scene.gltf")
    return <primitive object={gltf.scene} scale={scale} />
}

export default TrophyModel