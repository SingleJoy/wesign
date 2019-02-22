<template>
    <div class='Templates'>
        <Top></Top>
        <TemplateSuccess></TemplateSuccess>
        <Bottom></Bottom> 
    </div>
</template>
<script>
import Top from '../../../common/components/Top'
import TemplateSuccess from './Templatecs'
import Bottom from '../../../common/components/Bottom'
export default {
  name: 'Templates',
    components: {
      Top,
      Bottom,
      TemplateSuccess
  }
}
</script>
