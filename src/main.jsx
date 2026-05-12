import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowDown, Mail, Menu, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import './styles.css';

const projects = [
  {
    title: 'SMRTscan',
    type: 'AI Field Intelligence',
    color: '#09b9ff',
    text: 'Capture inspections, assets, documents, and evidence in one operational command layer.',
  },
  {
    title: 'SMRTchat',
    type: 'AI Conversation Layer',
    color: '#7c6cff',
    text: 'A guided assistant experience for teams, customers, workflows, and internal knowledge.',
  },
  {
    title: 'SMRTsecure',
    type: 'Security Readiness Engine',
    color: '#42e684',
    text: 'Release decisions, risk evidence, and security posture without slowing the team down.',
  },
  {
    title: 'City Lights Property Management',
    type: 'Property Operations System',
    color: '#ffbe4a',
    text: 'Portfolio workflows, maintenance visibility, and tenant communication with less friction.',
  },
  {
    title: 'Letter Legacy',
    type: 'Memory Preservation Product',
    color: '#ff6f9f',
    text: 'A warm digital archive for stories, letters, moments, and family history that lasts.',
  },
  {
    title: 'A.I. Integration',
    type: 'Automation Architecture',
    color: '#5de0cb',
    text: 'Practical AI systems wired into the tools, data, and decisions businesses already use.',
  },
];

const featuredItem = {
  name: 'The Lab',
  title: 'Swappable Centerpiece',
  text: 'This slot is built as a single data object so a campaign, product, case study, or seasonal artifact can rise into the scene without rebuilding the page.',
};

function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function makeParticleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.35, 'rgba(128,235,255,0.75)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

function makeFrostTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(256, 256);
  for (let i = 0; i < image.data.length; i += 4) {
    const grain = 150 + Math.random() * 74;
    image.data[i] = grain;
    image.data[i + 1] = grain + Math.random() * 12;
    image.data[i + 2] = grain + Math.random() * 20;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);
  ctx.globalAlpha = 0.18;
  for (let i = 0; i < 80; i += 1) {
    ctx.strokeStyle = `rgba(255,255,255,${0.05 + Math.random() * 0.09})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(Math.random() * 256, Math.random() * 256);
    ctx.lineTo(Math.random() * 256, Math.random() * 256);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.4, 2.4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createParticleMaterial(texture, opacity = 0.7, size = 52) {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      progress: { value: 0 },
      pointTexture: { value: texture },
      opacity: { value: opacity },
      size: { value: size },
    },
    vertexShader: `
      attribute vec3 particleColor;
      attribute float seed;
      varying vec3 vColor;
      varying float vSeed;
      uniform float time;
      uniform float progress;
      uniform float size;

      void main() {
        vColor = particleColor;
        vSeed = seed;
        vec3 pos = position;
        float pulse = sin(time * (0.7 + seed * 1.4) + seed * 17.0 + progress * 8.0);
        pos.x += sin(time * 0.18 + seed * 22.0) * 0.12;
        pos.y += pulse * 0.06;
        pos.z += cos(time * 0.2 + seed * 13.0) * 0.12;
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = size * (1.0 + pulse * 0.28) / max(1.0, -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      uniform sampler2D pointTexture;
      uniform float opacity;
      varying vec3 vColor;
      varying float vSeed;

      void main() {
        vec4 sprite = texture2D(pointTexture, gl_PointCoord);
        float edge = smoothstep(0.0, 0.9, sprite.a);
        vec3 hot = mix(vColor, vec3(1.0), 0.28 + vSeed * 0.18);
        gl_FragColor = vec4(hot, sprite.a * opacity * edge);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createIridescentMaterial(base = '#bffcff', accent = '#ec4899', opacity = 0.7) {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(base) },
      accentColor: { value: new THREE.Color(accent) },
      opacity: { value: opacity },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;
      uniform float time;

      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vec3 pos = position + normal * sin(time * 1.4 + position.y * 4.0 + position.x * 2.0) * 0.018;
        vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;
      uniform vec3 baseColor;
      uniform vec3 accentColor;
      uniform float opacity;
      uniform float time;

      void main() {
        vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - max(0.0, dot(viewDirection, normalize(vNormal))), 2.4);
        float ripple = sin((vUv.x + vUv.y) * 18.0 + time * 1.8) * 0.5 + 0.5;
        vec3 color = mix(baseColor, accentColor, fresnel * 0.75 + ripple * 0.16);
        gl_FragColor = vec4(color + fresnel * 0.42, opacity * (0.42 + fresnel * 0.58));
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

function createCardTexture(project) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(6, 15, 29, 0.98)';
  ctx.roundRect(18, 18, 988, 540, 34);
  ctx.fill();

  const gradient = ctx.createLinearGradient(0, 0, 1024, 576);
  gradient.addColorStop(0, project.color);
  gradient.addColorStop(0.52, '#152640');
  gradient.addColorStop(1, '#263449');
  ctx.globalAlpha = 0.82;
  ctx.fillStyle = gradient;
  ctx.roundRect(18, 18, 988, 540, 34);
  ctx.fill();
  ctx.globalAlpha = 1;

  const bloom = ctx.createRadialGradient(260, 130, 10, 280, 150, 340);
  bloom.addColorStop(0, 'rgba(255,255,255,0.75)');
  bloom.addColorStop(0.28, 'rgba(255,255,255,0.18)');
  bloom.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = bloom;
  ctx.fillRect(0, 0, 1024, 576);

  ctx.strokeStyle = 'rgba(230, 255, 255, 0.55)';
  ctx.lineWidth = 4;
  ctx.roundRect(18, 18, 988, 540, 34);
  ctx.stroke();

  ctx.fillStyle = 'rgba(245,255,255,0.7)';
  ctx.font = '700 34px Space Grotesk, sans-serif';
  ctx.fillText(project.type.toUpperCase(), 70, 112);
  ctx.fillStyle = 'rgba(247,255,255,0.94)';
  ctx.font = '800 96px Archivo, sans-serif';
  const words = project.title.toUpperCase().split(' ');
  let line = '';
  let y = 246;
  for (const word of words) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > 830 && line) {
      ctx.fillText(line.trim(), 70, y);
      line = `${word} `;
      y += 92;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 70, y);

  ctx.fillStyle = 'rgba(235,255,255,0.68)';
  ctx.font = '500 32px Space Grotesk, sans-serif';
  const text = project.text.split(' ');
  line = '';
  y += 70;
  for (const word of text) {
    const test = `${line}${word} `;
    if (ctx.measureText(test).width > 760 && line) {
      ctx.fillText(line.trim(), 70, y);
      line = `${word} `;
      y += 42;
    } else {
      line = test;
    }
  }
  ctx.fillText(line.trim(), 70, y);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function createProjectCards() {
  const group = new THREE.Group();
  const textures = [];
  projects.forEach((project, index) => {
    const texture = createCardTexture(project);
    textures.push(texture);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(3.9, 2.2, 18, 10),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    mesh.userData.index = index;
    group.add(mesh);
  });
  group.userData.textures = textures;
  return group;
}

function createWaterVeil() {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(18, 12, 90, 50),
    new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float progress;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 1.8 + time * 0.7) * 0.08;
          pos.z += sin(pos.y * 2.4 + time * 0.55 + progress * 5.0) * 0.06;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float time;
        uniform float progress;
        float lines(vec2 uv) {
          float a = sin((uv.y + sin(uv.x * 8.0 + time * 0.22) * 0.02) * 64.0 + time * 1.4);
          return smoothstep(0.88, 1.0, a);
        }
        void main() {
          float band = smoothstep(0.12, 0.52, progress) * (1.0 - smoothstep(0.86, 1.0, progress));
          float shimmer = lines(vUv) * 0.22 + smoothstep(0.46, 0.52, vUv.y) * 0.16;
          vec3 color = mix(vec3(0.02, 0.8, 0.88), vec3(1.0, 0.44, 0.78), vUv.x * 0.35 + progress * 0.3);
          gl_FragColor = vec4(color, band * shimmer);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
}

function createAbyssFloor() {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(26, 16, 120, 72),
    new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        progress: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vWave;
        uniform float time;
        uniform float progress;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float w1 = sin(pos.x * 0.9 + time * 0.42 + progress * 3.0);
          float w2 = sin(pos.y * 1.6 - time * 0.35);
          vWave = w1 * 0.5 + w2 * 0.5;
          pos.z += vWave * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vWave;
        uniform float time;
        uniform float progress;
        void main() {
          float horizon = smoothstep(0.18, 0.92, vUv.y);
          float line = smoothstep(0.92, 1.0, sin((vUv.x + vWave * 0.025) * 80.0 + time * 0.7));
          vec3 base = mix(vec3(0.01, 0.025, 0.05), vec3(0.02, 0.25, 0.28), horizon);
          vec3 sheen = vec3(0.55, 0.96, 1.0) * line * 0.12;
          float alpha = (0.16 + horizon * 0.18 + line * 0.08) * (0.6 + progress * 0.35);
          gl_FragColor = vec4(base + sheen, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
}

function createMotherBoxArtifact() {
  const group = new THREE.Group();
  const n = 6;
  const count = n * n * n;
  const size = 0.18;
  const gap = 0.29;
  const center = (n - 1) / 2;
  const homes = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const anchors = new Set();
  const dummy = new THREE.Object3D();
  const frostTexture = makeFrostTexture();

  const cubeMaterial = new THREE.MeshStandardMaterial({
    color: '#91bdc8',
    emissive: '#12c8dc',
    emissiveIntensity: 0.08,
    metalness: 0.28,
    roughness: 0.64,
    transparent: true,
    opacity: 0.88,
    bumpMap: frostTexture,
    bumpScale: 0.055,
    roughnessMap: frostTexture,
  });
  const wireMaterial = new THREE.MeshBasicMaterial({
    color: '#e9ffff',
    transparent: true,
    opacity: 0.1,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    wireframe: true,
  });

  const cubeGeometry = new RoundedBoxGeometry(size, size, size, 3, size * 0.2);
  const wireGeometry = new RoundedBoxGeometry(size * 1.06, size * 1.06, size * 1.06, 2, size * 0.18);
  const cubeMesh = new THREE.InstancedMesh(cubeGeometry, cubeMaterial, count);
  const wireMesh = new THREE.InstancedMesh(wireGeometry, wireMaterial, count);
  cubeMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  wireMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  let index = 0;
  for (let x = 0; x < n; x += 1) {
    for (let y = 0; y < n; y += 1) {
      for (let z = 0; z < n; z += 1) {
        homes[index * 3] = (x - center) * gap;
        homes[index * 3 + 1] = (y - center) * gap;
        homes[index * 3 + 2] = (z - center) * gap;
        phases[index] = Math.random() * Math.PI * 2;
        index += 1;
      }
    }
  }

  const outer = center * gap;
  const anchorTargets = [
    [outer, 0, 0],
    [-outer, 0, 0],
    [0, outer, 0],
    [0, -outer, 0],
    [0, 0, outer],
    [0, 0, -outer],
  ];
  anchorTargets.forEach((target) => {
    let best = 0;
    let bestDistance = Infinity;
    for (let i = 0; i < count; i += 1) {
      const dx = homes[i * 3] - target[0];
      const dy = homes[i * 3 + 1] - target[1];
      const dz = homes[i * 3 + 2] - target[2];
      const distance = dx * dx + dy * dy + dz * dz;
      if (distance < bestDistance) {
        bestDistance = distance;
        best = i;
      }
    }
    anchors.add(best);
  });

  for (let i = 0; i < count; i += 1) {
    const px = homes[i * 3] / outer;
    const py = homes[i * 3 + 1] / outer;
    const pz = homes[i * 3 + 2] / outer;
    const faceLight = Math.max(px * 0.18, py * 0.14, pz * 0.12, 0);
    const shade = anchors.has(i) ? 0.62 : 0.34 + faceLight;
    cubeMesh.setColorAt(i, new THREE.Color().setHSL(0.52 + py * 0.035, 0.42, shade));
  }

  const solidMaterial = new THREE.MeshStandardMaterial({
    color: '#9fd5df',
    emissive: '#22d8ec',
    emissiveIntensity: 0.06,
    metalness: 0.2,
    roughness: 0.48,
    transparent: true,
    opacity: 0,
    bumpMap: frostTexture,
    bumpScale: 0.035,
    roughnessMap: frostTexture,
  });
  const solidCube = new THREE.Mesh(
    new THREE.BoxGeometry(gap * n, gap * n, gap * n),
    solidMaterial,
  );
  solidCube.renderOrder = 20;

  group.add(solidCube, cubeMesh, wireMesh);
  group.visible = false;
  group.userData = { homes, phases, anchors, dummy, cubeMesh, wireMesh, solidCube, frostTexture, count, fillScale: gap / size };
  return group;
}

function updateMicroCubeArtifact(group, options) {
  const {
    time,
    appear,
    scatter,
    twist,
    scale,
    position,
    rotationX = 0,
    rotationY = 0,
    glow = 1,
    burst = 1,
    glassOpacity = 0.88,
    wireOpacityScale = 1,
  } = options;

  group.position.copy(position);
  group.rotation.y = rotationY;
  group.rotation.x = rotationX;
  group.scale.setScalar(scale * appear);

  const { homes, phases, anchors, dummy, cubeMesh, wireMesh, solidCube, count, fillScale } = group.userData;
  const scatterPowerBase = scatter < 0.001 ? 0 : scatter * burst;
  const solidAmount = Math.max(0, 1 - Math.min(1, scatterPowerBase / 0.34));
  const solidEase = solidAmount * solidAmount * (3 - solidAmount * 2);
  for (let i = 0; i < count; i += 1) {
    const hx = homes[i * 3];
    const hy = homes[i * 3 + 1];
    const hz = homes[i * 3 + 2];
    const phase = phases[i];
    const distance = Math.sqrt(hx * hx + hy * hy + hz * hz) || 0.001;
    const nx = hx / distance;
    const ny = hy / distance;
    const nz = hz / distance;
    const angle = twist * (0.25 + (phase % 1) * 0.55);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const rx = hx * cos - hz * sin;
    const rz = hx * sin + hz * cos;
    const anchorPull = anchors.has(i) ? 0.32 : 1;
    const scatterPower = scatterPowerBase;
    const settle = 1 - Math.min(1, scatterPower);
    const hover = Math.sin(time * 1.55 + phase) * scatterPower * 0.12;
    const wander = solidEase > 0.98 ? 0 : 0.018 * (1 - solidEase) + scatterPower * 0.13;
    const tx = solidEase > 0.98 ? hx : rx * (1 - scatter * 0.16);
    const ty = hy * (1 - scatter * 0.12);
    const tz = solidEase > 0.98 ? hz : rz * (1 - scatter * 0.16);

    dummy.position.set(
      tx + nx * scatterPower * anchorPull * 1.38 + Math.sin(time * 0.9 + phase) * wander,
      ty + ny * scatterPower * anchorPull * 1.38 + hover + Math.cos(time * 0.82 + phase * 1.3) * wander,
      tz + nz * scatterPower * anchorPull * 1.38 + Math.sin(time * 0.74 + phase * 2.1) * wander,
    );
    if (solidEase > 0.98) {
      dummy.rotation.set(0, 0, 0);
    } else {
      const rotationFade = 1 - solidEase;
      dummy.rotation.set(
        (time * 0.18 + phase * 0.18) * rotationFade,
        (time * 0.24 + phase * 0.24) * rotationFade,
        (time * 0.16 + phase * 0.2) * rotationFade,
      );
    }
    const breathe = solidEase > 0.98 ? 1 : 1 + Math.sin(time * 1.7 + phase) * (0.035 + scatter * 0.045) + settle * 0.035;
    const assembleScale = 1 + (fillScale - 1) * solidEase;
    dummy.scale.setScalar((anchors.has(i) && scatterPower > 0 ? 1.2 * breathe : breathe) * assembleScale);
    dummy.updateMatrix();
    cubeMesh.setMatrixAt(i, dummy.matrix);
    wireMesh.setMatrixAt(i, dummy.matrix);
  }

  cubeMesh.instanceMatrix.needsUpdate = true;
  wireMesh.instanceMatrix.needsUpdate = true;
  cubeMesh.material.emissiveIntensity = 0.035 + glow * 0.18;
  cubeMesh.material.opacity = glassOpacity * (0.2 + (1 - solidEase) * 0.8);
  wireMesh.material.opacity = (0.025 + glow * 0.075) * wireOpacityScale * (1 - solidEase * 0.92);
  solidCube.material.opacity = glassOpacity * solidEase;
  solidCube.material.emissiveIntensity = 0.035 + glow * 0.12;
  solidCube.visible = solidEase > 0.01;
}

function createNeuralBrain() {
  const group = new THREE.Group();
  const brainTextureCanvas = document.createElement('canvas');
  brainTextureCanvas.width = 1024;
  brainTextureCanvas.height = 512;
  const brainTextureContext = brainTextureCanvas.getContext('2d');
  const brainTexture = new THREE.CanvasTexture(brainTextureCanvas);
  brainTexture.colorSpace = THREE.SRGBColorSpace;
  const brainImage = new Image();
  brainImage.onload = () => {
    brainTextureContext.clearRect(0, 0, brainTextureCanvas.width, brainTextureCanvas.height);
    brainTextureContext.drawImage(brainImage, 0, 0, brainTextureCanvas.width, brainTextureCanvas.height);
    const imageData = brainTextureContext.getImageData(0, 0, brainTextureCanvas.width, brainTextureCanvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const luminance = Math.max(r, g, b);
      const cyan = Math.max(0, g - r * 0.25);
      const alpha = Math.max(0, Math.min(220, (luminance - 62) * 2.2 + Math.max(0, cyan - 34) * 1.2));
      imageData.data[i] = Math.min(255, r * 0.2 + 38);
      imageData.data[i + 1] = Math.min(255, g * 1.08 + 30);
      imageData.data[i + 2] = Math.min(255, b * 1.36 + 72);
      imageData.data[i + 3] = alpha;
    }
    brainTextureContext.putImageData(imageData, 0, 0);
    brainTexture.needsUpdate = true;
  };
  brainImage.src = '/brain-reference.jpg';

  const volume = new THREE.Group();
  for (let i = 0; i < 5; i += 1) {
    const layer = new THREE.Mesh(
      new THREE.PlaneGeometry(2.05, 1.03, 20, 10),
      new THREE.MeshBasicMaterial({
        map: brainTexture,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
        side: THREE.DoubleSide,
      }),
    );
    layer.position.z = -0.08 + i * 0.04;
    layer.position.x = (i - 2) * 0.018;
    layer.position.y = Math.sin(i) * 0.01;
    layer.scale.setScalar(1 + Math.abs(i - 2) * 0.022);
    layer.renderOrder = 505 + i;
    volume.add(layer);
  }

  const nodeCount = 260;
  const basePositions = new Float32Array(nodeCount * 3);
  const phases = new Float32Array(nodeCount);
  const colors = new Float32Array(nodeCount * 3);
  const color = new THREE.Color();

  for (let i = 0; i < nodeCount; i += 1) {
    let x = 0;
    let y = 0;
    let z = 0;
    let accepted = false;
    while (!accepted) {
      x = -0.74 + Math.random() * 1.42;
      y = -0.48 + Math.random() * 0.98;
      z = (Math.random() - 0.5) * 0.34;
      const cerebrum = ((x + 0.05) / 0.72) ** 2 + ((y - 0.08) / 0.5) ** 2 < 1;
      const frontal = ((x + 0.5) / 0.34) ** 2 + ((y + 0.03) / 0.34) ** 2 < 1;
      const cerebellum = ((x - 0.47) / 0.28) ** 2 + ((y + 0.29) / 0.2) ** 2 < 1;
      const stem = x > 0.16 && x < 0.36 && y < -0.22 && y > -0.58;
      accepted = cerebrum || frontal || cerebellum || stem;
    }
    const fold = Math.sin(x * 17 + y * 9) * 0.026 + Math.cos(y * 19) * 0.02;
    basePositions[i * 3] = x + fold;
    basePositions[i * 3 + 1] = y + Math.sin(x * 8) * 0.02;
    basePositions[i * 3 + 2] = z + Math.cos((x + y) * 9) * 0.028;
    phases[i] = Math.random() * Math.PI * 2;

    const tone = i / nodeCount;
    color.set(tone % 3 < 1 ? '#efffff' : tone % 3 < 2 ? '#69f8ff' : '#19d6d6');
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(basePositions.slice(), 3));
  nodeGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const nodes = new THREE.Points(
    nodeGeometry,
    new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      sizeAttenuation: true,
    }),
  );
  nodes.renderOrder = 520;

  const pairs = [];
  for (let i = 0; i < nodeCount; i += 1) {
    let nearest = -1;
    let second = -1;
    let nearestDistance = Infinity;
    let secondDistance = Infinity;
    for (let j = 0; j < nodeCount; j += 1) {
      if (i === j) continue;
      const dx = basePositions[i * 3] - basePositions[j * 3];
      const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
      const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
      const distance = dx * dx + dy * dy + dz * dz;
      if (distance < nearestDistance) {
        second = nearest;
        secondDistance = nearestDistance;
        nearest = j;
        nearestDistance = distance;
      } else if (distance < secondDistance) {
        second = j;
        secondDistance = distance;
      }
    }
    if (nearest >= 0 && i < nearest) pairs.push([i, nearest]);
    if (second >= 0 && i % 3 === 0 && i < second) pairs.push([i, second]);
  }

  const linePositions = new Float32Array(pairs.length * 6);
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: '#b7fbff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    }),
  );
  lines.renderOrder = 510;

  const packetCount = 24;
  const packetPositions = new Float32Array(packetCount * 3);
  const packetPairs = Array.from({ length: packetCount }, (_, index) => pairs[(index * 7) % pairs.length]);
  const packets = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(packetPositions, 3)),
    new THREE.PointsMaterial({
      color: '#91fbff',
      size: 0.05,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      sizeAttenuation: true,
    }),
  );
  packets.renderOrder = 530;

  const shell = new THREE.Group();
  const shellMaterial = new THREE.LineBasicMaterial({
      color: '#ecffff',
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
  });
  const brainOutline = [];
  for (let i = 0; i <= 130; i += 1) {
    const t = (i / 130) * Math.PI * 2;
    const top = Math.max(0, Math.sin(t));
    const bottom = Math.max(0, -Math.sin(t));
    const x = Math.cos(t) * (0.62 + top * 0.1) - 0.04 + Math.sin(t * 3) * 0.025;
    const y = Math.sin(t) * (0.42 + top * 0.1 + bottom * 0.04) + 0.05;
    brainOutline.push(new THREE.Vector3(x, y, Math.sin(t * 2) * 0.035));
  }
  const outline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(brainOutline), shellMaterial.clone());
  outline.renderOrder = 515;
  shell.add(outline);
  const cerebellumOutline = [];
  for (let i = 0; i <= 70; i += 1) {
    const t = (i / 70) * Math.PI * 2;
    cerebellumOutline.push(new THREE.Vector3(0.47 + Math.cos(t) * 0.25, -0.29 + Math.sin(t) * 0.17, Math.sin(t * 3) * 0.025));
  }
  const cerebellumLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(cerebellumOutline), shellMaterial.clone());
  cerebellumLine.renderOrder = 515;
  shell.add(cerebellumLine);
  const fissurePoints = [];
  for (let i = 0; i <= 40; i += 1) {
    const t = i / 40;
    fissurePoints.push(new THREE.Vector3(
      -0.08 + Math.sin(t * Math.PI * 4) * 0.045 + t * 0.1,
      0.48 - t * 0.78,
      0.08 + Math.cos(t * Math.PI * 3) * 0.025,
    ));
  }
  const fissure = new THREE.Line(new THREE.BufferGeometry().setFromPoints(fissurePoints), shellMaterial.clone());
  fissure.renderOrder = 515;
  shell.add(fissure);

  const cortex = new THREE.Group();
  const cortexMaterial = new THREE.LineBasicMaterial({
    color: '#f2ffff',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });
  for (let row = 0; row < 18; row += 1) {
      const y = -0.3 + row * 0.045;
      const rowWidth = 0.35 + Math.sin((row / 17) * Math.PI) * 0.72;
      const foldPoints = [];
      for (let i = 0; i <= 48; i += 1) {
        const t = i / 48;
        const x = -0.03 + (t - 0.5) * rowWidth + Math.sin(t * Math.PI * 6 + row) * 0.035;
        const curveY = y + Math.sin(t * Math.PI * 4 + row * 0.7) * 0.032;
        const z = 0.14 + Math.cos((t - 0.5) * Math.PI) * 0.07 + Math.sin(row + t * 5) * 0.016;
        foldPoints.push(new THREE.Vector3(x, curveY, z));
      }
      const fold = new THREE.Line(new THREE.BufferGeometry().setFromPoints(foldPoints), cortexMaterial.clone());
      fold.renderOrder = 525;
      cortex.add(fold);
  }
  for (let column = 0; column < 12; column += 1) {
    const columnOffset = column - 5.5;
    const foldPoints = [];
    for (let i = 0; i <= 34; i += 1) {
      const t = i / 34;
      foldPoints.push(new THREE.Vector3(
        columnOffset * 0.1 + Math.sin(t * Math.PI * 5 + column) * 0.026,
        0.42 - t * 0.72,
        0.13 + Math.sin(t * Math.PI * 2 + column) * 0.035,
      ));
    }
    const fold = new THREE.Line(new THREE.BufferGeometry().setFromPoints(foldPoints), cortexMaterial.clone());
    fold.renderOrder = 526;
    cortex.add(fold);
  }

  const signalPaths = new THREE.Group();
  const pathMaterial = new THREE.LineBasicMaterial({
    color: '#dffcff',
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });
  const cyanPathMaterial = pathMaterial.clone();
  cyanPathMaterial.color = new THREE.Color('#5ffaff');
  const hubs = [
    new THREE.Vector3(-0.52, 0.2, 0.18),
    new THREE.Vector3(-0.2, -0.08, 0.22),
    new THREE.Vector3(0.18, 0.22, 0.2),
    new THREE.Vector3(0.45, -0.2, 0.18),
    new THREE.Vector3(0.58, 0.12, 0.14),
  ];
  const pathTargets = [
    new THREE.Vector3(-0.68, 0.35, 0.08),
    new THREE.Vector3(-0.62, -0.1, 0.12),
    new THREE.Vector3(-0.32, 0.46, 0.16),
    new THREE.Vector3(0.04, 0.38, 0.18),
    new THREE.Vector3(0.34, 0.36, 0.1),
    new THREE.Vector3(0.7, 0.0, 0.14),
    new THREE.Vector3(0.52, -0.34, 0.18),
    new THREE.Vector3(0.16, -0.42, 0.14),
  ];
  hubs.forEach((hub, hubIndex) => {
    pathTargets.forEach((target, targetIndex) => {
      const mid = hub.clone().lerp(target, 0.5);
      mid.y += Math.sin(hubIndex + targetIndex) * 0.12;
      mid.z += 0.14 + Math.cos(hubIndex * 1.7 + targetIndex) * 0.06;
      const curve = new THREE.CatmullRomCurve3([
        hub,
        hub.clone().lerp(mid, 0.55),
        mid,
        mid.clone().lerp(target, 0.55),
        target,
      ]);
      const line = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(34)),
        (hubIndex + targetIndex) % 3 === 0 ? cyanPathMaterial.clone() : pathMaterial.clone(),
      );
      line.userData.phase = hubIndex * 0.8 + targetIndex * 0.35;
      line.renderOrder = 540;
      signalPaths.add(line);
    });
  });

  const hubPositions = [];
  const hubColors = [];
  hubs.forEach((hub, hubIndex) => {
    for (let i = 0; i < 38; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * (hubIndex === 3 ? 0.13 : 0.1);
      hubPositions.push(
        hub.x + Math.cos(angle) * radius,
        hub.y + Math.sin(angle) * radius * 0.72,
        hub.z + (Math.random() - 0.5) * 0.1,
      );
      const hubColor = new THREE.Color(i % 5 === 0 ? '#ffffff' : '#18f8ff');
      hubColors.push(hubColor.r, hubColor.g, hubColor.b);
    }
  });
  const hubGeometry = new THREE.BufferGeometry();
  hubGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(hubPositions), 3));
  hubGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(hubColors), 3));
  const hubCloud = new THREE.Points(
    hubGeometry,
    new THREE.PointsMaterial({
      size: 0.034,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      sizeAttenuation: true,
    }),
  );
  hubCloud.renderOrder = 550;

  const cerebellumFibers = new THREE.Group();
  for (let row = 0; row < 14; row += 1) {
    const points = [];
    const y = -0.42 + row * 0.026;
    const width = 0.08 + Math.sin((row / 13) * Math.PI) * 0.28;
    for (let i = 0; i <= 32; i += 1) {
      const t = i / 32;
      points.push(new THREE.Vector3(
        0.48 + (t - 0.5) * width,
        y + Math.sin(t * Math.PI * 4 + row) * 0.018,
        0.2 + Math.cos(t * Math.PI) * 0.035,
      ));
    }
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), cyanPathMaterial.clone());
    line.renderOrder = 538;
    cerebellumFibers.add(line);
  }

  group.add(volume, cortex, cerebellumFibers, signalPaths, hubCloud, lines, nodes, packets);
  group.visible = false;
  group.userData = {
    basePositions,
    phases,
    pairs,
    packetPairs,
    nodes,
    lines,
    packets,
    shell,
    cortex,
    cerebellumFibers,
    signalPaths,
    hubCloud,
    volume,
    brainTexture,
  };
  return group;
}

