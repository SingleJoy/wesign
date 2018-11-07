<template>
	<div class="Invoice">
        <Top></Top>
        <Invoices></Invoices>
        <Bottom></Bottom>
	</div>
</template>
<script>
import Top from '@/common/components/Top.vue'
import Bottom from '@/common/components/Bottom.vue'
import Invoices from "./Invoices.vue"
export default {
    name:'Invoice',
    components:{
        Top,
        Invoices,
        Bottom
    },
    data() {
        return {

        }
    }
}
</script>
