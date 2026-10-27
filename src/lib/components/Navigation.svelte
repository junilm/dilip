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
                <span class="logo-name">Dilip Shakya</span>
                <span class="logo-tag">Guide · Lalitpur, Nepal</span>
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
                <a href="/blog" onclick={closeMenu}>Journal</a>
                <a href="/#about" onclick={closeMenu}>About</a>
                <a href="/#testimonials" onclick={closeMenu}>Reviews</a>
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
        background: var(--color-bg-primary);
        border-bottom: 1.5px solid var(--color-ink);
        padding: var(--space-4) 0;
    }

    .nav-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        display: flex;
        flex-direction: column;
        line-height: 1.15;
        text-decoration: none;
    }

    .logo-name {
        font-family: var(--font-display);
        font-size: var(--font-size-2xl);
        font-weight: 600;
        color: var(--color-ink);
    }

    .logo-tag {
        font-family: var(--font-mono);
        font-size: 0.65rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--color-brick);
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
        height: 2px;
        background: var(--color-ink);
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
        font-family: var(--font-mono);
        font-weight: 500;
        font-size: var(--font-size-sm);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        color: var(--color-ink-soft);
        text-decoration: none;
        transition: color var(--transition-fast);
        position: relative;
    }

    .nav-links a::after {
        content: "";
        position: absolute;
        bottom: -6px;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--color-brick);
        transition: width var(--transition-base);
    }

    .nav-links a:hover {
        color: var(--color-ink);
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
            top: 73px;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: flex-start;
            background: var(--color-bg-primary);
            padding: var(--space-8);
            gap: var(--space-6);
            border-bottom: 1.5px solid var(--color-ink);
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
            font-size: var(--font-size-base);
        }
    }
</style>
