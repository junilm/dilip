<script>
	import "../app.css";
	import Navigation from "$lib/components/Navigation.svelte";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";

	let { children } = $props();
</script>

<div class="app">
	<Navigation />

	<main>
		{@render children()}
	</main>

	<footer>
		<div class="container">
			<div class="footer-content">
				<div class="footer-section">
					<h3>Dilip Shakya</h3>
					<p>Tour and Trekking Guide</p>
					<p>Lalitpur, Nepal</p>
				</div>

				<div class="footer-section">
					<h4>Contact</h4>
					<a href="mailto:info@dilipshakya.com.np"
						>info@dilipshakya.com.np</a
					>
				</div>

				<div class="footer-section">
					<h4>Follow Me</h4>
					<div class="social-links">
						<a
							href="https://www.facebook.com/dilip.shakya.750"
							target="_blank"
							rel="noopener noreferrer"
						>
							Facebook
						</a>
						<a
							href="https://www.instagram.com/whiteyshakyadilip/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Instagram
						</a>
					</div>
				</div>
			</div>

			<div class="footer-bottom">
				<p>
					&copy; {new Date().getFullYear()} Dilip Shakya. All rights reserved.
				</p>
			</div>
		</div>
	</footer>

	<ThemeToggle />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	footer {
		background: var(--color-bg-secondary);
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding: var(--space-16) 0 var(--space-8);
		margin-top: var(--space-20);
	}

	.footer-content {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: var(--space-8);
		margin-bottom: var(--space-8);
	}

	.footer-section h3 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--space-3);
		background: var(--color-accent-gradient);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.footer-section h4 {
		font-size: var(--font-size-lg);
		margin-bottom: var(--space-3);
		color: var(--color-text-primary);
	}

	.footer-section p {
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2);
	}

	.footer-section a {
		display: block;
		color: var(--color-text-secondary);
		margin-bottom: var(--space-2);
		transition: color var(--transition-fast);
	}

	.footer-section a:hover {
		color: var(--color-accent-primary);
	}

	.social-links {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.footer-bottom {
		text-align: center;
		padding-top: var(--space-8);
		border-top: 1px solid rgba(255, 255, 255, 0.05);
		color: var(--color-text-tertiary);
	}

	@media (max-width: 768px) {
		footer {
			padding: var(--space-12) 0 var(--space-6);
		}

		.footer-content {
			grid-template-columns: 1fr;
			gap: var(--space-6);
		}
	}
</style>
