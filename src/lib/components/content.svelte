<script>
	import Header from './content/header.svelte';
	export let title;
</script>

<div class="container max-w-screen-xl mx-auto p-8 bg-gray-800 text-white">
	<Header headerTitle={title} /><br />
	<slot />
	<!-- Markdown Content -->
</div>