function updateNeuralBrain(group, { time, intensity, scatter, position, rotationX, rotationY, scale, contained = 0 }) {
  group.visible = intensity > 0.02;
  if (!group.visible) return;

  group.position.copy(position);
  group.rotation.set(rotationX, rotationY, Math.sin(time * 0.22) * 0.035);
  group.scale.setScalar(scale);

  const {
    basePositions,
    phases,
    pairs,
    packetPairs,
    nodes,
    lines,
    packets,
    shell,
    cortex,
    cerebellumFibers,
    signalPaths,
    hubCloud,
    volume,
  } = group.userData;
  const nodePositions = nodes.geometry.attributes.position.array;
  const linePositions = lines.geometry.attributes.position.array;
  const packetPositions = packets.geometry.attributes.position.array;
  const neuralSpread = Math.min(1, scatter) * 0.16;

  for (let i = 0; i < phases.length; i += 1) {
    const bx = basePositions[i * 3];
    const by = basePositions[i * 3 + 1];
    const bz = basePositions[i * 3 + 2];
    const phase = phases[i];
    const firing = Math.sin(time * 2.4 + phase + by * 6) * 0.5 + 0.5;
    const drift = 0.018 + firing * 0.018 + neuralSpread;
    nodePositions[i * 3] = bx + Math.sin(time * 1.1 + phase) * drift;
    nodePositions[i * 3 + 1] = by + Math.cos(time * 0.95 + phase * 1.4) * drift * 0.72;
    nodePositions[i * 3 + 2] = bz + Math.sin(time * 1.35 + phase * 0.8) * drift * 0.8;
  }

  pairs.forEach((pair, index) => {
    const [a, b] = pair;
    linePositions[index * 6] = nodePositions[a * 3];
    linePositions[index * 6 + 1] = nodePositions[a * 3 + 1];
    linePositions[index * 6 + 2] = nodePositions[a * 3 + 2];
    linePositions[index * 6 + 3] = nodePositions[b * 3];
    linePositions[index * 6 + 4] = nodePositions[b * 3 + 1];
    linePositions[index * 6 + 5] = nodePositions[b * 3 + 2];
  });

  packetPairs.forEach((pair, index) => {
    const [a, b] = pair;
    const phase = (time * 0.34 + index * 0.091) % 1;
    const pulse = phase * phase * (3 - phase * 2);
    packetPositions[index * 3] = nodePositions[a * 3] * (1 - pulse) + nodePositions[b * 3] * pulse;
    packetPositions[index * 3 + 1] = nodePositions[a * 3 + 1] * (1 - pulse) + nodePositions[b * 3 + 1] * pulse;
    packetPositions[index * 3 + 2] = nodePositions[a * 3 + 2] * (1 - pulse) + nodePositions[b * 3 + 2] * pulse;
  });

  nodes.geometry.attributes.position.needsUpdate = true;
  lines.geometry.attributes.position.needsUpdate = true;
  packets.geometry.attributes.position.needsUpdate = true;
  const drawOrder = 500;
  volume.children.forEach((layer, index) => {
    layer.material.opacity = (0.08 + intensity * 0.24) * (index === 2 ? 1.05 : 0.58);
    layer.renderOrder = drawOrder + 55 + index;
    layer.position.z = -0.08 + index * 0.04 + Math.sin(time * 0.45 + index) * 0.006;
  });
  nodes.material.opacity = 0.06 + intensity * 0.24;
  lines.material.opacity = 0.06 + intensity * 0.2;
  packets.material.opacity = 0.08 + intensity * 0.28;
  packets.material.size = 0.028 + intensity * 0.02;
  shell.children.forEach((line, index) => {
    line.material.opacity = 0.2 + intensity * (index === 2 ? 0.34 : 0.3);
    line.renderOrder = drawOrder + 15;
  });
  cortex.children.forEach((line, index) => {
    line.material.opacity = 0.18 + intensity * (0.34 + (index % 4) * 0.035);
    line.renderOrder = drawOrder + 20;
  });
  cerebellumFibers.children.forEach((line, index) => {
    line.material.opacity = 0.18 + intensity * (0.34 + (index % 3) * 0.035);
    line.renderOrder = drawOrder + 28;
  });
  signalPaths.children.forEach((line, index) => {
    const pulse = Math.sin(time * 1.6 + line.userData.phase) * 0.5 + 0.5;
    line.material.opacity = 0.07 + intensity * (0.16 + pulse * 0.32 + (index % 5 === 0 ? 0.08 : 0));
    line.renderOrder = drawOrder + 38;
  });
  hubCloud.material.opacity = 0.1 + intensity * 0.68;
  hubCloud.material.size = 0.024 + intensity * 0.026;
  hubCloud.renderOrder = drawOrder + 50;
  nodes.renderOrder = drawOrder + 20;
  lines.renderOrder = drawOrder + 10;
  packets.renderOrder = drawOrder + 30;
  shell.rotation.y = Math.sin(time * 0.3) * 0.14;
  cortex.rotation.y = Math.sin(time * 0.24) * 0.08;
  cerebellumFibers.rotation.y = cortex.rotation.y;
  signalPaths.rotation.y = Math.sin(time * 0.2) * 0.06;
  hubCloud.rotation.y = signalPaths.rotation.y;
}

