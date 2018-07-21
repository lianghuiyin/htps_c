import Ember from 'ember';
import NavigablePaneController from '../../mixins/navigable-pane/controller';

export default Ember.Controller.extend(NavigablePaneController,{
    applicationController:Ember.inject.controller('application'),
    sessionController:Ember.inject.controller('session'),
    modelName:"scanning",
    routeName:"start.scanning",
    modelTitle:"扫描内容",
    pannelTitle:Ember.computed(function(){
        return "扫描内容【" + this.get("model.id") + "】";
    }),
    actions:{
    }
});
