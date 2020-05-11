<template>
  <div>
    <el-card>
      <!-- 1.0 操作表单 -->
      <el-form
        :inline="true"
        :model="sForm"
        class="demo-form-inline"
        ref="sform"
      >
        <el-form-item label="编码">
          <el-input v-model="sForm.code"></el-input>
        </el-form-item>
        <el-form-item label="供货商">
          <el-select v-model="sForm.originBase">
            <el-option
              :label="item.originBase"
              :value="item.originBase"
              v-for="item in proDataAll"
              :key="item.id"
            ></el-option>
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
          <el-button type="default" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 2.0 操作数据 -->
      <h3 class="del-btn">
        <el-button type="danger" size="mini" @click="delMore">删除</el-button>
        <el-button type="primary" size="mini" @click="addInfoDio = true"
          >添加商品</el-button
        >
      </h3>
      <!-- 表格 -->
      <el-table
        :data="proDataCur"
        border
        stripe
        style="width: 100%"
        ref="multipleSelection"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="code" label="编码" width="180">
        </el-table-column>
        <el-table-column prop="originBase" label="供货商" width="160">
        </el-table-column>
        <el-table-column label="状态" width="140">
          <template slot-scope="{ row }">
            <el-tag type="success" size="mini" v-if="row.state">已缴费</el-tag>
            <el-tag type="primary" size="mini" v-else>待缴费</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="缴费日期" width="230">
          <template slot-scope="{ row }">
            {{ row.cTime | dateFormat('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="缴费金额" width="190" align="right">
          <template slot-scope="{ row }">
            {{ row.cMoney | moneyFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button type="danger" size="mini" @click="delPro(row.id)"
              >删除<i class="iconfont icon-delet el-icon--right"></i
            ></el-button>
            <el-button type="primary" size="mini" @click="editPro(row.id)"
              >编辑<i class="iconfont icon-edit el-icon--right"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 3.0 显示分页 -->
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

    <!-- 4.0 添加数据的面板 -->
    <el-dialog
      title="提示"
      :visible.sync="addInfoDio"
      width="50%"
      @close="closeDio"
    >
      <!-- 表单数据收集 -->
      <el-form
        :model="addFormData"
        :rules="addFormRule"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供货商" prop="originBase">
          <el-input v-model="addFormData.originBase"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="addFormData.state">
            <el-option label="待缴费" value="false"></el-option>
            <el-option label="已缴费" value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴款日期" prop="cTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addFormData.cTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="cMoney">
          <el-input type="number" v-model="addFormData.cMoney"></el-input>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addInfoDio = false">取 消</el-button>
        <el-button type="primary" @click="addData">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 5.0 编辑数据的面板 -->
    <el-dialog title="提示" :visible.sync="editInfoDio" width="50%">
      <!-- 表单数据收集 -->
      <el-form
        :model="editFormData"
        :rules="editFormRule"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="供货商" prop="originBase">
          <el-input v-model="editFormData.originBase"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editFormData.state">
            <el-option label="待缴费" value="false"></el-option>
            <el-option label="已缴费" value="true"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="缴款日期" prop="cTime">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editFormData.cTime"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="金额" prop="cMoney">
          <el-input type="number" v-model="editFormData.cMoney"></el-input>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editInfoDio = false">取 消</el-button>
        <el-button type="primary" @click="editData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
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
      pageSize: 5,
      // 显示添加数据按钮
      addInfoDio: false,
      addFormData: {
        originBase: '',
        state: 'false',
        cTime: '',
        cMoney: ''
      },
      addFormRule: {
        originBase: [
          { required: true, message: '请输入供货商名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        cTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        cMoney: [{ required: true, message: '请输入缴费金额', trigger: 'blur' }]
      },
      // 修改数据
      editInfoDio: false,
      editFormData: {
        originBase: '',
        state: 'true',
        cTime: '',
        cMoney: ''
      },
      editFormRule: {
        originBase: [
          { required: true, message: '请输入供货商名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        cTime: [{ required: true, message: '请选择时间', trigger: 'blur' }],
        cMoney: [{ required: true, message: '请输入缴费金额', trigger: 'blur' }]
      },
      // 多选数组
      multipleSelection: []
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
      // 根据 sForm 内部的查询数据，对数组进行遍历
      console.log(this.sForm)
      this.proDataCur = this.proDataAll
      if (this.sForm.code.trim()) {
        this.proDataCur = this.proDataAll.filter(item =>
          item.code.includes(this.sForm.code)
        )
      }
      if (this.sForm.originBase.trim()) {
        this.proDataCur = this.proDataCur.filter(
          item => item.originBase === this.sForm.originBase
        )
      }
      if (this.sForm.sTime.length === 2) {
        this.proDataCur = this.proDataCur.filter(
          item =>
            item.cTime > +new Date(this.sForm.sTime[0]) &&
            item.cTime < +new Date(this.sForm.sTime[1])
        )
      }
      this.total = this.proDataCur.length
      this.proDataCur = this.proDataCur.filter((item, i) => i < 5)
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
    },
    addData() {
      this.$refs.addForm.validate(valid => {
        if (!valid) {
          return this.$message({
            message: '验证不通过',
            type: 'error',
            duration: 1000
          })
        }

        // 验证通过
        this.proDataAll.unshift({
          id: +new Date(),
          code: 'ST202010102211005',
          originBase: this.addFormData.originBase,
          state: JSON.parse(this.addFormData.state),
          cTime: +new Date(this.addFormData.cTime),
          cMoney: this.addFormData.cMoney - 0
        })
      })
      this.addInfoDio = false
    },
    closeDio() {
      this.$refs.addForm.resetFields()
    },
    delPro(id) {
      this.$confirm('此操作将永久删除该项数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        })
        const i = this.proDataAll.findIndex(item => item.id === id)
        this.proDataAll.splice(i, 1)
      })
    },
    editPro(id) {
      this.editInfoDio = true
      const info = this.proDataAll.filter(item => item.id === id)
      this.editFormData = {
        id: info[0].id,
        originBase: info[0].originBase,
        state: info[0].state ? 'true' : 'false',
        cTime: info[0].cTime,
        cMoney: info[0].cMoney
      }
    },
    editData() {
      this.$refs.editForm.validate(valid => {
        if (!valid) {
          return this.$message({
            message: '验证不通过',
            type: 'error',
            duration: 1000
          })
        }
        console.log('asda')
        // 验证通过
        this.proDataAll.some(item => {
          if (item.id === this.editFormData.id) {
            item.originBase = this.editFormData.originBase
            item.state = JSON.parse(this.editFormData.state)
            item.cTime = this.editFormData.cTime
            item.cMoney = this.editFormData.cMoney
          }
        })
      })
      this.editInfoDio = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    delMore() {
      // console.log(this.multipleSelection)
      this.$confirm('此操作将永久删除多项数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000
        })
        this.multipleSelection.forEach(item => {
          const i = this.proDataAll.findIndex(subItem => subItem.id === item.id)
          this.proDataAll.splice(i, 1)
        })
      })
    },
    resetSearch() {
      this.sForm.code = this.sForm.originBase = this.sForm.sTime = ''
    }
  },
  watch: {
    proDataAll() {
      // 监听总数组更新，改变截取的数组
      this.proDataCur = this.proDataAll.filter((item, i) => i < 5)
      this.total = this.proDataAll.length
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