function createLogoGroup() {
  const group = new THREE.Group();
  group.position.set(0, 0.15, 0);
  return group;
}

function createSpineGroup() {
  const group = new THREE.Group();
  const material = createIridescentMaterial('#cffcff', '#ec4899', 0.58);
  const rungMaterial = createIridescentMaterial('#e9ffff', '#7df8ff', 0.5);
  const railMaterial = new THREE.LineBasicMaterial({
    color: '#d9ffff',
    transparent: true,
    opacity: 0.64,
    blending: THREE.AdditiveBlending,
  });

  const railA = [];
  const railB = [];
  const steps = 150;
  const dnaTurns = Math.PI * 4.2;
  for (let i = 0; i < steps; i += 1) {
    const t = i / (steps - 1);
    const y = 4.9 - t * 9.8;
    const angle = t * dnaTurns;
    railA.push(new THREE.Vector3(Math.sin(angle) * 0.88, y, Math.cos(angle) * 0.32));
    railB.push(new THREE.Vector3(Math.sin(angle + Math.PI) * 0.88, y, Math.cos(angle + Math.PI) * 0.32));
  }

  const strandA = new THREE.Line(new THREE.BufferGeometry().setFromPoints(railA), railMaterial);
  const strandB = new THREE.Line(new THREE.BufferGeometry().setFromPoints(railB), railMaterial.clone());
  strandB.material.opacity = 0.46;
  group.add(strandA, strandB);

  const rungGeometry = new THREE.CylinderGeometry(0.025, 0.025, 1, 10);
  const beadGeometry = new THREE.SphereGeometry(0.085, 16, 10);
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < 28; i += 1) {
    const t = i / 27;
    const y = 4.75 - t * 9.5;
    const angle = t * dnaTurns;
    const a = new THREE.Vector3(Math.sin(angle) * 0.88, y, Math.cos(angle) * 0.32);
    const b = new THREE.Vector3(Math.sin(angle + Math.PI) * 0.88, y, Math.cos(angle + Math.PI) * 0.32);
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const direction = b.clone().sub(a);

    const rung = new THREE.Mesh(rungGeometry, rungMaterial);
    rung.position.copy(mid);
    rung.scale.y = direction.length();
    rung.quaternion.setFromUnitVectors(up, direction.normalize());
    rung.userData.baseX = rung.position.x;
    rung.userData.baseY = rung.position.y;
    rung.userData.baseZRotation = rung.rotation.z;
    group.add(rung);

    [a, b].forEach((point, beadIndex) => {
      const bead = new THREE.Mesh(beadGeometry, material);
      bead.position.copy(point);
      bead.userData.baseX = bead.position.x;
      bead.userData.baseY = bead.position.y;
      bead.userData.baseZRotation = bead.rotation.z;
      bead.userData.phaseOffset = i * 0.35 + beadIndex * Math.PI;
      group.add(bead);
    });
  }

  group.position.y = -0.8;
  return group;
}

