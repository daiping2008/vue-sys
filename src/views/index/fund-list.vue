<template>
  <div class="fund-list">
    <div>
      <el-row justify="right">
        <el-col :span="24">
          <el-button class="float-right mr-15 mt-10" size="small" type="primary" @click="goAdd()">
            添加
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div v-if="list.length > 0" class="table-content">
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          type='index'
          label="序号"
          align='center'
        >
        </el-table-column>
         <el-table-column
          type='createdAt'
          label="创建时间"
          align='center'
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createdAt}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="收支类型"
          align='center'
        >
        </el-table-column>
        <el-table-column
          prop="describe"
          label="收支描述"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          prop="income"
          label="收入"
          align='center'
        >
          <template slot-scope="scope">
              <span style="color:#00d053">+ {{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expend"
          label="支出"
          align='center'
        >
          <template slot-scope="scope">
              <span style="color:#f56767">- {{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cash"
          label="账户现金"
          align='center'
        >
          <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align='center'
        >
        </el-table-column>
        <el-table-column
          label="操作"
          align='center'
        >
        <template slot-scope='scope'>
          <el-button
              type="warning"
              icon='edit'
              size="small"
              @click='onEditMoney(scope.row)'
          >编辑</el-button>
          <el-button
              type="danger"
              icon='delete'
              size="small"
              @click='onDeleteMoney(scope.row,scope.$index)'
          >删除</el-button>
        </template>
        </el-table-column>
      </el-table>
    </div>
    <fund-dialog
      :dialog="dialog"
      :ruleForm="ruleForm"
      @update="update"
    ></fund-dialog>
  </div>
</template>

<script>
import FundDialog from './fund-dialog'
import { dateFtt } from '@/utils/tools'
import ProfileServer from '@/server/profile'
const profileServer = new ProfileServer()
export default {
  name: 'fund-list',
  data () {
    return {
      list: {},
      dialog: {
        title: '',
        visible: false,
        option: ''
      },
      ruleForm: {
        type: '',
        describe: '',
        income: '',
        expend: '',
        cash: '',
        remark: '',
        id: ''
      }
    }
  },
  mounted () {
    this.loadFundList()
  },
  methods: {
    loadFundList () {
      profileServer.getProfileList()
        .then(res => {
          this.list = this.handleData(res)
        })
    },
    handleData (data) {
      return data.map(v => {
        return Object.assign(v, { createdAt: dateFtt('yyyy-MM-dd', new Date(parseInt(v.createdAt))) })
      })
    },
    onEditMoney (row) {
      this.dialog = {
        title: '编辑资金信息',
        visible: true,
        option: 'edit'
      }
      this.ruleForm = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    onDeleteMoney (row, index) {
      const { _id } = row
      profileServer.delProfile(_id)
        .then(res => {
          this.$message({
            type: 'success',
            message: '成功删除'
          })
          this.loadFundList()
        })
    },
    goAdd () {
      this.dialog = {
        title: '添加资金信息',
        visible: true,
        option: 'add'
      }
    },
    update (payload) {
      this.dialog = {
        title: '',
        visible: false,
        option: ''
      }
      this.loadFundList()
    }
  },
  components: {
    FundDialog
  }
}
</script>

<style>

</style>
