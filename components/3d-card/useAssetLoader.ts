'use client';

import * as THREE from 'three';
import { useState, useEffect } from 'react';

export function useAssetLoader() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create a simple placeholder card model if the actual model fails to load
    const createPlaceholderCard = () => {
      const cardGeometry = new THREE.BoxGeometry(1.6, 2.25, 0.02);
      const clipGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.02);
      const clampGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.02);
      
      const cardMaterial = new THREE.MeshStandardMaterial({ 
        color: '#ffffff',
        roughness: 0.3,
        metalness: 0.5
      });
      
      const metalMaterial = new THREE.MeshStandardMaterial({ 
        color: '#888888',
        roughness: 0.3,
        metalness: 0.8
      });
      
      return {
        nodes: {
          card: { geometry: cardGeometry },
          clip: { geometry: clipGeometry },
          clamp: { geometry: clampGeometry }
        },
        materials: {
          base: { map: null },
          metal: metalMaterial
        }
      };
    };

    // Create a placeholder texture if the actual texture fails to load
    const createPlaceholderTexture = () => {
      const texture = new THREE.Texture();
      texture.needsUpdate = true;
      return texture;
    };

    // Check if the required assets exist in the public folder
    const checkAssets = async () => {
      try {
        // Check if the model file exists
        const modelResponse = await fetch('/assets/kartu.glb');
        if (!modelResponse.ok) {
          console.warn('3D model not found, using placeholder');
          setError('3D model not found, using placeholder');
        }
        
        // Check if the texture file exists
        const textureResponse = await fetch('/assets/bandd.png');
        if (!textureResponse.ok) {
          console.warn('Texture not found, using placeholder');
          setError('Texture not found, using placeholder');
        }
        
        setAssetsLoaded(true);
      } catch (err) {
        console.error('Error checking assets:', err);
        setError('Error loading assets, using placeholders');
        setAssetsLoaded(true);
      }
    };

    checkAssets();
  }, []);

  return { assetsLoaded, error };
} 