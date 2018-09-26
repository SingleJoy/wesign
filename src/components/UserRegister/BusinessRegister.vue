<template>
    <div class="CompanyRegister">
        <BusinessRegisters></BusinessRegisters>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import BusinessRegisters from './BusinessRegisters.vue'
    import Bottom from '../../common/components/Bottom'
    export default {
        name: 'CompanyRegister',
        components: {
            BusinessRegisters,Bottom
        }
    }
</script>
