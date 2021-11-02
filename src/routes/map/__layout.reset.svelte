<script>
	import Navbar from '$lib/components/navbar.svelte';
	import '../../app.css';
</script>

<main class="w-full h-screen bg-gray-900">
	<Navbar />

	<slot />
</main>
