<template>
    <div class="BillDetail">
        <BillDetails></BillDetails>
    </div>
</template>
<script>
import BillDetails from './BillDetails'
 import Top from '@/common/components/Top.vue'
 import Bottom from '@/common/components/Bottom.vue'
export default {
    name: "BillDetail",
    components: {
        Top, BillDetails, Bottom
    }
}
</script>
