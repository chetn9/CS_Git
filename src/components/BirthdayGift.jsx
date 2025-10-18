import React, { useRef, useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Box, Typography, Button, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
import confetti from "canvas-confetti";
import photo from "../assets/h_1.jpg";

// Guitar Photo Frame - Steel Color with Bigger Photo
function GuitarPhotoFrame({ imageUrl, visible }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  const { posY, scale } = useSpring({
    posY: visible ? 0 : -10,
    scale: visible ? 0.6 : 0,
    config: { tension: 80, friction: 25 },
  });

  if (!visible) return null;

  // Create guitar with hole
  const guitarWithHole = new THREE.Shape();
  guitarWithHole.moveTo(0, -2);
  
  // Lower bout right
  guitarWithHole.bezierCurveTo(0.9, -2, 1.2, -1.5, 1.2, -0.8);
  guitarWithHole.lineTo(1.2, -0.3);
  guitarWithHole.bezierCurveTo(1.2, 0, 0.8, 0.2, 0.8, 0.5);
  guitarWithHole.lineTo(0.8, 1);
  guitarWithHole.bezierCurveTo(0.8, 1.3, 0.6, 1.5, 0.3, 1.5);
  guitarWithHole.lineTo(0.2, 1.6);
  guitarWithHole.lineTo(0.2, 3.5);
  guitarWithHole.lineTo(0.35, 3.6);
  guitarWithHole.lineTo(0.35, 4.2);
  guitarWithHole.bezierCurveTo(0.35, 4.4, 0.2, 4.5, 0, 4.5);
  guitarWithHole.bezierCurveTo(-0.2, 4.5, -0.35, 4.4, -0.35, 4.2);
  guitarWithHole.lineTo(-0.35, 3.6);
  guitarWithHole.lineTo(-0.2, 3.5);
  guitarWithHole.lineTo(-0.2, 1.6);
  guitarWithHole.lineTo(-0.3, 1.5);
  guitarWithHole.bezierCurveTo(-0.6, 1.5, -0.8, 1.3, -0.8, 1);
  guitarWithHole.lineTo(-0.8, 0.5);
  guitarWithHole.bezierCurveTo(-0.8, 0.2, -1.2, 0, -1.2, -0.3);
  guitarWithHole.lineTo(-1.2, -0.8);
  guitarWithHole.bezierCurveTo(-1.2, -1.5, -0.9, -2, 0, -2);

  // Add hole as a path
  const holePath = new THREE.Path();
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    const x = Math.cos(angle) * 0.96;
    const y = Math.sin(angle) * 0.96 - 0.2;
    if (i === 0) {
      holePath.moveTo(x, y);
    } else {
      holePath.lineTo(x, y);
    }
  }
  guitarWithHole.holes.push(holePath);

  return (
    <animated.group position-y={posY} scale={scale}>
      {/* Steel guitar outline with hole for photo */}
      <mesh position={[0, 0, 0]}>
        <shapeGeometry args={[guitarWithHole]} />
        <meshStandardMaterial 
          color="#C0C0C0" 
          side={THREE.DoubleSide}
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Photo in the circular cutout */}
      <mesh position={[0, -0.2, 0.01]}>
        <circleGeometry args={[0.95, 64]} />
        <meshStandardMaterial 
          map={texture}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Tuning pegs */}
      {[-0.25, -0.25, -0.25, 0.25, 0.25, 0.25].map((x, i) => (
        <mesh key={i} position={[x, 3.7 + (i % 3) * 0.15, 0.01]}>
          <circleGeometry args={[0.04, 16]} />
          <meshStandardMaterial 
            color="#A9A9A9"
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Strings */}
      {[-0.12, -0.04, 0.04, 0.12].map((x, i) => (
        <mesh key={`string-${i}`} position={[x, 1.2, 0.01]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.01, 4.5]} />
          <meshStandardMaterial color="#555555" />
        </mesh>
      ))}

      {/* Bridge below photo */}
      <mesh position={[0, -1.3, 0.01]}>
        <planeGeometry args={[0.5, 0.08]} />
        <meshStandardMaterial 
          color="#A9A9A9"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Frets on neck */}
      {[1.7, 2, 2.3, 2.6, 2.9, 3.2].map((y, i) => (
        <mesh key={`fret-${i}`} position={[0, y, 0.01]}>
          <planeGeometry args={[0.4, 0.015]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      ))}

      {/* Position dots */}
      {[2.15, 2.75].map((y, i) => (
        <mesh key={`dot-${i}`} position={[0, y, 0.015]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* Text label */}
      <Text
        position={[0, -2.5, 0.01]}
        fontSize={0.15}
        color="#808080"
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {`Happy Birthday!🎉 \nA Musical Memory! 🎉`}
      </Text>
    </animated.group>
  );
}

// Gift Box Component
function GiftBox({ isOpen, onOpen }) {
  const boxRef = useRef();

  const { lidY, lidRotation } = useSpring({
    lidY: isOpen ? 1.5 : 0.5,
    lidRotation: isOpen ? [0.3, 0, 0] : [0, 0, 0],
    config: { tension: 120, friction: 14 },
  });

  if (isOpen) return null;

  return (
    <group position={[0, 0, -2]}>
      <mesh
        ref={boxRef}
        position={[0, 0, 0]}
        onClick={onOpen}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onPointerOut={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry args={[2, 1, 2]} />
        <meshStandardMaterial color="#E74C3C" />
      </mesh>

      <mesh position={[0, 0, 1.01]}>
        <boxGeometry args={[0.2, 1.02, 0.01]} />
        <meshStandardMaterial color="#F1C40F" />
      </mesh>

      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[2.02, 0.2, 2.02]} />
        <meshStandardMaterial color="#F1C40F" />
      </mesh>

      <animated.mesh position-y={lidY} rotation={lidRotation}>
        <boxGeometry args={[2.1, 0.3, 2.1]} />
        <meshStandardMaterial color="#C0392B" />
      </animated.mesh>

      <animated.group position-y={lidY}>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#F39C12" />
        </mesh>
      </animated.group>
    </group>
  );
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshBasicMaterial color="#cccccc" wireframe />
    </mesh>
  );
}

// Main Component
export default function BirthdayGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const photoUrl = "https://picsum.photos/id/237/400/400";

  const handleOpenGift = () => {
    if (!isOpen) {
      setIsOpen(true);

      const duration = 3000;
      const end = Date.now() + duration;
      const colors = ["#FFD700", "#FF69B4", "#00CED1", "#FF6347", "#9B59B6"];

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const handleReset = () => {
    setIsOpen(false);
  };

  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: isMobile ? "100vh" : 550,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderTopLeftRadius: "10px"
      }}
    >
      {/* Title */}
      <Typography
        variant={isMobile ? "h6" : "h5"}
        align="center"
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          mb: isMobile ? 1 : 2,
          mt: isMobile ? 1 : 0,
          px: 2,
        }}
      >
        🎁Your Special Gift {isOpen ? "🎸": "is here"}!
      </Typography>

      {/* 3D Canvas - Full height on mobile */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
         
          borderRadius: isMobile ? 0 : 3,
          overflow: "hidden",
          background: "linear-gradient(135deg, #FFF5E6 0%, #FFE4E1 100%)",
          position: "relative",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        
        <Canvas 
          camera={{ position: [0, 0.5, 5], fov: 50 }}
          onCreated={() => setIsLoading(false)}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[0, 0, 5]} intensity={1.5} />

          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
            target={[0, 0.5, 0]}
          />

          <GiftBox isOpen={isOpen} onOpen={handleOpenGift} />
          
          <Suspense fallback={<LoadingFallback />}>
            <GuitarPhotoFrame imageUrl={photo} visible={isOpen} />
          </Suspense>

          {isOpen && (
            <Text
              position={[0, 3, 0]}
              fontSize={0.3}
              color="#E74C3C"
              anchorX="center"
              anchorY="middle"
            >
              
            </Text>
          )}
        </Canvas>
      </Box>

      {/* Control Button */}
      <Box 
        sx={{ 
          mt: isMobile ? 1 : 2,
          mb: isMobile ? 1 : 0,
          display: "flex", 
          justifyContent: "center" 
        }}
      >
        <Button
          variant="contained"
          color={isOpen ? "secondary" : "primary"}
          onClick={isOpen ? handleReset : handleOpenGift}
          sx={{ 
            px: isMobile ? 3 : 4, 
            py: isMobile ? 1 : 1.5,
            fontSize: isMobile ? "0.875rem" : "1rem"
          }}
        >
          {isOpen ? "Close Gift" : "🎁 Open Your Gift "}
        </Button>
      </Box>

      {/* Instructions */}
      <Typography
        variant="body2"
        align="center"
        sx={{ 
          fontFamily: 'Poppins, sans-serif',
          mt: 0.5,
          mb: isMobile ? 1 : 0,
          fontSize: isMobile ? "0.75rem" : "0.875rem",
          px: 2,
        }}
        
      >
        
        {isOpen ?  "Your special guitar photo frame! 🎸" : "Click the box or button to open! ✨"}
      </Typography>
    </Box>
  );
}
