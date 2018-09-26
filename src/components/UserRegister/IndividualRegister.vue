<template>
    <div>
        <LoginTop></LoginTop>
        <IRegister></IRegister>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import LoginTop from '../../common/components/LoginTop'
    import IRegister from './IndividualRegisters.vue'
    import Bottom from '../../common/components/Bottom'
    export default {
        name: 'UserRegister',
        components: {
            IRegister,
            LoginTop,
            Bottom,
        }
    }
</script>
