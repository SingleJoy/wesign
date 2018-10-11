<template>
    <div class="BusinessRegister">
        <BusinessRegisters></BusinessRegisters>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import BusinessRegisters from './BusinessRegisters.vue'
    import Bottom from '../../common/components/Bottom'
    export default {
        name: 'BusinessRegister',
        components: {
            BusinessRegisters,Bottom
        }
    }
</script>
