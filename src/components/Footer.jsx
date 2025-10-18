import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { Favorite } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4, #ffd700)',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s linear infinite',
          '@keyframes gradient': {
            '0%': { backgroundPosition: '0% 0%' },
            '100%': { backgroundPosition: '200% 0%' }
          }
        }
      }}
    >
      {/* Decorative floating elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '5%',
          fontSize: { xs: '2rem', md: '3rem' },
          opacity: 0.2,
          animation: 'float 4s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' }
          }
        }}
      >
        🎈
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          right: '8%',
          fontSize: { xs: '2rem', md: '3rem' },
          opacity: 0.2,
          animation: 'float 3s ease-in-out infinite 1s',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' }
          }
        }}
      >
        ✨
      </Box>

      <Container maxWidth="lg">
        {/* Main message */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            }}
          >
           From your Best Friend 'Chetan Somaiya 😉'.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              opacity: 0.95,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Wishing you endless happiness, captured with love, for someone truly special like you.
          </Typography>
        </Box>

        {/* Divider */}
        <Box
          sx={{
            width: { xs: '60%', sm: '40%', md: '30%' },
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
            mx: 'auto',
            my: 3,
          }}
        />

        {/* Made with love */}
        <Box sx={{ textAlign: 'center' }}>
         

          <Typography
            variant="caption"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: { xs: '0.75rem', sm: '0.8rem' },
              opacity: 0.7,
              mt: 2,
              display: 'block',
            }}
          >
            {new Date().getFullYear()} • Happy Birthday Harmita 🎂
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
