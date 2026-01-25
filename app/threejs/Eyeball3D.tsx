"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function createGrainTexture(width: number, height: number, intensity: number) {
	const size = width * height;
	const data = new Uint8Array(4 * size);

	for (let i = 0; i < size; i++) {
		const stride = i * 4;
		const noise = Math.floor(Math.random() * intensity);
		data[stride] = noise;
		data[stride + 1] = noise;
		data[stride + 2] = noise;
		data[stride + 3] = 255;
	}

	const texture = new THREE.DataTexture(data, width, height);
	texture.needsUpdate = true;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	return texture;
}

function createDotTexture(width: number, height: number) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not get 2d context");

	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = "rgb(187, 189, 190, 0.7)";
	for (let i = 0; i < 800; i++) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		const radius = Math.random() * 1.5 + 0.5;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(4, 4);
	return texture;
}

function createPurpleDotTexture(width: number, height: number) {
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not get 2d context");

	ctx.fillStyle = "#5314b3";
	ctx.fillRect(0, 0, width, height);

	ctx.fillStyle = "rgb(130, 80, 220)";
	for (let i = 0; i < 200; i++) {
		const x = Math.random() * width;
		const y = Math.random() * height;
		const radius = Math.random() * 1.6 + 0.3;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2);
		ctx.fill();
	}

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set(2, 2);
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.needsUpdate = true;
	return texture;
}

const MOUSE_THROTTLE_MS = 16;

type OrbitControlsType = {
	addEventListener: (event: string, callback: () => void) => void;
	removeEventListener: (event: string, callback: () => void) => void;
	getAzimuthalAngle: () => number;
	getPolarAngle: () => number;
	getDistance: () => number;
	target: THREE.Vector3;
	update: () => void;
} | null;

// Check mobile status synchronously to avoid race condition with useFrame
const getIsMobile = () => {
	if (typeof window === "undefined") return false;
	return (
		/Android|webOS|iPhone|iPad|IEMobile|Opera Mini/i.test(
			navigator.userAgent,
		) || window.innerWidth < 768
	);
};

