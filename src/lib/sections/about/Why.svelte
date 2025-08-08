<script lang="ts">
	import Panel from "$lib/components/visual/Panel.svelte";
	import { MessageCircleQuestionIcon } from "lucide-svelte";
</script>

<Panel class="flex flex-col gap-3 p-6">
	<h2 class="text-2xl font-bold flex items-center">
		<div
			class="rounded-full bg-accent-pink p-2 inline-block mr-3 w-10 h-10"
		>
			<MessageCircleQuestionIcon color="black" />
		</div>
		为什么选择VERT？
	</h2>
	<p class="text-lg font-normal">
		<b>文件转换器总是让我们失望。</b>它们很丑，充斥着广告，最重要的是；很慢。我们决定一劳永逸地解决这个问题，制作一个解决所有这些问题的替代方案，甚至更多。<br />
		<br />
		所有非视频文件都在设备上完全转换；这意味着在向服务器发送和接收文件之间没有延迟，我们也永远不会窥探您转换的文件。
		<br />
		<br />
		视频文件会上传到我们超快的RTX 4000 Ada服务器。如果您不转换它们，您的视频会在那里停留一小时。如果您确实转换了文件，视频将在服务器上停留一小时，或直到下载完成。
		然后文件将从我们的服务器中删除。
	</p>
</Panel>
