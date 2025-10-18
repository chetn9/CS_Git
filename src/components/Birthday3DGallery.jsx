import React, { useRef, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";
import { Box, Typography, useMediaQuery, useTheme, IconButton, Chip } from "@mui/material";
import { Fullscreen } from "@mui/icons-material";

const IMAGES = [
  "https://picsum.photos/id/1018/600/400",
  "https://picsum.photos/id/1025/600/400",
  "https://picsum.photos/id/1035/600/400",
  "https://picsum.photos/id/1041/600/400",
  "https://picsum.photos/id/1051/600/400",
];

function ImageFrame({ url, position, rotation, scale, index }) {
  const texture = useLoader(THREE.TextureLoader, url);
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.transparent = true;
      meshRef.current.material.opacity = 0;
      let opacity = 0;
      const fadeIn = () => {
        opacity += 0.02;
        if (opacity <= 1 && meshRef.current) {
          meshRef.current.material.opacity = opacity;
          requestAnimationFrame(fadeIn);
        }
      };
      setTimeout(fadeIn, index * 200);
    }
  }, [index]);

  return (
    <group position={position} rotation={rotation}>
      {/* Image only */}
      <mesh ref={meshRef} scale={scale}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>

      {/* Photo number label */}
      <Text
        position={[0, -scale[1] / 2 - 0.3, 0]}
        fontSize={0.15}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
      >
        {`Photo ${index + 1}`}
      </Text>
    </group>
  );
}

// Platform at bottom
function Platform() {
  return (
    <group>
      {/* Main platform disc */}
      {/* <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[7, 7, 0.5, 64]} />
        <meshBasicMaterial color="#2a2a4e" />
      </mesh> */}
      {/* Platform edge ring */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7, 0.15, 16, 100]} />
        <meshBasicMaterial color="#5a5a8e" />
      </mesh>
    </group>
  );
}

export default function Beautiful3DGallery() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [autoRotate, setAutoRotate] = useState(true);

  const cameraPosition = isSmallMobile ? [0, 4, 10] : isMobile ? [0, 4, 9] : [0, 4, 8];
  const cameraFov = isSmallMobile ? 60 : isMobile ? 55 : 50;
  const imageScale = isSmallMobile ? [2, 1.3, 1] : isMobile ? [2.5, 1.7, 1] : [3, 2, 1];
  const radius = isSmallMobile ? 4.5 : isMobile ? 4 : 3.5;

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxWidth: "100vw",
        height: { xs: "70vh", sm: "80vh", md: "100vh" },
        background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 1, sm: 2 },
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* Header with controls */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{
            color: "#FFFFFF",
            fontWeight: 800,
            textShadow: "0 4px 8px rgba(0,0,0,0.6)",
            userSelect: "none",
            fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.125rem" },
          }}
        >
          ✨ Gallery ✨
        </Typography>
        
        {/* Auto Rotate Toggle and Fullscreen Button */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip 
            label={autoRotate ? "Auto Rotate ON" : "Auto Rotate OFF"} 
            onClick={() => setAutoRotate(!autoRotate)}
            sx={{ 
              backgroundColor: autoRotate ? "#4CAF50" : "#666",
              color: "white",
              fontWeight: 600,
              cursor: "pointer"
            }}
          />
          {!isMobile && (
            <IconButton onClick={handleFullscreen} sx={{ color: "#FFFFFF" }}>
              <Fullscreen />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* 3D Canvas */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <Canvas
          camera={{ position: cameraPosition, fov: cameraFov }}
          style={{ 
            width: "100%", 
            height: "100%",
            display: "block"
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[0, 10, 0]} intensity={0.5} />

          {/* Platform at bottom */}
          <Platform />

          {/* Controls with auto-rotate toggle */}
          <OrbitControls 
            enablePan={false} 
            minDistance={isMobile ? 5 : 4} 
            maxDistance={isMobile ? 14 : 12}
            enableDamping={true}
            dampingFactor={0.1}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2.3}
            minPolarAngle={0.3}
            target={[0, 1, 0]}
          />

          {/* Image Gallery */}
          {IMAGES.map((url, i) => {
            const angle = (i / IMAGES.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = 1;
            return (
              <ImageFrame
                key={i}
                url={url}
                position={[x, y, z]}
                rotation={[0, -angle + Math.PI / 2, 0]}
                scale={imageScale}
                index={i}
              />
            );
          })}

          {/* Center title */}
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.4}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            Your Memories
          </Text>
        </Canvas>
      </Box>

      {/* Info Footer */}
      <Typography
        variant="body2"
        sx={{
          color: "rgba(255, 255, 255, 0.7)",
          mt: 1,
          textAlign: "center",
          fontSize: { xs: "0.75rem", sm: "0.875rem" }
        }}
      >
        🖱️ Drag to rotate • 🔍 Scroll to zoom
      </Typography>
    </Box>
  );
}