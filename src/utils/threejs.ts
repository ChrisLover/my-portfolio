import * as THREE from 'three'
import type { Demo } from '@/data/demos'

export class ThreeJSManager {
  private scene: THREE.Scene | null = null
  private camera: THREE.PerspectiveCamera | null = null
  private renderer: THREE.WebGLRenderer | null = null
  private animationId: number | null = null
  private isPaused = false

  constructor(private canvas: HTMLCanvasElement) {
    // 构造函数体为空
  }

  init(demo: Demo) {
    this.cleanup()
    
    const rect = this.canvas.parentElement!.getBoundingClientRect()
    
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
    
    this.renderer.setSize(rect.width, rect.height)
    this.renderer.setClearColor(0x000011)

    this.setupScene(demo)
    this.animate()
  }

  private setupScene(demo: Demo) {
    if (!this.scene || !this.camera || !this.renderer) return

    switch (demo.id) {
      case 1:
        this.setupRotatingCube()
        break
      case 2:
        this.setupParticleSystem()
        break
      case 3:
        this.setupInteractiveSphere()
        break
      case 4:
        this.setupMorphingGeometry()
        break
      case 5:
        this.setupLightingDemo()
        break
      case 6:
        this.setup3DText()
        break
    }
  }

  private setupRotatingCube() {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshBasicMaterial({ color: 0x3498db })
    const cube = new THREE.Mesh(geometry, material)
    this.scene!.add(cube)
    this.camera!.position.z = 5
    ;(this.scene as any).userData.cube = cube
  }

  private setupParticleSystem() {
    const particlesCount = 1000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10

      colors[i] = Math.random()
      colors[i + 1] = Math.random()
      colors[i + 2] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true
    })

    const particles = new THREE.Points(geometry, material)
    this.scene!.add(particles)
    this.camera!.position.z = 8
    ;(this.scene as any).userData.particles = particles
  }

  private setupInteractiveSphere() {
    const geometry = new THREE.SphereGeometry(2, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0x2ecc71, wireframe: true })
    const sphere = new THREE.Mesh(geometry, material)
    this.scene!.add(sphere)
    this.camera!.position.z = 6
    ;(this.scene as any).userData.sphere = sphere
  }

  private setupMorphingGeometry() {
    const geometry = new THREE.PlaneGeometry(4, 4, 32, 32)
    const material = new THREE.MeshBasicMaterial({ color: 0x9b59b6, wireframe: true })
    const plane = new THREE.Mesh(geometry, material)
    this.scene!.add(plane)
    this.camera!.position.z = 6
    ;(this.scene as any).userData.plane = plane
    ;(this.scene as any).userData.time = 0
  }

  private setupLightingDemo() {
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({ color: 0xf39c12 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene!.add(cube)

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4)
    this.scene!.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    this.scene!.add(directionalLight)

    this.camera!.position.z = 6
    ;(this.scene as any).userData.cube = cube
  }

  private setup3DText() {
    const group = new THREE.Group()
    
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(0.5, 1, 0.2)
      const material = new THREE.MeshBasicMaterial({ color: 0x1abc9c })
      const letter = new THREE.Mesh(geometry, material)
      letter.position.x = (i - 2) * 1
      group.add(letter)
    }
    
    this.scene!.add(group)
    this.camera!.position.z = 8
    ;(this.scene as any).userData.textGroup = group
  }

  private animate = () => {
    if (!this.scene || !this.renderer || !this.camera || this.isPaused) {
      if (!this.isPaused) {
        this.animationId = requestAnimationFrame(this.animate)
      }
      return
    }

    const userData = this.scene.userData

    if (userData.cube) {
      userData.cube.rotation.x += 0.01
      userData.cube.rotation.y += 0.01
    }

    if (userData.particles) {
      userData.particles.rotation.y += 0.005
    }

    if (userData.sphere) {
      userData.sphere.rotation.x += 0.005
      userData.sphere.rotation.y += 0.01
    }

    if (userData.plane) {
      userData.time += 0.05
      const positions = userData.plane.geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const y = positions.getY(i)
        const z = Math.sin(x * 2 + userData.time) * Math.cos(y * 2 + userData.time) * 0.2
        positions.setZ(i, z)
      }
      positions.needsUpdate = true
    }

    if (userData.textGroup) {
      userData.textGroup.children.forEach((child: THREE.Object3D, index: number) => {
        child.position.y = Math.sin(Date.now() * 0.002 + index * 0.5) * 0.5
        child.rotation.y += 0.02
      })
    }

    this.renderer.render(this.scene, this.camera)
    this.animationId = requestAnimationFrame(this.animate)
  }

  pause() {
    this.isPaused = true
  }

  resume() {
    this.isPaused = false
    this.animate()
  }

  restart(demo: Demo) {
    this.init(demo)
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = null
    }
    
    if (this.renderer) {
      this.renderer.dispose()
      this.renderer = null
    }
    
    this.scene = null
    this.camera = null
    this.isPaused = false
  }
}