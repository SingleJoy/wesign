/*
 * @Author: wangjia
 * @Date: 2018-06-08 13:43:17
 * @Last Modified by: wangjia
 * @Last Modified time: 2018-06-23 18:07:04
 */
<template>
  <div class='CompanyExb'>
    <MuTop></MuTop>
    <company-exbm></company-exbm>
    <Bottom></Bottom>
  </div>
</template>
<script>
import MuTop from '@/common/components/MuTop'
import CompanyExbm from './CompanyExbm'
import Bottom from '@/common/components/Bottom'
export default {
  name: 'CompanyExb',
    components: {
      MuTop,
      CompanyExbm,
      Bottom
  }
}
</script>
