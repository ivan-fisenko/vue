<template>
    <div class="form-group">
        <label>{{ name }}</label>
        <transition name="icon" mode="out-in">
            <fa-icon :class="iconClasses" :name="icon"
					 :key="icon"
                     v-if="activated"></fa-icon>
        </transition>
        <input :value="value"
               @input="onInput"
               class="form-control"
               type="text"
        >
    </div>
</template>
<script>
    import FaIcon from 'vue-awesome/components/Icon'
    import 'vue-awesome/icons/check-circle'
    import 'vue-awesome/icons/exclamation-circle'
    import "animate.css"

    export default {
        components: {
            FaIcon
        },
        props: ['name', 'value', 'valid'],
        data() {
            return {

                activated: this.value !== ''

            }
        },
        computed: {
            icon() {
                return this.valid ? 'check-circle' : 'exclamation-circle';
            },
            iconClasses() {
                return this.valid ? 'text-success' : 'text-danger';
            }
        },
        methods: {
            onInput(e) {
                this.activated = true;
                this.$emit('updated', e.target.value);
            }
        }
    }
</script>

<style>
    .icon-enter-active {
        animation: flip;
        animation-duration: .5s;
    }

    .icon-leave-active {
        animation: flip reverse;
        animation-duration: .5s;
    }
</style>