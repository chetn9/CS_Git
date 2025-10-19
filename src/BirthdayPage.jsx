import React, { useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";
import CustomMug3D from "./components/CustomMug3D";
import BirthdayCake from "./components/BirthdayCake";
import BirthdayGift from "./components/BirthdayGift";
import SpiralPhotoGallery from "./components/SpiralPhotoGallery";
import img_1 from "./assets/photos/img_1.jpg";
import img_2 from "./assets/photos/img_2.jpg";
import img_3 from "./assets/photos/img_3.jpg";
import img_4 from "./assets/photos/img_4.jpg";
import img_5 from "./assets/photos/img_5.jpg";
import img_6 from "./assets/photos/img_6.jpg";
import img_7 from "./assets/photos/img_7.jpg";
import img_8 from "./assets/photos/img_8.jpg";
import img_9 from "./assets/photos/img_9.jpg";
import img_10 from "./assets/photos/img_10.jpg";
import hm_1 from "./assets/photos/hm_1.jpg";
import h_1 from "./assets/photos/h_1.jpg";
import h_2 from "./assets/photos/h_2.jpg";
import EnvelopeCard from "./components/EnvelopeCard";
import Footer from "./components/Footer";

const BirthdayPage = () => {
  const birthdayImages = [
    h_2,
    h_1,
    hm_1,
    img_1,
    img_2,
    img_3,
    img_4,
    img_5,
    img_6,
    img_7,
    img_8,
    img_9,
    img_10,
  ];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const mugRef = useRef(null);
  const cakeRef = useRef(null);
  const galleyRef = useRef(null);
  const giftRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          py: isMobile ? 0 : 4,
          px: isMobile ? 0 : 3,
        }}
      >
        <Grid
          container
          spacing={isMobile ? 0 : 3}
          justifyContent="center"
          alignItems="stretch"
          sx={{
            minHeight: isMobile ? "auto" : "85vh", // Ensure good height on desktop
          }}
        >
          {/* Welcome Message Card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: isMobile ? "100vh" : "100%",
                minHeight: { md: "700px" }, // Minimum height for desktop
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                borderRadius: isMobile ? 0 : 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: 1,
                  minHeight: isMobile ? "100vh" : 400,
                  pb: 8,
                  px: isMobile ? 3 : 3,
                }}
              >
                <Typography
                  variant={isMobile ? "h2" : "h3"}
                  gutterBottom
                  align="center"
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  🎀🎀
                </Typography>
                <Typography
                  variant={isMobile ? "h3" : "h4"}
                  gutterBottom
                  align="center"
                  fontWeight={400}
                  sx={{ fontFamily: "Poppins, sans-serif" }}
                >
                  Wishing You a Wonderful Day Dear{" "}
                  <b style={{ color: "#fcd53f" }}>Harmita🎀</b>
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  sx={{
                    mt: 2,
                    fontSize: isMobile ? "1.2rem" : "1.1rem",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  May your birthday be filled with joy, laughter, and beautiful
                  memories!
                </Typography>

                <Box sx={{ mt: isMobile ? 4 : 3, px: 2 }}>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mb: 2,
                      fontStyle: "italic",
                      fontSize: isMobile ? "1rem" : "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    ✨ May all your dreams come true
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mb: 2,
                      fontStyle: "italic",
                      fontSize: isMobile ? "1rem" : "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    🌟 Wishing you endless happiness
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      mb: 2,
                      fontStyle: "italic",
                      fontSize: isMobile ? "1rem" : "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    💝 Cheers to another amazing year
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{
                      fontStyle: "italic",
                      fontSize: isMobile ? "1rem" : "0.95rem",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    🎊 Here's to making unforgettable memories
                  </Typography>
                </Box>

                <Typography
                  variant={isMobile ? "h4" : "h5"}
                  align="center"
                  sx={{ mt: isMobile ? 4 : 3 }}
                >
                  🎂 🎈 🎁
                </Typography>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <IconButton
                    onClick={() => scrollToSection(mugRef)}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                      },
                      animation: "bounce 2s infinite",
                      "@keyframes bounce": {
                        "0%, 20%, 50%, 80%, 100%": {
                          transform: "translateY(0)",
                        },
                        "40%": {
                          transform: "translateY(-10px)",
                        },
                        "60%": {
                          transform: "translateY(-5px)",
                        },
                      },
                    }}
                  >
                    <KeyboardArrowDown fontSize="large" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Birthday Mug Card */}
          <Grid item xs={12} md={4} display="flex" ref={mugRef}>
            <Card
              sx={{
                width: "100%",
                height: isMobile ? "100vh" : "100%",
                minHeight: { md: "700px" },
                borderRadius: isMobile ? 0 : 3,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                boxShadow: isMobile
                  ? "none"
                  : "0 20px 60px rgba(0, 0, 0, 0.15)",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "5px",
                  background:
                    "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b)",
                  backgroundSize: "200% 100%",
                  animation: "gradient 3s linear infinite",
                  "@keyframes gradient": {
                    "0%": { backgroundPosition: "0% 0%" },
                    "100%": { backgroundPosition: "200% 0%" },
                  },
                },
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  pb: 8,
                  pt: 4,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fontSize: "3rem",
                    animation: "float 3s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                      "50%": { transform: "translateY(-20px) rotate(10deg)" },
                    },
                  }}
                >
                  ☕
                </Box>

                <Typography
                  variant={isMobile ? "h4" : "h5"}
                  gutterBottom
                  align="center"
                  sx={{
                    mb: isMobile ? 2 : 2,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  Design Your Birthday Mug
                </Typography>

                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    
                    fontFamily: "Poppins, sans-serif",
                    color: "#666",
                    maxWidth: "80%",
                  }}
                >
                  Click and drag to customize your special mug! 🎨
                </Typography>

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <CustomMug3D />
                </Box>

                {isMobile && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <IconButton
                      onClick={() => scrollToSection(cakeRef)}
                      sx={{
                        color: "#667eea",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          transform: "scale(1.1)",
                          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                        },
                        animation: "bounce 2s infinite",
                        "@keyframes bounce": {
                          "0%, 20%, 50%, 80%, 100%": {
                            transform: "translateY(0)",
                          },
                          "40%": {
                            transform: "translateY(-10px)",
                          },
                          "60%": {
                            transform: "translateY(-5px)",
                          },
                        },
                      }}
                    >
                      <KeyboardArrowDown fontSize="large" />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Birthday Cake Card */}
          <Grid item xs={12} md={4} ref={cakeRef}>
            <Card
              sx={{
                height: isMobile ? "100vh" : "100%",
                minHeight: { md: "700px" },
                borderRadius: isMobile ? 0 : 3,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                boxShadow: isMobile
                  ? "none"
                  : "0 20px 60px rgba(0, 0, 0, 0.15)",
                overflow: "visible", // Changed from hidden
              }}
            >
              {/* Animated Top Border - Outside overflow */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "6px",
                  background:
                    "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b)",
                  backgroundSize: "300% 100%",
                  animation: "gradientMove 4s linear infinite",
                  borderRadius: isMobile ? 0 : "12px 12px 0 0",
                  zIndex: 10,
                  "@keyframes gradientMove": {
                    "0%": { backgroundPosition: "0% 0%" },
                    "100%": { backgroundPosition: "300% 0%" },
                  },
                }}
              />

              <CardContent
                sx={{
                  p: 0,
                  flex: 1,
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden", // Keep overflow hidden on content only
                  borderRadius: isMobile ? 0 : 3,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 60,
                    left: 10,
                    fontSize: "2rem",
                    animation: "bounce 2s ease-in-out infinite",
                    zIndex: 10,
                    "@keyframes bounce": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  🎂
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: 60,
                    right: 10,
                    fontSize: "2rem",
                    animation: "bounce 2s ease-in-out infinite 0.5s",
                    zIndex: 10,
                    "@keyframes bounce": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  🎉
                </Box>

                <Box
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    py: 3,
                    px: 2,
                    textAlign: "center",
                    // borderRadius: isMobile ? 0 : "24px 24px 0 0",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                    mt: "6px", // Push down to make room for top border
                  }}
                >
                  <Typography
                    variant={isMobile ? "h4" : "h5"}
                    gutterBottom
                    align="center"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                    }}
                  >
                    Have Your Favourite Red Velvet Cake
                  </Typography>
                </Box>

                <Box sx={{ flex: 1, position: "relative" }}>
                  <BirthdayCake />
                </Box>

                {isMobile && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                    }}
                  >
                    <IconButton
                      onClick={() => scrollToSection(galleyRef)}
                      sx={{
                        color: "#f5576c",
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          transform: "scale(1.1)",
                          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                        },
                        animation: "bounce 2s infinite",
                        "@keyframes bounce": {
                          "0%, 20%, 50%, 80%, 100%": {
                            transform: "translateY(0)",
                          },
                          "40%": {
                            transform: "translateY(-10px)",
                          },
                          "60%": {
                            transform: "translateY(-5px)",
                          },
                        },
                      }}
                    >
                      <KeyboardArrowDown fontSize="large" />
                    </IconButton>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FULL WIDTH CAROUSEL - OUTSIDE CONTAINER */}
      <Box
        ref={galleyRef}
        sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          my: isMobile ? 0 : 3,
        }}
      >
        <SpiralPhotoGallery
          images={birthdayImages}
          message="Your Photo Gallery 💗💌"
        />
      </Box>

      {/* FULL WIDTH GIFT SECTION - OUTSIDE CONTAINER */}

      <Box
        ref={giftRef}
        sx={{
          width: "100vw",
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          my: isMobile ? 0 : 3,
        }}
      >
        <Box
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
            overflow: "hidden",
            py: { xs: 6, md: 8 },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background:
                "linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4, #ffd700)",
              backgroundSize: "200% 100%",
              animation: "gradient 4s linear infinite",
              "@keyframes gradient": {
                "0%": { backgroundPosition: "0% 0%" },
                "100%": { backgroundPosition: "200% 0%" },
              },
            },
            // Decorative background patterns
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
        `,
              pointerEvents: "none",
            },
          }}
        >
          {/* Floating Decorative Emojis */}
          <Box
            sx={{
              position: "absolute",
              top: 30,
              left: { xs: "5%", md: "10%" },
              fontSize: { xs: "2rem", md: "3rem" },
              animation: "float 4s ease-in-out infinite",
              zIndex: 1,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-20px) rotate(10deg)" },
              },
            }}
          >
            🎁
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 50,
              right: { xs: "5%", md: "10%" },
              fontSize: { xs: "2rem", md: "3rem" },
              animation: "float 3s ease-in-out infinite 1s",
              zIndex: 1,
              "@keyframes float": {
                "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                "50%": { transform: "translateY(-20px) rotate(-10deg)" },
              },
            }}
          >
            🎈
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 50,
              left: { xs: "10%", md: "15%" },
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              animation: "bounce 2s ease-in-out infinite",
              zIndex: 1,
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-15px)" },
              },
            }}
          >
            🎊
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 80,
              right: { xs: "15%", md: "20%" },
              fontSize: { xs: "1.5rem", md: "2.5rem" },
              animation: "bounce 2.5s ease-in-out infinite 0.5s",
              zIndex: 1,
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0px)" },
                "50%": { transform: "translateY(-15px)" },
              },
            }}
          >
            ✨
          </Box>

          {/* Header Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: { xs: 4, md: 6 },
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant={isMobile ? "h3" : "h2"}
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                color: "#fff",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                mb: 2,
                animation: "fadeInUp 1s ease-out",
                "@keyframes fadeInUp": {
                  "0%": { opacity: 0, transform: "translateY(30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              🎉 Special Gift For You 🎉
            </Typography>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                color: "rgba(255, 255, 255, 0.95)",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                maxWidth: "600px",
                mx: "auto",
                px: 2,
                animation: "fadeInUp 1s ease-out 0.2s backwards",
                "@keyframes fadeInUp": {
                  "0%": { opacity: 0, transform: "translateY(30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              Click to unwrap your surprise 👀😉
            </Typography>
          </Box>

          {/* Gift Component Container */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              maxWidth: { xs: "100%", md: "1200px" },
              mx: "auto",
              px: { xs: 2, md: 4 },
              animation: "scaleIn 1s ease-out 0.4s backwards",
              "@keyframes scaleIn": {
                "0%": { opacity: 0, transform: "scale(0.8)" },
                "100%": { opacity: 1, transform: "scale(1)" },
              },
            }}
          >
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: { xs: 0, md: 4 },
                p: { xs: 0, md: 3 },
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderTopLeftRadius: "50px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: { xs: "none", md: "translateY(-10px)" },
                  boxShadow: "0 30px 80px rgba(0, 0, 0, 0.4)",
                },
              }}
            >
              <BirthdayGift />
            </Box>
          </Box>

          {/* Bottom Decorative Text */}
          <Box
            sx={{
              textAlign: "center",
              mt: { xs: 4, md: 6 },
              position: "relative",
              zIndex: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "0.9rem", md: "1.1rem" },
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
                animation: "fadeIn 1s ease-out 0.6s backwards",
                "@keyframes fadeIn": {
                  "0%": { opacity: 0 },
                  "100%": { opacity: 1 },
                },
              }}
            >
              just for you Khuchu-Puchu 🎀
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid item xs={12} md={4}>
        <Card
          sx={{
            height: isMobile ? "100vh" : "100%",
            minHeight: { md: "700px" },
            borderRadius: isMobile ? 0 : 3,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            boxShadow: isMobile ? "none" : "0 20px 60px rgba(0, 0, 0, 0.15)",
            overflow: "visible",
          }}
        >
          {/* Animated Top Border */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              background:
                "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b)",
              backgroundSize: "300% 100%",
              animation: "gradientMove 4s linear infinite",
              borderRadius: isMobile ? 0 : "12px 12px 0 0",
              zIndex: 10,
              "@keyframes gradientMove": {
                "0%": { backgroundPosition: "0% 0%" },
                "100%": { backgroundPosition: "300% 0%" },
              },
            }}
          />

          <CardContent
            sx={{
              p: 0,
              flex: 1,
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: isMobile ? 0 : 3,
            }}
          >
            {/* Full-height envelope container */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: "6px", // Account for top border
              }}
            >
              <EnvelopeCard />
            </Box>

            {isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 10,
                }}
              >
                <IconButton
                  onClick={() => scrollToSection(galleyRef)}
                  sx={{
                    color: "#f5576c",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      transform: "scale(1.1)",
                      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                    },
                    animation: "bounce 2s infinite",
                    "@keyframes bounce": {
                      "0%, 20%, 50%, 80%, 100%": {
                        transform: "translateY(0)",
                      },
                      "40%": {
                        transform: "translateY(-10px)",
                      },
                      "60%": {
                        transform: "translateY(-5px)",
                      },
                    },
                  }}
                >
                  <KeyboardArrowUpOutlined fontSize="large" />
                </IconButton>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Footer/>
    </>
  );
};

export default BirthdayPage;
