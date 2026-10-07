/*
 * Hero fluid background. Based on WebGL Fluid Simulation by Pavel Dobryakov
 * (https://github.com/PavelDoGreat/WebGL-Fluid-Simulation), MIT License,
 * Copyright (c) 2017 Pavel Dobryakov. Bloom and the transparent-background path are removed.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function mount(host) {
    var canvas = host.querySelector('canvas.st-fluid');
    if (!canvas) return;
    var engine;
    try {
      engine = fluidSimulation(canvas, { calm: host.getAttribute('data-fluid') === 'calm' });
    } catch (e) {
      return;
    }
    host.classList.add('st-fluid-on');

    var inView = true;
    var sync = function () {
      if (inView && !document.hidden) engine.start();
      else engine.stop();
    };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        sync();
      }).observe(host);
    }
    document.addEventListener('visibilitychange', sync);
    sync();
  }

  // The hero boots once the page is idle; calm instances wait until they are about to scroll in,
  // so a visitor who never reaches them never pays for a second WebGL context.
  function boot() {
    [].forEach.call(document.querySelectorAll('[data-fluid]'), function (host) {
      if (host.getAttribute('data-fluid') !== 'calm' || !('IntersectionObserver' in window)) {
        mount(host);
        return;
      }
      var near = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        near.disconnect();
        mount(host);
      }, { rootMargin: '50% 0px' });
      near.observe(host);
    });
  }

  var whenIdle = function () {
    if ('requestIdleCallback' in window) requestIdleCallback(boot, { timeout: 1200 });
    else setTimeout(boot, 200);
  };
  if (document.readyState === 'complete') whenIdle();
  else window.addEventListener('load', whenIdle, { once: true });

  function fluidSimulation(canvas, opts) {
    var calm = !!(opts && opts.calm);
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    var small = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 640;

    var config = {
      SIM_RESOLUTION: small ? 128 : 200,
      DYE_RESOLUTION: small ? 256 : 512,
      DENSITY_DISSIPATION: 0.958,
      VELOCITY_DISSIPATION: 0.96,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: small ? 12 : 20,
      CURL: 42,
      SPLAT_RADIUS: 0.22,
      SHADING: !small,
      BACK_COLOR: { r: 4, g: 6, b: 9 },
      BURST: calm ? 0 : small ? 20 : 34,
      BURST_GAIN: 8.0,
      ORBIT_GAIN: calm ? 1.3 : 2.8
    };

    function PointerPrototype() {
      this.id = -1;
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.down = false;
      this.moved = false;
      this.everMoved = false;
      this.color = generateColor();
    }

    var pointers = [new PointerPrototype()];
    var splatStack = [];

    var ctx = getWebGLContext(canvas);
    var gl = ctx.gl;
    var ext = ctx.ext;
    if (!ext.supportLinearFiltering) config.SHADING = false;

    function getWebGLContext(canvas) {
      var params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };

      var gl = canvas.getContext('webgl2', params);
      var isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
      if (!gl) throw new Error('no webgl');

      var halfFloat;
      var supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFiltering = gl.getExtension('OES_texture_float_linear');
      } else {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear');
        if (!halfFloat) throw new Error('no half float');
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0);

      var halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES;
      var formatRGBA, formatRG, formatR;

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }
      if (!formatRGBA || !formatRG || !formatR) throw new Error('no render format');

      return {
        gl: gl,
        ext: {
          formatRGBA: formatRGBA,
          formatRG: formatRG,
          formatR: formatR,
          halfFloatTexType: halfFloatTexType,
          supportLinearFiltering: supportLinearFiltering
        }
      };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
          default:
            return null;
        }
      }
      return { internalFormat: internalFormat, format: format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE;
    }

    function GLProgram(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = gl.createProgram();

      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);

      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(this.program);

      var uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < uniformCount; i++) {
        var uniformName = gl.getActiveUniform(this.program, i).name;
        this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
      }
    }
    GLProgram.prototype.bind = function () {
      gl.useProgram(this.program);
    };

    function compileShader(type, source) {
      var shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(shader);
      return shader;
    }

    var baseVertexShader = compileShader(gl.VERTEX_SHADER, '\
      precision highp float;\
      attribute vec2 aPosition;\
      varying vec2 vUv;\
      varying vec2 vL;\
      varying vec2 vR;\
      varying vec2 vT;\
      varying vec2 vB;\
      uniform vec2 texelSize;\
      void main () {\
        vUv = aPosition * 0.5 + 0.5;\
        vL = vUv - vec2(texelSize.x, 0.0);\
        vR = vUv + vec2(texelSize.x, 0.0);\
        vT = vUv + vec2(0.0, texelSize.y);\
        vB = vUv - vec2(0.0, texelSize.y);\
        gl_Position = vec4(aPosition, 0.0, 1.0);\
      }');

    var clearShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      precision mediump sampler2D;\
      varying highp vec2 vUv;\
      uniform sampler2D uTexture;\
      uniform float value;\
      void main () {\
        gl_FragColor = value * texture2D(uTexture, vUv);\
      }');

    var colorShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      uniform vec4 color;\
      void main () {\
        gl_FragColor = color;\
      }');

    var displayShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      uniform sampler2D uTexture;\
      void main () {\
        vec3 C = texture2D(uTexture, vUv).rgb;\
        float a = max(C.r, max(C.g, C.b));\
        gl_FragColor = vec4(C, a);\
      }');

    var displayShadingShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      varying vec2 vL;\
      varying vec2 vR;\
      varying vec2 vT;\
      varying vec2 vB;\
      uniform sampler2D uTexture;\
      uniform vec2 texelSize;\
      void main () {\
        vec3 L = texture2D(uTexture, vL).rgb;\
        vec3 R = texture2D(uTexture, vR).rgb;\
        vec3 T = texture2D(uTexture, vT).rgb;\
        vec3 B = texture2D(uTexture, vB).rgb;\
        vec3 C = texture2D(uTexture, vUv).rgb;\
        float dx = length(R) - length(L);\
        float dy = length(T) - length(B);\
        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\
        vec3 l = vec3(0.0, 0.0, 1.0);\
        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\
        C.rgb *= diffuse;\
        float a = max(C.r, max(C.g, C.b));\
        gl_FragColor = vec4(C, a);\
      }');

    var splatShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      uniform sampler2D uTarget;\
      uniform float aspectRatio;\
      uniform vec3 color;\
      uniform vec2 point;\
      uniform float radius;\
      void main () {\
        vec2 p = vUv - point.xy;\
        p.x *= aspectRatio;\
        vec3 splat = exp(-dot(p, p) / radius) * color;\
        vec3 base = texture2D(uTarget, vUv).xyz;\
        gl_FragColor = vec4(base + splat, 1.0);\
      }');

    var advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      uniform sampler2D uVelocity;\
      uniform sampler2D uSource;\
      uniform vec2 texelSize;\
      uniform vec2 dyeTexelSize;\
      uniform float dt;\
      uniform float dissipation;\
      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\
        vec2 st = uv / tsize - 0.5;\
        vec2 iuv = floor(st);\
        vec2 fuv = fract(st);\
        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\
        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\
        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\
        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\
        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\
      }\
      void main () {\
        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\
        gl_FragColor = dissipation * bilerp(uSource, coord, dyeTexelSize);\
        gl_FragColor.a = 1.0;\
      }');

    var advectionShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      uniform sampler2D uVelocity;\
      uniform sampler2D uSource;\
      uniform vec2 texelSize;\
      uniform float dt;\
      uniform float dissipation;\
      void main () {\
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\
        gl_FragColor = dissipation * texture2D(uSource, coord);\
        gl_FragColor.a = 1.0;\
      }');

    var divergenceShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      precision mediump sampler2D;\
      varying highp vec2 vUv;\
      varying highp vec2 vL;\
      varying highp vec2 vR;\
      varying highp vec2 vT;\
      varying highp vec2 vB;\
      uniform sampler2D uVelocity;\
      void main () {\
        float L = texture2D(uVelocity, vL).x;\
        float R = texture2D(uVelocity, vR).x;\
        float T = texture2D(uVelocity, vT).y;\
        float B = texture2D(uVelocity, vB).y;\
        vec2 C = texture2D(uVelocity, vUv).xy;\
        if (vL.x < 0.0) { L = -C.x; }\
        if (vR.x > 1.0) { R = -C.x; }\
        if (vT.y > 1.0) { T = -C.y; }\
        if (vB.y < 0.0) { B = -C.y; }\
        float div = 0.5 * (R - L + T - B);\
        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\
      }');

    var curlShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      precision mediump sampler2D;\
      varying highp vec2 vUv;\
      varying highp vec2 vL;\
      varying highp vec2 vR;\
      varying highp vec2 vT;\
      varying highp vec2 vB;\
      uniform sampler2D uVelocity;\
      void main () {\
        float L = texture2D(uVelocity, vL).y;\
        float R = texture2D(uVelocity, vR).y;\
        float T = texture2D(uVelocity, vT).x;\
        float B = texture2D(uVelocity, vB).x;\
        float vorticity = R - L - T + B;\
        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\
      }');

    var vorticityShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision highp float;\
      precision highp sampler2D;\
      varying vec2 vUv;\
      varying vec2 vL;\
      varying vec2 vR;\
      varying vec2 vT;\
      varying vec2 vB;\
      uniform sampler2D uVelocity;\
      uniform sampler2D uCurl;\
      uniform float curl;\
      uniform float dt;\
      void main () {\
        float L = texture2D(uCurl, vL).x;\
        float R = texture2D(uCurl, vR).x;\
        float T = texture2D(uCurl, vT).x;\
        float B = texture2D(uCurl, vB).x;\
        float C = texture2D(uCurl, vUv).x;\
        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\
        force /= length(force) + 0.0001;\
        force *= curl * C;\
        force.y *= -1.0;\
        vec2 vel = texture2D(uVelocity, vUv).xy;\
        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\
      }');

    var pressureShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      precision mediump sampler2D;\
      varying highp vec2 vUv;\
      varying highp vec2 vL;\
      varying highp vec2 vR;\
      varying highp vec2 vT;\
      varying highp vec2 vB;\
      uniform sampler2D uPressure;\
      uniform sampler2D uDivergence;\
      void main () {\
        float L = texture2D(uPressure, vL).x;\
        float R = texture2D(uPressure, vR).x;\
        float T = texture2D(uPressure, vT).x;\
        float B = texture2D(uPressure, vB).x;\
        float divergence = texture2D(uDivergence, vUv).x;\
        float pressure = (L + R + B + T - divergence) * 0.25;\
        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\
      }');

    var gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, '\
      precision mediump float;\
      precision mediump sampler2D;\
      varying highp vec2 vUv;\
      varying highp vec2 vL;\
      varying highp vec2 vR;\
      varying highp vec2 vT;\
      varying highp vec2 vB;\
      uniform sampler2D uPressure;\
      uniform sampler2D uVelocity;\
      void main () {\
        float L = texture2D(uPressure, vL).x;\
        float R = texture2D(uPressure, vR).x;\
        float T = texture2D(uPressure, vT).x;\
        float B = texture2D(uPressure, vB).x;\
        vec2 velocity = texture2D(uVelocity, vUv).xy;\
        velocity.xy -= vec2(R - L, T - B);\
        gl_FragColor = vec4(velocity, 0.0, 1.0);\
      }');

    var blit = (function () {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);

      return function (destination) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    var simWidth, simHeight, dyeWidth, dyeHeight;
    var density, velocity, divergence, curl, pressure;

    var clearProgram = new GLProgram(baseVertexShader, clearShader);
    var colorProgram = new GLProgram(baseVertexShader, colorShader);
    var displayProgram = new GLProgram(baseVertexShader, displayShader);
    var displayShadingProgram = new GLProgram(baseVertexShader, displayShadingShader);
    var splatProgram = new GLProgram(baseVertexShader, splatShader);
    var advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
    var divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    var curlProgram = new GLProgram(baseVertexShader, curlShader);
    var vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    var pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    var gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

    function initFramebuffers() {
      var simRes = getResolution(config.SIM_RESOLUTION);
      var dyeRes = getResolution(config.DYE_RESOLUTION);

      simWidth = simRes.width;
      simHeight = simRes.height;
      dyeWidth = dyeRes.width;
      dyeHeight = dyeRes.height;

      var texType = ext.halfFloatTexType;
      var rgba = ext.formatRGBA;
      var rg = ext.formatRG;
      var r = ext.formatR;
      var filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;

      if (density == null) density = createDoubleFBO(dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering);
      else density = resizeDoubleFBO(density, dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering);

      if (velocity == null) velocity = createDoubleFBO(simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering);
      else velocity = resizeDoubleFBO(velocity, simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering);

      divergence = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);

      return {
        texture: texture,
        fbo: fbo,
        width: w,
        height: h,
        attach: function (id) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        }
      };
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      var fbo1 = createFBO(w, h, internalFormat, format, type, param);
      var fbo2 = createFBO(w, h, internalFormat, format, type, param);

      return {
        get read() { return fbo1; },
        set read(value) { fbo1 = value; },
        get write() { return fbo2; },
        set write(value) { fbo2 = value; },
        swap: function () {
          var temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
        }
      };
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      var newFBO = createFBO(w, h, internalFormat, format, type, param);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, 1);
      blit(newFBO.fbo);
      return newFBO;
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      return target;
    }

    initFramebuffers();
    multipleSplats(config.BURST);
    if (!calm) for (var i = 0; i < 8; i++) splatStack.push(10 + Math.floor(Math.random() * 10));

    var lastColorChangeTime = Date.now();
    var virtualSeeded = false;
    var orbitAngle = 0;
    var vPrevX = 0, vPrevY = 0;
    var virtualColor = null;
    var lastVColorTime = 0;
    var engineStart = Date.now();
    var ORBIT_RADIUS = calm ? 380 : 300;
    var ORBIT_SPEED = calm ? 0.012 : 0.026;
    var ORBIT_START_DELAY = calm ? 0 : 700;

    var rafHandle = 0;

    function update() {
      resizeCanvas();
      driveVirtualPointer();
      input();
      step(0.016);
      render();
      rafHandle = requestAnimationFrame(update);
    }

    function driveVirtualPointer() {
      if (Date.now() - engineStart < ORBIT_START_DELAY) return;
      var cx = canvas.width / 2;
      var cy = canvas.height / 2;
      var base = Math.min(ORBIT_RADIUS, canvas.width * 0.35, canvas.height * 0.35);
      var r = base * (0.72 + 0.28 * Math.sin(orbitAngle * 0.37));
      orbitAngle += ORBIT_SPEED;
      var x = cx + Math.cos(orbitAngle) * r;
      var y = cy + Math.sin(orbitAngle) * r;
      if (!virtualSeeded) {
        virtualSeeded = true;
        vPrevX = x;
        vPrevY = y;
        return;
      }
      if (!virtualColor || Date.now() - lastVColorTime > 120) {
        virtualColor = generateColor();
        virtualColor.r *= config.ORBIT_GAIN;
        virtualColor.g *= config.ORBIT_GAIN;
        virtualColor.b *= config.ORBIT_GAIN;
        lastVColorTime = Date.now();
      }
      var dx = (x - vPrevX) * 9.0;
      var dy = (y - vPrevY) * 9.0;
      vPrevX = x;
      vPrevY = y;
      splat(x, y, dx, dy, virtualColor);
    }

    function input() {
      if (splatStack.length > 0) multipleSplats(splatStack.pop());

      for (var i = 0; i < pointers.length; i++) {
        var p = pointers[i];
        if (p.moved) {
          splat(p.x, p.y, p.dx, p.dy, p.color);
          p.moved = false;
        }
      }

      if (lastColorChangeTime + 100 < Date.now()) {
        lastColorChangeTime = Date.now();
        for (var j = 0; j < pointers.length; j++) pointers[j].color = generateColor();
      }
    }

    function step(dt) {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simWidth, simHeight);

      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl.fbo);

      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo);
      velocity.swap();

      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence.fbo);

      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write.fbo);
      pressure.swap();

      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (var i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write.fbo);
        pressure.swap();
      }

      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write.fbo);
      velocity.swap();

      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / simWidth, 1.0 / simHeight);
      var velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);

      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / dyeWidth, 1.0 / dyeHeight);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write.fbo);
      density.swap();
    }

    function render() {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);

      var width = gl.drawingBufferWidth;
      var height = gl.drawingBufferHeight;
      gl.viewport(0, 0, width, height);

      colorProgram.bind();
      var bc = config.BACK_COLOR;
      gl.uniform4f(colorProgram.uniforms.color, bc.r / 255, bc.g / 255, bc.b / 255, 1);
      blit(null);

      var program = config.SHADING ? displayShadingProgram : displayProgram;
      program.bind();
      if (config.SHADING) gl.uniform2f(program.uniforms.texelSize, 1.0 / width, 1.0 / height);
      gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
      blit(null);
    }

    function splat(x, y, dx, dy, color) {
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      blit(velocity.write.fbo);
      velocity.swap();

      gl.viewport(0, 0, dyeWidth, dyeHeight);
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(density.write.fbo);
      density.swap();
    }

    function multipleSplats(amount) {
      for (var i = 0; i < amount; i++) {
        var color = generateColor();
        color.r *= config.BURST_GAIN;
        color.g *= config.BURST_GAIN;
        color.b *= config.BURST_GAIN;
        var x = canvas.width * Math.random();
        var y = canvas.height * Math.random();
        var dx = 1000 * (Math.random() - 0.5);
        var dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function resizeCanvas() {
      if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }

    function pointerPos(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    window.addEventListener('mousemove', function (e) {
      var pos = pointerPos(e.clientX, e.clientY);
      var p = pointers[0];
      if (!p.everMoved) {
        p.everMoved = true;
        p.x = pos.x;
        p.y = pos.y;
        return;
      }
      p.moved = true;
      p.dx = (pos.x - p.x) * 5.0;
      p.dy = (pos.y - p.y) * 5.0;
      p.x = pos.x;
      p.y = pos.y;
      p.color = generateColor();
    }, { passive: true });

    window.addEventListener('touchstart', function (e) {
      var touches = e.targetTouches;
      for (var i = 0; i < touches.length; i++) {
        if (i >= pointers.length) pointers.push(new PointerPrototype());
        var p = pointers[i];
        var pos = pointerPos(touches[i].clientX, touches[i].clientY);
        p.id = touches[i].identifier;
        p.x = pos.x;
        p.y = pos.y;
        p.color = generateColor();
      }
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      var touches = e.targetTouches;
      for (var i = 0; i < touches.length; i++) {
        if (i >= pointers.length) pointers.push(new PointerPrototype());
        var p = pointers[i];
        var pos = pointerPos(touches[i].clientX, touches[i].clientY);
        p.moved = p.everMoved === true;
        p.everMoved = true;
        p.dx = (pos.x - p.x) * 8.0;
        p.dy = (pos.y - p.y) * 8.0;
        p.x = pos.x;
        p.y = pos.y;
      }
    }, { passive: true });

    // Teal-to-cyan only: violet is the `acknowledged` status colour elsewhere on the page.
    // Calm runs green-to-teal: it closes the page on the colour of a resolved alert.
    function generateColor() {
      var c = HSVtoRGB(calm ? 0.41 + Math.random() * 0.06 : 0.44 + Math.random() * 0.08, calm ? 0.75 : 0.9, 1.0);
      c.r *= 0.92;
      c.g *= 0.92;
      c.b *= 0.92;
      return c;
    }

    function HSVtoRGB(h, s, v) {
      var r, g, b;
      var i = Math.floor(h * 6);
      var f = h * 6 - i;
      var p = v * (1 - s);
      var q = v * (1 - f * s);
      var t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r: r, g: g, b: b };
    }

    function getResolution(resolution) {
      var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      var max = Math.round(resolution * aspectRatio);
      var min = Math.round(resolution);
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min };
      return { width: min, height: max };
    }

    return {
      start: function () {
        if (!rafHandle) rafHandle = requestAnimationFrame(update);
      },
      stop: function () {
        if (rafHandle) cancelAnimationFrame(rafHandle);
        rafHandle = 0;
      }
    };
  }
})();
