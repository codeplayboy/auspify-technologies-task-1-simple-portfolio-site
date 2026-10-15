import React, { useEffect, useRef } from 'react'

export default function CharacterScene() {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined
    let cancelled = false; let frame = 0; let cleanup = () => {}
    const boot = async () => {
      try {
        const T = await import('three')
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
        if (cancelled) return
        const scene = new T.Scene()
        const camera = new T.PerspectiveCamera(25, 1, .01, 100)
        camera.position.set(0, 1.62, 7.25); camera.lookAt(0, 1.58, 0)
        const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5)); renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.12; renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap; mount.appendChild(renderer.domElement)
        scene.add(new T.HemisphereLight('#fff4df', '#131c38', 2.6))
        const key = new T.DirectionalLight('#fff0d2', 4.6); key.position.set(-3, 6, 5); key.castShadow = true; key.shadow.mapSize.set(2048, 2048); key.shadow.camera.near = .1; key.shadow.camera.far = 20; key.shadow.bias = -.0001; key.shadow.normalBias = .025; scene.add(key)
        const fill = new T.DirectionalLight('#b9cfff', 1.55); fill.position.set(3, 3, 2); scene.add(fill)
        const warm = new T.PointLight('#ffc891', 1.35, 6); warm.position.set(-2, 1.2, 1.5); scene.add(warm)
        const rim = new T.PointLight('#2857ff', 4.4, 7); rim.position.set(2.2, 2.4, 2.8); scene.add(rim)
        const ground = new T.Mesh(new T.CircleGeometry(1.7, 64), new T.ShadowMaterial({ opacity: .34 })); ground.rotation.x = -Math.PI / 2; ground.scale.set(1.25, .58, 1); ground.position.y = .015; ground.receiveShadow = true; scene.add(ground)
        const loader = new GLTFLoader(); let model = null; let actor = null; let mixer = null
        loader.load(`${import.meta.env.BASE_URL}models/arun-reader.glb`, gltf => {
          if (cancelled) return
          model = gltf.scene
          const box = new T.Box3().setFromObject(model); const size = box.getSize(new T.Vector3()); const center = box.getCenter(new T.Vector3()); const factor = 3.2 / Math.max(size.y, .001)
          actor = new T.Group(); actor.position.set(.03, .02, .12); actor.rotation.z = -.16
          model.scale.setScalar(factor); model.position.set(-center.x * factor, -box.min.y * factor + .018, -center.z * factor)
          model.traverse(node => { if (!node.isMesh) return; node.castShadow = true; node.receiveShadow = true; const materials = Array.isArray(node.material) ? node.material : [node.material]; materials.forEach(material => { if (!material) return; if ('envMapIntensity' in material) material.envMapIntensity = 1.35; if ('roughness' in material && material.roughness > .9) material.roughness = .82; material.needsUpdate = true }) })
          actor.add(model); scene.add(actor); if (gltf.animations?.length) mixer = new T.AnimationMixer(model)
        }, undefined, error => { console.warn('GLB preview unavailable; using the editorial reference.', error); mount.classList.add('character-scene-fallback') })
        const pointer = { x: 0, y: 0 }; const target = { x: 0, y: 0 }
        const onPointerMove = event => { const bounds = mount.getBoundingClientRect(); target.x = ((event.clientX - bounds.left) / bounds.width - .5) * .22; target.y = ((event.clientY - bounds.top) / bounds.height - .5) * .12 }
        const onPointerLeave = () => { target.x = 0; target.y = 0 }
        const resize = () => { const width = mount.clientWidth || 1; const height = mount.clientHeight || 1; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height, false) }
        mount.addEventListener('pointermove', onPointerMove); mount.addEventListener('pointerleave', onPointerLeave); window.addEventListener('resize', resize); resize()
        const clock = new T.Clock(); const animate = () => { const delta = clock.getDelta(); pointer.x += (target.x - pointer.x) * .06; pointer.y += (target.y - pointer.y) * .06; if (actor) { actor.rotation.y = pointer.x; actor.rotation.x = pointer.y * .35; actor.position.y = .02 } mixer?.update(delta); renderer.render(scene, camera); frame = requestAnimationFrame(animate) }; animate()
        cleanup = () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); mount.removeEventListener('pointermove', onPointerMove); mount.removeEventListener('pointerleave', onPointerLeave); renderer.dispose(); scene.traverse(node => { if (!node.isMesh) return; node.geometry?.dispose(); if (Array.isArray(node.material)) node.material.forEach(material => material.dispose()); else node.material?.dispose() }); if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement) }
      } catch (error) { console.warn('GLB preview unavailable; using the editorial reference fallback.', error); mount.classList.add('character-scene-fallback') }
    }
    boot(); return () => { cancelled = true; cleanup() }
  }, [])
  return <div className="character-scene" ref={mountRef} aria-label="Interactive high-quality GLB figure leaning against a street pole and reading a newspaper" role="img" />
}
