import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { ThreeSixty, Replay, PlayArrow, Pause } from "@mui/icons-material";

export default function SpiralPhotoGallery({
  images = [],
  message = "Photo Gallery",
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);

  const carouselRef = useRef(null);
  const animationRef = useRef(null);
  const rotationRef = useRef({ x: -18, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  // Calculate settings
  const panelSize = isSmall ? 200 : isMobile ? 280 : 480;
  const perspective = isSmall ? 700 : isMobile ? 1000 : 1400;
  const angleIncrement = 360 / images.length;
  const translateZ = Math.round(
    panelSize / 2 / Math.tan((Math.PI / 180) * (angleIncrement / 2))
  );

  // Update transform
  const updateTransform = () => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `
        translateZ(-${translateZ}px) 
        rotateX(${rotationRef.current.x}deg) 
        rotateY(${rotationRef.current.y}deg)
      `;
    }
  };

  // Auto-rotation
  useEffect(() => {
    if (!isAutoRotate) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      if (!isDraggingRef.current) {
        rotationRef.current.y += 0.15;
        updateTransform();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAutoRotate, translateZ]);

  // Mouse handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grabbing";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastPosRef.current.x;
    const deltaY = e.clientY - lastPosRef.current.y;

    rotationRef.current.x -= deltaY * 0.5;
    rotationRef.current.y -= deltaX * 0.5;

    lastPosRef.current = { x: e.clientX, y: e.clientY };
    updateTransform();
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;

    if (carouselRef.current) {
      carouselRef.current.style.cursor = "grab";
    }
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    isDraggingRef.current = true;
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !e.touches[0]) return;
    e.preventDefault();

    const touch = e.touches[0];
    const deltaX = touch.clientX - lastPosRef.current.x;
    const deltaY = touch.clientY - lastPosRef.current.y;

    rotationRef.current.x -= deltaY * 0.5;
    rotationRef.current.y -= deltaX * 0.5;

    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    updateTransform();
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  const resetView = () => {
    rotationRef.current = { x: 0, y: 0 };
    updateTransform();
  };

  const toggleAutoRotate = () => {
    setIsAutoRotate(!isAutoRotate);
  };

  if (!images || images.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
          bgcolor: "#667eea",
        }}
      >
        <Typography
          variant="h6"
          color="white"
          sx={{ fontFamily: "Poppins, sans-serif" }}
        >
          No images provided
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: "100vh", md: "80vh" },
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        margin: 0,
        padding: 0,
        userSelect: "none",
        marginLeft: 0,
        marginRight: 0,
        boxSizing: "border-box",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Typography
        variant={isSmall ? "h5" : isMobile ? "h4" : "h2"}
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
          mb: { xs: 2, sm: 3, md: 5 },
          mt: { xs: 10, sm: 8, md: 0 },
          textAlign: "center",
          px: 2,
          zIndex: 100,
        }}
      >
        {message}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: { xs: "400px", sm: "500px", md: "550px" },
          perspective: `${perspective}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          px: { xs: 2, sm: 4, md: 0 },
        }}
      >
        <Box
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            position: "relative",
            width: `${panelSize}px`,
            height: `${panelSize}px`,
            transformStyle: "preserve-3d",
            cursor: isDragging ? "grabbing" : "grab",
            touchAction: "none",
            willChange: "transform",
          }}
        >
          {images.map((image, index) => {
            const angle = index * angleIncrement;

            return (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  width: `${panelSize}px`,
                  height: `${panelSize}px`,
                  left: 0,
                  top: 0,
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                  backfaceVisibility: "visible",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "20px",
                  background:
                    "linear-gradient(145deg, #ffd700 0%, #ffed4e 50%, #ffd700 100%)",
                  borderRadius: "12px",
                  boxShadow:
                    "0 20px 60px rgba(0, 0, 0, 0.6), inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 8px rgba(0,0,0,0.2)",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    padding: "8px",
                    background: "#fff",
                    borderRadius: "8px",
                    boxShadow: "inset 0 0 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={`Photo ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "4px",
                      display: "block",
                      pointerEvents: "none",
                      userSelect: "none",
                      WebkitUserDrag: "none",
                      userDrag: "none",
                      WebkitUserSelect: "none",
                      WebkitTouchCallout: "none",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>

        {isAutoRotate && !isDragging && !isMobile && (
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "14px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <ThreeSixty
              sx={{
                fontSize: 24,
                animation: "spin 4s linear infinite",
                "@keyframes spin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(360deg)" },
                },
              }}
            />
            <Typography
              variant="caption"
              sx={{ fontWeight: "bold", fontFamily: "Poppins, sans-serif" }}
            >
              Auto-rotating • Drag to control
            </Typography>
          </Box>
        )}
      </Box>

      <Tooltip title={isAutoRotate ? "Pause" : "Resume"}>
        <IconButton
          onClick={toggleAutoRotate}
          sx={{
            position: "absolute",
            top: { xs: 15, sm: 20, md: 30 },
            right: { xs: 70, sm: 100, md: 130 },
            width: { xs: 45, sm: 55, md: 70 },
            height: { xs: 45, sm: 55, md: 70 },
            bgcolor: isAutoRotate ? "#ffd700" : "white",
            "&:hover": {
              bgcolor: isAutoRotate ? "#ffed4e" : "#ffd700",
              transform: "scale(1.1)",
            },
            transition: "all 0.2s",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          {isAutoRotate ? (
            <Pause sx={{ fontSize: { xs: 22, sm: 26, md: 32 } }} />
          ) : (
            <PlayArrow sx={{ fontSize: { xs: 22, sm: 26, md: 32 } }} />
          )}
        </IconButton>
      </Tooltip>

      <Tooltip title="Reset">
        <IconButton
          onClick={resetView}
          sx={{
            position: "absolute",
            top: { xs: 15, sm: 20, md: 30 },
            right: { xs: 15, sm: 20, md: 30 },
            width: { xs: 45, sm: 55, md: 70 },
            height: { xs: 45, sm: 55, md: 70 },
            bgcolor: "white",
            "&:hover": { bgcolor: "#ffd700", transform: "scale(1.1)" },
            transition: "all 0.2s",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
          }}
        >
          <Replay sx={{ fontSize: { xs: 22, sm: 26, md: 32 } }} />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          position: "absolute",
          bottom: { xs: 15, sm: 25, md: 40 },
          right: { xs: 15, sm: 20, md: 30 },
          bgcolor: "white",
          borderRadius: "12px",
          px: { xs: 1.5, sm: 2, md: 3 },
          py: { xs: 0.75, sm: 1, md: 1.5 },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          zIndex: 1000,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "Poppins, sans-serif",
            fontSize: { xs: "13px", sm: "16px", md: "18px" },
            color: "#667eea",
          }}
        >
          {images.length} Photos
        </Typography>
      </Box>

      {isMobile && !isDragging && (
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: 60, sm: 70 },
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "13px",
            fontFamily: "Poppins, sans-serif",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.6 },
              "50%": { opacity: 1 },
            },
          }}
        >
          <ThreeSixty sx={{ fontSize: 20 }} />
          <Typography
            variant="caption"
            sx={{
              fontWeight: "bold",
              fontSize: "13px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Swipe to rotate
          </Typography>
        </Box>
      )}
    </Box>
  );
}
