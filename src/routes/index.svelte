<script context="module">
	export async function load({ fetch }) {
		const post = await fetch(`./loader.json`);
		const slug = 'home';
		if (post.ok) {
			return {
				props: {
					post: await post.json(),
					slug
				}
			};
		}

		return {
			props: {
				post,
				slug
			}
		};
	}
</script>

<script>
	import Content from '$lib/components/content.svelte';
	import Info from '$lib/components/content/info.svelte';

	export let post;
	export let slug;
	$: content = post.db[slug];
</script>

<svelte:head>
	<title>{content.title} | TYPE-MOON Wiki</title>
</svelte:head>

<Content title="Home">
	<Info {content} />
</Content>
