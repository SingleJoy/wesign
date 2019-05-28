<template>
    <div class='ImportData'>
        <Tops></Tops>
        <ImportDatas></ImportDatas>
        <Bottom></Bottom>
    </div>
</template>
<script>
import Tops from '@/common/components/Tops'
import ImportDatas from './ImportDatas'
import Bottom from '@/common/components/Bottom'
export default {
    name: 'ImportData',
    components: {
        Tops,
        ImportDatas,
        Bottom
  }
}
</script>


