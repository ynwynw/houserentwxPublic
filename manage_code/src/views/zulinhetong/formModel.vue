<template>
  <div>
    <el-dialog
      v-model="formVisible"
      :title="formTitle"
      width="80%"
      destroy-on-close
      :fullscreen="false"
    >
      <el-form
        class="formModel_form"
        ref="formRef"
        :model="form"
        label-width="$template2.back.add.form.base.labelWidth"
        :rules="rules"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="房屋名称" prop="fangwumingcheng">
              <el-input
                class="list_inp"
                v-model="form.fangwumingcheng"
                placeholder="房屋名称"
                type="text"
                :readonly="
                  !isAdd || disabledForm.fangwumingcheng ? true : false
                "
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房屋地址" prop="fangwudizhi">
              <el-input
                class="list_inp"
                v-model="form.fangwudizhi"
                placeholder="房屋地址"
                type="text"
                :readonly="!isAdd || disabledForm.fangwudizhi ? true : false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房东账号" prop="fangdongzhanghao">
              <el-input
                class="list_inp"
                v-model="form.fangdongzhanghao"
                placeholder="房东账号"
                type="text"
                :readonly="
                  !isAdd || disabledForm.fangdongzhanghao ? true : false
                "
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房东姓名" prop="fangdongxingming">
              <el-input
                class="list_inp"
                v-model="form.fangdongxingming"
                placeholder="房东姓名"
                type="text"
                :readonly="
                  !isAdd || disabledForm.fangdongxingming ? true : false
                "
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用户账号" prop="yonghuzhanghao">
              <el-input
                class="list_inp"
                v-model="form.yonghuzhanghao"
                placeholder="用户账号"
                type="text"
                :readonly="!isAdd || disabledForm.yonghuzhanghao ? true : false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="用户姓名" prop="yonghuxingming">
              <el-input
                class="list_inp"
                v-model="form.yonghuxingming"
                placeholder="用户姓名"
                type="text"
                :readonly="!isAdd || disabledForm.yonghuxingming ? true : false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="手机号码" prop="shoujihaoma">
              <el-input
                class="list_inp"
                v-model="form.shoujihaoma"
                placeholder="手机号码"
                type="text"
                :readonly="!isAdd || disabledForm.shoujihaoma ? true : false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="备注" prop="beizhu">
              <el-input
                class="list_inp"
                v-model="form.beizhu"
                placeholder="备注"
                type="text"
                :readonly="!isAdd || disabledForm.beizhu ? true : false"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="签订时间" prop="qiandingshijian">
              <el-date-picker
                class="list_date"
                v-model="form.qiandingshijian"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetime"
                :readonly="
                  !isAdd || disabledForm.qiandingshijian ? true : false
                "
                placeholder="请选择签订时间"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同" prop="hetong">
              <editor
                :value="form.hetong"
                placeholder="请输入合同"
                :readonly="!isAdd || disabledForm.hetong ? true : false"
                class="list_editor"
                @change="(e) => editorChange(e, 'hetong')"
              ></editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer v-if="isAdd || type == 'logistics' || type == 'reply'">
        <span class="formModel_btn_box">
          <el-button class="formModel_cancel" @click="closeClick"
            >取消</el-button
          >
          <el-button class="formModel_confirm" type="primary" @click="save">
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  reactive,
  ref,
  getCurrentInstance,
  nextTick,
  computed,
  defineEmits,
} from 'vue'
const context = getCurrentInstance()?.appContext.config.globalProperties
const emit = defineEmits(['formModelChange'])
//基础信息
const tableName = 'zulinhetong'
const formName = '租赁合同'
//基础信息
//form表单
const form = ref({})
const disabledForm = ref({
  fangwumingcheng: false,
  fangwudizhi: false,
  fangdongzhanghao: false,
  fangdongxingming: false,
  yonghuzhanghao: false,
  yonghuxingming: false,
  shoujihaoma: false,
  hetong: false,
  beizhu: false,
  qiandingshijian: false,
  crossuserid: false,
  crossrefid: false,
})
const formVisible = ref(false)
const isAdd = ref(false)
const formTitle = ref('')
//表单验证
//匹配整数
const validateIntNumber = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isIntNumer(value)) {
    callback(new Error('请输入整数'))
  } else {
    callback()
  }
}
//匹配数字
const validateNumber = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isNumber(value)) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}
//匹配手机号码
const validateMobile = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isMobile(value)) {
    callback(new Error('请输入正确的手机号码'))
  } else {
    callback()
  }
}
//匹配电话号码
const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isPhone(value)) {
    callback(new Error('请输入正确的电话号码'))
  } else {
    callback()
  }
}
//匹配邮箱
const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isEmail(value)) {
    callback(new Error('请输入正确的邮箱地址'))
  } else {
    callback()
  }
}
//匹配身份证
const validateIdCard = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.checkIdCard(value)) {
    callback(new Error('请输入正确的身份证号码'))
  } else {
    callback()
  }
}
//匹配网站地址
const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!context?.$toolUtil.isURL(value)) {
    callback(new Error('请输入正确的URL地址'))
  } else {
    callback()
  }
}
const rules = ref({
  fangwumingcheng: [],
  fangwudizhi: [],
  fangdongzhanghao: [],
  fangdongxingming: [],
  yonghuzhanghao: [],
  yonghuxingming: [],
  shoujihaoma: [],
  hetong: [],
  beizhu: [],
  qiandingshijian: [],
  crossuserid: [],
  crossrefid: [],
})
//表单验证

