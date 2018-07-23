<template>
    <div class='Enterprise'>
        <Enterprises></Enterprises>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import Enterprises from './Enterprises.vue'
    import Bottom from '../../../common/components/Bottom.vue'
    export default {
        name: 'Enterprise',
            components: {
            Bottom,
            Enterprises
        }
    }
</script>
