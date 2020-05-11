<template>
  <el-card>
    <!-- 操作表单 -->
    <el-form :inline="true" :model="sForm" class="demo-form-inline">
      <el-form-item label="编码">
        <el-input v-model="sForm.code"></el-input>
      </el-form-item>
      <el-form-item label="供货商">
        <el-select v-model="sForm.originBase">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="最晚付款时间">
        <el-date-picker
          v-model="sForm.sTime"
          type="daterange"
          align="right"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00', '08:00:00']"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="default">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 显示数据 -->
    <h3 class="del-btn">
      <el-button type="danger" size="mini">删除</el-button>
    </h3>
    <!-- 表格 -->
    <el-table :data="proDataCur" border stripe style="width: 100%">
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="code" label="编码" width="180"> </el-table-column>
      <el-table-column prop="originBase" label="供货商" width="160">
      </el-table-column>
      <el-table-column label="状态" width="140">
        <template slot-scope="{ row }">
          <el-tag type="primary" size="mini" v-if="row.state">待缴费</el-tag>
          <el-tag type="success" size="mini" v-else>已缴费</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="cTime" label="缴费日期" width="230">
      </el-table-column>
      <el-table-column prop="cMoney" label="缴费金额" width="190" align="right">
      </el-table-column>
      <el-table-column label="操作"> </el-table-column>
    </el-table>

    <!-- 显示分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[1, 3, 5]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      sForm: {
        code: '',
        originBase: '',
        sTime: ''
      },
      proDataAll: [],
      proDataCur: [],
      total: 0,
      pageNum: 1,
      pageSize: 5
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const { data } = await this.$http.get('/data/data.json')
      this.proDataAll = data
      this.proDataCur = this.proDataAll.filter((item, i) => i < 5)
      this.total = this.proDataAll.length
    },
    onSubmit() {
      console.log('触发了提交事件')
    },
    handleSizeChange(num) {
      this.pageSize = num
      this.proDataCur = this.proDataAll.filter((item, i) => i < num)
    },
    handleCurrentChange(num) {
      this.pageNum = num
      let start = 0
      start = num === 1 ? 0 : this.pageSize * this.pageNum - this.pageSize
      this.proDataCur = this.proDataAll.filter(
        (item, i) => i > start && i <= start + this.pageSize
      )
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  min-width: 1200px;
}
.del-btn {
  background-color: #f0f0f0;
  margin-bottom: 20px;
  padding: 10px;
}
.el-pagination {
  float: right;
  margin-top: 30px;
  margin-bottom: 50px;
}
</style>