const formRef = ref(null)
const id = ref(0)
const type = ref('')
//methods

//获取唯一标识
const getUUID = () => {
  return new Date().getTime()
}
//重置
const resetForm = () => {
  form.value = {
    fangwumingcheng: '',
    fangwudizhi: '',
    fangdongzhanghao: '',
    fangdongxingming: '',
    yonghuzhanghao: '',
    yonghuxingming: '',
    shoujihaoma: '',
    hetong: '',
    beizhu: '',
    qiandingshijian: '',
    crossuserid: '',
    crossrefid: '',
  }
}
//获取info
const getInfo = () => {
  context
    ?.$http({
      url: `${tableName}/info/${id.value}`,
      method: 'get',
    })
    .then((res) => {
      let reg = new RegExp('../../../file', 'g')
      res.data.data.hetong = res.data.data.hetong
        ? res.data.data.hetong.replace(reg, '../../../houserent/file')
        : ''
      form.value = res.data.data
      formVisible.value = true
    })
}
const crossRow = ref('')
const crossTable = ref('')
const crossTips = ref('')
const crossColumnName = ref('')
const crossColumnValue = ref('')
//初始化
const init = (
  formId = null,
  formType = 'add',
  formNames = '',
  row = null,
  table = null,
  statusColumnName = null,
  tips = null,
  statusColumnValue = null
) => {
  resetForm()
  form.value.qiandingshijian = context?.$toolUtil.getCurDateTime()
  if (formId) {
    id.value = formId
    type.value = formType
  }
  if (formType == 'add') {
    isAdd.value = true
    formTitle.value = '新增' + formName
    formVisible.value = true
  } else if (formType == 'info') {
    isAdd.value = false
    formTitle.value = '查看' + formName
    getInfo()
  } else if (formType == 'edit') {
    isAdd.value = true
    formTitle.value = '修改' + formName
    getInfo()
  } else if (formType == 'cross') {
    isAdd.value = true
    formTitle.value = formNames
    // getInfo()
    for (let x in row) {
      if (x == 'fangwumingcheng') {
        form.value.fangwumingcheng = row[x]
        disabledForm.value.fangwumingcheng = true
        continue
      }
      if (x == 'fangwudizhi') {
        form.value.fangwudizhi = row[x]
        disabledForm.value.fangwudizhi = true
        continue
      }
      if (x == 'fangdongzhanghao') {
        form.value.fangdongzhanghao = row[x]
        disabledForm.value.fangdongzhanghao = true
        continue
      }
      if (x == 'fangdongxingming') {
        form.value.fangdongxingming = row[x]
        disabledForm.value.fangdongxingming = true
        continue
      }
      if (x == 'yonghuzhanghao') {
        form.value.yonghuzhanghao = row[x]
        disabledForm.value.yonghuzhanghao = true
        continue
      }
      if (x == 'yonghuxingming') {
        form.value.yonghuxingming = row[x]
        disabledForm.value.yonghuxingming = true
        continue
      }
      if (x == 'shoujihaoma') {
        form.value.shoujihaoma = row[x]
        disabledForm.value.shoujihaoma = true
        continue
      }
      if (x == 'hetong') {
        form.value.hetong = row[x]
        disabledForm.value.hetong = true
        continue
      }
      if (x == 'beizhu') {
        form.value.beizhu = row[x]
        disabledForm.value.beizhu = true
        continue
      }
      if (x == 'qiandingshijian') {
        form.value.qiandingshijian = row[x]
        disabledForm.value.qiandingshijian = true
        continue
      }
      if (x == 'crossuserid') {
        form.value.crossuserid = row[x]
        disabledForm.value.crossuserid = true
        continue
      }
      if (x == 'crossrefid') {
        form.value.crossrefid = row[x]
        disabledForm.value.crossrefid = true
        continue
      }
    }
    if (row) {
      crossRow.value = row
    }
    if (table) {
      crossTable.value = table
    }
    if (tips) {
      crossTips.value = tips
    }
    if (statusColumnName) {
      crossColumnName.value = statusColumnName
    }
    if (statusColumnValue) {
      crossColumnValue.value = statusColumnValue
    }
    formVisible.value = true
  }

  context
    ?.$http({
      url: `${context?.$toolUtil.storageGet('sessionTable')}/session`,
      method: 'get',
    })
    .then((res) => {
      var json = res.data.data
      if (
        json.hasOwnProperty('yonghuzhanghao') &&
        context?.$toolUtil.storageGet('role') != '管理员'
      ) {
        form.value.yonghuzhanghao = json.yonghuzhanghao
        disabledForm.value.yonghuzhanghao = true
      }
      if (
        json.hasOwnProperty('yonghuxingming') &&
        context?.$toolUtil.storageGet('role') != '管理员'
      ) {
        form.value.yonghuxingming = json.yonghuxingming
        disabledForm.value.yonghuxingming = true
      }
      if (
        json.hasOwnProperty('shoujihaoma') &&
        context?.$toolUtil.storageGet('role') != '管理员'
      ) {
        form.value.shoujihaoma = json.shoujihaoma
        disabledForm.value.shoujihaoma = true
      }
    })
}
//初始化
//声明父级调用
defineExpose({
  init,
})
//关闭
const closeClick = () => {
  formVisible.value = false
}
//富文本
const editorChange = (e, name) => {
  form.value[name] = e
}
//提交
const save = () => {
  var table = crossTable.value
  var objcross = JSON.parse(JSON.stringify(crossRow.value))
  let crossUserId = ''
  let crossRefId = ''
  let crossOptNum = ''
  if (type.value == 'cross') {
    if (crossColumnName.value != '') {
      if (!crossColumnName.value.startsWith('[')) {
        for (let o in objcross) {
          if (o == crossColumnName.value) {
            objcross[o] = crossColumnValue.value
          }
        }
        //修改跨表数据
        changeCrossData(objcross)
      } else {
        crossUserId = context?.$toolUtil.storageGet('userid')
        crossRefId = objcross['id']
        crossOptNum = crossColumnName.value.replace(/\[/, '').replace(/\]/, '')
      }
    }
  }
  formRef.value.validate((valid) => {
    if (valid) {
      if (crossUserId && crossRefId) {
        form.value.crossuserid = crossUserId
        form.value.crossrefid = crossRefId
        let params = {
          page: 1,
          limit: 1000,
          crossuserid: form.value.crossuserid,
          crossrefid: form.value.crossrefid,
        }
        context
          ?.$http({
            url: `${tableName}/page`,
            method: 'get',
            params: params,
          })
          .then((res) => {
            if (res.data.data.total >= crossOptNum) {
              context?.$toolUtil.message(`${crossTips.value}`, 'error')
              return false
            } else {
              context
                ?.$http({
                  url: `${tableName}/${!form.value.id ? 'save' : 'update'}`,
                  method: 'post',
                  data: form.value,
                })
                .then((res) => {
                  emit('formModelChange')
                  context?.$toolUtil.message(`操作成功`, 'success', () => {
                    formVisible.value = false
                  })
                })
            }
          })
      } else {
        context
          ?.$http({
            url: `${tableName}/${!form.value.id ? 'save' : 'update'}`,
            method: 'post',
            data: form.value,
          })
          .then((res) => {
            emit('formModelChange')
            context?.$toolUtil.message(`操作成功`, 'success', () => {
              formVisible.value = false
            })
          })
      }
    }
  })
}
//修改跨表数据
const changeCrossData = (row) => {
  context
    ?.$http({
      url: `${crossTable.value}/update`,
      method: 'post',
      data: row,
    })
    .then((res) => {})
}
</script>
<style lang="scss" scoped>
// 表单
.formModel_form {
  border-radius: 6px;
  padding: 30px;
  box-shadow: 0 0px 0px rgba(85, 255, 255, 0.5);
  // form item
  :deep(.el-form-item) {
    border: 1px solid #ddd;
    margin: 0;
    display: flex;
    //label
    .el-form-item__label {
      border: 1px solid #ddd;
      padding: 0;
      background: rgba(236, 236, 236, 1);
      display: block;
      width: 120px;
      border-width: 0 2px 0 0;
      text-align: center;
    }
    // 内容盒子
    .el-form-item__content {
      padding: 0 20px;
      display: flex;
      width: calc(100% - 120px);
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      // 输入框
      .list_inp {
        border: 1px solid #ddd;
        box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
        padding: 0 10px;
        width: 100%;
        line-height: 36px;
        box-sizing: border-box;
        height: 36px;
        //去掉默认样式
        .el-input__wrapper {
          border: none;
          box-shadow: none;
          background: none;
          border-radius: 0;
          height: 100%;
          padding: 0;
        }
        .is-focus {
          box-shadow: none !important;
        }
      }
      //日期选择器
      .list_date {
        border: 1px solid #ddd;
        border-radius: 0;
        box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
        width: 100%;
        line-height: 36px;
        box-sizing: border-box;
        //去掉默认样式
        .el-input__wrapper {
          border: none;
          box-shadow: none;
          background: none;
          border-radius: 0;
          height: 100%;
        }
      }
      // 富文本
      .list_editor {
        background-color: #fff;
        border-radius: 0;
        padding: 0;
        box-shadow: 0 0 0px rgba(85, 255, 255, 0.5);
        margin: 0;
        width: 100%;
        border-color: #ddd;
        border-width: 0;
        border-style: solid;
        height: auto;
      }
    }
  }
}
// 按钮盒子
.formModel_btn_box {
  padding: 40px 0 0;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  .formModel_cancel {
    border: 0;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 24px;
    margin: 0 10px 0 0;
    outline: none;
    color: #fff;
    background: rgba(27, 78, 133, 1);
    width: auto;
    font-size: 14px;
    height: 32px;
  }
  .formModel_cancel:hover {
    background: rgba(27, 78, 133, 0.5);
  }

  .formModel_confirm {
    border: 0;
    cursor: pointer;
    border-radius: 4px;
    padding: 0 24px;
    margin: 0 10px 0 0;
    outline: none;
    color: #fff;
    background: rgba(241, 49, 100, 1);
    width: auto;
    font-size: 14px;
    height: 32px;
  }
  .formModel_confirm:hover {
    background: rgba(241, 49, 100, 0.5);
  }
}
</style>
