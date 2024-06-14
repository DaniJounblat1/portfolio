// Include Three.js library
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

// Generate random positions within a sphere
function randomInSphere(numPoints, radius) {
    const positions = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = Math.PI * 2 * Math.random();
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        positions.set([x, y, z], i * 3);
    }
    return positions;
}

// Generate random colors
function generateColors(numPoints) {
    const colors = new Float32Array(numPoints * 3);
    for (let i = 0; i < numPoints; i++) {
        colors.set([Math.random(), Math.random(), Math.random()], i * 3);
    }
    return colors;
}

// Initialize the star background
export function initStarBackground() {
    const canvasContainer = document.querySelector('.stars-canvas');
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainer.appendChild(renderer.domElement);

    const numStars = 1000;
    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(randomInSphere(numStars, 1.2), 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(generateColors(numStars), 3));

    const starsMaterial = new THREE.PointsMaterial({ size: 0.003, vertexColors: true });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    function animate() {
        requestAnimationFrame(animate);
        stars.rotation.x -= 0.001;
        stars.rotation.y -= 0.0015;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

document.addEventListener('DOMContentLoaded', initStarBackground);
