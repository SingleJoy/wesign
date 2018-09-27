<template>
    <div class="IndividualRegister">
        <LoginTop></LoginTop>
        <IndividualRegisters></IndividualRegisters>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import LoginTop from '../../common/components/LoginTop'
    import IndividualRegisters from './IndividualRegisters.vue'
    import Bottom from '../../common/components/Bottom'
    export default {
        name: 'IndividualRegister',
        components: {
          IndividualRegisters,
            LoginTop,
            Bottom,
        }
    }
</script>
