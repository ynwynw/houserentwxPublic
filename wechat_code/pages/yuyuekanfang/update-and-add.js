// pages/edit/edit.js
const {
detail,
option,
update,
add,
list,
follow,
faceMatch,
session,
rubbish,
levelOption,
baiduIdentify
} = require("../../api/index.js")

const des = require('../../utils/des.js')
const utils = require("../../utils/index.js")

Page({

/**
* 页面的初始数据
*/
data: {
imgIcon: "../../static/upload.png",
editStatus: false,
baseURL:'',
sessionReadArr:[],

detailList: null,
id: "",
cross:"",
ruleForm:{},
userid:getApp().globalData.userInfo.id,
userInfo:getApp().globalData.userInfo,
ro:{
},

fangwumingcheng:"",
fangwudizhi:"",
fangdongzhanghao:"",
fangdongxingming:"",
yuyueshijian:"请选择时间",
showyuyueshijian:false,
beizhu:"",
yonghuzhanghao:"",
yonghuxingming:"",
shoujihaoma:"",
sfsh: '待审核',
zulinjiage:"",
},


/**
* 生命周期函数--监听页面加载
*/
async onLoad(options) {
let userid
if (options?.id) {
this.setData({
editStatus: true
})

}
let nowTable = wx.getStorageSync("nowTable");
const res = await session(nowTable)
if(res.data.code==0){
getApp().globalData.userInfo=res?.data
userid = res?.data.id
this.setData({
userid
})

}

let baseURL =wx.getStorageSync('baseURL') + '/'
const id = getApp().globalData.detailId
this.setData({
refid:id,
baseURL
})
//人脸识别


let  ro=this.data.ro




if(options?.cross){
var obj = wx.getStorageSync('crossObj');
let refobjempty={}
for (var o in obj){

if(o=='fangwumingcheng'){
refobjempty["fangwumingcheng"]=obj[o]
ro.fangwumingcheng = true;
continue;
}else{
}


if(o=='fangwudizhi'){
refobjempty["fangwudizhi"]=obj[o]
ro.fangwudizhi = true;
continue;
}else{
}


if(o=='fangdongzhanghao'){
refobjempty["fangdongzhanghao"]=obj[o]
ro.fangdongzhanghao = true;
continue;
}else{
}


if(o=='fangdongxingming'){
refobjempty["fangdongxingming"]=obj[o]
ro.fangdongxingming = true;
continue;
}else{
}


if(o=='yuyueshijian'){
refobjempty["yuyueshijian"]=obj[o]
ro.yuyueshijian = true;
continue;
}else{
}


if(o=='beizhu'){
refobjempty["beizhu"]=obj[o]
ro.beizhu = true;
continue;
}else{
}


if(o=='yonghuzhanghao'){
refobjempty["yonghuzhanghao"]=obj[o]
ro.yonghuzhanghao = true;
continue;
}else{
}


if(o=='yonghuxingming'){
refobjempty["yonghuxingming"]=obj[o]
ro.yonghuxingming = true;
continue;
}else{
}


if(o=='shoujihaoma'){
refobjempty["shoujihaoma"]=obj[o]
ro.shoujihaoma = true;
continue;
}else{
}




if(o=='zulinjiage'){
refobjempty["zulinjiage"]=obj[o]
ro.zulinjiage = true;
continue;
}else{
}

}

let  statusColumnName=wx.getStorageSync('statusColumnName');
statusColumnName=statusColumnName.replace('[',"").replace(']',"");
this.setData({
ro,
cross:options?.cross,
statusColumnName
})
this.setData(refobjempty)
}
if(id){
// 如果上一级页面传递了id，获取改id数据信息
const   data=getApp().globalData.detailList


const url = wx.getStorageSync("baseURL") + "/"
const detailList = data
let  objtemp= {
detailList,
fangwumingcheng: data.fangwumingcheng,
fangwudizhi: data.fangwudizhi,
fangdongzhanghao: data.fangdongzhanghao,
fangdongxingming: data.fangdongxingming,
yuyueshijian:utils.getCurrentDate("yMDhms"),
beizhu: data.beizhu,
yonghuzhanghao: data.yonghuzhanghao,
yonghuxingming: data.yonghuxingming,
shoujihaoma: data.shoujihaoma,
sfsh: '待审核',

shhf: data.shhf,
zulinjiage: data.zulinjiage,
}
this.setData(objtemp);

//ss读取
let h = this.data
let c = this.data
let d1 = this.data
let d2 = this.data
this.setData({
});

}else {
this.setData({
})
}
// ss读取
let sessionReadArr=[]
 if(getApp().globalData.userInfo.yonghuzhanghao){
  let yonghuzhanghao= getApp().globalData.userInfo.yonghuzhanghao
  ro.yonghuzhanghao=true
  this.setData({
    yonghuzhanghao,
  })
  sessionReadArr.push('yonghuzhanghao')

 }
 if(getApp().globalData.userInfo.yonghuxingming){
  let yonghuxingming= getApp().globalData.userInfo.yonghuxingming
  ro.yonghuxingming=true
  this.setData({
    yonghuxingming,
  })
  sessionReadArr.push('yonghuxingming')

 }
 if(getApp().globalData.userInfo.shoujihaoma){
  let shoujihaoma= getApp().globalData.userInfo.shoujihaoma
  ro.shoujihaoma=true
  this.setData({
    shoujihaoma,
  })
  sessionReadArr.push('shoujihaoma')

 }

this.setData({
cross:options?.cross,
ro,
id,

})













},
getUUID () {
return new Date().getTime();
},
onUnload: function () {
console.log('页面被卸载，执行销毁操作');
},
onShow() {

},
































































onyuyueshijianTap(){
this.setData({
showyuyueshijian: true,
})

let c = this.data;
},
yuyueshijianTap(e) {
this.setData({
yuyueshijian: e.detail.data
})

let c = this.data;
},















































shhfInput(e){
this.setData({
shhf: e.detail.value // 每次输入变化时更新文本框的值
});},







shhfInput(e) {
this.setData({
shhf: e.detail.value // 每次输入变化时更新文本框的值
});
},












async submit() {
let that = this
var query = wx.createSelectorQuery();





if(this.data.yuyueshijian?.includes("请选择") || this.data.yuyueshijian==""){
wx.showToast({
icon: "none",
title: `预约时间不能为空`,
})
return
}














const baseURL = wx.getStorageSync('baseURL') + "/"
const regex = new RegExp(baseURL, "g");
const obj={
fangwumingcheng: this.data. fangwumingcheng,
fangwudizhi: this.data. fangwudizhi,
fangdongzhanghao: this.data. fangdongzhanghao,
fangdongxingming: this.data. fangdongxingming,
yuyueshijian: this.data. yuyueshijian,
beizhu: this.data. beizhu,
yonghuzhanghao: this.data. yonghuzhanghao,
yonghuxingming: this.data. yonghuxingming,
shoujihaoma: this.data. shoujihaoma,
sfsh:this.data.sfsh,
zulinjiage: this.data. zulinjiage,
}
const detailId= getApp().globalData.detailId
const tableName= `yuyuekanfang`

//跨表计算判断
var obj2;
var  ruleForm=obj
obj2 = ruleForm
this.data.refid==""? ruleForm['refid']= getApp().globalData.detailId:""
ruleForm['userid']=getApp().globalData.userInfo.id
var userInfo=getApp().globalData.userInfo


const sessionReadArr=this.data.sessionReadArr
const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const mobilePattern = /^(?:\+?86)?1[3-9]\d{9}$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const idPattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dxX]$/;
const urlPattern = /^(http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;





































if(!this.data.yuyueshijian ){
wx.showToast({
icon: "none",
title: `预约时间不能为空`,
})
return
}







































const valueshoujihaoma = this.data.shoujihaoma;

if (!mobilePattern.test(valueshoujihaoma)) {
wx.showToast({
icon: "none",
title: `手机号码应输入手机格式`,
})
return
}





































//更新跨表属性
var crossuserid;
var crossrefid;
var crossoptnum;

if(this.data.cross) {
wx.setStorageSync('crossCleanType', true);
var statusColumnName = wx.getStorageSync('statusColumnName');
var statusColumnValue = wx.getStorageSync('statusColumnValue');
if (statusColumnName != '') {
obj2 = wx.getStorageSync('crossObj');
if (!statusColumnName.startsWith("[")) {
for (var o in obj2) {
if (statusColumnName==o){
obj2[o] = statusColumnValue;
}

}
var table = wx.getStorageSync('crossTable');

await update(table, obj2)
} else {

crossuserid =getApp().globalData.userInfo.id
crossrefid =  this.data.id
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.replace(/\[/, "").replace(/\]/, "");
}
}
}
this.data.cross ? (crossrefid = obj2.id, crossuserid =getApp().globalData.userInfo.id) : ""
ruleForm?.crossrefid==undefined? ( ruleForm["crossrefid"] = obj2.id, ruleForm["crossuserid"] =getApp().globalData.userInfo.id ): "";
ruleForm?.shhf?ruleForm.shhf=this.data.shhf:''
if(crossrefid && crossuserid) {
ruleForm['crossuserid'] =obj2.id
ruleForm['crossrefid'] =getApp().globalData.userInfo.id

this.setData({
ruleForm
})
let params = {
page: 1,
limit: 10,
crossuserid: crossuserid,
crossrefid: crossrefid,
}
const tips = wx.getStorageSync('tips')
let corssRes = await list(`yuyuekanfang`, params)
crossoptnum = wx.getStorageSync('statusColumnName');
crossoptnum = crossoptnum.match(/\d+/g);
if (corssRes?.data?.total >= parseInt(crossoptnum)) {
wx.showToast({
icon: "none",
title: tips,
})
wx.removeStorageSync('crossCleanType');
return ;
}
else {


//跨表计算

























if (ruleForm.id ) {
await update(`yuyuekanfang`, ruleForm)
}
else {
await add(`yuyuekanfang`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`yuyuekanfang`, ruleForm)
}
else {
await add(`yuyuekanfang`, ruleForm)
}
}
getApp().globalData.editorContent=''
wx.showToast({
title: '提交成功',
icon: "none"
})
const preId = getApp().globalData.detailId

if(table){
let res = await detail(table, preId)
if(res.code==0){
getApp().globalData.detailList = res.data
}

}



wx.navigateBack({
delta: 1,
complete: () => {
// 触发事件通知，传递需要更新的数据
const pages = getCurrentPages();
if (pages.length >= 1) {
const prePage = pages[pages.length - 2];
prePage.onLoad(); //
}
}
})













},
onHide() {

},

/**
* 生命周期函数--监听页面卸载
*/
onUnload() {

},


/**
* 页面相关事件处理函数--监听用户下拉动作
*/
onPullDownRefresh() {

},

/**
* 页面上拉触底事件的处理函数
*/
onReachBottom() {

},

/**
* 用户点击右上角分享
*/
onShareAppMessage() {

}
})