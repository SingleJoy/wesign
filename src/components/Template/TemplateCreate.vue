<template>
  <div class='Template'>
    <Top></Top>
    <TemplateCreates></TemplateCreates>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import TemplateCreates from './TemplateCreates'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'Template',
    components: {
      Top,
      TemplateCreates,
      Bottom
  }
}
</script>

