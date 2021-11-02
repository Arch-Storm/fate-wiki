<script lang="ts">
	import { onMount } from 'svelte'
	onMount(async () => {
		const PIXI = await import('pixi.js')
		const { Viewport } = await import('pixi-viewport')

		const canvas = document.getElementById('mycanvas')
		const navbar = document.getElementById('navbar')

		const WORLD_WIDTH = window.innerWidth
		const WORLD_HEIGHT = window.innerHeight

		const app = new PIXI.Application({
			resolution: window.devicePixelRatio,
			antialias: true,
			backgroundAlpha: 0
		})

		canvas.appendChild(app.view)

		PIXI.settings.ANISOTROPIC_LEVEL = 16
		PIXI.settings.MIPMAP_TEXTURES = PIXI.MIPMAP_MODES.ON

		const viewport = new Viewport({
			worldWidth: WORLD_WIDTH,
			worldHeight: WORLD_HEIGHT,

			interaction: app.renderer.plugins.interaction
		})

		app.stage.addChild(viewport)

		viewport
			.pinch()
			.wheel({ interrupt: false, smooth: 30 })
			.decelerate({ friction: 0.85 })
			.drag({ pressDrag: true, mouseButtons: 'left', clampWheel: true })
			.clampZoom({
				minScale: 0.85, // minimum scale
				maxScale: 3 // minimum scale
			})
			.clamp({
				left: -viewport.worldWidth * 0.25,
				top: -viewport.worldHeight * 0.25,
				right: viewport.worldWidth * 1.25,
				bottom: viewport.worldHeight * 1.25
			})

		viewport.interactive = true
		viewport.interactiveChildren = true

		const container = new PIXI.Container()
		container.interactive = true
		container.interactiveChildren = true

		const logo = PIXI.Sprite.from('map_2x2.webp');
		logo.x = WORLD_WIDTH * 0.05;
		logo.y = WORLD_HEIGHT * 0.05;
		logo.width = WORLD_WIDTH * 0.9;
		logo.height = (logo.width * 9) / 16; // Gets 16/9 aspect ratio
		logo.interactive = false;

		const arrowTexture = PIXI.Texture.from('arrow-left.png');
		const arrows = [];

		container.x = WORLD_WIDTH * 0.05;
		container.y = WORLD_HEIGHT * 0.05;

		const boxes = {};
		const subboxes = {};
		const boxNames = {
			box_fe: ['el_melloi', 'fate_strange_fake'],
			box_fsn: ['fate_stay_night', 'fate_zero', 'fate_hollow_ataraxia'],
			box_cp: ['carnival_phantasm'],
			box_t: ['tsukihime', 'ka', 'melty_blood'],
			box_knk: ['kara_no_kyoukai', 'mahoyo'],
			box_ex: ['fate_extra', 'fate_extra_ccc']
		};
		for (const [key, value] of Object.entries(boxNames)) {
			boxes[key] = new PIXI.Graphics();
			boxes[key].lineStyle(3, 0x414141);
			boxes[key].beginFill(0xffffff, 0.1);
			boxes[key].interactive = true;
			boxes[key].interactiveChilren = true;
			boxes[key].cursor = 'pointer';
			
			arrows[key] = new PIXI.Sprite(arrowTexture)
			arrows[key].alpha = 0;
			arrows[key].width = WORLD_WIDTH * 0.005;
			arrows[key].height = arrows[key].width;
			arrows[key].interactive = false;

			boxes[key].addChild(arrows[key])

			Object.values(boxNames[key]).forEach((e: string) => {
				subboxes[e] = new PIXI.Graphics();
				subboxes[e].beginFill(0xffffff, 0.000001);
				subboxes[e].lineStyle(3, 0x414141);
				subboxes[e].interactive = false;

				boxes[key].addChild(subboxes[e]);
			});

			container.addChild(boxes[key]);

			let isDragging = false;

			boxes[key].on('pointerdown', () => {
				viewport.on('drag-start', () => {
					isDragging = true;
				});
			});
			boxes[key].on('pointerup', (t) => {
				let wasDragging = isDragging;
				isDragging = false;
				if (!wasDragging) {
					if (
						t.target.width / window.innerWidth >
						t.target.height / (window.innerHeight - navbar.offsetHeight)
					) {
						viewport.snapZoom({
							width: t.target.width * 1.15,
							removeOnComplete: true,
							time: 750,
							interrupt: false
						});
					} else {
						viewport.snapZoom({
							height: t.target.height * 1.15,
							removeOnComplete: true,
							time: 750,
							interrupt: false
						});
					}
					viewport.snap(
						WORLD_WIDTH * 0.05 + t.target.x + t.target.width / 2,
						WORLD_HEIGHT * 0.05 - navbar.offsetHeight / 10 + t.target.y + t.target.height / 2,
						{ removeOnComplete: true, friction: 0, time: 750, interrupt: false }
					);
					Object.values(boxes).forEach((e: PIXI.Graphics2) => {
						e.cursor = 'auto'
						e.interactive = false
					});
					viewport.drag({ pressDrag: false });
					arrows[key].alpha = 1;
					arrows[key].x = 8;
					arrows[key].y = arrows[key].x;
					arrows[key].interactive = true;
					arrows[key].cursor = 'pointer';
					arrows[key].on('click', () => {
						viewport.drag({ pressDrag: true });
						Object.values(boxes).forEach(e => {
							e.cursor = 'pointer'
						});
						setTimeout(() => {
							Object.values(boxes).forEach(e => {
								e.interactive = true
							});
						}, 750);
						arrows[key].alpha = 0;
						arrows[key].interactive = false;
						viewport.clampZoom({
							minWidth: null,
							maxWidth: null,
							minHeight: null,
							maxHeight: null,
							minScale: 0.85,
							maxScale: 49
						});
						viewport.snapZoom({
							width: 1920,
							height: null,
							removeOnComplete: true,
							time: 750,
							interrupt: false
						});
						viewport.snap(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, {
							removeOnComplete: true,
							friction: 0,
							time: 750,
							interrupt: false
						});
						value.forEach((e: string) => {
							subboxes[e].interactive = false;
							subboxes[e].cursor = 'auto';
						});
					});
					value.forEach((e: string) => {
						subboxes[e].interactive = true;
						subboxes[e].cursor = 'pointer';
						subboxes[e].on('click', () => {
							window.location.href = e;
						});
					});
				}
			});
		}

		boxes['box_fsn'].x = (logo.width * 5.5) / 64;
		boxes['box_fsn'].y = (logo.height * 1.5) / 36;
		boxes['box_fe'].x = (logo.width * 23) / 64;
		boxes['box_fe'].y = (logo.height * 10) / 36;
		boxes['box_cp'].x = (logo.width * 26) / 64;
		boxes['box_cp'].y = (logo.height * 20) / 36;
		boxes['box_t'].x = (logo.width * 36) / 64;
		boxes['box_t'].y = (logo.height * 2) / 36;
		boxes['box_knk'].x = (logo.width * 6) / 64;
		boxes['box_knk'].y = (logo.height * 19) / 36;
		boxes['box_ex'].x = (logo.width * 37) / 64;
		boxes['box_ex'].y = (logo.height * 21) / 36;

		subboxes['fate_stay_night'].x = (logo.width * 0.75) / 64;
		subboxes['fate_stay_night'].y = (logo.height * 0.75) / 36;

		boxes['box_fsn'].drawRoundedRect(0, 0, (logo.width * 14) / 64, (logo.height * 15.5) / 36, 10);
		boxes['box_fe'].drawRoundedRect(0, 0, (logo.width * 10) / 64, (logo.height * 7) / 36, 10);
		boxes['box_cp'].drawRoundedRect(0, 0, (logo.width * 7) / 64, (logo.height * 5) / 36, 10);
		boxes['box_t'].drawRoundedRect(0, 0, (logo.width * 8) / 64, (logo.height * 15) / 36, 10);
		boxes['box_knk'].drawRoundedRect(0, 0, (logo.width * 16) / 64, (logo.height * 6) / 36, 10);
		boxes['box_ex'].drawRoundedRect(0, 0, (logo.width * 10) / 64, (logo.height * 3) / 36, 10);

		subboxes['fate_stay_night'].drawRoundedRect(
			0,
			0,
			(logo.width * 12.5) / 64,
			(logo.height * 3.75) / 36,
			5
		);

		viewport.addChild(container);

		viewport.addChild(logo);

		/* Weird sizing stuff */

		app.renderer.resize(WORLD_WIDTH, WORLD_HEIGHT);
		viewport.resize(WORLD_WIDTH, WORLD_HEIGHT, viewport.worldWidth, viewport.worldHeight);

		// Listen for window resize events
		window.addEventListener('resize', onResize);

		function onResize() {
			app.renderer.resize(WORLD_WIDTH, WORLD_HEIGHT);
			viewport.resize(WORLD_WIDTH, WORLD_HEIGHT, viewport.worldWidth, viewport.worldHeight);
		}

		/***

        const line = viewport.addChild(new PIXI.Graphics())
        line.lineStyle(3, 0xff0000).drawRect(0, 0, viewport.worldWidth, viewport.worldHeight)

        const line2 = container.addChild(new PIXI.Graphics())
        line2.lineStyle(3, 0x00ff00).drawRect(0, 0, container.width, container.height)

        const line3 = logo.addChild(new PIXI.Graphics())
        line3.lineStyle(3, 0x0000ff).drawRect(0, 0, logo.width, logo.height)

        /***/
	});
</script>
