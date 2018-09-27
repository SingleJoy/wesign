<template>
    <div class='Enterprise'>
        <Top></Top>
        <EnterpriseCertificates></EnterpriseCertificates>
        <Bottom></Bottom>
    </div>
</template>
<script>
    import EnterpriseCertificates from './EnterpriseCertificates.vue'
    import Top from '../../common/components/RoleTop.vue'
    import Bottom from '../../common/components/Bottom.vue'

    export default {
        name: 'Enterprise',
            components: {
            Top,
            Bottom,
            EnterpriseCertificates
        }
    }
</script>
