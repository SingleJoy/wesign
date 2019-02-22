/*
 * @Author: wangjia 
 * @Date: 2018-06-08 13:43:17 
 * @Last Modified by: wangjia
 * @Last Modified time: 2018-06-08 13:46:49
 */
<template>
  <div class='CompanyExa'>
    <Top></Top>
    <company-exam></company-exam>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '../../common/components/Top'
import CompanyExam from './CompanyExam'
import Bottom from '../../common/components/Bottom'
export default {
  name: 'CompanyExa',
    components: {
      Top,
      CompanyExam,
      Bottom
  }
}
</script>