import * as THREE from 'three';
import GLTFLoader from './GLTFLoader';
import guard from '../../assets/models/gltf/guard/guard.gltf';
import GameService from '../services/GameService';

export default class Game {
	constructor(token) {
		this.init();
		// GameService.connect(token);
		this.gameLoop();
	}

	init() {
		this.clock = new THREE.Clock();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.scene = new THREE.Scene();
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
		this.renderer.setPixelRatio(window.devicePixelRatio || 1);
		this.renderer.setSize(this.width, this.height);
		this.renderer.shadowMap.enabled = true;
		const body = document.body;
		body.innerHTML = '';
		body.appendChild(this.renderer.domElement);
		this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 1000);
		this.light = new THREE.AmbientLight(0xffffff, 1);
		this.scene.add(this.light);
		window.addEventListener('resize', () => this.resize(), false);
		this.camera.position.z = 5;

		const loader = new GLTFLoader();
		loader.parse(guard, '', (gltf) => {
			this.scene.add(gltf.scene);
			this.mixer = new THREE.AnimationMixer(gltf.scene);
			this.mixer.clipAction(gltf.animations[0]).play();
		});
	}

	gameLoop() {
		requestAnimationFrame(this.gameLoop.bind(this));
		const delta = this.clock.getDelta();
		if (this.mixer != null) {
			this.mixer.update(delta);
		}
		this.renderer.render(this.scene, this.camera);
	}

	resize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(this.width, this.height);
	}
}
