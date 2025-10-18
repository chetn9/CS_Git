import React, { useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, PerspectiveCamera } from "@react-three/drei";
import { Box, Typography, IconButton, Chip } from "@mui/material";
import { Fullscreen, NavigateBefore, NavigateNext } from "@mui/icons-material";
import * as THREE from "three";

// Art Frame Component
function ArtFrame({ position, rotation, imageUrl, title, index, onClick }) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const frameRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (frameRef.current && hovered) {
      frameRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
    } else if (frameRef.current) {
      frameRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group 
      ref={frameRef} 
      position={position} 
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => {
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      {/* Wooden Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[2.2, 2.8, 0.1]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Inner Frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2.6, 0.08]} />
        <meshStandardMaterial color="#654321" roughness={0.5} />
      </mesh>

      {/* Canvas/Image */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.4}
        />
      </mesh>

      {/* Nameplate */}
      <mesh position={[0, -1.5, 0.05]}>
        <planeGeometry args={[1.6, 0.2]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Title Text */}
      <Text
        position={[0, -1.5, 0.06]}
        fontSize={0.1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Spotlight effect when hovered */}
      {hovered && (
        <pointLight 
          position={[0, 0, 2]} 
          intensity={1.5} 
          distance={5}
          color="#FFFFFF"
        />
      )}
    </group>
  );
}

// Gallery Room Component
function GalleryRoom() {
  // Floor
  const Floor = () => (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#4A4A4A" roughness={0.8} metalness={0.2} />
    </mesh>
  );

  // Walls
  const Walls = () => (
    <>
      {/* Back wall */}
      <mesh position={[0, 3, -10]} receiveShadow>
        <planeGeometry args={[30, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>

      {/* Front left wall */}
      <mesh position={[-7.5, 3, 10]} rotation={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>

      {/* Front right wall */}
      <mesh position={[7.5, 3, 10]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[15, 12]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </mesh>
    </>
  );

  // Ceiling
  const Ceiling = () => (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
    </mesh>
  );

  return (
    <>
      <Floor />
      <Walls />
      <Ceiling />
    </>
  );
}

// Lighting Setup
function GalleryLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} castShadow />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />
      
      {/* Ceiling spotlights */}
      <spotLight position={[0, 7, -5]} angle={0.3} intensity={1} castShadow />
      <spotLight position={[-5, 7, 0]} angle={0.3} intensity={1} />
      <spotLight position={[5, 7, 0]} angle={0.3} intensity={1} />
      <spotLight position={[0, 7, 5]} angle={0.3} intensity={1} />
    </>
  );
}

// Main Component
export default function Interactive3DArtGallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Sample images - replace with your own
  const artworks = [
    {
      url: "https://picsum.photos/id/1018/800/1000",
      title: "Sunset Dreams",
    },
    {
      url: "https://picsum.photos/id/1025/800/1000",
      title: "Ocean Breeze",
    },
    {
      url: "https://picsum.photos/id/1035/800/1000",
      title: "Mountain View",
    },
    {
      url: "https://picsum.photos/id/1041/800/1000",
      title: "City Lights",
    },
    {
      url: "https://picsum.photos/id/1043/800/1000",
      title: "Forest Path",
    },
    {
      url: "https://picsum.photos/id/1050/800/1000",
      title: "Desert Dawn",
    },
    {
      url: "https://picsum.photos/id/1060/800/1000",
      title: "River Flow",
    },
    {
      url: "https://picsum.photos/id/1070/800/1000",
      title: "Sky High",
    },
  ];

  const handleFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    }
  };

  const handlePrevious = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage < artworks.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: 700,
        position: "relative",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
          🎨 Interactive 3D Art Gallery
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label={autoRotate ? "Auto Rotate ON" : "Auto Rotate OFF"}
            onClick={() => setAutoRotate(!autoRotate)}
            sx={{
              backgroundColor: autoRotate ? "#4CAF50" : "#666",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          />
          <IconButton onClick={handleFullscreen} sx={{ color: "white" }}>
            <Fullscreen />
          </IconButton>
        </Box>
      </Box>

      {/* 3D Canvas - Full Width */}
      <Canvas 
        shadows
        style={{ 
          width: "100%", 
          height: "100%",
          display: "block"
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={60} />
        
        <GalleryLights />
        <GalleryRoom />

        {/* Back Wall Artworks */}
        <ArtFrame
          position={[-6, 3, -9.9]}
          rotation={[0, 0, 0]}
          imageUrl={artworks[0].url}
          title={artworks[0].title}
          index={0}
          onClick={() => setSelectedImage(0)}
        />
        <ArtFrame
          position={[-2, 3, -9.9]}
          rotation={[0, 0, 0]}
          imageUrl={artworks[1].url}
          title={artworks[1].title}
          index={1}
          onClick={() => setSelectedImage(1)}
        />
        <ArtFrame
          position={[2, 3, -9.9]}
          rotation={[0, 0, 0]}
          imageUrl={artworks[2].url}
          title={artworks[2].title}
          index={2}
          onClick={() => setSelectedImage(2)}
        />
        <ArtFrame
          position={[6, 3, -9.9]}
          rotation={[0, 0, 0]}
          imageUrl={artworks[3].url}
          title={artworks[3].title}
          index={3}
          onClick={() => setSelectedImage(3)}
        />

        {/* Left Wall Artworks */}
        <ArtFrame
          position={[-9.9, 3, -5]}
          rotation={[0, Math.PI / 2, 0]}
          imageUrl={artworks[4].url}
          title={artworks[4].title}
          index={4}
          onClick={() => setSelectedImage(4)}
        />
        <ArtFrame
          position={[-9.9, 3, 0]}
          rotation={[0, Math.PI / 2, 0]}
          imageUrl={artworks[5].url}
          title={artworks[5].title}
          index={5}
          onClick={() => setSelectedImage(5)}
        />

        {/* Right Wall Artworks */}
        <ArtFrame
          position={[9.9, 3, -5]}
          rotation={[0, -Math.PI / 2, 0]}
          imageUrl={artworks[6].url}
          title={artworks[6].title}
          index={6}
          onClick={() => setSelectedImage(6)}
        />
        <ArtFrame
          position={[9.9, 3, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          imageUrl={artworks[7].url}
          title={artworks[7].title}
          index={7}
          onClick={() => setSelectedImage(7)}
        />

        <OrbitControls
          enablePan={true}
          minDistance={5}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          target={[0, 3, 0]}
        />
      </Canvas>

      {/* Navigation Controls */}
      {selectedImage !== null && (
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 2,
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: 2,
            borderRadius: 3,
          }}
        >
          <IconButton
            onClick={handlePrevious}
            disabled={selectedImage === 0}
            sx={{ color: "white" }}
          >
            <NavigateBefore />
          </IconButton>

          <Typography sx={{ color: "white", minWidth: 200, textAlign: "center" }}>
            {artworks[selectedImage].title}
            <br />
            <Typography variant="caption">
              {selectedImage + 1} / {artworks.length}
            </Typography>
          </Typography>

          <IconButton
            onClick={handleNext}
            disabled={selectedImage === artworks.length - 1}
            sx={{ color: "white" }}
          >
            <NavigateNext />
          </IconButton>
        </Box>
      )}

      {/* Instructions */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: 2,
          borderRadius: 2,
          maxWidth: 250,
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          Controls:
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          🖱️ Drag to look around
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          🔍 Scroll to zoom in/out
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          🎨 Click artwork to select
        </Typography>
        <Typography variant="caption" sx={{ display: "block" }}>
          ⬅️➡️ Navigate between artworks
        </Typography>
      </Box>
    </Box>
  );
}
