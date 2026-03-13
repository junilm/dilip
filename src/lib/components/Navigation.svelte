<script>
    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<nav class="nav">
    <div class="container">
        <div class="nav-content">
            <a href="/" class="logo" onclick={closeMenu}>
                <span class="gradient-text">Dilip Shakya</span>
            </a>

            <button
                class="menu-toggle"
                onclick={toggleMenu}
                aria-label="Toggle menu"
            >
                <span class:open={isMenuOpen}></span>
                <span class:open={isMenuOpen}></span>
                <span class:open={isMenuOpen}></span>
            </button>

            <div class="nav-links" class:open={isMenuOpen}>
                <a href="/" onclick={closeMenu}>Home</a>
                <a href="/blog" onclick={closeMenu}>Blog</a>
                <a href="/#about" onclick={closeMenu}>About</a>
                <a href="/#contact" onclick={closeMenu}>Contact</a>
            </div>
        </div>
    </div>
</nav>

<style>
    .nav {
        position: sticky;
        top: 0;
        z-index: 100;
        background: rgba(17, 24, 39, 0.8);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: var(--space-4) 0;
    }

    .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        font-family: var(--font-heading);
        font-size: var(--font-size-2xl);
        font-weight: 700;
        text-decoration: none;
    }

    .menu-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: var(--space-2);
    }

    .menu-toggle span {
        width: 25px;
        height: 3px;
        background: var(--color-text-primary);
        border-radius: var(--radius-full);
        transition: all var(--transition-base);
    }

    .menu-toggle span.open:nth-child(1) {
        transform: rotate(45deg) translate(7px, 7px);
    }

    .menu-toggle span.open:nth-child(2) {
        opacity: 0;
    }

    .menu-toggle span.open:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }

    .nav-links {
        display: flex;
        gap: var(--space-8);
        align-items: center;
    }

    .nav-links a {
        font-family: var(--font-heading);
        font-weight: 500;
        font-size: var(--font-size-base);
        color: var(--color-text-secondary);
        text-decoration: none;
        transition: color var(--transition-fast);
        position: relative;
    }

    .nav-links a::after {
        content: "";
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--color-accent-gradient);
        transition: width var(--transition-base);
    }

    .nav-links a:hover {
        color: var(--color-text-primary);
    }

    .nav-links a:hover::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .menu-toggle {
            display: flex;
        }

        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: rgba(17, 24, 39, 0.98);
            backdrop-filter: blur(10px);
            padding: var(--space-8);
            gap: var(--space-6);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            transition: all var(--transition-base);
            pointer-events: none;
        }

        .nav-links.open {
            transform: translateY(0);
            opacity: 1;
            pointer-events: all;
        }

        .nav-links a {
            font-size: var(--font-size-lg);
        }
    }

    /* Light Mode Navigation Styles */
    :global([data-theme="light"]) .nav {
        background: rgba(255, 255, 255, 0.9);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    :global([data-theme="light"]) .nav-links a {
        color: var(--color-text-secondary);
    }

    :global([data-theme="light"]) .nav-links a:hover {
        color: var(--color-text-primary);
    }

    @media (max-width: 768px) {
        :global([data-theme="light"]) .nav-links {
            background: rgba(255, 255, 255, 0.98);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
    }
</style>
