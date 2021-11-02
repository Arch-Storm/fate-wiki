<script>
	export let content;
</script>

<!--------------------------------- Right Sidebar/Info ---------------------------------->

{#if content.sidebar}
	<div class="float-right clear-right max-w-xs border border-black ml-4 mb-4">
		<div class="text-xl bg-black text-center p-2 font-bold">{content.title}</div>

		{#each Object.entries(content.sidebar) as [topic, content]}
			{#if topic !== ''}
				<div class="text-md bg-black text-center p-2 font-bold">{topic}</div>
			{/if}

			{#each Object.entries(content) as [key, value]}
				<div class="flex gap-x-2 border-t border-black p-2 text-sm">
					<div class="flex-1 font-bold">{key}:</div>
					{#if Array.isArray(value)}
						<div class="flex-2">{@html value.join('<br>')}</div>
					{:else}
						<div class="flex-2">{value}</div>
					{/if}
				</div>
			{/each}
		{/each}
	</div>
{/if}

<!------------------------------------ Main Content ------------------------------------->

{#if content.type === 'home'}

	{@html content.info}
	
{:else if content.type === 'media'}

	<div class="text-2xl font-bold">Story</div>
	<br />

	{#each Object.entries(content.story) as [topic, content]}
		<div class="text-xl">{topic}</div>
		<br />
		{@html content}<br /><br />
	{/each}

	<div class="text-2xl font-bold">Gameplay</div>
	<br />
	{@html content.gameplay}<br /><br />

	<div class="text-2xl font-bold">Development</div>
	<br />
	{@html content.development}<br /><br />

{:else if content.type === 'character'}

	<div class="text-2xl font-bold">Profile</div>
	<br />

	{#each Object.entries(content.profile) as [topic, content]}
		<div class="text-xl">{topic}</div>
		<br />
		{@html content}<br /><br />
	{/each}

	<div class="text-2xl font-bold">Role</div>
	<br />

	{#each content.roles as role}
		<div class="text-xl">{role.name}</div>
		<br />
		{@html role.info}<br /><br />
	{/each}

	<div class="text-2xl font-bold">Abilities</div>
	<br />
	{@html content.abilities_pre}<br /><br />
	{#each content.abilities as ability}
		<div class="text-xl">{ability.name}</div>
		<br />
		{@html ability.info}<br /><br />
	{/each}

	<div class="text-2xl font-bold">Development</div>
	<br />

	<div class="text-xl">Creation and Conception</div>
	<br />
	{@html content.creation}<br /><br />

	<div class="text-xl">Potential Routes</div>
	<br />
	{@html content.routes}<br /><br />

	<div class="text-xl">Reception</div>
	<br />
	{@html content.reception}

{/if}
