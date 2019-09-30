<template>
	<div>
		<button class="primary-btn" @click="clickDispatch">Dispatch Action</button>
		<div class="payload" v-show="basicPayload">
			<p>Generated payload</p>
			<pre>{{ basicPayload }}</pre>
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				basicPayload: null
			};
		},
		methods: {
			clickDispatch: async function() {
				const payload = await this.$dispatcher("basic").execute();
				this.basicPayload = JSON.stringify(payload);
			}
		}
	};
</script>

<style>
	.primary-btn {
		margin-top: 20px;
		font-size: 15px;
		padding: 15px 30px;
		background-color: #41b882;
		color: white;
		border-radius: 30px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.primary-btn:hover {
		background-color: #2c3e50;
	}

	.payload {
		padding-top: 15px;
	}
</style>