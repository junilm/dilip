<script>
    let photos = [
        {
            src: "/images/gallery-1.jpg",
            alt: "Trekking in the Himalayas",
            span: "tall", // tall, wide, or normal
        },
        {
            src: "/images/gallery-2.jpg",
            alt: "Kathmandu Durbar Square",
            span: "wide",
        },
        {
            src: "/images/panauti.jpg",
            alt: "Ancient temple in Panauti",
            span: "normal",
        },
        {
            src: "/images/newari-food.jpg",
            alt: "Traditional Newari cuisine",
            span: "normal",
        },
        {
            src: "/images/welcome.jpg",
            alt: "Himalayan mountain view",
            span: "wide",
        },
        {
            src: "/images/earthquake.jpg",
            alt: "Prayer flags memorial",
            span: "normal",
        },
    ];

    let lightboxOpen = $state(false);
    let currentImageIndex = $state(0);

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxOpen = true;
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightboxOpen = false;
        document.body.style.overflow = "";
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % photos.length;
    }

    function prevImage() {
        currentImageIndex =
            (currentImageIndex - 1 + photos.length) % photos.length;
    }

    function handleKeydown(event) {
        if (!lightboxOpen) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") nextImage();
        if (event.key === "ArrowLeft") prevImage();
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<section class="gallery">
    <div class="container">
        <div class="section-header">
            <span class="eyebrow">Field Notes</span>
            <h2>Gallery</h2>
            <p>Moments from journeys across Nepal</p>
        </div>

        <div class="masonry-grid">
            {#each photos as photo, index}
                <button
                    class="gallery-item {photo.span}"
                    onclick={() => openLightbox(index)}
                    type="button"
                >
                    <img src={photo.src} alt={photo.alt} />
                    <div class="overlay">
                        <p>{photo.alt}</p>
                    </div>
                </button>
            {/each}
        </div>
    </div>
</section>

<!-- Lightbox -->
{#if lightboxOpen}
    <div class="lightbox" onclick={closeLightbox}>
        <button
            class="close-btn"
            onclick={closeLightbox}
            type="button"
            aria-label="Close"
        >
            ✕
        </button>

        <button
            class="nav-btn prev"
            onclick={(e) => {
                e.stopPropagation();
                prevImage();
            }}
            type="button"
            aria-label="Previous image"
        >
            ‹
        </button>

        <div class="lightbox-content" onclick={(e) => e.stopPropagation()}>
            <img
                src={photos[currentImageIndex].src}
                alt={photos[currentImageIndex].alt}
            />
            <p class="lightbox-caption">{photos[currentImageIndex].alt}</p>
            <p class="lightbox-counter">
                {currentImageIndex + 1} / {photos.length}
            </p>
        </div>

        <button
            class="nav-btn next"
            onclick={(e) => {
                e.stopPropagation();
                nextImage();
            }}
            type="button"
            aria-label="Next image"
        >
            ›
        </button>
    </div>
{/if}

<style>
    .gallery {
        padding: var(--space-20) 0;
        background: var(--color-bg-primary);
    }

    .section-header {
        text-align: center;
        margin-bottom: var(--space-12);
    }

    .section-header .eyebrow {
        justify-content: center;
    }

    .section-header h2 {
        margin-bottom: var(--space-3);
    }

    .section-header p {
        font-size: var(--font-size-lg);
        color: var(--color-ink-soft);
    }

    .masonry-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        grid-auto-rows: 200px;
        gap: var(--space-3);
    }

    .gallery-item {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        transition: transform var(--transition-base);
        background: var(--color-bg-secondary);
        border: 1.5px solid var(--color-ink);
        padding: 0;
        width: 100%;
        display: block;
    }

    .gallery-item.tall {
        grid-row: span 2;
    }

    .gallery-item.wide {
        grid-column: span 2;
    }

    .gallery-item:hover {
        transform: translateY(-4px);
        z-index: 10;
        box-shadow: var(--shadow-lg);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform var(--transition-slow);
        filter: sepia(0.08) saturate(1.05);
    }

    .gallery-item:hover img {
        transform: scale(1.06);
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            to top,
            rgba(43, 32, 24, 0.88) 0%,
            rgba(43, 32, 24, 0.3) 55%,
            transparent 100%
        );
        display: flex;
        align-items: flex-end;
        padding: var(--space-4);
        opacity: 0;
        transition: opacity var(--transition-base);
        pointer-events: none;
    }

    .gallery-item:hover .overlay {
        opacity: 1;
    }

    .overlay p {
        color: var(--color-bg-primary);
        font-family: var(--font-mono);
        font-weight: 500;
        font-size: var(--font-size-sm);
        letter-spacing: 0.02em;
        margin: 0;
    }

    /* Lightbox Styles */
    .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(20, 26, 36, 0.96);
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease-out;
    }

    .lightbox-content {
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: scaleIn 0.3s ease-out;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border: 1.5px solid var(--color-brass);
    }

    .lightbox-caption {
        color: var(--color-bg-primary);
        font-family: var(--font-mono);
        font-size: var(--font-size-base);
        margin-top: var(--space-4);
        text-align: center;
    }

    .lightbox-counter {
        color: var(--color-brass);
        font-family: var(--font-mono);
        font-size: var(--font-size-sm);
        margin-top: var(--space-2);
    }

    .close-btn {
        position: absolute;
        top: var(--space-6);
        right: var(--space-6);
        background: transparent;
        border: 1.5px dashed var(--color-brass);
        color: var(--color-brass);
        font-size: var(--font-size-2xl);
        width: 46px;
        height: 46px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-base);
        z-index: 1001;
    }

    .close-btn:hover {
        background: var(--color-brass);
        color: var(--color-indigo);
    }

    .nav-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: 1.5px dashed var(--color-brass);
        color: var(--color-brass);
        font-size: var(--font-size-4xl);
        width: 54px;
        height: 54px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all var(--transition-base);
        z-index: 1001;
    }

    .nav-btn:hover {
        background: var(--color-brass);
        color: var(--color-indigo);
        transform: translateY(-50%) scale(1.06);
    }

    .nav-btn.prev {
        left: var(--space-6);
    }

    .nav-btn.next {
        right: var(--space-6);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @media (max-width: 768px) {
        .gallery {
            padding: var(--space-12) 0;
        }

        .masonry-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            grid-auto-rows: 150px;
            gap: var(--space-3);
        }

        .gallery-item.wide {
            grid-column: span 1;
        }

        .overlay p {
            font-size: var(--font-size-base);
        }
    }
</style>
