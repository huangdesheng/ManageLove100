webpackJsonp([8],{JPza:function(t,e){},N2K8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("lC5x"),l=a.n(i),s=a("J0Oq"),c=a.n(s),n=a("gyMJ"),r=a("nm5P"),o=a("KHRU"),d={data:function(){return{formInline:{organization:"",region:"0",programName:""},item:{auditDesc:"",auditStatus:1,projectId:0,projectType:0},tableData:[],checkData:[],total:0,pageSize:20,pageNum:1,dialogVisible:!1,personDetails:!1,checkPersonDetails:!1,checkdetailsData:"",url:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",icon:a("BxgL"),no_icon:a("j7d7")}},mounted:function(){this.personsList()},mixins:[r.a,o.a],computed:{list:function(){return this.$store.state.menusLists}},methods:{personalDelete:function(t){var e=this;return c()(l.a.mark(function a(){return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.personalDelete(t);case 2:200===a.sent.code&&e.personsList();case 4:case"end":return a.stop()}},a,e)}))()},detailsInfo:function(t,e){this.checkdetails(t,e)},checkdetails:function(t,e){var a=this;return c()(l.a.mark(function i(){var s,c;return l.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,n.a.checkdetails(t);case 2:200===(s=i.sent).code&&(1===e?a.checkPersonDetails=!0:a.personDetails=!0,a.checkdetailsData=s.data,c=s.data.photos.filter(function(t){return 3===t.type}),console.log(c));case 4:case"end":return i.stop()}},i,a)}))()},onSubmit:function(){this.pageNum=1,this.personsList(this.formInline.cardId)},changeStatus:function(t){this.pageNum=1,this.personsList()},personsList:function(t){var e=this;return c()(l.a.mark(function a(){var i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=t||"",a.next=3,n.a.personsList({auditStatus:e.formInline.region,cardId:t,pageNum:e.pageNum,pageSize:e.pageSize});case 3:200===(i=a.sent).code?(e.tableData=i.data.list,e.total=i.data.total):904===i.code&&(e.tableData=[],e.total=1);case 5:case"end":return a.stop()}},a,e)}))()},handleClick:function(t){this.checkdetails(t),this.item.projectId=t},submit:function(){if("2"==this.item.auditStatus&&""==this.item.auditDesc)return this.$message({message:"请输入审核意见",type:"warning"}),!1;this.auditSubmit(this.item)},auditSubmit:function(t){var e=this;return c()(l.a.mark(function a(){var i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.auditSubmit(t);case 2:200===(i=a.sent).code?(e.personDetails=!1,e.personsList(),e.$message({message:"审核成功",type:"success"})):e.$message({message:i.message,type:"warning"});case 4:case"end":return a.stop()}},a,e)}))()},handleSizeChange:function(t){this.pageSize=t,this.personsList()},handleCurrentChange:function(t){this.pageNum=t,this.personsList()},handleClose:function(){},checking:function(t){this.dialogVisible=!0,this.checkedNode(t)},checkedNode:function(t){var e=this;return c()(l.a.mark(function a(){var i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.checkedNode({projectId:t,projectType:0});case 2:200===(i=a.sent).code?e.checkData=i.data:e.checkData=[];case 4:case"end":return a.stop()}},a,e)}))()},recommend:function(t){var e=this;console.log(t),this.$confirm("是否推荐该项目","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"primary"}).then(function(){e.recommendProject(t)}).catch(function(){e.$message({type:"info",message:"已取消推荐"})})},recommendProject:function(t){var e=this;return c()(l.a.mark(function a(){var i;return l.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,n.a.recommendProject({projectId:t,projectType:0});case 2:i=a.sent,console.log(i),200===i.code?e.$message({type:"success",message:"推荐成功!"}):e.$message({type:"info",message:"已取消推荐"});case 5:case"end":return a.stop()}},a,e)}))()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"helpFul"},[a("div",[a("div",[[a("header",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"项目状态"}},[a("el-select",{attrs:{clearable:"",placeholder:"项目状态"},on:{change:t.changeStatus},model:{value:t.formInline.region,callback:function(e){t.$set(t.formInline,"region",e)},expression:"formInline.region"}},[a("el-option",{attrs:{label:"待审核",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"不通过",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"通过",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"发起人身份证号码"}},[a("el-input",{attrs:{placeholder:"发起人身份证号码"},model:{value:t.formInline.cardId,callback:function(e){t.$set(t.formInline,"cardId",e)},expression:"formInline.cardId"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("查询")])],1)],1)],1)],t._v(" "),[a("section",[a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"username",label:"发起人","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"cardId",label:"发起人身份证","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"recipientsName",label:"受助人","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return t.detailsInfo(e.row.projectId,1)}}},[t._v(t._s(e.row.recipientsName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"postTime",label:"申请时间","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditStatus",label:"审核状态","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.auditStatus?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.checking(e.row.projectId)}}},[t._v("审核中")]):1===e.row.auditStatus?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.checking(e.row.projectId)}}},[t._v("通过")]):a("el-button",{staticStyle:{color:"red"},attrs:{type:"text",size:"small"},on:{click:function(a){return t.checking(e.row.projectId)}}},[t._v("审核不通过")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"auditTime",label:"审核时间","min-width":"120"}}),t._v(" "),-1!=t.list.indexOf("150")||-1!=t.list.indexOf(150)?a("el-table-column",{attrs:{label:"操作","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[0===e.row.auditStatus?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){return t.handleClick(e.row.projectId)}}},[t._v("审核")]):1===e.row.auditStatus?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.recommend(e.row.projectId)}}},[t._v("推荐")]):t._e(),t._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return t.personalDelete(e.row.projectId)}}},[t._v("临时删除")])]}}],null,!1,1070685295)}):t._e()],1)],1)]],2),t._v(" "),[a("footer",[a("div",[a("el-pagination",{attrs:{"current-page":t.pageNum,"page-sizes":[5,10,20,30,40],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])]],2),t._v(" "),a("el-dialog",{staticClass:"details personal comom",attrs:{visible:t.personDetails,width:"85%",title:"项目详情"},on:{"update:visible":function(e){t.personDetails=e},close:t.handleClose}},[""!=t.checkdetailsData?[a("aside",{staticClass:"aside"},[a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("受助人头像:")])]),t._v(" "),a("el-col",{staticClass:"avatar"},[a("div",{staticClass:"block"},[a("el-image",{attrs:{src:t.checkdetailsData.photo,fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photo)}}})],1)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("姓名:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.name))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("性别:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(1===t.checkdetailsData.sex?"男":"女"))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("年龄:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.age)+"岁")])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("年级:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.classNumber)+"年级")])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("身份证号:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.cardId))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("爱心状况:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[[t._l(Array.from({length:t.checkdetailsData.loveValue},function(t,e){return e}),function(e,i){return a("span",{key:i},[a("img",{staticClass:"loveValue",attrs:{src:t.icon,alt:""}})])}),t._v(" "),a("span",t._l(Array.from({length:t.checkdetailsData.totalPeriods-t.checkdetailsData.loveValue},function(t,e){return e}),function(e,i){return a("img",{key:i,staticClass:"loveValue",attrs:{src:t.no_icon,alt:""}})}),0)]],2)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("地区:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.address))])])],1),t._v(" "),a("div",{staticClass:"info"},[a("div",[a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("身份/户口本照片：")])]),t._v(" "),void 0!=t.checkdetailsData.photos[0]?a("el-col",{staticClass:"cardId"},[a("div",[a("el-image",{attrs:{src:t.checkdetailsData.photos[0].urls[0],fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photos[0].urls[0])}}})],1),t._v(" "),a("div",[a("el-image",{attrs:{src:t.checkdetailsData.photos[0].urls[1],fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photos[0].urls[1])}}})],1)]):t._e()],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("家庭状况：")])]),t._v(" "),a("el-col",[a("div",{staticStyle:{width:"60%"}},[t._v(t._s(t.checkdetailsData.family))]),t._v(" "),t.checkdetailsData.photos.filter(function(t){return 2===t.type}).length>0?a("div",{staticClass:"pic",staticStyle:{display:"flex","margin-top":"0.2rem"}},t._l(t.checkdetailsData.photos.filter(function(t){return 2===t.type})[0].urls,function(e,i){return a("el-image",{key:i,attrs:{src:e,fit:"cover"},on:{click:function(a){return t.imgUrl(e)}}})}),1):t._e()])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("学习情况：")])]),t._v(" "),a("el-col",[a("div",{staticStyle:{width:"60%"}},[t._v(t._s(t.checkdetailsData.learn))]),t._v(" "),t.checkdetailsData.photos.filter(function(t){return 3===t.type}).length>0?a("div",{staticClass:"pic",staticStyle:{display:"flex","margin-top":"0.2rem"}},t._l(t.checkdetailsData.photos.filter(function(t){return 3===t.type})[0].urls,function(e,i){return a("el-image",{key:i,attrs:{src:e,fit:"cover"},on:{click:function(a){return t.imgUrl(e)}}})}),1):t._e()])],1)],1)]),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("是否通过:")])]),t._v(" "),a("el-col",[a("el-radio-group",{model:{value:t.item.auditStatus,callback:function(e){t.$set(t.item,"auditStatus",e)},expression:"item.auditStatus"}},[a("el-radio",{attrs:{label:1}},[t._v("通过")]),t._v(" "),a("el-radio",{attrs:{label:2}},[t._v("不通过")])],1)],1)],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("审核意见:")])]),t._v(" "),a("el-col",[a("el-input",{staticStyle:{width:"30%"},attrs:{type:"textarea",autosize:{minRows:5,maxRows:8},placeholder:"请输入内容"},model:{value:t.item.auditDesc,callback:function(e){t.$set(t.item,"auditDesc","string"==typeof e?e.trim():e)},expression:"item.auditDesc"}})],1)],1),t._v(" "),a("el-row",{staticClass:"btn",staticStyle:{display:"flex","justify-content":"center","margin-top":"0.6rem"}},[a("el-button",{staticStyle:{"margin-right":"0.6rem"},on:{click:function(e){t.personDetails=!1}}},[t._v("取消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("确定")])],1)],1)]:t._e()],2),t._v(" "),a("el-dialog",{staticClass:"details personal",attrs:{visible:t.checkPersonDetails,width:"85%",title:"项目详情"},on:{"update:visible":function(e){t.checkPersonDetails=e},close:t.handleClose}},[""!=t.checkdetailsData?[a("aside",{staticClass:"aside"},[a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("受助人头像:")])]),t._v(" "),a("el-col",{staticClass:"avatar"},[a("div",{staticClass:"block"},[a("el-image",{attrs:{src:t.checkdetailsData.photo,fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photo)}}})],1)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("姓名:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.name))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("性别:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(1===t.checkdetailsData.sex?"男":"女"))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("年龄:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.age)+"岁")])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("年级:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.classNumber))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("身份证号:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.cardId))])])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("爱心状况:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[[t._l(Array.from({length:t.checkdetailsData.loveValue},function(t,e){return e}),function(e,i){return a("span",{key:i},[a("img",{staticClass:"loveValue",attrs:{src:t.icon,alt:""}})])}),t._v(" "),a("span",t._l(Array.from({length:t.checkdetailsData.totalPeriods-t.checkdetailsData.loveValue},function(t,e){return e}),function(e,i){return a("img",{key:i,staticClass:"loveValue",attrs:{src:t.no_icon,alt:""}})}),0)]],2)])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("地区:")])]),t._v(" "),a("el-col",[a("div",{staticClass:"grid-content bg-purple-light"},[t._v(t._s(t.checkdetailsData.address))])])],1),t._v(" "),a("div",{staticClass:"info"},[a("div",[a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("身份/户口本照片：")])]),t._v(" "),void 0!=t.checkdetailsData.photos[0]?a("el-col",{staticClass:"cardId"},[a("div",[a("el-image",{attrs:{src:t.checkdetailsData.photos[0].urls[0],fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photos[0].urls[0])}}})],1),t._v(" "),a("div",[a("el-image",{attrs:{src:t.checkdetailsData.photos[0].urls[1],fit:"cover"},on:{click:function(e){return t.imgUrl(t.checkdetailsData.photos[0].urls[1])}}})],1)]):t._e()],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("家庭状况：")])]),t._v(" "),a("el-col",[a("div",{staticStyle:{width:"60%"}},[t._v(t._s(t.checkdetailsData.family))]),t._v(" "),t.checkdetailsData.photos.filter(function(t){return 2===t.type}).length>0?a("div",{staticClass:"pic",staticStyle:{display:"flex","margin-top":"0.2rem"}},t._l(t.checkdetailsData.photos.filter(function(t){return 2===t.type})[0].urls,function(e,i){return a("el-image",{key:i,attrs:{src:e,fit:"cover"},on:{click:function(a){return t.imgUrl(e)}}})}),1):t._e()])],1),t._v(" "),a("el-row",[a("el-col",[a("div",{staticClass:"grid-content bg-purple"},[t._v("学习情况：")])]),t._v(" "),a("el-col",[a("div",{staticStyle:{width:"60%"}},[t._v(t._s(t.checkdetailsData.learn))]),t._v(" "),t.checkdetailsData.photos.filter(function(t){return 3===t.type}).length>0?a("div",{staticClass:"pic",staticStyle:{display:"flex","margin-top":"0.2rem"}},t._l(t.checkdetailsData.photos.filter(function(t){return 3===t.type})[0].urls,function(e,i){return a("el-image",{key:i,attrs:{src:e,fit:"cover"},on:{click:function(a){return t.imgUrl(e)}}})}),1):t._e()])],1)],1)])],1)]:t._e()],2),t._v(" "),a("el-dialog",{attrs:{title:"审核节点",visible:t.dialogVisible,width:"60%"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.handleClose}},[[a("el-table",{staticStyle:{width:"100%","text-align":"center"},attrs:{data:t.checkData,border:""}},[a("el-table-column",{attrs:{type:"index",label:"审核编号",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditStatus",label:"审核结果","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[1===e.row.auditStatus?a("span",{staticStyle:{color:"#40d0b3"}},[t._v("通过")]):2===e.row.auditStatus?a("span",{staticStyle:{color:"red"}},[t._v("审核不通过")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"auditTime",label:"审核时间","min-width":"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"auditDesc",label:"审核意见","min-width":"120"}})],1)]],2),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.imgStatus,expression:"imgStatus"}],staticClass:"bigImg",on:{click:t.bigImg}},[a("div",[a("img",{attrs:{src:t.imgurl,width:"60%"}})])])],1)},staticRenderFns:[]};var p=a("C7Lr")(d,u,!1,function(t){a("JPza"),a("c+y2")},"data-v-09ea11d6",null);e.default=p.exports},"c+y2":function(t,e){}});
//# sourceMappingURL=8.a1c4447eac78fe207055.js.map