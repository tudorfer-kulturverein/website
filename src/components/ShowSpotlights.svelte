<script>
  // ShowSpotlights component
  // 2D theatrical show spotlights with pink beams that rotate slowly at the top
  // Responsive: 1 spotlight on mobile, 2 spotlights on tablet/desktop
</script>

<div class="spotlights-wrapper" aria-hidden="true">
  <!-- Spotlight 1 (Left on desktop, centered on mobile) -->
  <div class="spotlight-rig rig-1">
    <div class="spotlight-assembly swing-1">
      <div class="beam-container">
        <svg class="beam-svg" viewBox="0 0 520 950" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pink-beam-outer-1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="5%" stop-color="#ff2ea6" stop-opacity="0.75" />
              <stop offset="20%" stop-color="#e908a1" stop-opacity="0.45" />
              <stop offset="55%" stop-color="#e908a1" stop-opacity="0.2" />
              <stop offset="85%" stop-color="#e908a1" stop-opacity="0.06" />
              <stop offset="100%" stop-color="#e908a1" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="pink-beam-core-1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
              <stop offset="8%" stop-color="#ffffff" stop-opacity="0.7" />
              <stop offset="25%" stop-color="#ff7ec9" stop-opacity="0.38" />
              <stop offset="60%" stop-color="#e908a1" stop-opacity="0.14" />
              <stop offset="90%" stop-color="#e908a1" stop-opacity="0" />
            </linearGradient>
          </defs>
          <!-- Outer wide cone -->
          <polygon points="247,0 273,0 500,950 20,950" fill="url(#pink-beam-outer-1)" />
          <!-- Inner core cone -->
          <polygon points="253,0 267,0 380,950 140,950" fill="url(#pink-beam-core-1)" />
        </svg>
      </div>
    </div>
  </div>

  <!-- Spotlight 2 (Right on desktop, hidden on mobile) -->
  <div class="spotlight-rig rig-2">
    <div class="spotlight-assembly swing-2">
      <div class="beam-container">
        <svg class="beam-svg" viewBox="0 0 520 950" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pink-beam-outer-2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95" />
              <stop offset="5%" stop-color="#ff2ea6" stop-opacity="0.75" />
              <stop offset="20%" stop-color="#e908a1" stop-opacity="0.45" />
              <stop offset="55%" stop-color="#e908a1" stop-opacity="0.2" />
              <stop offset="85%" stop-color="#e908a1" stop-opacity="0.06" />
              <stop offset="100%" stop-color="#e908a1" stop-opacity="0" />
            </linearGradient>
            <linearGradient id="pink-beam-core-2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
              <stop offset="8%" stop-color="#ffffff" stop-opacity="0.7" />
              <stop offset="25%" stop-color="#ff7ec9" stop-opacity="0.38" />
              <stop offset="60%" stop-color="#e908a1" stop-opacity="0.14" />
              <stop offset="90%" stop-color="#e908a1" stop-opacity="0" />
            </linearGradient>
          </defs>
          <!-- Outer wide cone -->
          <polygon points="247,0 273,0 500,950 20,950" fill="url(#pink-beam-outer-2)" />
          <!-- Inner core cone -->
          <polygon points="253,0 267,0 380,950 140,950" fill="url(#pink-beam-core-2)" />
        </svg>
      </div>
    </div>
  </div>
</div>

<style>
  .spotlights-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: hidden;
  }

  .spotlight-rig {
    position: absolute;
    top: 0;
    pointer-events: none;
  }

  /* Desktop positions */
  .rig-1 {
    left: 24%;
    transform: translateX(-50%);
  }

  .rig-2 {
    left: 76%;
    transform: translateX(-50%);
    display: block;
  }

  /* Rotating Spotlight Assembly */
  .spotlight-assembly {
    transform-origin: 50% 0;
    will-change: transform;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* The Light Beam */
  .beam-container {
    position: relative;
    margin-top: -3px;
    width: 520px;
    height: 950px;
    mix-blend-mode: screen;
    filter: blur(3px);
    opacity: 0.95;
    pointer-events: none;
  }

  .beam-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Slow rotation animations */
  .swing-1 {
    animation: rotate-left 9.5s ease-in-out infinite alternate;
  }

  .swing-2 {
    animation: rotate-right 12s ease-in-out infinite alternate;
  }

  @keyframes rotate-left {
    0% {
      transform: rotate(-28deg);
    }
    100% {
      transform: rotate(16deg);
    }
  }

  @keyframes rotate-right {
    0% {
      transform: rotate(28deg);
    }
    100% {
      transform: rotate(-16deg);
    }
  }

  /* Mobile: 1 spotlight only, centered and sweeping smoothly */
  @media (max-width: 768px) {
    .rig-1 {
      left: 50%;
      transform: translateX(-50%);
    }

    .rig-2 {
      display: none;
    }

    .rig-1 .swing-1 {
      animation: rotate-mobile 8s ease-in-out infinite alternate;
    }

    .beam-container {
      width: 400px;
      height: 700px;
    }
  }

  @keyframes rotate-mobile {
    0% {
      transform: rotate(-22deg);
    }
    100% {
      transform: rotate(22deg);
    }
  }

  /* Accessibility: Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    .spotlight-assembly {
      animation: none !important;
    }
  }
</style>
