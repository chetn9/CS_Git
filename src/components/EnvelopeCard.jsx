import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function EnvelopeCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpen && !isClosing) {
      setIsOpen(true);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsClosing(true);

    // First, letter goes back (1.2s)
    // Then close the envelope (after 0.8s delay)
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 800);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        position: "relative",
        padding: { xs: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "10%",
          fontSize: { xs: "3rem", md: "5rem" },
          animation: "float 4s ease-in-out infinite",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      >
        💌
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: "15%",
          right: "15%",
          fontSize: { xs: "2.5rem", md: "4rem" },
          animation: "float 3s ease-in-out infinite 1s",
          "@keyframes float": {
            "0%, 100%": { transform: "translateY(0px)" },
            "50%": { transform: "translateY(-20px)" },
          },
        }}
      >
        💖
      </Box>

      {/* Title */}
      {!isOpen && !isClosing && (
        <Typography
          variant="h3"
          sx={{
            position: "absolute",
            top: { xs: 40, md: 60 },
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
            px: 2,
            animation: "fadeIn 0.5s ease-in",
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          You've Got Mail 💌
        </Typography>
      )}

      {/* Main Container */}
      <Box
        sx={{
          position: "relative",
          width: { xs: "320px", sm: "400px", md: "500px" },
          height: { xs: "700px", sm: "800px", md: "900px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Letter - Positioned to slide from envelope */}
        <Box
          sx={{
            position: "absolute",
            width: { xs: "290px", sm: "370px", md: "460px" },
            height: { xs: "420px", sm: "500px", md: "570px" },
            background: "linear-gradient(to bottom, #fff9e6 0%, #ffffff 100%)",
            borderRadius: "8px",
            boxShadow:
              isOpen && !isClosing ? "0 20px 60px rgba(0, 0, 0, 0.3)" : "none",
            padding: { xs: 3, sm: 4, md: 5 },
            border: "2px solid #ffd700",
            overflow: "auto",
            left: "50%",
            transform:
              isOpen && !isClosing
                ? "translateX(-50%) translateY(-280px)"
                : "translateX(-50%) translateY(0px)",
            opacity: isOpen && !isClosing ? 1 : 0,
            transition: isClosing
              ? "all 0.8s cubic-bezier(0.65, 0.05, 0.36, 1)" // Fast closing
              : "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s", // Bouncy opening
            zIndex: 10,
            pointerEvents: isOpen && !isClosing ? "auto" : "none",
            top: "50%",
          }}
        >
          {/* Letter Content */}
          <Box sx={{ position: "relative" }}>
            {/* Close Button */}
            {isOpen && !isClosing && (
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  bgcolor: "#e74c3c",
                  color: "white",
                  "&:hover": { bgcolor: "#c0392b", transform: "scale(1.1)" },
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  zIndex: 10,
                  transition: "all 0.3s ease",
                }}
              >
                <Close />
              </IconButton>
            )}

            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                color: "#e74c3c",
                mb: 3,
                textAlign: "center",
                fontWeight: 700,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
              }}
            >
              Dear Harmita 🎀
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Handlee', cursive",
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                lineHeight: 1.8,
                color: "#333",
                mb: 2,
              }}
            >
              My Dear Bestie, On this special day '19-10-2025', I wanted to take a moment to tell you how
              truly amazing you are. Your smile lights up every room, and your
              kindness touches everyone around you.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Handlee', cursive",
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                lineHeight: 1.8,
                color: "#333",
                mb: 2,
              }}
            >
              May this year bring you endless joy, countless blessings, and all
              the success you deserve. Keep shining bright and never stop being
              the wonderful person you are...
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Handlee', cursive",
                fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.15rem" },
                lineHeight: 1.8,
                color: "#333",
                mb: 3,
              }}
            >
              Here's to celebrating you today and always. 
              Happy Birthday my Best Friend, My Khuchu-Puchu. 🎉🎂🎈
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                color: "#764ba2",
                textAlign: "right",
                fontWeight: 700,
                mt: 4,
                fontSize: { xs: "1.3rem", sm: "1.5rem", md: "1.8rem" },
              }}
            >
              With love & best wishes,
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Dancing Script', cursive",
                color: "#667eea",
                textAlign: "right",
                fontWeight: 700,
                mt: 1,
                fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
              }}
            >
              Chetan S. 💝
            </Typography>
            <Typography sx={{
                fontFamily: "'Dancing Script', cursive",
                color: "#667eea",
                textAlign: "right",
                fontWeight: 600,
                mt: 1,
                fontSize: { xs: "1.1rem", sm: "1.1rem", md: "1.2rem" },
              }}>
                (Aapka Thoda Gusse wala friend 😁)
            </Typography>
          </Box>
        </Box>

        {/* Envelope - Centered */}
        <Box
          onClick={handleEnvelopeClick}
          sx={{
            position: "absolute",
            width: "100%",
            height: { xs: "200px", sm: "250px", md: "300px" },
            top: "50%",
            left: 0,
            transform: "translateY(-50%)",
            cursor: isOpen || isClosing ? "default" : "pointer",
            transition: "all 0.6s ease",
            zIndex: 5,
            "&:hover": {
              transform:
                isOpen || isClosing
                  ? "translateY(-50%)"
                  : "translateY(-50%) scale(1.05)",
            },
          }}
        >
          {/* Envelope Body */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
              borderRadius: "10px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            }}
          />

          {/* Envelope Flap - Opens and closes */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              transformOrigin: "top center",
              transform:
                isOpen && !isClosing ? "rotateX(-180deg)" : "rotateX(0deg)",
              transition: isClosing
                ? "transform 0.6s ease 0.8s" // Close flap after letter goes in
                : "transform 0.8s ease", // Open flap
              transformStyle: "preserve-3d",
              zIndex: 3,
              pointerEvents: "none",
            }}
          >
            {/* Flap Front */}
            <Box
              sx={{
                position: "absolute",
                width: 0,
                height: 0,
                borderLeft: {
                  xs: "160px solid transparent",
                  sm: "200px solid transparent",
                  md: "250px solid transparent",
                },
                borderRight: {
                  xs: "160px solid transparent",
                  sm: "200px solid transparent",
                  md: "250px solid transparent",
                },
                borderTop: {
                  xs: "120px solid #e74c3c",
                  sm: "150px solid #e74c3c",
                  md: "180px solid #e74c3c",
                },
                borderRadius: "10px 10px 0 0",
                backfaceVisibility: "hidden",
              }}
            />

            {/* Flap Back */}
            <Box
              sx={{
                position: "absolute",
                width: 0,
                height: 0,
                borderLeft: {
                  xs: "160px solid transparent",
                  sm: "200px solid transparent",
                  md: "250px solid transparent",
                },
                borderRight: {
                  xs: "160px solid transparent",
                  sm: "200px solid transparent",
                  md: "250px solid transparent",
                },
                borderTop: {
                  xs: "120px solid #c0392b",
                  sm: "150px solid #c0392b",
                  md: "180px solid #c0392b",
                },
                borderRadius: "10px 10px 0 0",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </Box>

          {/* Wax Seal - Appears when closed */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: "85px", sm: "110px", md: "130px" },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: "50px", sm: "60px", md: "70px" },
              height: { xs: "50px", sm: "60px", md: "70px" },
              background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              zIndex: 4,
              fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" },
              opacity: !isOpen && !isClosing ? 1 : 0,
              visibility: !isOpen && !isClosing ? "visible" : "hidden",
              transition: isClosing
                ? "opacity 0.3s ease 1.4s, visibility 0s 1.4s" // Appear after flap closes
                : "opacity 0.3s ease, visibility 0s", // Disappear immediately
              animation: !isOpen && !isClosing ? "pulse 2s infinite" : "none",
              "@keyframes pulse": {
                "0%, 100%": { transform: "translateX(-50%) scale(1)" },
                "50%": { transform: "translateX(-50%) scale(1.1)" },
              },
            }}
          >
            💝
          </Box>
        </Box>
      </Box>

      {/* Instructions */}
      {/* {!isOpen && !isClosing && (
        <Typography
          variant="body1"
          sx={{
            position: 'absolute',
            bottom: { xs: 40, md: 60 },
            fontFamily: 'Poppins, sans-serif',
            color: '#667eea',
            fontWeight: 600,
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' },
            },
          }}
        >
          👆 Click to open the envelope
        </Typography>
      )} */}
    </Box>
  );
}
