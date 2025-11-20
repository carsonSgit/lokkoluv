'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function createGrainTexture(width: number, height: number, intensity: number) {
  const size = width * height
  const data = new Uint8Array(4 * size)
  
  for (let i = 0; i < size; i++) {
    const stride = i * 4
    const noise = Math.floor(Math.random() * intensity) 
    data[stride] = noise
    data[stride + 1] = noise
    data[stride + 2] = noise
    data[stride + 3] = 255
  }
  
  const texture = new THREE.DataTexture(data, width, height)
  texture.needsUpdate = true
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

function createDotTexture(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!
  
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgb(187, 189, 190, 0.7)'
  for (let i = 0; i < 800; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const radius = Math.random() * 1.5 + 0.5
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
  
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  return texture
}

function createPurpleDotTexture(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#5314b3'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = 'rgb(130, 80, 220)'
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width
    const y = Math.random() * height
    const radius = Math.random() * 1.6 + 0.3
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(2, 2)
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.colorSpace = THREE.SRGBColorSpace
  texture.needsUpdate = true
  return texture
}


function EyeballMesh({ controlsRef }: { controlsRef: React.RefObject<any> }) {
  const eyeGroupRef = useRef<THREE.Group>(null)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const targetXRef = useRef(0)
  const targetYRef = useRef(0)
  const isUserInteractingRef = useRef(false)
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  // Idle animation state
  const [isMobile, setIsMobile] = useState(false)
  const isIdleRef = useRef(false)
  const afkTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const randomTargetRef = useRef({ x: 0, y: 0 })
  const nextTargetTimeRef = useRef(0)
  
  const dotTexture = useMemo(() => createDotTexture(256, 256), [])
  const grainTexture = useMemo(() => createGrainTexture(256, 256, 50), [])
  const purpleDotTexture = useMemo(() => createPurpleDotTexture(256, 256), [])
  
  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
      setIsMobile(mobile)
      isIdleRef.current = mobile // Start idle on mobile
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouseX(event.clientX)
      setMouseY(event.clientY)
      
      // Reset AFK timer on mouse movement (desktop only)
      if (!isMobile) {
        isIdleRef.current = false
        
        if (afkTimeoutRef.current) {
          clearTimeout(afkTimeoutRef.current)
        }
        
        // Set AFK after 3 seconds of no movement
        afkTimeoutRef.current = setTimeout(() => {
          isIdleRef.current = true
        }, 3000)
      }
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (afkTimeoutRef.current) clearTimeout(afkTimeoutRef.current)
    }
  }, [isMobile])

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return

    const handleStart = () => {
      isUserInteractingRef.current = true
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = null
      }
    }

    const handleEnd = () => {
      // Set a timeout to mark as not interacting after user stops
      idleTimeoutRef.current = setTimeout(() => {
        isUserInteractingRef.current = false
      }, 100)
    }

    controls.addEventListener('start', handleStart)
    controls.addEventListener('end', handleEnd)

    return () => {
      controls.removeEventListener('start', handleStart)
      controls.removeEventListener('end', handleEnd)
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    }
  }, [controlsRef])
  
  useFrame((state) => {
    const controls = controlsRef.current
    const time = state.clock.getElapsedTime()
    
    // Smoothly reset camera to default position when not interacting
    if (controls && !isUserInteractingRef.current) {
      const defaultAzimuth = 0
      const defaultPolar = Math.PI / 2
      const resetSpeed = 0.03
      
      const currentAzimuth = controls.getAzimuthalAngle()
      const currentPolar = controls.getPolarAngle()
      
      const azimuthDiff = defaultAzimuth - currentAzimuth
      const polarDiff = defaultPolar - currentPolar
      
      // Only reset if we're not already at default position
      if (Math.abs(azimuthDiff) > 0.01 || Math.abs(polarDiff) > 0.01) {
        const newAzimuth = THREE.MathUtils.lerp(currentAzimuth, defaultAzimuth, resetSpeed)
        const newPolar = THREE.MathUtils.lerp(currentPolar, defaultPolar, resetSpeed)
        
        const radius = controls.getDistance()
        const x = radius * Math.sin(newPolar) * Math.sin(newAzimuth)
        const y = radius * Math.cos(newPolar)
        const z = radius * Math.sin(newPolar) * Math.cos(newAzimuth)
        
        state.camera.position.set(x, y, z)
        state.camera.lookAt(controls.target)
        controls.update()
      }
    }
    
    if (eyeGroupRef.current) {
      // Idle animation
      if (isIdleRef.current) {
        if (time > nextTargetTimeRef.current) {
          randomTargetRef.current = {
            x: (Math.random() - 0.5) * 1.2,
            y: (Math.random() - 0.5) * 1.2
          }

          nextTargetTimeRef.current = time + Math.random() * 2 + 1
        }
        

        targetXRef.current = THREE.MathUtils.lerp(targetXRef.current, randomTargetRef.current.x, 0.05)
        targetYRef.current = THREE.MathUtils.lerp(targetYRef.current, randomTargetRef.current.y, 0.05)
      } else {
        const eyeScreenPos = eyeGroupRef.current.position.clone()
        eyeScreenPos.project(state.camera)
        
        const eyeX = (eyeScreenPos.x * 0.5 + 0.9) * window.innerWidth
        const eyeY = (-eyeScreenPos.y * 0.5 + 0.88) * window.innerHeight
        
        const dx = mouseX - eyeX
        const dy = mouseY - eyeY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        const maxDistance = 1000
        const normalizedDistance = Math.min(distance / maxDistance, 1)
        
        const maxRotation = 0.6 // radians - soft limit for rotation
        const stiffness = 0.4 // lower = more elastic, higher = stiffer
        
        const rawX = (dx / window.innerWidth) * 2 * normalizedDistance
        const rawY = (dy / window.innerHeight) * 2 * normalizedDistance
        
        targetXRef.current = maxRotation * Math.tanh(rawX / stiffness)
        targetYRef.current = maxRotation * Math.tanh(rawY / stiffness)
      }
      
      eyeGroupRef.current.rotation.x += (targetYRef.current - eyeGroupRef.current.rotation.x) * 0.1
      eyeGroupRef.current.rotation.y += (targetXRef.current - eyeGroupRef.current.rotation.y) * 0.1
    }
  })

  return (
    <group ref={eyeGroupRef}>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={2.2} />
      <pointLight position={[-5, -5, 5]} intensity={0.4} />

      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2}
          metalness={0.1}
          map={dotTexture}
        />
      </mesh>
      
      <group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <sphereGeometry args={[2, 64, 64, 0, Math.PI * 2, 0, 0.36]} />
          <meshStandardMaterial 
            color="#000000"
            roughness={0.5}
            metalness={0.5}
            side={THREE.FrontSide}
            roughnessMap={grainTexture}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.01, 64, 64, 0, Math.PI * 2, 0, 0.3]} />
          <meshStandardMaterial 
            color="#ffffff"
            map={purpleDotTexture}
            bumpMap={purpleDotTexture}
            bumpScale={0.5}
            roughness={0.6}
            metalness={0.2}
            side={THREE.FrontSide}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[2.01, 64, 64, 0, Math.PI * 2, 0, 0.15]} />
          <meshStandardMaterial 
            color="#000000"
            roughness={0.1}
            metalness={0.6}
            side={THREE.FrontSide}
          />
        </mesh>

        <mesh position={[0.1, 0, -0.1]}>
          <sphereGeometry args={[2.02, 64, 64, 0, Math.PI * 2, 0, 0.03]} />
          <meshStandardMaterial 
            color="#ffffff"
            roughness={0.1}
            metalness={0.6}
            side={THREE.FrontSide}
          />
        </mesh>
      </group>

      <mesh>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshPhysicalMaterial 
          transparent
          opacity={0.12}
          roughness={0.05}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  )
}

export default function Eyeball3D() {
  const controlsRef = useRef<any>(null)
  
  return (
    <div className="w-[338px] h-[338px]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <EyeballMesh controlsRef={controlsRef} />
        <OrbitControls 
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  )
}

