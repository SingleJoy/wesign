<template>
    <div class="IndividualRegister">
        <!-- <LoginTop></LoginTop> -->
        <BindCompanys></BindCompanys>
        <QRcode></QRcode>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import QRcode from '../../common/components/QRcode'
    import BindCompanys from './BindCompanys.vue'
    import Bottom from '../../common/components/Bottom'
    export default {
        name: 'Register',
        components: {
          BindCompanys,
            QRcode,
            Bottom,
        }
    }
</script>
