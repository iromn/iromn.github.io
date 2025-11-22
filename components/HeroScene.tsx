'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

function LowPolyLandscape() {
    const meshRef = useRef<THREE.Mesh>(null!)

    // Create low-poly terrain geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(20, 20, 25, 25)
        const positions = geo.attributes.position.array as Float32Array

        // Create random heights for vertices to form mountains
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i]
            const y = positions[i + 1]
            // Create wave-like terrain with deterministic variation
            const variation = Math.sin(x * 1.3 + y * 0.7) * Math.cos(x * 0.9 - y * 1.1)
            positions[i + 2] = Math.sin(x * 0.5) * Math.cos(y * 0.5) * 2 + variation * 0.5
        }

        geo.computeVertexNormals()
        return geo
    }, [])

    // Animate the landscape
    useFrame((state) => {
        if (meshRef.current) {
            const positions = meshRef.current.geometry.attributes.position.array as Float32Array
            const time = state.clock.getElapsedTime()

            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i]
                const y = positions[i + 1]
                // Animated wave effect
                positions[i + 2] = Math.sin(x * 0.5 + time * 0.5) * Math.cos(y * 0.5 + time * 0.3) * 2 +
                    Math.sin(time * 0.2 + i) * 0.3
            }

            meshRef.current.geometry.attributes.position.needsUpdate = true
            meshRef.current.geometry.computeVertexNormals()

            // Slow rotation
            meshRef.current.rotation.z = Math.sin(time * 0.1) * 0.1
        }
    })

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -2, -5]}>
            <primitive object={geometry} />
            <meshStandardMaterial
                color="#080A1F"
                emissive="#00F0FF"
                emissiveIntensity={0.3}
                wireframe
                side={THREE.DoubleSide}
            />
        </mesh>
    )
}

function Scene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={60} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />

            <LowPolyLandscape />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
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
