<script lang="ts" module>
	export interface Donor {
		name: string;
		amount: number;
		avatar: string;
	}
</script>

<script lang="ts">
	import { goto } from "$app/navigation";

	import { page } from "$app/state";

	import {
		PUB_DONATION_URL,
		PUB_HOSTNAME,
		PUB_STRIPE_KEY,
	} from "$env/static/public";

	// import { PUB_STRIPE_KEY, PUB_DONATION_API } from "$env/static/public";
	import { fade } from "$lib/animation";
	import FancyInput from "$lib/components/functional/FancyInput.svelte";
	import Panel from "$lib/components/visual/Panel.svelte";
	import { effects } from "$lib/store/index.svelte";
	import { addToast } from "$lib/store/ToastProvider";
	import {
		loadStripe,
		type Stripe,
		type StripeElements,
	} from "@stripe/stripe-js";
	import clsx from "clsx";
	import {
		CalendarHeartIcon,
		HandCoinsIcon,
		HeartIcon,
		WalletIcon,
	} from "lucide-svelte";
	import { onMount, tick } from "svelte";
	import { Elements, PaymentElement } from "svelte-stripe";
	import { quintOut } from "svelte/easing";

	let amount = $state(1);
	let customAmount = $state("");
	let type = $state("one-time");
	let stripe = $state<Stripe | null>(null);

	const presetAmounts = [1, 10, 25];

	let paymentState = $state<"prepay" | "fetching" | "details">("prepay");
	let enablePay = $state(false);
	let clientSecret = $state<string | null>(null);
	let elements: StripeElements | null = $state(null);

	const amountClick = (preset: number) => {
		amount = preset;
		customAmount = "";
	};

	const paymentClick = async () => {
		if (paymentState !== "prepay") return;
		paymentState = "fetching";
		const res = await fetch(`${PUB_DONATION_URL}/billing`, {
			method: "POST",
			body: (amount * 100).toString(),
		});

		if (!res.ok) {
			paymentState = "prepay";
			addToast(
				"error",
				"获取支付详情时出错。请稍后重试。",
			);
			return;
		}

		const { data }: { data: string } = await res.json();
		clientSecret = data;
		paymentState = "details";
	};

	$effect(() => {
		if (customAmount) {
			amount = parseFloat(customAmount);
		}
	});

	const payDuration = 400;
	const transition = "cubic-bezier(0.23, 1, 0.320, 1)";

	onMount(async () => {
		stripe = await loadStripe(PUB_STRIPE_KEY);
	});

	const donate = async () => {
		if (!stripe || !clientSecret || !elements) return;

		enablePay = false;

		const submitResult = await elements.submit();
		if (submitResult.error) {
			addToast(
				"error",
				`支付失败: ${submitResult.error.message}${submitResult.error.message?.endsWith(".") ? "" : "."} 您没有被收费。`,
			);
			enablePay = true;
			return;
		}

		const res = await stripe.confirmPayment({
			elements,
			clientSecret,
			redirect: "if_required",
			confirmParams: {
				return_url: page.url.toString(),
			},
		});

		if (res.error) {
			addToast(
				"error",
				`支付失败: ${res.error.message}${res.error.message?.endsWith(".") ? "" : "."} 您没有被收费。`,
			);
		} else {
			addToast("success", "感谢您的捐赠！");
		}

		paymentState = "prepay";
		clientSecret = null;
		elements = null;
		amount = 1;
		customAmount = "";
		type = "one-time";
		enablePay = false;

		stripe = await loadStripe(PUB_STRIPE_KEY);
	};

	onMount(() => {
		const status = page.url.searchParams.get("redirect_status");
		if (status) {
			switch (status) {
				case "succeeded":
					addToast("success", "感谢您的捐赠！");
					break;
				default:
					addToast(
						"error",
						"处理您的捐赠时发生错误。请稍后重试。",
					);
			}

			goto("/about");
		}
	});
</script>