function createJellyfish() {
  const group = new THREE.Group();
  const bell = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.55),
    new THREE.MeshStandardMaterial({
      color: '#ff9dd9',
      emissive: '#ff3da5',
      emissiveIntensity: 0.18,
      roughness: 0.18,
      transparent: true,
      opacity: 0.58,
    }),
  );
  bell.scale.set(1.15, 0.72, 1.15);
  group.add(bell);

  const tentacleMaterial = new THREE.LineBasicMaterial({
    color: '#d9faff',
    transparent: true,
    opacity: 0.5,
  });
  for (let i = 0; i < 10; i += 1) {
    const points = [];
    const angle = (i / 10) * Math.PI * 2;
    for (let j = 0; j < 24; j += 1) {
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * 0.18 + Math.sin(j * 0.35 + i) * 0.06,
          -0.08 - j * 0.08,
          Math.sin(angle) * 0.18 + Math.cos(j * 0.3 + i) * 0.06,
        ),
      );
    }
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), tentacleMaterial));
  }
  return group;
}

function makeParticles(count, radius, colors) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colorValues = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const color = new THREE.Color();

  for (let i = 0; i < count; i += 1) {
    const theta = Math.random() * Math.PI * 2;
    const r = radius * (0.25 + Math.random() * 0.75);
    const y = (Math.random() - 0.5) * radius * 1.8;
    positions[i * 3] = Math.cos(theta) * r;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = Math.sin(theta) * r - 1.5;
    color.set(colors[Math.floor(Math.random() * colors.length)]);
    colorValues[i * 3] = color.r;
    colorValues[i * 3 + 1] = color.g;
    colorValues[i * 3 + 2] = color.b;
    seeds[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('particleColor', new THREE.BufferAttribute(colorValues, 3));
  geometry.setAttribute('seed', new THREE.BufferAttribute(seeds, 1));
  return geometry;
}

function SceneCanvas({ progress }) {
  const canvasRef = React.useRef(null);
  const progressRef = React.useRef(progress);

  React.useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.92;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass();
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.32,
      0.55,
      0.93,
    );
    const outputPass = new OutputPass();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#020814', 0.035);

    const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.4, 9);
    renderPass.scene = scene;
    renderPass.camera = camera;
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(outputPass);

    const ambient = new THREE.AmbientLight('#82f8ff', 0.36);
    const key = new THREE.PointLight('#ffffff', 3.2, 19);
    key.position.set(1.8, 3.2, 5);
    const pink = new THREE.PointLight('#ff4db8', 1.5, 16);
    pink.position.set(-3, -1.2, 2.5);
    const cyan = new THREE.PointLight('#00d9ff', 2.1, 14);
    cyan.position.set(3, 2, 0);
    const rim = new THREE.DirectionalLight('#d9ffff', 1.8);
    rim.position.set(-2.4, 2.8, -3.5);
    scene.add(ambient, key, pink, cyan, rim);

    const texture = makeParticleTexture();
    const starField = new THREE.Points(
      makeParticles(1700, 12, ['#dffcff', '#8df7ff', '#ffdf7b', '#ffffff']),
      createParticleMaterial(texture, 0.38, 30),
    );
    const distantStars = new THREE.Points(
      makeParticles(1100, 16, ['#ffffff', '#dffcff', '#bde8ff', '#fff7d8']),
      createParticleMaterial(texture, 0.14, 16),
    );
    const coral = new THREE.Points(
      makeParticles(2200, 5.2, ['#ff4fb7', '#7e5cff', '#00e5ff', '#ffe36d', '#4cffad']),
      createParticleMaterial(texture, 0, 48),
    );
    const nebula = new THREE.Points(
      makeParticles(2600, 8.5, ['#ffffff', '#ff436f', '#fff06a', '#74ffe4']),
      createParticleMaterial(texture, 0, 64),
    );
    scene.add(starField, distantStars, coral, nebula);

    const logo = createLogoGroup();
    const spine = createSpineGroup();
    const cubeDriftA = createMotherBoxArtifact();
    const cubeDriftB = createMotherBoxArtifact();
    const cubeDriftC = createMotherBoxArtifact();
    const cubeDriftD = createMotherBoxArtifact();
    cubeDriftA.visible = true;
    cubeDriftB.visible = true;
    cubeDriftC.visible = true;
    cubeDriftD.visible = true;
    spine.visible = false;
    scene.add(logo, spine, cubeDriftA, cubeDriftB, cubeDriftC, cubeDriftD);

    const projectCards = createProjectCards();
    scene.add(projectCards);
    const cardConnectors = new THREE.Group();
    projectCards.children.forEach(() => {
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const material = new THREE.LineBasicMaterial({
        color: '#dffcff',
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      cardConnectors.add(new THREE.Line(geometry, material));
    });
    scene.add(cardConnectors);

    const helixMaterial = new THREE.LineBasicMaterial({
      color: '#d9ffff',
      transparent: true,
      opacity: 0.52,
    });
    const helixPoints = [];
    for (let i = 0; i < 220; i += 1) {
      const t = i / 219;
      const y = 5.2 - t * 10.4;
      const a = t * Math.PI * 8;
      helixPoints.push(new THREE.Vector3(Math.sin(a) * 1.25, y, Math.cos(a) * 0.35));
    }
    const helix = new THREE.Line(new THREE.BufferGeometry().setFromPoints(helixPoints), helixMaterial);
    helix.visible = false;
    scene.add(helix);

    const labRing = new THREE.Group();
    const platform = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.035, 12, 120),
      new THREE.MeshStandardMaterial({ color: '#ecffff', emissive: '#8affff', emissiveIntensity: 0.25 }),
    );
    labRing.add(platform);
    for (let i = 0; i < 14; i += 1) {
      const strand = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(i) * 1.15, 1.1, Math.sin(i) * 1.15),
          new THREE.Vector3(Math.cos(i) * 1.4, -1.2, Math.sin(i) * 1.4),
        ]),
        new THREE.LineBasicMaterial({ color: '#d8ffff', transparent: true, opacity: 0.38 }),
      );
      labRing.add(strand);
    }
    labRing.position.set(0, -1.4, 0);
    labRing.visible = false;
    scene.add(labRing);

    const motherBox = createMotherBoxArtifact();
    const logoCube = createMotherBoxArtifact();
    const neuralBrain = createNeuralBrain();
    scene.add(motherBox, logoCube, neuralBrain);

    let frame = 0;
    let smoothProgress = progressRef.current;
    const startTime = performance.now() * 0.001;
    let disposed = false;

    const animate = () => {
      if (disposed) return;
      frame = requestAnimationFrame(animate);
      smoothProgress += (progressRef.current - smoothProgress) * 0.12;
      const p = smoothProgress;
      const time = performance.now() * 0.001;
      const deep = Math.min(1, Math.max(0, (p - 0.18) / 0.44));
      const lab = Math.min(1, Math.max(0, (p - 0.62) / 0.18));
      const finale = Math.min(1, Math.max(0, (p - 0.78) / 0.2));
      const artifact = Math.min(1, Math.max(0, (p - 0.58) / 0.22));

      camera.position.y = 0.8 - p * 5.8 + Math.sin(time * 0.4) * 0.05;
      camera.position.z = 9 - deep * 2.2 + finale * 1.4;
      camera.lookAt(0, camera.position.y - 0.7, 0);

      logo.traverse((object) => {
        if (object.material?.uniforms?.time) object.material.uniforms.time.value = time;
      });
      spine.traverse((object) => {
        if (object.material?.uniforms?.time) object.material.uniforms.time.value = time;
      });

      const logoTravelY = 1.6 - p * 7.5;
      const logoFinalY = camera.position.y + (window.innerWidth < 700 ? 1.35 : 1.15);
      logo.position.y = logoTravelY * (1 - finale) + logoFinalY * finale;
      logo.rotation.y = time * 0.42 + p * Math.PI * 8;
      logo.rotation.z = Math.sin(time + p * 12) * 0.15;
      logo.scale.setScalar(1 + Math.sin(p * Math.PI) * 0.35 - deep * 0.22 + finale * 0.08);

      const introAssembly = Math.min(1, Math.max(0, (time - startTime) / 1.8));
      const introEase = introAssembly * introAssembly * (3 - introAssembly * 2);
      const scrollScatter = (() => {
        if (p < 0.08 || p > 0.84) return 0;
        if (p < 0.5) {
          const t = (p - 0.08) / 0.42;
          const eased = t * t * (3 - t * 2);
          return Math.pow(eased, 0.72);
        }
        const t = (p - 0.5) / 0.34;
        const eased = t * t * (3 - t * 2);
        return Math.pow(1 - eased, 0.72);
      })();
      const introScatter = (1 - introEase) * 1.12;
      const cardStart = 0.13;
      const cardDuration = 0.72;
      const cardLead = 0.95;
      const cardPassIn = Math.min(1, Math.max(0, (p - cardStart) / 0.14));
      const cardPassOut = 1 - Math.min(1, Math.max(0, (p - 0.84) / 0.12));
      const cardPass = cardPassIn * cardPassOut;
      const logoScatter = Math.max(scrollScatter, introScatter, cardPass * 1.32);
      const logoSolid = Math.max(0, 1 - Math.min(1, logoScatter / 0.34));
      const logoSolidEase = logoSolid * logoSolid * (3 - logoSolid * 2);
      const cubeAnchor = logo.position.clone();
      cubeAnchor.y += (1 - introEase) * (window.innerWidth < 700 ? 2.1 : 2.8);
      cubeAnchor.z -= (1 - introEase) * 1.3;
      logoCube.visible = true;
      updateMicroCubeArtifact(logoCube, {
        time,
        appear: 0.82 + introEase * 0.18,
        scatter: logoScatter,
        twist: p * Math.PI * 3.2 + time * 0.18,
        scale: window.innerWidth < 700 ? 0.72 : 1.04,
        position: cubeAnchor,
        rotationX: Math.sin(time * 0.18 + p * 2) * 0.1,
        rotationY: logo.rotation.y * 0.34,
        glow: 0.2 + (1 - logoScatter) * 0.2,
        burst: 3.2 + cardPass * 3.6,
        glassOpacity: Math.max(0.008, 0.38 + Math.min(1, logoScatter) * 0.1 - cardPass * 0.54),
        wireOpacityScale: 1 - cardPass * 0.98,
      });
      const brainAnchor = cubeAnchor.clone();
      brainAnchor.z += window.innerWidth < 700 ? 0.28 : 0.36;
      updateNeuralBrain(neuralBrain, {
        time,
        intensity: (0.2 + (1 - Math.min(1, logoScatter)) * 0.64) * (0.18 + introEase * 0.82),
        scatter: logoScatter,
        position: brainAnchor,
        rotationX: logoCube.rotation.x * 0.72 + Math.sin(time * 0.16) * 0.025,
        rotationY: Math.sin(time * 0.2 + p * 3) * 0.055,
        scale: (window.innerWidth < 700 ? 0.92 : 1.22)
          * (0.9 + Math.min(1, logoScatter) * 0.18)
          * (1 - logoSolidEase * 0.08),
        contained: logoSolidEase,
      });

      spine.visible = false;
      spine.position.y = camera.position.y - 1.85 + deep * 3.65 - artifact * 1.15;
      spine.position.x = -deep * (window.innerWidth < 700 ? 0.12 : 0.34) + artifact * 0.46;
      spine.position.z = -0.2 - deep * 0.5;
      // Pure scroll-driven; do NOT add a `time * ...` term here. spine is
      // invisible, but spine.rotation.y feeds into trunkSpin → spiralAngle below
      // and propagates into every card's position + rotation, so any wall-clock
      // component drifts the card layout out of sync while the page sits open.
      spine.rotation.y = -0.16 + deep * Math.PI * 0.525;
      spine.rotation.x = Math.sin(time * 0.22 + p * Math.PI * 0.8) * (0.014 + deep * 0.02);
      spine.children.forEach((child, index) => {
        if (child.material?.opacity !== undefined && child.type === 'Line') {
          child.material.opacity = 0.34 + deep * 0.2;
          return;
        }
        const wave = Math.sin(time * 0.24 + index * 0.18 + p * 1.1 + (child.userData.phaseOffset || 0));
        if (child.userData.baseX !== undefined) child.position.x = child.userData.baseX + wave * (0.004 + deep * 0.008);
        if (child.userData.baseY !== undefined) child.position.y = child.userData.baseY + deep * 1.25 + Math.cos(time * 0.18 + index * 0.14) * 0.006;
        child.rotation.z = child.userData.baseZRotation + wave * (0.004 + deep * 0.008);
      });

      helix.position.y = 0.4 - p * 4.2;
      helix.rotation.y = -p * Math.PI * 0.45;
      helix.material.opacity = 0;

      coral.rotation.y = time * 0.08 + p * 2;
      coral.position.y = -1.4 - p * 3.2;
      starField.material.uniforms.time.value = time;
      starField.material.uniforms.progress.value = p;
      starField.material.uniforms.opacity.value = 0.34 - finale * 0.08;
      distantStars.rotation.y = -time * 0.012;
      distantStars.position.y = -p * 1.3;
      distantStars.material.uniforms.time.value = time;
      distantStars.material.uniforms.progress.value = p;
      distantStars.material.uniforms.opacity.value = 0.11 + finale * 0.32;
      coral.material.uniforms.time.value = time;
      coral.material.uniforms.progress.value = p;
      coral.material.uniforms.opacity.value = Math.min(0.46, deep * 0.46) * (1 - finale * 0.9);
      nebula.rotation.z = time * 0.05;
      nebula.rotation.y = p * 3.4;
      nebula.position.y = -4.8 + finale * 5.5;
      nebula.material.uniforms.time.value = time;
      nebula.material.uniforms.progress.value = p;
      nebula.material.uniforms.opacity.value = finale * 0.18;
      starField.rotation.y = time * 0.025;
      starField.position.y = -p * 3.5;

      projectCards.children.forEach((card) => {
        const isMobile = window.innerWidth < 700;
        const cardPhase = Math.min(1, Math.max(0, (p - cardStart) / cardDuration));
        const lane = card.userData.index + cardLead - cardPhase * (projects.length - 1 + cardLead * 2);
        const cardExit = 1 - Math.min(1, Math.max(0, (p - 0.86) / 0.1));
        const distance = Math.abs(lane);
        const laneFade = 1 - Math.min(1, Math.max(0, (distance - 0.08) / (isMobile ? 2.25 : 2.55)));
        const frontness = 1 - Math.min(1, distance / 0.78);
        const visible = p > 0.14 && cardExit > 0 && laneFade > 0;
        const helixPitch = isMobile ? 1.5 : 1.44;
        const trunkSpin = spine.rotation.y * 0.28;
        const spiralAngle = lane * helixPitch + trunkSpin;
        const radius = isMobile ? 1.02 : 2.05;
        const depthRadius = isMobile ? 2.0 : 2.8;
        const targetX = spine.position.x + Math.sin(spiralAngle) * radius;
        const targetY = camera.position.y - 0.38 + lane * (isMobile ? 1.02 : 1.12);
        const targetZ = spine.position.z + Math.cos(spiralAngle) * depthRadius + 0.5;
        card.position.set(targetX, targetY, targetZ);
        card.rotation.set(
          Math.sin(lane * 0.35 + deep) * 0.035,
          spiralAngle,
          Math.sin(spiralAngle) * -0.025,
        );
        const faceAmount = Math.cos(spiralAngle);
        const edgeAmount = Math.abs(Math.sin(spiralAngle));
        const frontFace = Math.max(0, faceAmount);
        const backFace = Math.max(0, -faceAmount);
        const panelScale = ((isMobile ? 0.4 : 0.58)
          + frontness * (isMobile ? 0.28 : 0.42)
          + frontFace * (isMobile ? 0.08 : 0.16)
          - edgeAmount * (isMobile ? 0.05 : 0.08)) * 0.8;
        card.scale.setScalar(panelScale);
        card.material.depthTest = false;
        card.material.opacity = visible
          ? Math.min(1, 0.24 + frontness * 0.58 + frontFace * 0.5 + backFace * 0.18 - edgeAmount * 0.12) * cardExit * laneFade
          : 0;
        card.renderOrder = Math.round(560 + frontness * 120 + frontFace * 130 - backFace * 28 - distance * 14);

        const connector = cardConnectors.children[card.userData.index];
        const positions = connector.geometry.attributes.position.array;
        const rootRadius = isMobile ? 0.44 : 0.72;
        positions[0] = spine.position.x + Math.sin(spiralAngle) * rootRadius;
        positions[1] = targetY;
        positions[2] = spine.position.z + Math.cos(spiralAngle) * 0.3;
        positions[3] = targetX - Math.sin(spiralAngle) * (isMobile ? 0.34 : 0.6);
        positions[4] = targetY;
        positions[5] = targetZ - Math.cos(spiralAngle) * (isMobile ? 0.26 : 0.48);
        connector.geometry.attributes.position.needsUpdate = true;
        connector.material.opacity = visible ? (0.04 + frontness * 0.18) * cardExit * laneFade : 0;
        connector.renderOrder = card.renderOrder - 1;
      });

      labRing.visible = false;

      motherBox.visible = artifact > 0.03 && artifact < 0.96;
      if (motherBox.visible) {
        const appear = Math.sin(artifact * Math.PI);
        const scatter = Math.sin(artifact * Math.PI) * 0.96;
        const twist = artifact * Math.PI * 1.8 + time * 0.25;
        updateMicroCubeArtifact(motherBox, {
          time,
          appear,
          scatter,
          twist,
          scale: window.innerWidth < 700 ? 0.62 : 0.82,
          position: new THREE.Vector3(
            0,
            camera.position.y - 0.45 + Math.sin(artifact * Math.PI) * 0.32 - finale * 0.9,
            0.82,
          ),
          rotationX: Math.sin(time * 0.58) * 0.14,
          rotationY: time * 0.52 + artifact * Math.PI * 2.2,
          glow: appear,
          burst: 2.55,
        });
      }

      const driftScatterA = 0.44 + (Math.sin(time * 0.9 + p * 5) * 0.5 + 0.5) * 0.78;
      const driftScatterB = 0.42 + (Math.sin(time * 0.72 + p * 4 + 2.4) * 0.5 + 0.5) * 0.74;
      const driftScatterC = 0.44 + (Math.sin(time * 0.8 + p * 6 + 1.2) * 0.5 + 0.5) * 0.82;
      const driftScatterD = 0.46 + (Math.cos(time * 0.67 + p * 5.5) * 0.5 + 0.5) * 0.76;
      cubeDriftA.visible = p < 0.84 && cardPass < 0.18;
      cubeDriftB.visible = p > 0.04 && p < 0.84 && cardPass < 0.18;
      cubeDriftC.visible = p > 0.08 && p < 0.82 && cardPass < 0.18;
      cubeDriftD.visible = p > 0.26 && p < 0.84 && cardPass < 0.18;
      if (cubeDriftA.visible) {
        updateMicroCubeArtifact(cubeDriftA, {
          time,
          appear: 0.72,
          scatter: driftScatterA,
          twist: time * 0.45 + p * Math.PI,
          scale: window.innerWidth < 700 ? 0.34 : 0.54,
          position: new THREE.Vector3(
            -3.25 + Math.sin(time * 0.22 + p * 7) * 0.44,
            camera.position.y + 0.62 + Math.sin(time * 0.55) * 0.2,
            -1.2,
          ),
          rotationX: Math.sin(time * 0.28) * 0.12,
          rotationY: time * 0.24,
          glow: 0.16 + driftScatterA * 0.18,
          burst: 2.85,
        });
      }
      if (cubeDriftB.visible) {
        updateMicroCubeArtifact(cubeDriftB, {
          time,
          appear: 0.68,
          scatter: driftScatterB,
          twist: -time * 0.36 + p * Math.PI * 0.8,
          scale: window.innerWidth < 700 ? 0.3 : 0.48,
          position: new THREE.Vector3(
            3.25 - finale * 4.9 + Math.cos(time * 0.18) * 0.36,
            camera.position.y - 1.18 + p * 1.2 + Math.sin(time * 0.48 + 2) * 0.18,
            -1.75,
          ),
          rotationX: Math.sin(time * 0.34 + 1) * 0.1,
          rotationY: -time * 0.2,
          glow: 0.14 + driftScatterB * 0.18,
          burst: 2.8,
        });
      }
      if (cubeDriftC.visible) {
        updateMicroCubeArtifact(cubeDriftC, {
          time,
          appear: 0.58,
          scatter: driftScatterC,
          twist: time * 0.32 - p * Math.PI * 0.6,
          scale: window.innerWidth < 700 ? 0.26 : 0.42,
          position: new THREE.Vector3(
            2.05 + Math.sin(time * 0.16 + p * 3) * 0.32,
            camera.position.y + 1.35 - deep * 0.7 + Math.cos(time * 0.5) * 0.18,
            -2.55,
          ),
          rotationX: Math.sin(time * 0.3 + 2.2) * 0.14,
          rotationY: time * 0.18 + p * 1.2,
          glow: 0.12 + driftScatterC * 0.18,
          burst: 2.95,
        });
      }
      if (cubeDriftD.visible) {
        updateMicroCubeArtifact(cubeDriftD, {
          time,
          appear: 0.62,
          scatter: driftScatterD,
          twist: -time * 0.28 + p * Math.PI * 1.15,
          scale: window.innerWidth < 700 ? 0.24 : 0.38,
          position: new THREE.Vector3(
            -1.95 + Math.cos(time * 0.2 + p * 5) * 0.34,
            camera.position.y - 1.95 + artifact * 0.8 + Math.sin(time * 0.42) * 0.16,
            -2.05,
          ),
          rotationX: Math.sin(time * 0.22 + 1.6) * 0.13,
          rotationY: -time * 0.24,
          glow: 0.12 + driftScatterD * 0.16,
          burst: 2.9,
        });
      }

      key.intensity = 1.8 + Math.sin(p * Math.PI) * 1.8 + finale * 2.4;
      pink.intensity = 0.8 + deep * 2.6 + finale * 2;
      cyan.intensity = 1 + lab * 2.2 + finale * 2;
      rim.intensity = 1.2 + artifact * 1.6 + finale * 0.8;
      bloomPass.strength = 0.18 + deep * 0.08 + artifact * 0.2 + finale * 0.1;
      bloomPass.radius = 0.28 + artifact * 0.12 + finale * 0.08;

      composer.render();
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.userData?.frostTexture) object.userData.frostTexture.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      texture.dispose();
      composer.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="scene-canvas" aria-hidden="true" />;
}

