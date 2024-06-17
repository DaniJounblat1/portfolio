import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js";

// Vertex shader
const vertexShader = `
    attribute float size;
    varying vec3 vColor;

    void main() {
        vColor = color;

        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
    }
`;

// Fragment shader
const fragmentShader = `
    uniform sampler2D pointTexture;
    varying vec3 vColor;

    void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float dist = sqrt(dot(uv, uv));

        if (dist > 0.5) discard;

        vec4 pointColor = texture2D(pointTexture, gl_PointCoord);
        gl_FragColor = vec4(vColor, 1.0) * pointColor;
    }
`;

// JavaScript code here
// Set up Three.js scene
let scene, camera, renderer;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById("starsCanvas"),
        antialias: true,
        alpha: true // Enable transparency
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Set background to transparent

    const numStars = 5000;
    const positions = new Float32Array(numStars * 3);
    const colors = new Float32Array(numStars * 3);
    const sizes = new Float32Array(numStars);

    // Function to generate star colors close to white
    function generateStarColor() {
        const baseColor = 0.8 + Math.random() * 0.2; // Base color value between 0.8 and 1.0
        return [
            baseColor + Math.random() * 0.1, // Slight variation around the base color
            baseColor + Math.random() * 0.1,
            baseColor + Math.random() * 0.1
        ];
    }

    // Generate random positions, colors, and sizes for stars
    for (let i = 0; i < numStars; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2; // x
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2; // y
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2; // z

        const color = generateStarColor();
        colors[i * 3] = color[0]; // r
        colors[i * 3 + 1] = color[1]; // g
        colors[i * 3 + 2] = color[2]; // b

        sizes[i] = Math.random() * 0.011; // size
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const textureLoader = new THREE.TextureLoader();
    const spriteTexture = textureLoader.load(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/sprites/spark1.png"
    ); // Use a circular texture
    const material = new THREE.ShaderMaterial({
        uniforms: {
            pointTexture: { value: spriteTexture }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        blending: THREE.AdditiveBlending,
        depthTest: true,
        transparent: true,
        vertexColors: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate stars slightly (optional)
        points.rotation.x += 0.0005;
        points.rotation.y += 0.001;

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize Three.js
init();

// Resize handling
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
// button//
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("backgroundAudio");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playPauseIcon = document.getElementById("playPauseIcon");
    let isPlaying = true;

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
            playPauseIcon.classList.remove("fa-pause");
            playPauseIcon.classList.add("fa-play");
        } else {
            audio.play();
            playPauseIcon.classList.remove("fa-play");
            playPauseIcon.classList.add("fa-pause");
        }
        isPlaying = !isPlaying;
    };

    playPauseBtn.addEventListener("click", handlePlayPause);

    // Autoplay handling
    const playPromise = audio.play();
    if (playPromise !== undefined) {
        playPromise
            .then(_ => {
                // Autoplay started
            })
            .catch(error => {
                // Autoplay was prevented, let's start the audio when the user interacts with the page
                document.addEventListener("click", startAudio);
            });
    }

    const startAudio = () => {
        audio.play();
        document.removeEventListener("click", startAudio);
    };
});
