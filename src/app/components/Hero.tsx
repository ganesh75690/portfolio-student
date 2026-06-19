import { Suspense, useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Float, PerspectiveCamera, useTexture } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import * as THREE from 'three'
import { useInView } from './hooks/useInView'
import { Github, Linkedin, Mail } from 'lucide-react'

gsap.registerPlugin(useGSAP)


// Fallback Realistic Avatar (if GLB not available)
function RealisticAvatar({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const headRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.008
      
      // Mouse tracking
      groupRef.current.rotation.y = mousePosition.x * 0.02
      
      if (headRef.current) {
        headRef.current.rotation.x = -mousePosition.y * 0.05
        headRef.current.rotation.y = mousePosition.x * 0.08
      }
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
      <group ref={groupRef} position={[0, -1.2, 0]} scale={1.8}>
        {/* Head */}
        <group ref={headRef} position={[0, 1.6, 0]}>
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[0.8, 64, 64]} />
            <meshStandardMaterial 
              color="#f4c2a1" 
              roughness={0.25} 
              metalness={0.05}
              emissive="#f4c2a1"
              emissiveIntensity={0.01}
            />
          </mesh>
          
          {/* Eyes */}
          <mesh position={[-0.25, 0.1, 0.7]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.1} 
              metalness={0.9}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>
          
          <mesh position={[0.25, 0.1, 0.7]}>
            <sphereGeometry args={[0.08, 32, 32]} />
            <meshStandardMaterial 
              color="#ffffff" 
              roughness={0.1} 
              metalness={0.9}
              emissive="#ffffff"
              emissiveIntensity={0.05}
            />
          </mesh>
          
          {/* Pupils */}
          <mesh position={[-0.25, 0.1, 0.78]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          
          <mesh position={[0.25, 0.1, 0.78]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
        
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.6, 2.5, 8, 32]} />
          <meshStandardMaterial 
            color="#1a1a1a" 
            roughness={0.3} 
            metalness={0.7}
            emissive="#4a5568"
            emissiveIntensity={0.01}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Particle System
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 150
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.008
    }
  })

  const positions = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    sizes[i] = Math.random() * 0.03 + 0.01
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#6366f1"
        size={0.03}
        transparent
        opacity={0.6}
      />
    </points>
  )
}

// Camera Animation
function CameraAnimation() {
  const { camera } = useThree()
  
  useGSAP(() => {
    gsap.to(camera.position, {
      x: 0,
      y: 1.2,
      z: 4.5,
      duration: 3,
      ease: "power2.inOut"
    })
    
    gsap.to(camera.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 3,
      ease: "power2.inOut"
    })
  }, [])

  useFrame((state) => {
    // Subtle camera movement
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05
    camera.position.y = 1.2 + Math.sin(state.clock.elapsedTime * 0.15) * 0.02
  })

  return null
}

// Main Scene
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={45} />
      <CameraAnimation />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.15} color="#4a5568" />
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.6} 
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight 
        position={[-5, 6, -5]} 
        intensity={0.4} 
        color="#6366f1"
      />
      <pointLight 
        position={[5, -2, 5]} 
        intensity={0.3} 
        color="#a855f7"
      />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.2}
        color="#ffffff"
        angle={0.3}
        penumbra={1}
      />
      
            
      {/* Test Element */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      
      {/* 3D Elements */}
      <RealisticAvatar mousePosition={mousePosition} />
      <ParticleField />
      
      {/* Ground */}
      <ContactShadows 
        position={[0, -1.2, 0]} 
        opacity={0.25} 
        scale={12} 
        blur={2.5} 
        far={5} 
      />
      
      {/* Camera Controls */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI * 0.4}
        minPolarAngle={Math.PI * 0.3}
        maxAzimuthAngle={Math.PI * 0.15}
        minAzimuthAngle={-Math.PI * 0.15}
        enableDamping
        dampingFactor={0.08}
      />
    </>
  )
}

