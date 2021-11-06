import { Canvas } from '@react-three/fiber'
import React, { Suspense } from "react";
import { OrbitControls, Center, useGLTF } from "@react-three/drei"

const CameraModel = () => {
    return (
        <div style={{ width: 150, height: 150 }}>
            <Canvas shadows camera={{position: [100,0,0]}}>
                <ambientLight color="white" intensity={3} />
                <directionalLight color="white" position={[5, -2, 2]} intensity={2} />
                <directionalLight color="white" position={[-5, -2, -2]} intensity={2} />
                <color attach="background" args={['white']} />
                <Suspense fallback={null}>
                    <Center intensity={15}>
                        <Model scale={0.6} />
                    </Center>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={13} enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 2.5} />
            </Canvas>
        </div>
    )
}

const Model = ({ scale }) => {
    const { scene } = useGLTF("./camera/scene.gltf")
    return <primitive object={scene} scale={scale} />
}

export default CameraModel