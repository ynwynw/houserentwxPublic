const {
update,
add,
page,
list,
detail,
save,
    session
} = require("../../api/index.js")
const utils = require("../../utils/index.js")
Page({
data: {
token:  '',
baseURL:'',
id: getApp().globalData.detailId,
userId:getApp().globalData.userInfo.id,
detailList: {},
payAuth:"",
picture:"",
goodname:"",

shhf: '',
sfshIndex: 0,
sfshOptions: ['通过','不通过', '待审核'],
isAuth:'',
isAuthFront:'',

},
async    onLoad(option) {
let authobj={}
this.setData(authobj)
 let myid=option?.id?option?.id:getApp().globalData.detailId.id
this.setData({
id: myid,
isAuth:utils.isAuth('yonghu','审核'),
isAuthFront:  utils.isAuthFront('yonghu','审核'),
token:   wx.getStorageSync('token'),
baseURL:   wx.getStorageSync('baseURL') + '/'
})
this.handleUpdateData()
},
//立即预订
orderTap(){
if (this.data.activeSeat.length <= 0) {
wx.showToast({
title: '请选择需要预订的位置',
icon: 'none'
})
return
}
const userInfo=getApp().globalData.userInfo
const activeSeat = this.data.activeSeat.join(',') + ',' + this.data.detailList.selected
let data = {
orderid: this.createOrderId(),
tablename: 'yonghu',
userid:userInfo.id,
goodid: this.data.detailList.id,
buynumber:  this.data.activeSeat.length,
total: 0,
discounttotal: 0,
address: this.data.activeSeat,
status: '已支付',
discountprice: this.data.detailList.vipprice,
picture:  this.data.picture[0],
}
if(this.data.detailList?.price){
data['status'] = '未支付'
data['price'] = this.data.detailList?.price
data['total'] = parseFloat(data['price'] * activeSeat.length).toFixed(2)
wx.showModal({
title: '提示',
content: '是否预订选中座位',
complete: async (res) => {
if (res.confirm) {
    wx.setStorageSync('orderGoods',[data])
        wx.navigateTo({
        url: "/pages/shop-orders/orders-confirm?type=1&seat=1"
    })
}
}
})
}

}
,
chapterClick() {
    const item = this.data.freeChapterList[0]
    if(!item){
        wx.showToast({
            title: '暂无章节',
            icon:"none"
        })
        return;
    }
    let type=1
if (type == 2 && this.userVip!='是') {
    wx.showToast({
        title: 'vip章节，请购买会员后阅读!',
        icon:"none"
    })
return
}

},
authTap() {
    if (!this.data.token) {
        wx.showToast({
            title: '请先登陆',
            icon: 'none'
        })
        return
    }
},
async handleUpdateData() {
// 更新当前页面的数据
var that = this
const id = getApp().globalData.detailId
if (id) {
const {
data
} = await detail("yonghu",id)
this.setData({
payAuth:utils.isAuthFront('yonghu','支付')
})





























    data.shhf == null ? data.shhf = "" : ''






const detailList = data
this.setData({
shhf:detailList.shhf,
detailList,
picture: detailList.touxiang.split(','),
})

if (!this.data.token) {
return
}


}

},

onUnload: function () {
getApp().globalData.detailList = {}
console.log('页面被卸载，执行销毁操作');
},
async listUpdate(name) {
const predetailList = this.data.predetailList
const detailList = this.data.detailList
predetailList.shangpintupian = this.data.picture[0]
if (name == "thumbsupnum") {
// 点赞
predetailList.thumbsupnum = predetailList.thumbsupnum + 1
detailList.thumbsupnum = detailList.thumbsupnum + 1
}
if (name == "cancelthumb") {
// 取消点赞
predetailList.thumbsupnum = predetailList.thumbsupnum - 1
detailList.thumbsupnum = detailList.thumbsupnum - 1
}
if (name == "crazilynum") {
predetailList.crazilynum = predetailList.crazilynum + 1
detailList.crazilynum = detailList.crazilynum + 1
}
if (name == "cancelCrazily") {
predetailList.crazilynum = predetailList?.crazilynum - 1
detailList.crazilynum = detailList.crazilynum - 1
}
if (name == 'cancelislike') {
predetailList.storeupnum = predetailList.storeupnum - 1
detailList.storeupnum = detailList.storeupnum - 1

}
if (name == "islike") {
predetailList.storeupnum = predetailList.storeupnum + 1
detailList.storeupnum = detailList.storeupnum + 1
}
this.setData({
detailList
})
const resUpdate = await update('yonghu', predetailList)
if (resUpdate.code == 0) {
this.setData({
predetailList,
"detailList.crazilynum": predetailList.crazilynum
})

}


},




onPayTap()  {

if (!this.data.token) {
return
}
const baseURL=  wx.getStorageSync('baseURL')
let data=this.data.detailList
data["touxiang"] = data.touxiang
data['buynumber']=1
wx.setStorageSync('payObject',data);
wx.setStorageSync('paytable','yonghu');

    wx.navigateTo({
        url: "/pages/pay-confirm/pay-confirm?type=1"
    })
},


onSHTap() {
this.selectComponent('#bottomFrame').showFrame();
},
canlreply() {
this.selectComponent('#bottomFrame').hideFrame();
},
async reply() {
const detailList = this.data.detailList
detailList['shhf'] = this.data.shhf
const res = await update("yonghu", detailList)
if (res.code == 0) {
setTimeout(function () {
wx.showToast({
title: '回复成功',
icon: "none"
})
}, 1000)

this.handleUpdateData()
}
this.selectComponent('#bottomFrame').hideFrame();
},


async onShow() {
},
sfshChange(e) {
    var sfsh='';
    this.data.sfshOptions[e.detail.value]=='通过'?sfsh='是':(this.data.sfshOptions[e.detail.value]=='不通过'?sfsh='否':this.data.sfshOptions[e.detail.value]=='待审核'?sfsh='待审核':'')
    this.setData({
        sfshIndex:e.detail.value,
        'detailList.sfsh':sfsh
    })
},
onSHTap() {
    this.selectComponent('#bottomFrame').showFrame();
},
//免费试读

// 下载
    download(e) {
let url = e.currentTarget.dataset.url
url = wx.getStorageSync('baseURL') + '/' + url;
wx.downloadFile({
    url: url,
    success: (res) => {
        if (res.statusCode === 200) {
            wx.showToast({
                title: '下载成功',
                icon: "none"
            })

            const filePath = res.tempFilePath
            wx.openDocument({
                filePath: filePath,
                showMenu: true,
                success: function (res) {
                    console.log('打开文档成功')
                }
            })
            console.log('点击查看文件', filePath);
                                            }
    }
});
},
// 跨表
onAcrossTap(e){

// (tableName,crossOptAudit,statusColumnName,tips,statusColumnValue)
const info = e.currentTarget.dataset.info;
const crossOptAudit=info.split(",")[1].replace(/'/g, '')

const token = wx.getStorageSync("token")
if (!this.data.token) {
wx.showToast({
    title: '请登录后再操作',
    icon:"none"
})
return
}

if(crossOptAudit=='是'&&this.data.detailList?.sfsh!='是'){
wx.showToast({
title: '请审核通过后再操作',
icon:"none"
})
return
}
let pagetableName = info.split(",")[0]
const statusColumnName = info.split(",")[2]
const tips = info.split(",")[3]
let statusColumnValue = info.split(",")[3]
statusColumnValue = statusColumnValue.replace(/^'|'$/g, '');
wx.setStorageSync('crossTable','yonghu');
wx.setStorageSync(`crossObj`, this.data.detailList);
wx.setStorageSync('statusColumnName', statusColumnName?.substring(1, statusColumnName?.length - 1))
wx.setStorageSync('tips', tips.substring(1, tips?.length - 1))
let keyname=statusColumnValue?.split('[')[0]
let statusColumnValueindex=statusColumnValue?.split('[')[1]?.replace(']','')
keyname=keyname?keyname.replace('CrossSelect',''):''

wx.setStorageSync('statusColumnValue',statusColumnValue)
if (statusColumnName != '' && !statusColumnName.startsWith("[")) {
var obj = this.data.detailList

for (var o in obj) {
if (statusColumnName.includes(o) && statusColumnValue==obj[o]) {
    wx.showToast({
        title: tips,
        icon: "none"
    })
    return
}
}
}
getApp().globalData.detailId = this.data.detailList.id
getApp().globalData.detailList = this.data.detailList
wx.navigateTo({
url: `/pages/${pagetableName}/update-and-add?cross=true`,
})

},

                                                                

})