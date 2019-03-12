<template>
    <div class="IndividualRegister">
        <!-- <LoginTop></LoginTop> -->
        <IndividualRegisters></IndividualRegisters>
        <QRcode></QRcode>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import QRcode from '@/common/components/QRcode'
    import IndividualRegisters from './IndividualRegisters.vue'
    import Bottom from '@/common/components/Bottom'
    export default {
        name: 'Register',
        components: {
          IndividualRegisters,
            QRcode,
            Bottom,
        }
    }
</script>
