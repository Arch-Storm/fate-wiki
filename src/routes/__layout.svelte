<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../app.css';
</script>

<main class="w-full h-full bg-gradient">
	<Navbar />

	<slot />
</main>
