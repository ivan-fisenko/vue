<template>
	<div class="container mt-3">
		<form v-if="!sent">
			<b-progress :max="info.length" :value="fieldsDone"></b-progress>
			<div>
				<app-field 
					v-for="(field, i) in info"
					:key="i"
					:value="field.value"	
					:name="field.name"	
					:valid="field.valid"
					@updated="onInput(i, $event)"
				></app-field>
			</div>
			<button class="btn btn-primary" type="button"  v-b-modal.modal-dialog :disabled="!formReady">
				Send Data
			</button>
		</form>
		<div v-else>
			<table class="table table-bordered">
				<tr v-for="(item, i) in info" :key="i">
					<td>{{ item.name }}</td>
					<td>{{ item.value }}</td>
				</tr>
			</table>
		</div>
		<b-modal id="modal-dialog" title="Вы уверены?"
				 @ok="handleOk">
			<p class="my-4">Вы действительно хотите отправить форму?</p>
		</b-modal>
	</div>
</template>
<script>
import AppField from '@/components/Field.vue'
import { BProgress, BModal } from 'bootstrap-vue'

export default {
	components: {
		AppField,
		BProgress,
		BModal
	},
	data() {
		return {
			info: [
				{
					name: 'Name',
					value: '',
					pattern: /^[a-zA-Z ]{2,30}$/
				},
				{
					name: 'Phone',
					value: '',
					pattern: /^[0-9]{7,14}$/
				},
				{
					name: 'Email',
					value: '',
					pattern: /.+/
				},
				{
					name: 'Some Field 1',
					value: '',
					pattern: /.+/
				},
				{
					name: 'Some Field 2',
					value: '',
					pattern: /.+/
				}
			],
			sent: false
		}
	},
	computed: {
		fieldsDone(){
			return this.info.reduce((total, field) => {
				return total + (field.valid ? 1 : 0);
			}, 0);
		},
		formReady(){
			return this.fieldsDone === this.info.length;
		}
	},
	methods: {
		onInput(i, value){
			let field = this.info[i];
			field.value = value.trim();
			field.valid = field.pattern.test(field.value);
		},
		handleOk(e) {
			// Prevent modal from closing
			e.preventDefault()
			// Trigger submit handler
			this.handleSubmit()
		},
		handleSubmit() {
			this.sent = true;
			// Hide the modal manually
			this.$nextTick(() => {
				this.$bvModal.hide('modal-dialog');
			})
		}
	},
	created(){
		return this.info.forEach(field => {
			this.$set(field, 'valid', field.pattern.test(field.value)); 
		});
	}
}
</script>