function ProductSpiral({ progress }) {
  const phase = Math.min(1, Math.max(0, (progress - 0.18) / 0.44));
  return (
    <div className="spiral-layer" aria-label="Selected immersive work">
      {projects.map((project, index) => {
        const offset = index / projects.length;
        const turn = (offset - phase * 1.28) * Math.PI * 2;
        const depth = Math.cos(turn);
        const visible = phase > 0.03 && phase < 0.98;
        const x = Math.sin(turn) * 48;
        const y = (offset - phase * 0.98) * 86 - 12;
        const scale = 0.64 + (depth + 1) * 0.24;
        const opacity = visible ? 0.18 + (depth + 1) * 0.38 : 0;
        const blur = depth < -0.1 ? 6 : 0;

        return (
          <article
            className="project-card"
            key={project.title}
            style={{
              '--card-color': project.color,
              '--x': `${x}vw`,
              '--y': `${y}vh`,
              '--scale': scale,
              '--opacity': opacity,
              '--blur': `${blur}px`,
              '--rotate-y': `${-Math.sin(turn) * 54}deg`,
              zIndex: Math.round(100 + depth * 50),
            }}
          >
            <div className="project-card__wash" />
            <p>{project.type}</p>
            <h2>{project.title}</h2>
            <span>{project.text}</span>
          </article>
        );
      })}
    </div>
  );
}

