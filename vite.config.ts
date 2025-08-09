import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type PluginOption } from "vite";
import svg from "@poppanator/sveltekit-svg";
import wasm from "vite-plugin-wasm";

export default defineConfig(({ command }) => {
	const plugins: PluginOption[] = [
		sveltekit(),
		svg({
			includePaths: ["./src/lib/assets"],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: { overrides: { removeViewBox: false } },
					},
					{ name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
				],
			},
		}),
	];

	if (command === "serve") {
		plugins.unshift(wasm());
	}

	return {
		plugins,
		worker: {
			plugins: () => [wasm()],
			format: "es",
		},
		optimizeDeps: {
			exclude: ["@ffmpeg/core-mt", "@ffmpeg/ffmpeg", "@ffmpeg/util"],
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern",
				},
			},
		},
		build: {
			target: "esnext",
			base: "./",
		},
	};
});
