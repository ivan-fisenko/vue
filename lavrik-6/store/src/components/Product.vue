<template>
	<div>
		<h2>Product title</h2>
		<div class="price">{{ price }}</div>
		<hr>
		<button class="btn btn-warning" @click="updateCount(cnt-1)">-1</button>
		<input type="text" :value="cnt" @change="onInput" ref="inp">
		<button class="btn btn-success" @click="updateCount(cnt+1)">+1</button>
	</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';

	export default {
		computed: mapGetters(['price', 'cnt']),
		methods: {
			...mapActions(['updateCount']),
			onInput(e){
				this.updateCount(e.target.value);
				this.$nextTick(() => {
					this.$refs.inp.value = parseInt(this.$refs.inp.value);
				});
			}
		}
	}
</script>