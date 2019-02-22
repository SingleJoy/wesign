<template>
    <div class='WaitReply'>
        <wait-replys></wait-replys>
        <Bottom></Bottom>
    </div>
</template>
<script>
  import WaitReplys from './WaitReplys.vue'
  import Bottom from '../../../common/components/Bottom.vue'
    export default {
        name: 'Payment',
         components: {
            Bottom,
            WaitReplys
        }
    }
</script>