import React, { useState, useMemo, useRef } from "react";
import { Box, Input, Button, Fab, Typography } from "@mui/material";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { useSpring, animated } from "@react-spring/three";
import confetti from "canvas-confetti";
import photo from "../assets/hm_1.jpg";

function Fireworks({ isActive }) {
  const particlesRef = useRef();
  const [particles] = useState(() => {
    const temp = [];
    for (let i = 0; i < 100; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 3,
          Math.random() * 3 + 1,
          (Math.random() - 0.5) * 3
        ],
        velocity: [
          (Math.random() - 0.5) * 0.1,
          Math.random() * 0.15,
          (Math.random() - 0.5) * 0.1
        ],
        color: new THREE.Color().setHSL(Math.random(), 1, 0.5)
      });
    }
    return temp;
  });

  useFrame((state, delta) => {
    if (particlesRef.current && isActive) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].velocity[1];
        particle.position.x += particles[i].velocity[0];
        particle.position.z += particles[i].velocity[2];
        
        if (particle.position.y > 4) {
          particle.position.y = 1;
        }
      });
    }
  });

  if (!isActive) return null;

  return (
    <group ref={particlesRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color={p.color} />
        </mesh>
      ))}
    </group>
  );
}

function MugModel({ texture, isOpen }) {
  const loadedTexture = useTexture(texture);
  const groupRef = useRef();
  
  // Smooth rotation animation
  useFrame((state, delta) => {
    if (groupRef.current && !isOpen) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });
  
  // Configure texture to show image twice (front and back)
  loadedTexture.wrapS = THREE.RepeatWrapping;
  loadedTexture.wrapT = THREE.RepeatWrapping;
  loadedTexture.repeat.set(2, 1);

  // Animated lid opening
  const { lidPosition, lidRotation } = useSpring({
    lidPosition: isOpen ? [0, 2.5, 0] : [0, 1.1, 0],
    lidRotation: isOpen ? [0, 0, Math.PI * 0.3] : [0, 0, 0],
    config: { tension: 120, friction: 14 }
  });

  // Create handle shape using curve
  const handleShape = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(0.5, 0.6, 0),
      new THREE.Vector3(0.5, -0.6, 0)
    );
    const handleGeo = new THREE.TubeGeometry(curve, 50, 0.12, 16, false);
    return handleGeo;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main mug body with two images */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.9, 2.2, 64, 1, false]} />
        <meshStandardMaterial 
          map={loadedTexture} 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Inner wall of the mug */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.74, 0.84, 2.0, 64, 1, false]} />
        <meshStandardMaterial 
          color="#f8f8f8" 
          roughness={0.4}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Coffee liquid inside the mug */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.73, 0.83, 0.05, 64]} />
        <meshStandardMaterial 
          color="#3d2817"
          roughness={0.1}
          metalness={0.3}
          emissive="#2d1810"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.675, 0]} rotation={[0, 0, 0]}>
        <circleGeometry args={[0.73, 64]} />
        <meshStandardMaterial 
          color="#4a3322"
          roughness={0.15}
          metalness={0.4}
          emissive="#3d2817"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Animated Top rim/lid */}
      <animated.mesh position={lidPosition} rotation={lidRotation}>
        <cylinderGeometry args={[0.85, 0.8, 0.15, 64]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.2}
          metalness={0.05}
        />
      </animated.mesh>

      {/* Coffee mug handle - tube part */}
      <mesh 
        geometry={handleShape}
        position={[0.85, 0, 0]}
      >
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>

      {/* Handle bottom connection */}
      <mesh position={[1.35, -0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>

      {/* Handle top connection */}
      <mesh position={[0.85, 0.6, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial 
          color="#ffffff" 
          roughness={0.3} 
          metalness={0.1}
        />
      </mesh>

      {/* Happy Birthday Text - shows when opened */}
      {isOpen && (
        <>
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.5}
            color="#FF1493"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#FFD700"
          >
            Happy Birthday!
          </Text>
          {/* Background plane for better text visibility */}
          <mesh position={[0, 3.5, -0.1]}>
            <planeGeometry args={[4, 1]} />
            <meshBasicMaterial color="#ffffff" opacity={0.8} transparent />
          </mesh>
        </>
      )}

      {/* 3D Fireworks particles */}
      <Fireworks isActive={isOpen} />
    </group>
  );
}

const CustomMug3D = () => {
  const [mugTexture, setMugTexture] = useState(photo);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenMug = () => {
    setIsOpen(true);
    
    // Trigger confetti fireworks
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleCloseMug = () => {
    setIsOpen(false);
  };
  
  return (
    <Box sx={{ width: "100%", height: 450, position: "relative", pointerEvents: 'none',
    WebkitUserDrag: 'none',
    userDrag: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    WebkitTouchCallout: 'none', }}>
      <Input 
        type="file" 
        fullWidth 
        onChange={e => {
          if (e.target.files[0]) {
            setMugTexture(URL.createObjectURL(e.target.files[0]));
          }
        }} 
      />
      
      {/* 2D HTML Overlay Text */}
      {isOpen && (
        // <Typography
        //   variant="h3"
        //   sx={{
        //     position: "absolute",
        //     top: "20%",
        //     left: "50%",
        //     transform: "translateX(-50%)",
        //     color: "#FF1493",
        //     fontWeight: "bold",
        //     textShadow: "3px 3px 6px rgba(0,0,0,0.3), 0 0 25px #FFD700",
        //     zIndex: 10,
        //     animation: "bounce 1s infinite",
        //     "@keyframes bounce": {
        //       "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
        //       "50%": { transform: "translateX(-50%) translateY(-20px)" }
        //     }
        //   }}
        // >
        //   🎉 Happy Birthday! 🎉
        // </Typography>
        <></>
      )}

      <Canvas camera={{ position: [3, 1.5, 4], fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 5, -5]} intensity={1} />
        <pointLight position={[0, 5, 10]} intensity={1} />
        <OrbitControls 
          enablePan={false}
          minDistance={4}
          maxDistance={10}
        />
        <MugModel texture={mugTexture} isOpen={isOpen} />
      </Canvas>
      
      {/* Floating Action Button to open mug */}
      <Fab 
        color="primary" 
        sx={{ position: "absolute", bottom: 80, right: 20 }}
        onClick={isOpen ? handleCloseMug : handleOpenMug}
      >
        {isOpen ? "❌" : "🎉"}
      </Fab>

      {/* <Button sx={{ mt: 2 }} variant="contained" fullWidth>
        Download Mug Design
      </Button> */}
    </Box>
  );
};

export default CustomMug3D;