function EyeballMesh({
	controlsRef,
}: {
	controlsRef: React.RefObject<OrbitControlsType>;
}) {
	const eyeGroupRef = useRef<THREE.Group>(null);
	const [mouseX, setMouseX] = useState(0);
	const [mouseY, setMouseY] = useState(0);
	const targetXRef = useRef(0);
	const targetYRef = useRef(0);
	const isUserInteractingRef = useRef(false);
	const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Idle animation state - initialize with mobile check to avoid race condition
	const [isMobile, setIsMobile] = useState(getIsMobile);
	const isIdleRef = useRef(getIsMobile());
	const afkTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const randomTargetRef = useRef({ x: 0, y: 0 });
	const nextTargetTimeRef = useRef(0);

	const dotTexture = useMemo(() => createDotTexture(256, 256), []);
	const grainTexture = useMemo(() => createGrainTexture(256, 256, 50), []);
	const purpleDotTexture = useMemo(() => createPurpleDotTexture(256, 256), []);

	const lastMouseUpdateRef = useRef(0);
	const mousePositionRef = useRef({ x: 0, y: 0 });

	// Handle resize events to update mobile state dynamically
	useEffect(() => {
		const handleResize = () => {
			const mobile = getIsMobile();
			setIsMobile(mobile);
			isIdleRef.current = mobile;
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			const now = performance.now();

			if (now - lastMouseUpdateRef.current >= MOUSE_THROTTLE_MS) {
				lastMouseUpdateRef.current = now;
				mousePositionRef.current.x = event.clientX;
				mousePositionRef.current.y = event.clientY;
				setMouseX(event.clientX);
				setMouseY(event.clientY);
			}

			if (!isMobile) {
				isIdleRef.current = false;

				if (afkTimeoutRef.current) {
					clearTimeout(afkTimeoutRef.current);
				}

				// Set AFK after 3 seconds of no movement
				afkTimeoutRef.current = setTimeout(() => {
					isIdleRef.current = true;
				}, 3000);
			}
		},
		[isMobile],
	);

	useEffect(() => {
		window.addEventListener("mousemove", handleMouseMove, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (afkTimeoutRef.current) clearTimeout(afkTimeoutRef.current);
		};
	}, [handleMouseMove]);

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const handleStart = () => {
			isUserInteractingRef.current = true;
			if (idleTimeoutRef.current) {
				clearTimeout(idleTimeoutRef.current);
				idleTimeoutRef.current = null;
			}
		};

		const handleEnd = () => {
			idleTimeoutRef.current = setTimeout(() => {
				isUserInteractingRef.current = false;
			}, 100);
		};

		controls.addEventListener("start", handleStart);
		controls.addEventListener("end", handleEnd);

		return () => {
			controls.removeEventListener("start", handleStart);
			controls.removeEventListener("end", handleEnd);
			if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
		};
	}, [controlsRef]);

	const windowDimensionsRef = useRef({ width: 0, height: 0 });

	useEffect(() => {
		const updateDimensions = () => {
			windowDimensionsRef.current.width = window.innerWidth;
			windowDimensionsRef.current.height = window.innerHeight;
		};
		updateDimensions();
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const tempVector = useMemo(() => new THREE.Vector3(), []);

	const defaultPolar = Math.PI / 2;
	const resetSpeed = 0.03;
	const maxRotation = 0.6;
	const stiffness = 0.4;
	const lerpFactor = 0.1;
	const idleLerpFactor = 0.05;

	useFrame((state) => {
		const controls = controlsRef.current;
		const eyeGroup = eyeGroupRef.current;
		const time = state.clock.getElapsedTime();

		// Smoothly reset camera to default position when not interacting
		if (controls && !isUserInteractingRef.current) {
			const currentAzimuth = controls.getAzimuthalAngle();
			const currentPolar = controls.getPolarAngle();

			const azimuthDiff = Math.abs(currentAzimuth);
			const polarDiff = Math.abs(defaultPolar - currentPolar);

			// Only reset if we're not already at default position
			if (azimuthDiff > 0.01 || polarDiff > 0.01) {
				const newAzimuth = THREE.MathUtils.lerp(currentAzimuth, 0, resetSpeed);
				const newPolar = THREE.MathUtils.lerp(
					currentPolar,
					defaultPolar,
					resetSpeed,
				);

				const radius = controls.getDistance();
				const sinPolar = Math.sin(newPolar);
				state.camera.position.set(
					radius * sinPolar * Math.sin(newAzimuth),
					radius * Math.cos(newPolar),
					radius * sinPolar * Math.cos(newAzimuth),
				);
				state.camera.lookAt(controls.target);
				controls.update();
			}
		}

		if (eyeGroup) {
			// Idle animation
			if (isIdleRef.current) {
				if (time > nextTargetTimeRef.current) {
					randomTargetRef.current.x = (Math.random() - 0.5) * 1.2;
					randomTargetRef.current.y = (Math.random() - 0.5) * 1.2;
					nextTargetTimeRef.current = time + Math.random() * 2 + 1;
				}

				targetXRef.current = THREE.MathUtils.lerp(
					targetXRef.current,
					randomTargetRef.current.x,
					idleLerpFactor,
				);
				targetYRef.current = THREE.MathUtils.lerp(
					targetYRef.current,
					randomTargetRef.current.y,
					idleLerpFactor,
				);
			} else {
				// Reuse tempVector instead of clone() to avoid allocation
				tempVector.copy(eyeGroup.position);
				tempVector.project(state.camera);

				const { width, height } = windowDimensionsRef.current;
				const eyeX = (tempVector.x * 0.5 + 0.9) * width;
				const eyeY = (-tempVector.y * 0.5 + 0.88) * height;

				const dx = mouseX - eyeX;
				const dy = mouseY - eyeY;
				const distance = Math.sqrt(dx * dx + dy * dy);
				const normalizedDistance = Math.min(distance * 0.001, 1); // Avoid division

				const rawX = (dx / width) * 2 * normalizedDistance;
				const rawY = (dy / height) * 2 * normalizedDistance;

				targetXRef.current = maxRotation * Math.tanh(rawX / stiffness);
				targetYRef.current = maxRotation * Math.tanh(rawY / stiffness);
			}

			// Apply rotation with lerp
			const currentRotX = eyeGroup.rotation.x;
			const currentRotY = eyeGroup.rotation.y;
			const deltaX = targetYRef.current - currentRotX;
			const deltaY = targetXRef.current - currentRotY;

			// Only update if there's meaningful change (skip micro-updates)
			if (Math.abs(deltaX) > 0.0001 || Math.abs(deltaY) > 0.0001) {
				eyeGroup.rotation.x = currentRotX + deltaX * lerpFactor;
				eyeGroup.rotation.y = currentRotY + deltaY * lerpFactor;
			}
		}
	});

	return (
		<group ref={eyeGroupRef}>
			<ambientLight intensity={2} />
			<directionalLight position={[5, 5, 5]} intensity={2.2} />
			<pointLight position={[-5, -5, 5]} intensity={0.4} />

			{/* Main eyeball - reduced segments from 64 to 48 (still smooth at this size) */}
			<mesh>
				<sphereGeometry args={[2, 48, 48]} />
				<meshStandardMaterial
					color="#ffffff"
					roughness={0.2}
					metalness={0.1}
					map={dotTexture}
				/>
			</mesh>

			<group position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
				{/* Iris outer - reduced segments */}
				<mesh>
					<sphereGeometry args={[2, 48, 48, 0, Math.PI * 2, 0, 0.36]} />
					<meshStandardMaterial
						color="#000000"
						roughness={0.5}
						metalness={0.5}
						side={THREE.FrontSide}
						roughnessMap={grainTexture}
					/>
				</mesh>

				{/* Iris inner - reduced segments */}
				<mesh>
					<sphereGeometry args={[2.01, 48, 48, 0, Math.PI * 2, 0, 0.3]} />
					<meshStandardMaterial
						color="#ffffff"
						map={purpleDotTexture}
						bumpMap={purpleDotTexture}
						bumpScale={0.5}
						roughness={0.6}
						metalness={0.2}
						side={THREE.FrontSide}
					/>
				</mesh>

				{/* Pupil - smaller detail, fewer segments needed */}
				<mesh>
					<sphereGeometry args={[2.01, 32, 32, 0, Math.PI * 2, 0, 0.15]} />
					<meshStandardMaterial
						color="#000000"
						roughness={0.1}
						metalness={0.6}
						side={THREE.FrontSide}
					/>
				</mesh>

				{/* Highlight - smallest detail, minimal segments */}
				<mesh position={[0.1, 0, -0.1]}>
					<sphereGeometry args={[2.02, 24, 24, 0, Math.PI * 2, 0, 0.03]} />
					<meshStandardMaterial
						color="#ffffff"
						roughness={0.1}
						metalness={0.6}
						side={THREE.FrontSide}
					/>
				</mesh>
			</group>

			{/* Gloss layer - reduced segments */}
			<mesh>
				<sphereGeometry args={[2.05, 48, 48]} />
				<meshPhysicalMaterial
					transparent
					opacity={0.12}
					roughness={0.05}
					metalness={0.1}
					clearcoat={1}
					clearcoatRoughness={0.05}
				/>
			</mesh>
		</group>
	);
}

export default function Eyeball3D() {
	const controlsRef = useRef(null);

	return (
		<div className="w-[338px] h-[338px]">
			<Canvas
				camera={{ position: [0, 0, 8], fov: 45 }}
				gl={{
					antialias: true,
					alpha: true,
					powerPreference: "high-performance",
					stencil: false,
					depth: true,
				}}
				dpr={[1, 2]} // Cap pixel ratio for performance on high-DPI displays
			>
				<EyeballMesh
					controlsRef={controlsRef as React.RefObject<OrbitControlsType>}
				/>
				<OrbitControls
					ref={controlsRef}
					enableZoom={false}
					enablePan={false}
					enableRotate={true}
					enableDamping={true}
					dampingFactor={0.05}
				/>
			</Canvas>
		</div>
	);
}
