import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

const CursorRobot = () => {
  const robotRef = useRef()
  const { camera } = useThree()
  const mousePosition = useRef(new THREE.Vector3())
  const targetPosition = useRef(new THREE.Vector3())
  const [isHovered, setIsHovered] = useState(false)
  const currentRotation = useRef(0)

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (event) => {
      const skillsSection = document.getElementById('skills')
      if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect()
        const isInside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom

        setIsHovered(isInside)

        if (isInside) {
          const relativeX = (event.clientX - rect.left) / rect.width
          const relativeY = (event.clientY - rect.top) / rect.height

          const mappedX = THREE.MathUtils.lerp(-2.5, 2.5, relativeX)
          const mappedY = THREE.MathUtils.lerp(1.8, -1.8, relativeY)

          mousePosition.current.set(mappedX, mappedY, 0)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Update robot position and rotation
  useFrame((state) => {
    if (!robotRef.current) {
      return
    }

    if (!isHovered) {
      robotRef.current.visible = false
      return
    }

    targetPosition.current.lerp(mousePosition.current, 0.18)
    robotRef.current.visible = true
    robotRef.current.position.copy(targetPosition.current)

    const lookDeltaX = mousePosition.current.x - robotRef.current.position.x
    const desiredYRotation = Math.atan2(lookDeltaX, 3)
    currentRotation.current = THREE.MathUtils.lerp(currentRotation.current, desiredYRotation, 0.18)
    robotRef.current.rotation.set(0, currentRotation.current, 0)
  })

  // Simple robot model
  return (
    <group ref={robotRef} visible={false}>
      {/* Robot head */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#4f46e5" />
      </mesh>

      {/* Robot body */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 0.5]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>

      {/* Eyes */}
      <mesh position={[0.2, 0.6, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.2, 0.6, 0.41]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Pupils */}
      <mesh position={[0.2, 0.6, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh position={[-0.2, 0.6, 0.5]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  )
}

export default CursorRobot
