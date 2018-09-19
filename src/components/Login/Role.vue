<template>
  <div class='Role'>
    <RoleTop></RoleTop>
    <Roles></Roles>
    <Bottom></Bottom>
  </div>
</template>
<script>
import RoleTop from '../../common/components/RoleTop'
import Bottom from '../../common/components/Bottom'
import Roles from './Roles.vue'
export default {
    name: 'Role',
    components: {
      RoleTop,
      Roles,
      Bottom
  }
}
</script>