function TestScene() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  )
}

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.3, triggerOnce: false });

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ganesh75690', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/b-sai-ganesh-949a45288', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:bsaiganesh2023@gmail.com', label: 'Email' },
  ];

  return (
    <div ref={ref} className="relative w-full h-screen overflow-hidden">

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div 
          className="text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8, delay: isInView ? 0.2 : 0, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05, textShadow: "0 0 30px rgba(255,255,255,0.5)" }}
          >
            B SAI GANESH
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 30, x: -20 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: -20 }}
            transition={{ duration: 0.8, delay: isInView ? 0.4 : 0, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, color: "#ffffff" }}
          >
            AI Developer and Engineer
          </motion.p>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30, x: 20 }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 30, x: 20 }}
            transition={{ duration: 0.8, delay: isInView ? 0.6 : 0, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.01 }}
          >
            Passionate about developing intelligent AI solutions and cutting-edge machine learning applications.
            Specializing in AI/ML engineering, neural networks, and advanced algorithm development.
          </motion.p>
          
          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: isInView ? 0.8 : 0, type: "spring", stiffness: 100 }}
          >
            <motion.button 
              className="px-8 py-3 bg-purple-600 text-white rounded-lg" 
              aria-label="View My Work" 
              title="View My Work"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: -10 }}
              transition={{ duration: 0.5, delay: isInView ? 0.9 : 0, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "#7c3aed",
                boxShadow: "0 15px 30px rgba(124, 58, 237, 0.6)",
                y: -3,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button 
              className="px-8 py-3 border border-gray-400 text-white rounded-lg" 
              aria-label="Contact Me" 
              title="Contact Me"
              initial={{ scale: 0.8, rotate: 10 }}
              animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0.8, rotate: 10 }}
              transition={{ duration: 0.5, delay: isInView ? 1.0 : 0, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "#1f2937",
                borderColor: "#9ca3af",
                y: -3,
                transition: { type: "spring", stiffness: 400 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.button>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex gap-6 justify-center mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: isInView ? 1.3 : 0, type: "spring", stiffness: 100 }}
          >
            {socialLinks.map((social, index) => {
              const getIconColor = () => {
                switch(social.label) {
                  case 'GitHub': return '#ffffff'; // White icon on black background
                  case 'LinkedIn': return '#ffffff'; // White icon on blue background
                  case 'Email': return '#ffffff'; // White icon on red background
                  default: return '#ffffff';
                }
              };
              
              const getBgColor = () => {
                switch(social.label) {
                  case 'GitHub': return 'bg-black hover:bg-gray-800';
                  case 'LinkedIn': return 'bg-[#0077B5] hover:bg-[#005885]';
                  case 'Email': return 'bg-[#EA4335] hover:bg-[#C23321]';
                  default: return 'bg-gray-600';
                }
              };
              
              const getHoverBgColor = () => {
                switch(social.label) {
                  case 'GitHub': return '#1a1a1a';
                  case 'LinkedIn': return '#005885';
                  case 'Email': return '#C23321';
                  default: return '#4a5568';
                }
              };

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full transition-all duration-300 shadow-lg"
                  style={{ 
                    backgroundColor: social.label === 'GitHub' ? '#000000' : social.label === 'LinkedIn' ? '#0077B5' : '#EA4335',
                    color: '#ffffff',
                    boxShadow: social.label === 'GitHub' ? '0 4px 12px rgba(0,0,0,0.3)' : social.label === 'LinkedIn' ? '0 4px 12px rgba(0,119,181,0.3)' : '0 4px 12px rgba(234,67,53,0.3)'
                  }}
                  aria-label={social.label}
                  title={social.label}
                  initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -180 }}
                  transition={{ duration: 0.6, delay: isInView ? 1.4 + index * 0.1 : 0, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 360,
                    backgroundColor: getHoverBgColor(),
                    y: -5,
                    boxShadow: social.label === 'GitHub' ? '0 8px 20px rgba(0,0,0,0.4)' : social.label === 'LinkedIn' ? '0 8px 20px rgba(0,119,181,0.4)' : '0 8px 20px rgba(234,67,53,0.4)',
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: isInView ? 1.2 : 0, type: "spring", stiffness: 100 }}
      >
        <motion.div 
          className="animate-bounce"
          whileHover={{ scale: 1.2, color: "#7c3aed" }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
