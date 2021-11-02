<script>
	import { onMount } from 'svelte';

	// Show mobile icon and display menu
	let showMobileMenu = false;

	// List of navigation items
	const navItems = [
		{ label: 'Map', href: '/map' },
		{ label: 'Characters', href: '#' },
		{ label: 'Community', href: '#' }
	];

	// Mobile menu click event handler
	const handleMobileIconClick = () => (showMobileMenu = !showMobileMenu);

	// Media match query handler
	const mediaQueryHandler = (e) => {
		// Reset mobile state
		if (!e.matches) {
			showMobileMenu = false;
		}
	};

	// Attach map query listener on mount hook
	onMount(() => {
		const mediaListener = window.matchMedia('(max-width: 767px)');

		mediaListener.addListener(mediaQueryHandler);
	});
</script>

<nav class="bg-opacity-0 relative z-10">
	<div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
		<div id="navbar" class="relative flex items-center justify-between h-16">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					on:click={handleMobileIconClick}
					type="button"
					class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
				>
					<span class="sr-only">Open main menu</span>
					<!--
						Icon when menu is closed.

						Heroicon name: outline/menu

						Menu open: "hidden", Menu closed: "block"
					-->
					<svg
						class="block h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
					<!--
						Icon when menu is open.

						Heroicon name: outline/x

						Menu open: "block", Menu closed: "hidden"
					-->
					<svg
						class="hidden h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex-shrink-0 flex items-center">
					<a href="/">
						<img
							class="lg:block h-12 w-auto"
							src="https://static.wikia.nocookie.net/typemoon/images/b/bf/Wiki_wide.png"
							alt="Workflow"
						/>
					</a>
				</div>
				<div class="hidden sm:block sm:ml-6">
					<ul
						class={`navbar-list${showMobileMenu ? ' mobile' : ''} flex items-center justify-center`}
					>
						{#each navItems as item}
							<li>
								<a
									class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md flex text-xl font-medium"
									aria-current="page"
									href={item.href}>{item.label}</a
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if showMobileMenu}
		<div class="sm:hidden" id="mobile-menu">
			<div class="px-2 pt-2 pb-3 space-y-1">
				<ul class={`navbar-list${showMobileMenu ? ' mobile' : ''}`}>
					{#each navItems as item}
						<li>
							<a
								class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md flex text-sm font-medium"
								aria-current="page"
								href={item.href}>{item.label}</a
							>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	{/if}
</nav>
