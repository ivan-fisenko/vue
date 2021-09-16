import { createStore } from 'vuex'

export default createStore({
	state: {
		cnt: 1,
		price: 1000,
		status: 'none'
	},
	getters: {
		cnt: state => state.cnt,
		price: state => state.price,
		status: state => state.status,
		total(state){
			return state.cnt * state.price;
		}
	},
	mutations: {
		setCnt(state, newCnt){
			state.cnt = newCnt;
		},
		setStatus(state, status){
			state.status = status;
		}
	},
	actions: {
		sendOrder(store){
			store.commit('setStatus', 'pending');

			setTimeout(() => {
				store.commit('setStatus', 'done');
			}, 500);
		},
		updateCount(store, newValue){
			newValue = parseInt(newValue);

			if(isNaN(newValue) || newValue < 1){
				newValue = 1;
			}
			store.commit('setCnt', newValue);
		}
	},
	strict: process.env.NODE_ENV !== 'production',
});

/*
	setCnt(state, p1, p2, ..., pN){
	commit('setCnt', p1, p2, ..., pN)

	mapMutations(['setCnt']) -> set
	set(p1, p2, ..., pN)
*/