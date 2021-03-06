import Ember from 'ember';
import FitPaneController from '../../mixins/fit-pane/controller';

export default Ember.Controller.extend(FitPaneController,{
    modelName:"preference",
    routeName:"setting.preference",
    pannelTitle:"偏好设置",
    confirmingCancelMsg:"偏好设置已被修改，确定要放弃修改吗？",
    isEditing:false,
    confirmCancelTransition:null,
    isPicking:false,
    isPickUpPopActive:false,
    isConfirmingCancel:false,
    isConfirmed:false,
    isPickingError:false,
    sessionController:Ember.inject.controller('session'),
    hourTag:"点整",
    hourList:[{
        name:'0',
        value:0
    },{
        name:'1',
        value:1
    },{
        name:'2',
        value:2
    },{
        name:'3',
        value:3
    },{
        name:'4',
        value:4
    },{
        name:'5',
        value:5
    },{
        name:'6',
        value:6
    },{
        name:'7',
        value:7
    },{
        name:'8',
        value:8
    },{
        name:'9',
        value:9
    },{
        name:'10',
        value:10
    },{
        name:'11',
        value:11
    },{
        name:'12',
        value:12
    },{
        name:'13',
        value:13
    },{
        name:'14',
        value:14
    },{
        name:'15',
        value:15
    },{
        name:'16',
        value:16
    },{
        name:'17',
        value:17
    },{
        name:'18',
        value:18
    },{
        name:'19',
        value:19
    },{
        name:'20',
        value:20
    },{
        name:'21',
        value:21
    },{
        name:'22',
        value:22
    },{
        name:'23',
        value:23
    }],
    isServerSideErrorDidChange:Ember.observer("model.errors.server_side_error.length",function(){
        if(this.get("model.errors.server_side_error.length")){
            this.set("isPickingError",true);
        }
    }),
    actions:{
        setShortcutHour(value){
            this.set("model.shortcut_hour",value);
        },
        save(){
            let currentUser = this.get("sessionController.user");
            this.set("model.modifier",currentUser);
            this.get('model').save().then(()=>{
                this.send("goIndex");
            }, ()=>{
            });
        },
        showCancelConfirm(transition){
            this.set("confirmCancelTransition",transition);
            this.set("isConfirmingCancel",true);
        },
        cancel(){
            let confirmCancelTransition = this.get("confirmCancelTransition");
            if(confirmCancelTransition){
                confirmCancelTransition.retry();
            }
            else{
                this.send("goIndex");
            }
        },
        doCancel(isDo){
            this.set("isPickUpPopActive",false);//该属性会自动同步isConfirmingCancel为False
            // this.set("isConfirmingCancel",false);
            this.set("isConfirmed",isDo);
            if(isDo){
                this.send("cancel");
            }
            else{
                this.set("confirmCancelTransition",null);
            }
        },
        clearPop(){
            this.set("isPickUpPopActive",false);
        },
        clearError(model){
            this.set("isPickUpPopActive",false);
            model.get("errors").remove("server_side_error");
        }
    }
});
