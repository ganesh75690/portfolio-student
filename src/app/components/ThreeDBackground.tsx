import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Simple Floating Particles
function FloatingParticles() {
  const points = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(500 * 3)
    const colors = new Float32Array(500 * 3)

    for (let i = 0; i < 500; i++) {
      const i3 = i * 3
      
      // Create sphere distribution
      const radius = Math.random() * 20 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Blue/violet colors
      colors[i3] = 0.4 + Math.random() * 0.4
      colors[i3 + 1] = 0.3 + Math.random() * 0.3
      colors[i3 + 2] = 0.8 + Math.random() * 0.2
    }

    return new THREE.BufferGeometry()
      .setAttribute('position', new THREE.BufferAttribute(positions, 3))
      .setAttribute('color', new THREE.BufferAttribute(colors, 3))
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.0005
      points.current.rotation.x += 0.0003
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 1.0
      points.current.position.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.3
    }
  })

  return (
    <points ref={points}>
      <primitive object={particles} />
      <pointsMaterial
        size={0.05}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// Nebula Cloud Component
function NebulaCloud() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.1}>
      <mesh ref={meshRef} position={[0, 0, -10]}>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial
          color="#4a148c"
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  )
}

// Floating Geometric Elements
function FloatingGeometric() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <mesh position={[-8, 3, -5]} rotation={[0.5, 0.3, 0]}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color="#7c4dff"
            transparent={true}
            opacity={0.3}
            wireframe={true}
          />
        </mesh>
      </Float>
      
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.15}>
        <mesh position={[6, -2, -8]} rotation={[0.3, 0.7, 0.2]}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial
            color="#3f51b5"
            transparent={true}
            opacity={0.25}
            wireframe={true}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
        <mesh position={[4, 4, -6]} rotation={[0.8, 0.2, 0.5]}>
          <dodecahedronGeometry args={[0.6, 0]} />
          <meshBasicMaterial
            color="#536dfe"
            transparent={true}
            opacity={0.2}
            wireframe={true}
          />
        </mesh>
      </Float>
    </>
  )
}

// Energy Particles
function EnergyParticles() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  const energyPoints = useMemo(() => {
    const positions = []
    for (let i = 0; i < 30; i++) {
      positions.push(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      )
    }
    return positions
  }, [])

  return (
    <group ref={groupRef}>
      {energyPoints.map((position, index) => (
        <Float key={index} speed={1 + Math.random() * 1.5} rotationIntensity={0.3} floatIntensity={1.5}>
          <mesh position={position}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial
              color="#e3f2fd"
              transparent={true}
              opacity={0.6 + Math.random() * 0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Main Scene Component
function Scene() {
  return (
    <>
      {/* Camera Setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#7c4dff" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3f51b5" />
      
      {/* 3D Elements */}
      <Stars
        radius={100}
        depth={50}
        count={2000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
      
      <FloatingParticles />
      <FloatingGeometric />
      
      {/* Subtle fog effect */}
      <fog attach="fog" args={['#000000', 10, 50]} />
    </>
  )
}

// Main ThreeDBackground Component
export function ThreeDBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
