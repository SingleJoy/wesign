<template>
    <div class='Enterprise'>
        <MuTop></MuTop>
        <EnterpriseCertificates></EnterpriseCertificates>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import EnterpriseCertificates from './EnterpriseCertificates.vue'
    import MuTop from '../../common/components/MuTop'
    import Bottom from '../../common/components/Bottom.vue'

    export default {
        name: 'Enterprise',
            components: {
            MuTop,
            Bottom,
            EnterpriseCertificates
        }
    }
</script>
