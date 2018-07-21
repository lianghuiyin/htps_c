import Ember from 'ember';
import NavigablePaneController from '../../mixins/navigable-pane/controller';

export default Ember.Controller.extend(NavigablePaneController,{
    modelName:"qr",
    routeName:"scanning.filling",
    modelTitle:"扫描结果",
    pannelTitle:"扫描结果",
    actions:{
        save(){
        }
    }
});
