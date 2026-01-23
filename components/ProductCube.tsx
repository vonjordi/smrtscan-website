'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox, OrbitControls, Float, Html } from '@react-three/drei'
import * as THREE from 'three'

// Product data for each face of the cube
const products = [
  { id: 'smrtscan', name: 'SMRTscan', tagline: 'AI Receipt Scanner', color: '#10b981', available: true, hasLogo: true },
  { id: 'coming-2', name: 'Coming Soon', tagline: 'Next Innovation', color: '#6366f1', available: false, hasLogo: false },
  { id: 'coming-3', name: 'Coming Soon', tagline: 'Next Innovation', color: '#f59e0b', available: false, hasLogo: false },
  { id: 'coming-4', name: 'Coming Soon', tagline: 'Next Innovation', color: '#ec4899', available: false, hasLogo: false },
  { id: 'coming-5', name: 'Coming Soon', tagline: 'Next Innovation', color: '#8b5cf6', available: false, hasLogo: false },
  { id: 'coming-6', name: 'Coming Soon', tagline: 'Next Innovation', color: '#06b6d4', available: false, hasLogo: false },
]

// Face positions and rotations
const faceConfigs = [
  { position: [0, 0, 1.01] as [number, number, number], rotation: [0, 0, 0] as [number, number, number] },
  { position: [0, 0, -1.01] as [number, number, number], rotation: [0, Math.PI, 0] as [number, number, number] },
  { position: [1.01, 0, 0] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number] },
  { position: [-1.01, 0, 0] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number] },
  { position: [0, 1.01, 0] as [number, number, number], rotation: [-Math.PI / 2, 0, 0] as [number, number, number] },
  { position: [0, -1.01, 0] as [number, number, number], rotation: [Math.PI / 2, 0, 0] as [number, number, number] },
]

function LogoFace({ position, rotation }: {
  position: [number, number, number],
  rotation: [number, number, number]
}) {
  const texture = useLoader(THREE.TextureLoader, '/smrtscan-logo.png')

  return (
    <group position={position} rotation={rotation}>
      {/* Background with gradient effect */}
      <mesh>
        <planeGeometry args={[1.9, 1.9]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.15} />
      </mesh>
      {/* Logo */}
      <mesh position={[0, 0.15, 0.01]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial map={texture} transparent />
      </mesh>
      {/* Status badge */}
      <Html center transform distanceFactor={2.5} position={[0, -0.7, 0.01]}>
        <div style={{
          fontSize: '8px',
          padding: '3px 8px',
          borderRadius: '10px',
          background: 'rgba(16,185,129,0.3)',
          color: '#4ade80',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}>
          AVAILABLE NOW
        </div>
      </Html>
    </group>
  )
}

function ComingSoonFace({ product, position, rotation }: {
  product: typeof products[0],
  position: [number, number, number],
  rotation: [number, number, number]
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[1.9, 1.9]} />
        <meshStandardMaterial color={product.color} transparent opacity={0.15} />
      </mesh>
      <Html center transform distanceFactor={2.5}>
        <div style={{
          textAlign: 'center',
          color: 'white',
          userSelect: 'none',
          pointerEvents: 'none',
          width: '120px',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✨</div>
          <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px' }}>{product.name}</div>
          <div style={{ fontSize: '9px', opacity: 0.7 }}>{product.tagline}</div>
          <div style={{
            marginTop: '10px',
            fontSize: '7px',
            padding: '3px 8px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.5)',
            display: 'inline-block',
          }}>
            COMING SOON
          </div>
        </div>
      </Html>
    </group>
  )
}

function InteractiveCube() {
  const meshRef = useRef<THREE.Group>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Multi-axis rotation for more dynamic movement
  useFrame((state, delta) => {
    if (meshRef.current && !isDragging) {
      const time = state.clock.elapsedTime

      // Primary rotation on Y axis
      meshRef.current.rotation.y += delta * 0.2

      // Gentle oscillation on X axis
      meshRef.current.rotation.x = Math.sin(time * 0.4) * 0.15

      // Subtle Z axis wobble
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.05
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.4}>
      <group
        ref={meshRef}
        onPointerDown={() => setIsDragging(true)}
        onPointerUp={() => setIsDragging(false)}
        onPointerLeave={() => setIsDragging(false)}
      >
        {/* Main cube body - dark with metallic finish */}
        <RoundedBox args={[2, 2, 2]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#0f0f1a"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>

        {/* Glowing edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.02, 2.02, 2.02)]} />
          <lineBasicMaterial color="#6366f1" transparent opacity={0.7} />
        </lineSegments>

        {/* Second layer of edges for glow effect */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.04, 2.04, 2.04)]} />
          <lineBasicMaterial color="#818cf8" transparent opacity={0.3} />
        </lineSegments>

        {/* SMRTscan face (front) with logo */}
        <LogoFace
          position={faceConfigs[0].position}
          rotation={faceConfigs[0].rotation}
        />

        {/* Coming Soon faces */}
        {products.slice(1).map((product, index) => (
          <ComingSoonFace
            key={product.id}
            product={product}
            position={faceConfigs[index + 1].position}
            rotation={faceConfigs[index + 1].rotation}
          />
        ))}

        {/* Inner glow light */}
        <pointLight position={[0, 0, 0]} intensity={0.3} color="#6366f1" />
      </group>
    </Float>
  )
}

export default function ProductCube() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#6366f1" />
        <pointLight position={[0, 3, 3]} intensity={0.5} color="#10b981" />

        <InteractiveCube />

        {/* Orbit controls for user interaction */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3 / 4}
        />
      </Canvas>

      {/* Interaction hint */}
      <div style={{
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}>
        <span style={{ fontSize: '16px' }}>↻</span>
        Drag to explore
      </div>
    </div>
  )
}
