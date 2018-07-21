import Ember from 'ember';
import NavigablePaneController from '../mixins/navigable-pane/controller';

export default Ember.Controller.extend(NavigablePaneController,{
    modelName:"scanning",
    routeName:"scanning",
    modelTitle:"扫码",
    pannelTitle:"扫描二维码",
    vinCode:"",
    codeDidChange:Ember.observer("vinCode",function(){
        if(this.get("vinCode")){
            this.send("goFilling");
        }
    }),
    actions:{
        tryGoNext(){
            this.notifyPropertyChange("vinCode");
        }
    }
});