<Panel class="flex flex-col gap-8 p-6">
	<div class="flex flex-col gap-3">
		<h2 class="text-2xl font-bold flex items-center">
			<div
				class="rounded-full bg-accent-red p-2 inline-block mr-3 w-10 h-10"
			>
				<HeartIcon color="black" />
			</div>
			捐赠给VERT
		</h2>
		<p class="text-base font-normal">
			有了您的支持，我们可以继续维护和改进VERT。
		</p>
	</div>

	<div
		class="flex flex-col gap-3 w-full overflow-visible"
		style="height: {paymentState !== 'prepay' ? 0 : 124}px;
		transform: scaleY({paymentState !== 'prepay' ? 0 : 1});
		opacity: {paymentState !== 'prepay' ? 0 : 1};
		filter: blur({paymentState !== 'prepay' ? 4 : 0}px);
		transition: height {payDuration}ms {transition}, 
					opacity {payDuration - 200}ms {transition}, 
					transform {payDuration}ms {transition},
					filter {payDuration}ms {transition};"
	>
		<div class="flex gap-3 w-full">
			<button
				onclick={() => (type = "one-time")}
				class={clsx(
					"btn flex-1 p-4 rounded-lg flex items-center justify-center",
					{
						"!scale-100": !$effects,
						"bg-accent-red text-black": type === "one-time",
					},
				)}
			>
				<HandCoinsIcon size="24" class="inline-block mr-2" />
				一次性
			</button>

			<button
				disabled
				onclick={() => (type = "monthly")}
				class={clsx(
					"btn flex-1 p-4 rounded-lg flex items-center justify-center",
					{
						"!scale-100": !$effects,
						"bg-accent-red text-black": type === "monthly",
					},
				)}
			>
				<CalendarHeartIcon size="24" class="inline-block mr-2" />
				每月
			</button>
		</div>
		<div class="grid grid-cols-4 gap-3 w-full">
			{#each presetAmounts as preset, i}
				<button
					onclick={() => amountClick(preset)}
					class={clsx(
						"btn p-4 rounded-lg flex items-center justify-center",
						{
							"!scale-100": !$effects,
							"bg-accent-red text-black": amount === preset,
						},
					)}
					style={i === 2 ? "grid-column: 3;" : ""}
				>
					${preset} USD
				</button>
			{/each}
			<div class="flex items-center justify-center">
				<FancyInput
					bind:value={customAmount}
					placeholder="自定义"
					prefix="$"
					type="number"
				/>
			</div>
		</div>
	</div>

	<div class="flex flex-row justify-center w-full">
		<div
			role="button"
			tabindex="0"
			onkeydown={(e) => {
				if (e.key === "Enter") {
					paymentClick();
				}
			}}
			onclick={paymentClick}
			class={clsx(
				"btn flex-1 p-3 relative rounded-3xl bg-accent-red border-2 border-accent-red h-14 text-black",
				{
					"h-[450px] rounded-2xl bg-transparent cursor-auto !scale-100 -mt-10 -mb-2":
						paymentState !== "prepay",
					"!scale-100": !$effects,
				},
			)}
			style="transition: height {payDuration}ms {transition}, border-radius {payDuration}ms {transition}, background-color {payDuration}ms {transition}, transform {payDuration}ms {transition}, margin {payDuration}ms {transition}; will-change: height, border-radius, background-color, transform, margin;"
		>
			<div class="grid grid-cols-1 grid-rows-1 w-full h-full">
				{#if paymentState !== "prepay"}
					<div
						transition:fade={{
							duration: payDuration,
							easing: quintOut,
						}}
						class="row-start-1 col-start-1 flex w-full h-full flex-col gap-4"
					>
						<div
							class="flex-grow max-h-full overflow-y-auto overflow-x-hidden"
						>
							{#if stripe && clientSecret}
								<Elements {stripe} {clientSecret} bind:elements>
									<PaymentElement
										on:change={(e) => {
											enablePay = e.detail.complete;
										}}
									/>
								</Elements>
							{/if}
						</div>

						<div class="flex-shrink-0">
							<button
								disabled={!stripe ||
									!clientSecret ||
									!enablePay}
								class="btn w-full h-12 bg-accent-red text-black rounded-full mt-4"
								onclick={donate}
							>
								Donate ${amount.toFixed(2)} USD
							</button>
						</div>
					</div>
				{:else}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<div
						transition:fade={{
							duration: payDuration,
							easing: quintOut,
						}}
						onclick={paymentClick}
						class="row-start-1 col-start-1 flex justify-center items-center"
					>
											<WalletIcon size="24" class="inline-block mr-2" />
					立即支付
					</div>
				{/if}
			</div>
		</div>
	</div>
</Panel>
