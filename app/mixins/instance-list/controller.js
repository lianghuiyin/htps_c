import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Mixin.create({
    isCloudList:false,
    createdDateSorting: ['created_date:asc','id'],
    createdDateSortingDesc: ['created_date:desc','id'],
    modifiedDateSortingDesc: ['modified_date:desc'],
    isSearching:false,
    errorsForInstances:DS.Errors.create(),
    isSearchingTraces:false,
    errorsForTraces:DS.Errors.create(),
    lastId:0,
    isMoreButtonNeeded:false,
    isToShowAll:false,
    topCount:20,
    pageCount:20,
    selection:null,
    isCopySuccess:false,
    copyStatusText:"",
    clipBoardContent:"",
    selectionDidChange:Ember.observer("selection",function(){
        let instance = this.get("selection");
        if(instance){
            //如果没有traces说明申请单从已归档状态，需要从服务器加载其全部履历
            if(instance.get("traces.length") === 0){
                this.send("fetchTraces",instance);
            }
        }
    }),
    allArrangedResult: Ember.computed.sort('model.instances', 'modifiedDateSortingDesc'),
    arrangedResult:Ember.computed("allArrangedResult","isToShowAll",function(){
        let allArrangedResult = this.get("allArrangedResult"),
            isToShowAll = this.get("isToShowAll");
        if(isToShowAll){
            return allArrangedResult;
        }
        else{
            let topCount = this.get("topCount");
            return allArrangedResult.filter(function(item, index){
                return index < topCount;
            });
        }
    }),
    isTopButtonNeeded:Ember.computed("isToShowAll","allArrangedResult.length",function(){
        //只要列表个数超过topCount则需要切换按钮
        return this.get("allArrangedResult.length") > this.get("topCount");
    }),
    // isCloudListDidChange:Ember.observer("isCloudList",function(){
    //     this.set("lastId",0);
    //     this.set("isMoreButtonNeeded",false);
    //     let isCloudList = this.get("isCloudList");
    //     this.get("errorsForInstances").clear();
    //     // if(isCloudList){
    //     //     this.send("fetchArchivedInstances");
    //     // }
    //     // else{
    //     //     this.send("unloadArchivedInstances");
    //     // }
    // }),
    actions:{
        // unloadArchivedInstances(){
        //     let store = this.store;
        //     let car = this.get("model");
        //     //因为car的instances属性是靠ember-data的DS.hasMany自动计算的，
        //     //所以store.unloadRecord会触发这里的forEach函数内部索引异常造成
        //     //instance可能为undefined的情况（即被unloadRecord移除了），
        //     //所以这里一定要先把is_archived属性为true的全部筛选出来(保证所有instance都需要unloadRecord)，
        //     //然后再forEach，否则其中有任何跳过unloadRecord函数都会出现forEach异常的
        //     let instances = car.get("instances").filterBy("is_archived",true);
        //     let traces;
        //     instances.forEach((instance)=>{
        //         traces = instance.get("traces");
        //         traces.forEach((trace)=>{
        //             store.unloadRecord(trace);
        //         });
        //         store.unloadRecord(instance);
        //     });
        //     car.notifyPropertyChange("instances");
        // },
        unloadArchivedInstances(){
            let store = this.store;
            let car = this.get("model");
            car.get("instances").forEach((instance)=>{
                if(instance.get("is_archived")){
                    instance.get("traces").forEach((trace)=>{
                        store.unloadRecord(trace);
                    });
                    store.unloadRecord(instance);
                }
            });
            car.notifyPropertyChange("instances");
        },
        fetchArchivedInstances(){
            let car = this.get("model");
            let pageCount = this.get("pageCount");
            let lastId = this.get("lastId");
            this.get("errorsForInstances").remove('server_side_error');
            this.set("isSearching",true);
            this.store.query('instance',{
                count:pageCount,
                car:car.get("id"),
                lastId:lastId
            }).then((answer)=>{
                let instances = answer.toArray();
                if(instances.length > 0){
                    let minId = instances.mapBy("id").sort(function(a,b){
                        return parseInt(a) - parseInt(b);
                    }).get("firstObject");
                    this.set("lastId",minId);
                }
                if(instances.length < pageCount){
                    this.set("isMoreButtonNeeded",false);
                }
                else{
                    this.set("isMoreButtonNeeded",true);
                }
                car.notifyPropertyChange("instances");
                this.set("isSearching",false);
            },(reason)=>{
                let error = reason.errors.objectAt(0);
                let errorMsg = "";
                if(reason.errors){
                    errorMsg = error.detail;
                }
                else{
                    errorMsg = "该资源不存在或网络繁忙，请稍候再试";
                }
                let recordErrors = this.get("errorsForInstances");
                recordErrors.add(Ember.String.underscore("ServerSideError"), errorMsg);
                this.set("isSearching",false);
            });

        },
        fetchNext(){
            this.set("isToShowAll",true);
            this.send("fetchArchivedInstances");
        },
        toggleToShowAll(){
            this.toggleProperty("isToShowAll");
        },
        toggleCloudList(){
            this.toggleProperty("isCloudList");
        },
        fetchTraces(instance){
            this.get("errorsForTraces").remove('server_side_error');
            this.set("isSearchingTraces",true);
            this.store.query('trace',{
                instance:instance.get("id")
            }).then(()=>{
                instance.notifyPropertyChange("traces");
                this.set("isSearchingTraces",false);
            },(reason)=>{
                let error = reason.errors.objectAt(0);
                let errorMsg = "";
                if(reason.errors){
                    errorMsg = error.detail;
                }
                else{
                    errorMsg = "该资源不存在或网络繁忙，请稍候再试";
                }
                let recordErrors = this.get("errorsForTraces");
                recordErrors.add(Ember.String.underscore("ServerSideError"), errorMsg);
                this.set("isSearchingTraces",false);
            });

        },
        onCopySuccess(){
            this.set("isCopySuccess", true);
            this.set("copyStatusText", "已成功复制试件信息，请打开打印软件导入试件信息来打印二维码");
        },
        onCopyError(){
            this.set("isCopySuccess", false);
            this.set("copyStatusText", "复制试件信息失败，可能是您使用的浏览器不支持！");
        },
        setCopyPieceContent(){
            var contents = [];
            contents.push("系统编号:" + this.get("content.id"));
            contents.push("零件名称:" + this.get("content.name"));
            contents.push("OTS状态:" + this.get("content.ots"));
            contents.push("零件号:" + this.get("content.number"));
            contents.push("数量-组/个:" + this.get("content.count"));
            contents.push("委托编号:" + this.get("content.delegate_number"));
            contents.push("配套厂:" + this.get("content.accessory_factory"));
            contents.push("车型:" + this.get("content.vehicle_type"));
            contents.push("试验内容:" + this.get("content.test_content"));
            contents.push("送样人员:" + this.get("content.send_person"));
            contents.push("主管人员:" + this.get("content.charge_person"));
            contents.push("送样时间:" + (this.get("content.send_date") ? this.get("content.send_date").format("yyyy-MM-dd") : ""));
            contents.push("存放地点:" + this.get("content.place"));
            contents.push("备注:" + this.get("content.description"));
            var clipBoardContent = contents.join("\r\n");
            this.set("clipBoardContent", clipBoardContent);
        }
    }
});
