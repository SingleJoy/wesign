/*
 * @Author: wangjia
 * @Date: 2018-06-08 13:43:17
 * @Last Modified by: wangjia
 * @Last Modified time: 2018-06-23 18:07:04
 */
<template>
  <div class='CompanyExc'>
    <Top></Top>
    <company-excm></company-excm>
    <Bottom></Bottom>
  </div>
</template>
<script>
import Top from '@/common/components/Top'
import CompanyExcm from './CompanyExcm'
import Bottom from '@/common/components/Bottom'
export default {
  name: 'CompanyExc',
    components: {
      Top,
      CompanyExcm,
      Bottom
  }
}
</script>
