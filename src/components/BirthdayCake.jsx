import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { Box, Button, Typography } from "@mui/material";
import * as THREE from "three";
import confetti from "canvas-confetti";

// Candle Flame Component with animation
function CandleFlame({ isLit, position }) {
  const flameRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    if (flameRef.current && isLit) {
      const time = state.clock.elapsedTime;
      // Flickering animation for flame size
      flameRef.current.scale.y = 1 + Math.sin(time * 10) * 0.1;
      flameRef.current.scale.x = 1 + Math.sin(time * 8) * 0.05;

      // Flickering light intensity
      if (lightRef.current) {
        lightRef.current.intensity = 1 + Math.sin(time * 5) * 0.5;
        lightRef.current.position.y = 0.3 + Math.sin(time * 2) * 0.05;
      }
    }
  });

  if (!isLit) return null;

  return (
    <group position={position}>
      <mesh ref={flameRef} position={[0, 0.3, 0]}>
        <coneGeometry args={[0.08, 0.25, 8]} />
        <meshBasicMaterial color="#FFA500" />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.05, 0.2, 8]} />
        <meshBasicMaterial color="#FFFF00" />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 0.3, 0]}
        color="#FFA500"
        intensity={2}
        distance={2}
      />
    </group>
  );
}

// Single Candle Component
function Candle({ position, isLit }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#FF69B4" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.1, 8]} />
        <meshStandardMaterial color="#333333" />
      </mesh>
      <CandleFlame isLit={isLit} position={[0, 0, 0]} />
    </group>
  );
}

// Birthday Cake Component
function Cake({ candlesLit, name }) {
  const candlePositions = [
    [-0.5, 0.8, 0.5],
    [0, 0.8, 0.5],
    [0.5, 0.8, 0.5],
  ];

  return (
    <group>
      {/* Cake base layer */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 0.4, 32]} />
        <meshStandardMaterial color="#FFC0CB" roughness={0.5} />
      </mesh>

      {/* Cake middle layer */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.3, 32]} />
        <meshStandardMaterial color="#FFB6C1" roughness={0.5} />
      </mesh>

      {/* Cake top layer */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
        <meshStandardMaterial color="#FFA07A" roughness={0.5} />
      </mesh>

      {/* Happy Birthday Text on top of cake */}
      <Text
        position={[0, 0.82, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.15}
        overflowWrap="break-word"
        textAlign="center"
        color="#FF1493"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#FFFFFF"
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      >
        {name}
      </Text>

      {/* Frosting decorations */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1, 0.2, Math.sin(angle) * 1]}
          >
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
        );
      })}

      {/* Candles */}
      {candlePositions.map((pos, i) => (
        <Candle key={i} position={pos} isLit={candlesLit} />
      ))}
    </group>
  );
}

// Main Birthday Cake Component
export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [name, setName] = useState("Happy Birthday");

  const handleBlowCandles = () => {
    setCandlesLit(false);
    setShowMessage(true);

    // Trigger confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#FFD700", "#FF69B4", "#00CED1", "#FF6347", "#9370DB"];

    const frame = () => {
  var timeLeft = end - Date.now();

  if (timeLeft <= 0) {
    return;
  }

  var particleCount = 50 * (timeLeft / duration);

  // Firework explosion from random position (left side)
  confetti({
    particleCount,
    startVelocity: 30,
    spread: 360, // Full circle explosion
    ticks: 60,
    origin: {
      x: randomInRange(0.1, 0.3), // Random left area
      y: Math.random() - 0.2, // Start higher up
    },
    colors: colors,
    gravity: 1,
    scalar: 1.2,
  });

  // Firework explosion from random position (right side)
  confetti({
    particleCount,
    startVelocity: 30,
    spread: 360, // Full circle explosion
    ticks: 60,
    origin: {
      x: randomInRange(0.7, 0.9), // Random right area
      y: Math.random() - 0.2, // Start higher up
    },
    colors: colors,
    gravity: 1,
    scalar: 1.2,
  });

  // Center firework (occasional)
  if (Math.random() > 0.7) {
    confetti({
      particleCount: particleCount * 1.5,
      startVelocity: 40,
      spread: 360,
      ticks: 60,
      origin: {
        x: randomInRange(0.4, 0.6), // Center area
        y: Math.random() - 0.2,
      },
      colors: colors,
      gravity: 1,
      scalar: 1.5,
    });
  }

  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
};

// Helper function for random range
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

    frame();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setShowMessage(false);
  };

  return (
    <Box sx={{ width: "100%", height: 500, position: "relative" }}>
      {/* Happy Birthday Message Overlay */}
      {showMessage && (
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#FF1493",
            fontWeight: "bold",
            textShadow: "4px 4px 8px rgba(0,0,0,0.3), 0 0 30px #FFD700",
            zIndex: 10,
            animation: "pulse 1.5s infinite",
            "@keyframes pulse": {
              "0%, 100%": { transform: "translateX(-50%) scale(1)" },
              "50%": { transform: "translateX(-50%) scale(1.1)" },
            },
          }}
        >
          🎂 {name}
        </Typography>
      )}

      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
        <Cake
          candlesLit={candlesLit}
          name={`Happiest BirthDay 
Harmita 🤗 \n19-10-2025`}
        />
      </Canvas>

      {/* Control Buttons */}
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleBlowCandles}
          disabled={!candlesLit}
          sx={{ px: 4, py: 1.5 }}
        >
          💨 Blow Candles
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRelight}
          disabled={candlesLit}
          sx={{ px: 4, py: 1.5 }}
        >
          🔥 Relight
        </Button>
      </Box>
    </Box>
  );
}
