
scrub: true
}
});

gsap.to(orb.scale, {
x: 1.8,
y: 1.8,
z: 1.8,
duration: 3,
scrollTrigger: {
trigger: "#pipeline",
start: "top bottom",
end: "center center",
scrub: true
}
});


/* ----------------------------- OPENING MOTION ---------------------------- */
gsap.from(camera.position, {
z: 200,
duration: 3,
ease: "power4.out"
});

gsap.from(galaxy.rotation, {
y: -1.5,
x: 0.5,
duration: 4,
ease: "power2.out"
});


/* ---------------------------- ANIMATION LOOP ----------------------------- */
function animate() {
requestAnimationFrame(animate);

galaxy.rotation.y += 0.0005;
galaxy.rotation.x += 0.0002;

orb.rotation.y += 0.005;

renderer.render(scene, camera);
}

animate();


/* ------------------------------ RESIZE FIX ------------------------------- */
window.addEventListener("resize", () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
});
