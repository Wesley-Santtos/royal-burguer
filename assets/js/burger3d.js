/* =============================================================
   Royal Burguer — hambúrguer 3D (Three.js r128, global THREE)
   Uso:  var ok = RB.initBurger3D(canvasEl);
         retorna false se WebGL/Three indisponível (o chamador
         mostra o fallback).
   ============================================================= */
(function (RB) {
  "use strict";

  function hasWebGL() {
    if (typeof THREE === "undefined") return false;
    try {
      var c = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext("webgl") || c.getContext("experimental-webgl"))
      );
    } catch (e) {
      return false;
    }
  }

  function mat(color, rough) {
    return new THREE.MeshStandardMaterial({
      color: color,
      roughness: rough == null ? 0.75 : rough,
      metalness: 0.02,
    });
  }

  function buildBurger() {
    var g = new THREE.Group();

    // pão inferior
    var bottom = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.0, 0.38, 48),
      mat(0xd9a15b, 0.85)
    );
    bottom.position.y = 0.19;
    g.add(bottom);

    // carne
    var patty = new THREE.Mesh(
      new THREE.CylinderGeometry(1.03, 1.03, 0.32, 48),
      mat(0x5a3825, 0.9)
    );
    patty.position.y = 0.52;
    g.add(patty);

    // queijo (placa inclinada) + 2 pingos
    var cheese = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 0.08, 1.9),
      mat(0xf2b33d, 0.5)
    );
    cheese.position.y = 0.7;
    cheese.rotation.y = Math.PI / 4;
    cheese.rotation.z = 0.05;
    g.add(cheese);

    // alface (anel ondulado)
    var lettuce = new THREE.Mesh(
      new THREE.TorusGeometry(1.06, 0.24, 12, 30),
      mat(0x74c53f, 0.85)
    );
    lettuce.rotation.x = Math.PI / 2;
    lettuce.position.y = 0.82;
    lettuce.scale.y = 0.5;
    g.add(lettuce);

    // tomate
    var tomato = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 0.92, 0.12, 40),
      mat(0xc8402c, 0.7)
    );
    tomato.position.y = 0.9;
    g.add(tomato);

    // pão superior (cúpula) + sementes
    var top = new THREE.Mesh(
      new THREE.SphereGeometry(1.0, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
      mat(0xe0a85c, 0.8)
    );
    top.position.y = 0.98;
    top.scale.y = 0.82;
    g.add(top);

    var seedMat = mat(0xf3e2c0, 0.55);
    for (var i = 0; i < 9; i++) {
      var phi = (i / 9) * Math.PI * 2 + (i % 2) * 0.35;
      var polar = 0.78 + (i % 3) * 0.16; // rad, do topo
      var seed = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), seedMat);
      seed.position.set(
        Math.sin(polar) * Math.cos(phi) * 0.99,
        0.98 + Math.cos(polar) * 0.99 * 0.82,
        Math.sin(polar) * Math.sin(phi) * 0.99
      );
      seed.scale.set(1.1, 0.5, 1.1);
      seed.lookAt(0, 0.98, 0);
      g.add(seed);
    }

    g.traverse(function (o) {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });

    // centraliza verticalmente em torno de y=0.6
    return g;
  }

  RB.initBurger3D = function (canvas) {
    if (!canvas || !hasWebGL()) return false;

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true,
      });
    } catch (e) {
      return false;
    }

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    if ("outputEncoding" in renderer) renderer.outputEncoding = THREE.sRGBEncoding;

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    var baseDist = 5.0;
    var distFactor = 1;
    var camTarget = new THREE.Vector3(0, 0.58, 0);

    function placeCamera() {
      camera.position.set(0, 1.55, baseDist * distFactor);
      camera.lookAt(camTarget);
    }
    placeCamera();

    // luzes
    scene.add(new THREE.AmbientLight(0xfff2e0, 0.6));
    var key = new THREE.DirectionalLight(0xffffff, 0.95);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    scene.add(key);
    var fill = new THREE.PointLight(0xffd9a0, 0.45, 40);
    fill.position.set(-3, 2, -2);
    scene.add(fill);

    // chão de sombra
    var ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      new THREE.ShadowMaterial({ opacity: 0.18 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    var burger = buildBurger();
    scene.add(burger);

    // ---- interação ----
    var rotY = 0.5,
      rotX = 0.1;
    var targetY = 0.5,
      targetX = 0.1;
    var dragging = false,
      lastX = 0,
      lastY = 0;
    var lastInteract = performance.now();

    function pointerDown(e) {
      dragging = true;
      canvas.classList.add("is-grabbing");
      var p = e.touches ? e.touches[0] : e;
      lastX = p.clientX;
      lastY = p.clientY;
      lastInteract = performance.now();
    }
    function pointerMove(e) {
      if (!dragging) return;
      var p = e.touches ? e.touches[0] : e;
      var dx = p.clientX - lastX;
      var dy = p.clientY - lastY;
      lastX = p.clientX;
      lastY = p.clientY;
      targetY += dx * 0.01;
      targetX += dy * 0.01;
      targetX = Math.max(-0.5, Math.min(0.5, targetX));
      lastInteract = performance.now();
      if (e.cancelable) e.preventDefault();
    }
    function pointerUp() {
      dragging = false;
      canvas.classList.remove("is-grabbing");
      lastInteract = performance.now();
    }

    canvas.addEventListener("mousedown", pointerDown);
    window.addEventListener("mousemove", pointerMove);
    window.addEventListener("mouseup", pointerUp);
    canvas.addEventListener("touchstart", pointerDown, { passive: true });
    canvas.addEventListener("touchmove", pointerMove, { passive: false });
    canvas.addEventListener("touchend", pointerUp);

    function zoom(dir) {
      distFactor = Math.max(0.72, Math.min(1.5, distFactor - dir * 0.16));
      placeCamera();
      lastInteract = performance.now();
    }

    // ---- resize ----
    function resize() {
      var w = canvas.clientWidth || 1;
      var h = canvas.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    if (window.ResizeObserver) {
      new ResizeObserver(resize).observe(canvas);
    } else {
      window.addEventListener("resize", resize);
    }

    // ---- loop (só quando visível) ----
    var visible = true;
    if (window.IntersectionObserver) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible) tick();
      }).observe(canvas);
    }

    var running = false;
    var prev = performance.now();
    function tick() {
      if (running) return;
      running = true;
      requestAnimationFrame(loop);
    }
    function loop(now) {
      running = false;
      if (!visible || document.hidden) return;
      var dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;

      if (!reduceMotion && !dragging && now - lastInteract > 2000) {
        targetY += 0.35 * dt;
      }
      rotY += (targetY - rotY) * 0.12;
      rotX += (targetX - rotX) * 0.12;
      burger.rotation.y = rotY;
      burger.rotation.x = rotX;

      renderer.render(scene, camera);
      running = true;
      requestAnimationFrame(loop);
    }
    tick();

    return { zoom: zoom };
  };
})((window.RB = window.RB || {}));
