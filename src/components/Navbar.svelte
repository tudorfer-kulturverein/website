<script>
  import { slide, fade, fly } from 'svelte/transition';

  // Svelte 5 Runes for props
  let { navItems = [], base = '', currentPath = '' } = $props();

  let isMenuOpen = $state(false);
  let activeMobileDropdowns = $state({}); // Track open state of dropdowns on mobile

  const isActiveLink = (path) => {
    if (!path || path === '#') return false;
    const p1 = path.endsWith('/') ? path.slice(0, -1) : path;
    const p2 = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
    return p1 === p2;
  };

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function toggleMobileDropdown(title, event) {
    event?.preventDefault();
    activeMobileDropdowns[title] = !activeMobileDropdowns[title];
  }

  // Prevent page scroll when mobile menu is open
  $effect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  });
</script>

<header class="site-header">
  <div class="container header-container">
    <!-- Logo -->
    <a href={base} class="logo" onclick={() => isMenuOpen = false}>
      <img src={`${base}logo.png`} alt="TUKUJU Logo" class="logo-img" />
      <div class="logo-text-wrapper">
        <span class="logo-title">Tudorfer Kulturverein</span>
        <span class="logo-subtitle">für junge Unterhaltung e.V.</span>
      </div>
    </a>

    <!-- Desktop Navigation -->
    <nav class="desktop-nav">
      <ul class="nav-list">
        <li>
          <a href={base} class="nav-link" class:active={isActiveLink(base)}>
            Home
          </a>
        </li>
        
        {#each navItems as item}
          {#if item.isDropdown}
            {@const isAnyChildActive = item.children?.some(child => isActiveLink(child.href)) || isActiveLink(item.href)}
            <li class="nav-item-dropdown">
              <a class="nav-link" class:active={isAnyChildActive} href={item.href === '#' ? undefined : undefined}>
                {item.title}
                <svg class="dropdown-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>
              <ul class="dropdown-menu">
                {#each item.children || [] as child}
                  <li>
                    <a href={child.href} class="dropdown-link" class:active={isActiveLink(child.href)}>
                      {child.title}
                    </a>
                  </li>
                {/each}
              </ul>
            </li>
          {:else}
            <li>
              <a href={item.href} class="nav-link" class:active={isActiveLink(item.href)}>
                {item.title}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>

    <!-- Hamburger Menu Toggle Button -->
    <button 
      class="hamburger-btn" 
      aria-label="Toggle navigation menu" 
      aria-expanded={isMenuOpen} 
      onclick={toggleMenu}
    >
      <div class="hamburger-box" class:open={isMenuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  </div>

  <!-- Mobile Overlay & Drawer Menu -->
  {#if isMenuOpen}
    <div class="mobile-menu-overlay" transition:fade={{ duration: 200 }} onclick={toggleMenu} onkeydown={(e) => e.key === 'Escape' && toggleMenu()} role="presentation">
      <div class="mobile-menu-container" transition:fly={{ y: -15, duration: 300 }} onclick={(e) => e.stopPropagation()} onkeydown={(e) => e.stopPropagation()} role="presentation">
        <ul class="mobile-nav-list">
          <li transition:fly={{ y: 15, delay: 50, duration: 250 }}>
            <a href={base} class="mobile-nav-link" class:active={isActiveLink(base)} onclick={toggleMenu}>
              Home
            </a>
          </li>
          
          {#each navItems as item, i}
            <li transition:fly={{ y: 15, delay: 80 + i * 40, duration: 250 }}>
              {#if item.isDropdown}
                {@const isAnyChildActive = item.children?.some(child => isActiveLink(child.href))}
                <div class="mobile-nav-item-dropdown">
                  <button 
                    class="mobile-nav-dropdown-toggle" 
                    class:active={isAnyChildActive}
                    onclick={(e) => toggleMobileDropdown(item.title, e)}
                    aria-expanded={!!activeMobileDropdowns[item.title]}
                  >
                    <span>{item.title}</span>
                    <svg 
                      class="dropdown-svg-mobile" 
                      class:rotated={activeMobileDropdowns[item.title]} 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      stroke-width="2.5" 
                      stroke-linecap="round" 
                      stroke-linejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  {#if activeMobileDropdowns[item.title]}
                    <ul class="mobile-dropdown-menu" transition:slide={{ duration: 200 }}>
                      {#each item.children || [] as child}
                        <li>
                          <a 
                            href={child.href} 
                            class="mobile-dropdown-link" 
                            class:active={isActiveLink(child.href)} 
                            onclick={toggleMenu}
                          >
                            {child.title}
                          </a>
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </div>
              {:else}
                <a 
                  href={item.href} 
                  class="mobile-nav-link" 
                  class:active={isActiveLink(item.href)} 
                  onclick={toggleMenu}
                >
                  {item.title}
                </a>
              {/if}
            </li>
          {/each}
        </ul>
      </div>
    </div>
  {/if}
</header>

<style>
  /* Header & Navigation */
  .site-header {
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;
    transition: all var(--transition-normal);
    width: 100%;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4.5rem;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }

  .logo-img {
    height: 3.2rem;
    width: auto;
    object-fit: contain;
  }

  .logo-text-wrapper {
    display: flex;
    flex-direction: column;
    line-height: 1.1;
    justify-content: center;
  }

  .logo-title {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    font-weight: 800;
    background: var(--gradient-hero);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .logo-subtitle {
    font-family: var(--font-body);
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-top: 0.1rem;
    display: block;
    white-space: nowrap;
  }

  .desktop-nav {
    display: block;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 2rem;
  }

  .nav-link {
    font-weight: 500;
    color: var(--color-text-muted);
    font-size: 0.95rem;
    position: relative;
    padding: 0.25rem 0;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    transition: color var(--transition-fast);
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--color-primary);
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width var(--transition-normal);
  }

  .nav-link:hover::after,
  .nav-link.active::after {
    width: 100%;
  }

  /* Dropdown Navigation Menu */
  .nav-item-dropdown {
    position: relative;
    cursor: pointer;
  }

  .dropdown-svg {
    margin-left: 7px;
    transition: transform var(--transition-fast);
  }

  .nav-item-dropdown:hover .dropdown-svg {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    min-width: 200px;
    padding: 0.75rem 0;
    margin: 0;
    list-style: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity var(--transition-normal), transform var(--transition-normal), visibility var(--transition-normal);
    z-index: 200;
    display: flex;
    flex-direction: column;
  }

  .nav-item-dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }

  .dropdown-link {
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text-muted);
    padding: 0.5rem 1.25rem;
    display: block;
    text-decoration: none;
    transition: background-color var(--transition-fast), color var(--transition-fast);
  }

  .dropdown-link:hover,
  .dropdown-link.active {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
  }

  /* Hamburger Toggle Button */
  .hamburger-btn {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 101;
    border-radius: var(--radius-sm);
    transition: background-color var(--transition-fast);
  }

  .hamburger-btn:hover {
    background-color: var(--color-primary-light);
  }

  .hamburger-box {
    width: 24px;
    height: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
  }

  .hamburger-box span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--color-text-main);
    border-radius: var(--radius-full);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hamburger-box.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger-box.open span:nth-child(2) {
    opacity: 0;
    width: 0;
  }

  .hamburger-box.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Mobile Drawer Menu */
  .mobile-menu-overlay {
    position: fixed;
    top: 4.5rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(15, 23, 42, 0.2); /* Subtle dark overlay */
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 99;
    display: flex;
    justify-content: flex-start;
  }

  .mobile-menu-container {
    width: 100%;
    height: calc(100vh - 4.5rem);
    background-color: rgba(255, 255, 255, 0.98);
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-lg);
    padding: 1.5rem 2rem 2.5rem;
    overflow-y: auto;
  }

  .mobile-nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .mobile-nav-link {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    color: var(--color-text-main);
    text-decoration: none;
    display: inline-flex;
    position: relative;
    padding: 0.25rem 0;
    transition: color var(--transition-fast);
  }

  .mobile-nav-link:hover,
  .mobile-nav-link.active {
    color: var(--color-primary);
  }

  .mobile-nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--color-primary);
    transition: width var(--transition-normal);
  }

  .mobile-nav-link:hover::after,
  .mobile-nav-link.active::after {
    width: 100%;
  }

  .mobile-nav-item-dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .mobile-nav-dropdown-toggle {
    font-family: var(--font-heading);
    font-size: 1.35rem;
    color: var(--color-text-main);
    background: none;
    border: none;
    padding: 0;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: color var(--transition-fast);
  }

  .mobile-nav-dropdown-toggle span {
    position: relative;
    padding: 0.25rem 0;
  }
  
  .mobile-nav-dropdown-toggle span::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background: var(--color-primary);
    transition: width var(--transition-normal);
  }

  .mobile-nav-dropdown-toggle:hover,
  .mobile-nav-dropdown-toggle.active {
    color: var(--color-primary);
  }
  
  .mobile-nav-dropdown-toggle:hover span::after,
  .mobile-nav-dropdown-toggle.active span::after {
    width: 100%;
  }

  .dropdown-svg-mobile {
    color: var(--color-text-light);
    transition: transform var(--transition-normal), color var(--transition-fast);
  }

  .dropdown-svg-mobile.rotated {
    transform: rotate(180deg);
    color: var(--color-primary);
  }

  .mobile-dropdown-menu {
    list-style: none;
    padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 0;
    border-left: 2px solid var(--color-primary-light);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.25rem;
    width: 100%;
  }

  .mobile-dropdown-link {
    font-family: var(--font-body);
    font-weight: 500;
    font-size: 1.05rem;
    color: var(--color-text-muted);
    text-decoration: none;
    display: inline-flex;
    position: relative;
    padding: 0.25rem 0;
    transition: color var(--transition-fast);
  }

  .mobile-dropdown-link:hover,
  .mobile-dropdown-link.active {
    color: var(--color-primary);
  }

  .mobile-dropdown-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transition: width var(--transition-normal);
  }

  .mobile-dropdown-link:hover::after,
  .mobile-dropdown-link.active::after {
    width: 100%;
  }

  /* Responsive media query breakpoints */
  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .hamburger-btn {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
