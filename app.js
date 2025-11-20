// THREE.JS — create scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
2000
);

const renderer = new THREE.WebGLRenderer({
canvas: document.querySelector("#bg"),
antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 50;

// PARTICLES
const starGeometry = new THREE.BufferGeometry();
const starCount = 2500;

const starPositions = new Float32Array(starCount * 3);
for (let i = 0; i < starCount * 3; i++) {
starPositions[i] = (Math.random() - 0.5) * 2000;
}

starGeometry.setAttribute(
"position",
new THREE.BufferAttribute(starPositions, 3)
);

const starMaterial = new THREE.PointsMaterial({
color: 0x8a2be2, // סגול-ניאון
size: 1.5,
transparent: true,
blending: THREE.AdditiveBlending,
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// LIGHT GLOW
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
const point = new THREE.PointLight(0x00eaff, 2, 300);
point.position.set(0, 0, 50);

scene.add(ambient, point);

// MOUSE MOVEMENT PARALLAX
document.addEventListener("mousemove", (e) => {
const x = (e.clientX / window.innerWidth - 0.5) * 2;
const y = (e.clientY / window.innerHeight - 0.5) * 2;
gsap.to(camera.position, {
x: x * 10,
y: -y * 10,
duration: 1.2,
ease: "power3.out",
});
});

// SCROLL ANIMATION
gsap.registerPlugin(ScrollTrigger);

gsap.to(camera.position, {
z: 150,
scrollTrigger: {
trigger: ".content",
start: "top bottom",
end: "top top",
scrub: 1,
},
});

gsap.from(".content h2", {
opacity: 0,
y: 100,
scrollTrigger: {
trigger: ".content",
start: "top 80%",
scrub: true,
},
});

gsap.from(".alt h2", {
opacity: 0,
y: 150,
scrollTrigger: {
trigger: ".alt",
start: "top 85%",
scrub: true,
},
});

// ANIMATE LOOP
function animate() {
requestAnimationFrame(animate);

stars.rotation.y += 0.0007;
stars.rotation.x += 0.0003;

renderer.render(scene, camera);
}
animate();
