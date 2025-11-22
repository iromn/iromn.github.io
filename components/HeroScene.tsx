'use client'

import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function CyberObject(props: any) {
    const meshRef = useRef<THREE.Mesh>(null!)
    const [hovered, setHover] = useState(false)

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2
        meshRef.current.rotation.y += delta * 0.3
    })

    return (
        <mesh
            {...props}
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            scale={hovered ? 1.2 : 1}
        >
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial
                color={hovered ? "#00F0FF" : "#080A1F"}
                emissive={hovered ? "#00F0FF" : "#00F0FF"}
                emissiveIntensity={hovered ? 2 : 0.5}
                wireframe
                transparent
                opacity={0.8}
            />
        </mesh>
    )
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 0, 8]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />

            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <CyberObject position={[0, 0, 0]} />
            </Float>

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Grid floor effect */}
            <gridHelper args={[30, 30, 0x2D3250, 0x2D3250]} position={[0, -5, 0]} />
        </>
    )
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas>
                <Scene />
            </Canvas>
        </div>
    )
}