function FeatureRise({ progress }) {
  const phase = Math.min(1, Math.max(0, (progress - 0.6) / 0.18));
  return (
    <section
      className="feature-rise"
      style={{
        '--feature-opacity': Math.sin(phase * Math.PI),
        '--feature-y': `${18 - phase * 8}vh`,
        '--feature-scale': 0.78 + phase * 0.12,
      }}
      aria-label={featuredItem.title}
    >
      <div className="feature-copy">
        <h2>{featuredItem.title}</h2>
        <p>{featuredItem.text}</p>
      </div>
    </section>
  );
}

function App() {
  const progress = useScrollProgress();
  const depth = Math.round(progress * 100);

  return (
    <main>
      <SceneCanvas progress={progress} />
      <div className="surface-gradient" aria-hidden="true" />
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#top" aria-label="InspiraCube home">
          <span className="brand-mark__sigil">i</span>
          <span>InspiraCube</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#lab">Lab</a>
          <a href="mailto:hello@inspiracube.com">Contact</a>
        </div>
        <a className="nav-cta" href="mailto:hello@inspiracube.com">
          <Mail size={15} />
          Begin
        </a>
        <button className="nav-menu" type="button" aria-label="Open navigation">
          <Menu size={18} />
        </button>
      </nav>

      <FeatureRise progress={progress} />

      <section id="top" className="chapter chapter-hero">
        <div className="hero-copy">
          <h1>InspiraCube</h1>
          <p>
            Immersive product worlds, interactive stories, and scroll-native digital systems built to feel alive.
          </p>
          <a href="#work" className="scroll-cue">
            <ArrowDown size={18} />
            Scroll ocean
          </a>
        </div>
      </section>

      <section id="work" className="chapter chapter-spine">
        <aside className="side-caption">
          <span>Creative digital experiences</span>
          <p>
            Product tiles orbit the spine as the scene gets deeper, brighter, and more biological.
          </p>
        </aside>
      </section>

      <section id="lab" className="chapter chapter-lab">
        <aside className="side-caption side-caption--right">
          <span>One slot, many campaigns</span>
          <p>
            The center object is data-driven so the featured artifact can change with each launch.
          </p>
        </aside>
      </section>

      <section className="chapter chapter-finale">
        <div className="finale-copy">
          <Sparkles size={24} />
          <h2>Build the next layer.</h2>
          <p>
            Start with a cinematic interaction, then make it practical enough to ship, update, and grow.
          </p>
          <a href="mailto:hello@inspiracube.com">Contact InspiraCube</a>
        </div>
      </section>

      <div className="depth-meter" aria-hidden="true">
        <span>{depth}%</span>
        <i style={{ height: `${Math.max(6, depth)}%` }} />
      </div>
    </main>
  );
}

export default App;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
