'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import { useAssetLoader } from './useAssetLoader';
import FallbackCard from './FallbackCard';

extend({ MeshLineGeometry, MeshLineMaterial });

// Define paths for assets - update these to match your public folder structure
const GLTF_PATH = '/assets/kartu.glb';
const TEXTURE_PATH = '/assets/bandd.png';

// Preload assets
useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);

interface ThreeDCardProps {
  className?: string;
}

export default function ThreeDCard({ className = '' }: ThreeDCardProps) {
  const { assetsLoaded, error } = useAssetLoader();

  // If assets are not loaded or there's an error, show the fallback card
  if (!assetsLoaded || error) {
    return <FallbackCard className={className} error={error} />;
  }

  return (
    <div className={`responsive-wrapper ${className}`}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI} />
          <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
            <Band />
          </Physics>
          <Environment background blur={0.75}>
            <color attach="background" args={['black']} />
            <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
            <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
          </Environment>
        </Suspense>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
}

function Band({ maxSpeed = 50, minSpeed = 10 }: BandProps) {
  // Properly typed refs
  const band = useRef<THREE.Mesh>(null);
  const fixed = useRef<RapierRigidBody>(null);
  const j1 = useRef<RapierRigidBody>(null);
  const j2 = useRef<RapierRigidBody>(null);
  const j3 = useRef<RapierRigidBody>(null);
  const card = useRef<RapierRigidBody>(null);
  
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  
  // Try to load the model and texture, with fallbacks
  const { nodes, materials } = useGLTF(GLTF_PATH) || { 
    nodes: { 
      card: { geometry: new THREE.BoxGeometry(1.6, 2.25, 0.02) },
      clip: { geometry: new THREE.BoxGeometry(0.2, 0.2, 0.02) },
      clamp: { geometry: new THREE.BoxGeometry(0.2, 0.2, 0.02) }
    }, 
    materials: { 
      base: { map: null },
      metal: {}
    } 
  };
  
  const texture = useTexture(TEXTURE_PATH);
  
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({ 
        x: vec.x - (dragged as THREE.Vector3).x, 
        y: vec.y - (dragged as THREE.Vector3).y, 
        z: vec.z - (dragged as THREE.Vector3).z 
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      [j1, j2].forEach((ref) => {
        if (ref.current) {
          if (!('lerped' in ref.current)) {
            (ref.current as any).lerped = new THREE.Vector3().copy(ref.current.translation());
          }
          const lerped = (ref.current as any).lerped as THREE.Vector3;
          const translation = ref.current.translation();
          const clampedDistance = Math.max(0.1, Math.min(1, lerped.distanceTo(translation)));
          lerped.lerp(translation, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
        }
      });
      
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation());
      
      (band.current.geometry as any).setPoints(curve.getPoints(32));
      
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  if (texture) {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e: any) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e: any) => {
              e.target.setPointerCapture(e.pointerId);
              if (card.current) {
                drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
              }
            }}>
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial 
                map={materials.base.map} 
                map-anisotropy={16} 
                clearcoat={1} 
                clearcoatRoughness={0.15} 
                roughness={0.3} 
                metalness={0.5} 
                color={materials.base.map ? undefined : "#ffffff"}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
} 