
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import MapView from './components/MapView';
import PhotoSphereView from './components/PhotoSphereView';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; 
import './App.css';
import { locations } from './data/locations';

function App() {
  const [mode, setMode] = useState('welcome');
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(5000);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [shuffledLocations, setShuffledLocations] = useState([]);
  const mapContainerRef = useRef(null);
  const photoContainerRef = useRef(null);

  
  useEffect(() => {
    const shuffled = [...locations].sort(() => Math.random() - 0.5);
    setShuffledLocations(shuffled);
  }, []);

  
  const calculateScore = (guessLat, guessLng) => {
    const actualLat = shuffledLocations[currentLocation].coordinates.lat;
    const actualLng = shuffledLocations[currentLocation].coordinates.lng;
    
    
    const R = 6371e3; 
    const φ1 = guessLat * Math.PI/180;
    const φ2 = actualLat * Math.PI/180;
    const Δφ = (actualLat-guessLat) * Math.PI/180;
    const Δλ = (actualLng-guessLng) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; 

    
    
    
    const maxDistance = 2000; 
    const score = Math.max(0, Math.round(5000 * (1 - distance/maxDistance)));
    
    return score;
  };

  
  const handleGuess = (guessCoords) => {
    const newScore = calculateScore(guessCoords.lat, guessCoords.lng);
    setScore(prevScore => prevScore + newScore);
  };

  const handleNext = () => {
    if (currentLocation === locations.length - 1) {
      setIsGameOver(true);
      setMode('gameover');
    } else {
      setCurrentLocation(prev => prev + 1);
      setMaxScore(prevMax => Math.min(prevMax + 5000, 50000));
    }
  };

  const handleStartGame = () => {
    setMode('split');
  };

  
  useEffect(() => {
    if (mode === 'split') {
      gsap.fromTo(
        photoContainerRef.current,
        { opacity: 0 },
        { duration: 1, opacity: 1, ease: 'power2.out' }
      );
    }
  }, [mode]);

  const topBarStyle = {
    position: 'fixed',
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    height: '80px',
    backgroundColor: '#cc0033',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 30px',
    zIndex: 2000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
  };

  const logoStyle = {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const scoreStyle = {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold'
  };

  const rightSectionStyle = {
    width: '40px', 
    height: '40px'
  };

  return (
    <div className="App" style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {mode === 'welcome' ? (
        <div style={{
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #cc0033 0%, #990000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Rutgers GeoGuessr
          </h1>
          <p style={{
            fontSize: '1.5rem',
            maxWidth: '600px',
            textAlign: 'center',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Test your knowledge of the Rutgers campus! Navigate through 360° images and guess their locations. How well do you know your university?
          </p>
          <button
            onClick={handleStartGame}
            style={{
              padding: '15px 40px',
              fontSize: '1.5rem',
              backgroundColor: 'white',
              color: '#cc0033',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            }}
          >
            Start Game
          </button>
          <div style={{
            position: 'absolute',
            bottom: '20px',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            Created by Students, for Students
          </div>
        </div>
      ) : mode === 'gameover' ? (
        <div style={{
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #cc0033 0%, #990000 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '20px'
        }}>
          <h1 style={{
            fontSize: '4rem',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Thanks for Playing!
          </h1>
          <p style={{
            fontSize: '2rem',
            marginBottom: '20px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
          }}>
            You Scored: {score}/50000
          </p>
          <p style={{
            fontSize: '1.5rem',
            marginBottom: '40px'
          }}>
            {score >= 45000 ? "Wow! You're a Rutgers Expert! 🏆" :
             score >= 35000 ? "Great job! You know your campus well! 🎓" :
             score >= 25000 ? "Not bad! You're getting there! 📚" :
             "Keep exploring the campus! 🗺️"}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '15px 40px',
              fontSize: '1.5rem',
              backgroundColor: 'white',
              color: '#cc0033',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              fontWeight: 'bold'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 8px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.2)';
            }}
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          <div style={topBarStyle}>
            <div style={scoreStyle}>
              Score: {score}/{maxScore}
            </div>
          </div>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div ref={photoContainerRef} style={{ width: '100%', height: '100%' }}>
              <PhotoSphereView imageUrl={shuffledLocations[currentLocation].imageUrl} />
            </div>
            <div ref={mapContainerRef} style={{ position: 'absolute', bottom: 20, right: 20 }}>
              <MapView 
                onGuess={handleGuess} 
                onNext={handleNext} 
                currentLocation={currentLocation}
                locations={shuffledLocations}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;