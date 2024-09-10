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
yonghuzhanghao:"",
yonghuxingming:"",
shoujihaoma:"",
beizhu:"",
qiandingshijian:"请选择时间",
showqiandingshijian:false,
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


if(o=='hetong'){
getApp().globalData.editorContent=obj[o]
ro.hetong = true;
continue;
}else{
}


if(o=='beizhu'){
refobjempty["beizhu"]=obj[o]
ro.beizhu = true;
continue;
}else{
}


if(o=='qiandingshijian'){
refobjempty["qiandingshijian"]=obj[o]
ro.qiandingshijian = true;
continue;
}else{
}


if(o=='crossuserid'){
refobjempty["crossuserid"]=obj[o]
ro.crossuserid = true;
continue;
}else{
}


if(o=='crossrefid'){
refobjempty["crossrefid"]=obj[o]
ro.crossrefid = true;
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
yonghuzhanghao: data.yonghuzhanghao,
yonghuxingming: data.yonghuxingming,
shoujihaoma: data.shoujihaoma,
hetong: data.hetong,
beizhu: data.beizhu,
qiandingshijian:utils.getCurrentDate("yMDhms"),
crossuserid: data.crossuserid,
crossrefid: data.crossrefid,
}
this.data.editStatus? getApp().globalData.editorContent=data.hetong:""
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











this.setData({
qiandingshijian:utils.getCurrentDate("yMDhms")
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













































































































onqiandingshijianTap(){
this.setData({
showqiandingshijian: true,
})

let c = this.data;
},
qiandingshijianTap(e) {
this.setData({
qiandingshijian: e.detail.data
})

let c = this.data;
},




















async submit() {
let that = this
var query = wx.createSelectorQuery();










if(this.data.qiandingshijian?.includes("请选择") || this.data.qiandingshijian==""){
wx.showToast({
icon: "none",
title: `签订时间不能为空`,
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
yonghuzhanghao: this.data. yonghuzhanghao,
yonghuxingming: this.data. yonghuxingming,
shoujihaoma: this.data. shoujihaoma,
hetong: getApp().globalData.editorContent,
beizhu: this.data. beizhu,
qiandingshijian: this.data. qiandingshijian,
crossuserid: this.data. crossuserid,
crossrefid: this.data. crossrefid,
}
const detailId= getApp().globalData.detailId
const tableName= `zulinhetong`

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









































































let hetong=  getApp().globalData.editorContent
ruleForm['hetong']=getApp().globalData.editorContent
if(hetong==='' ){
wx.showToast({
icon: "none",
title: `合同不能为空`,
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
let corssRes = await list(`zulinhetong`, params)
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
await update(`zulinhetong`, ruleForm)
}
else {
await add(`zulinhetong`, ruleForm)
}
}


}
else {


//跨表计算
if (ruleForm.id || this.data.editStatus) {
this.data.editStatus?ruleForm['id']= getApp().globalData.detailId:""
await update(`zulinhetong`, ruleForm)
}
else {
await add(`zulinhetong`, ruleForm)
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