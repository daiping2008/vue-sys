<template>
  <div>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
    >
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="收支类型:">
          <el-select v-model="ruleForm.type">
            <el-option v-for="(v, idx) in format_type_list" :key="idx" :label="v" :value="v"  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收支描述:" prop="describe" >
          <el-input type="text" v-model="ruleForm.describe"></el-input>
        </el-form-item>
        <el-form-item label="收入:" prop="income" >
          <el-input type="text" v-model="ruleForm.income"></el-input>
        </el-form-item>
        <el-form-item label="支出:" prop="expend" >
          <el-input type="text" v-model="ruleForm.expend"></el-input>
        </el-form-item>
        <el-form-item label="账户现金:" prop="cash" >
          <el-input type="text" v-model="ruleForm.cash"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="remark" >
          <el-input type="textare" v-model="ruleForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ProfileServer from '@/server/profile'
const profileServer = new ProfileServer()
export default {
  name: 'fund-dialog',
  props: {
    dialog: Object,
    ruleForm: Object
  },
  data () {
    return {
      format_type_list: [
        '提现',
        '提现手续费',
        '充值',
        '优惠券',
        '充值礼券',
        '转账'
      ],
      rules: {
        describe: [
          { required: true, message: '收支描述不能为空！', trigger: 'blur' }
        ],
        income: [
          { required: true, message: '收入不能为空！', trigger: 'blur' }
        ],
        expend: [
          { required: true, message: '支出不能为空！', trigger: 'blur' }
        ],
        cash: [{ required: true, message: '账户不能为空！', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (ruleName) {
      this.$refs[ruleName].validate(valid => {
        if (valid) {
          const profile = {
            type: this.ruleForm.type,
            describe: this.ruleForm.describe,
            income: this.ruleForm.income,
            expend: this.ruleForm.expend,
            cash: this.ruleForm.cash,
            remark: this.ruleForm.remark
          }
          profileServer.addProfile(profile)
            .then(res => {
              this.$message({
                type: 'success',
                message: '添加资金成功'
              })
              this.$emit('update')
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
