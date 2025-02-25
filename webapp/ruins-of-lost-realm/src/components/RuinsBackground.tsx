'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RuinsBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x6936C8, 0.5); // Purple ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xF8A61A, 1); // Gold directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create ruins
    const ruins: THREE.Mesh[] = [];
    const createRuin = (geometry: THREE.BufferGeometry, position: THREE.Vector3, rotation: THREE.Euler) => {
      const material = new THREE.MeshPhongMaterial({
        color: 0x9C6722, // Bronze color
        emissive: 0x3B6BE1, // Cyan glow
        emissiveIntensity: 0.2,
        shininess: 30, // Replaced roughness with shininess for MeshPhongMaterial
        // Removed metalness as it's not a property of MeshPhongMaterial
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.rotation.copy(rotation);
      scene.add(mesh);
      ruins.push(mesh);
      return mesh;
    };

    // Create various ruin pieces
    const pillar = new THREE.CylinderGeometry(0.5, 0.7, 4, 8);
    const brokenColumn = new THREE.CylinderGeometry(0.4, 0.6, 2, 8);
    const cube = new THREE.BoxGeometry(1.5, 1.5, 1.5);

    // Add multiple ruins at different positions
    createRuin(pillar, new THREE.Vector3(-5, 0, -10), new THREE.Euler(0.2, 0, 0.1));
    createRuin(brokenColumn, new THREE.Vector3(6, -2, -8), new THREE.Euler(0.4, 0.2, 0));
    createRuin(cube, new THREE.Vector3(0, 2, -12), new THREE.Euler(0.5, 0.5, 0.5));
    createRuin(pillar, new THREE.Vector3(4, 3, -15), new THREE.Euler(0.1, 0, 0.2));
    createRuin(cube, new THREE.Vector3(-3, -1, -10), new THREE.Euler(0.3, 0.3, 0.3));

    // Position camera
    camera.position.z = 15;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate ruins slowly
      ruins.forEach((ruin, index) => {
        ruin.rotation.x += 0.001 * (index + 1);
        ruin.rotation.y += 0.002 * (index + 1);
        
        // Float up and down
        ruin.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-20 bg-transparent" />;
};

export default RuinsBackground;