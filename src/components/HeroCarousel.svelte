<script>
  import { onMount } from 'svelte';
  
  // Accept an array of image objects: { src, alt, text }
  export let images = [];
  
  let currentIndex = 0;
  let innerWidth = 0;
  
  // Determine how many items to show based on screen width
  $: visibleItems = innerWidth > 1024 ? 3 : innerWidth > 768 ? 2 : 1;
  $: maxIndex = Math.max(0, images.length - visibleItems);
  
  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop back
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex;
    }
  };

  let timer;
  onMount(() => {
    timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  });
</script>

<svelte:window bind:innerWidth />

<div class="carousel-container">
  <div class="carousel-track" style="transform: translateX(-{currentIndex * (100 / visibleItems)}%);">
    {#each images as image, i}
      <div class="carousel-slide" style="width: {100 / visibleItems}%;">
        <div class="slide-content">
          <img src={image.src} alt={image.alt} />
          <div class="slide-overlay">
            {#if image.text}
              <h3 class="slide-text">{image.text}</h3>
            {/if}
          </div>
        </div>
        
        <!-- Lightning bolt divider on the right of each image (except the very last one) -->
        {#if i < images.length - 1}
          <div class="lightning-divider">
            <svg viewBox="0 0 100 1000" preserveAspectRatio="none" class="bolt-svg">
              <!-- A jagged lightning bolt path -->
              <path d="M50,0 L20,300 L60,300 L10,600 L50,600 L0,1000 L90,450 L50,450 L80,150 Z" fill="white" />
            </svg>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  {#if images.length > visibleItems}
    <button class="nav-btn prev" on:click={prevSlide} aria-label="Previous image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <button class="nav-btn next" on:click={nextSlide} aria-label="Next image">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  {/if}
</div>

<style>
  .carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--color-background, #0f172a);
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .carousel-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
    height: 400px;
  }

  .carousel-slide {
    position: relative;
    flex-shrink: 0;
    height: 100%;
  }

  .slide-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .slide-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .carousel-slide:hover .slide-content img {
    transform: scale(1.05);
  }

  .slide-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem 1.5rem;
    background: linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 100%);
    color: white;
    text-align: center;
  }

  .slide-text {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  /* Lightning Divider */
  .lightning-divider {
    position: absolute;
    top: 0;
    right: -25px; /* Offset to overlap the next slide slightly */
    width: 50px;
    height: 100%;
    z-index: 10;
    pointer-events: none;
    filter: drop-shadow(0px 0px 5px rgba(0,0,0,0.3));
  }

  .bolt-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Navigation Buttons */
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(4px);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.3s ease;
  }

  .nav-btn:hover {
    background: white;
    color: #0f172a;
    box-shadow: 0 0 15px rgba(255,255,255,0.5);
  }

  .prev { left: 1rem; }
  .next { right: 1rem; }

  @media (max-width: 768px) {
    .carousel-track {
      height: 300px;
    }
    .lightning-divider {
      right: -15px;
      width: 30px;
    }
  }
</style>
