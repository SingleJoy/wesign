<template>
  <div class="custom-tree-container Tree">

    <div class="block" style="padding: 20px;">
      <p>使用 scoped slot</p>
      <el-tree
        icon-class="el-icon-goods"
        :data="data5"

        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="small" @click="() => append(data)" v-if="data5.length<3">+
          </el-button>
          <el-button type="text" size="small" @click="() => remove(node, data)" v-if="data5.length<3">-
          </el-button>
        </span>
      </span>
      </el-tree>
    </div>
  </div>
</template>


<script>
  let id = 1000;

  export default {
    name:'Tree',
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data))
      }
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="small" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="small" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      }
    }
  };
</script>

<style >
  .el-icon-goods{
    font-size: 30px;
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg)!important;
     transform: rotate(0deg)!important;
  }
  .custom-tree-container{
    width: 1200px;
    margin: 20px auto;
    padding: 20px;
  }
  .custom-tree-node {
    flex: 1;
    display:inline-block;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    line-height: 25px;
    padding-right: 8px;
    float: left;
  }
  .el-tree-node__content{
    height: 40px !important;
  }
</style>
