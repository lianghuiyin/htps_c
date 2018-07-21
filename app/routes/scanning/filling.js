import Ember from 'ember';
import NavigablePaneRoute from '../../mixins/navigable-pane/route';

export default Ember.Route.extend(NavigablePaneRoute,{
    controllerName: 'scanning.filling',
	parentControllerName:"scanning",
    model(){
        let p_controller = this.controllerFor(this.parentControllerName);
        let vinCode = p_controller.get("vinCode");
        if(vinCode){
            var id = new Date().format("yyyyMMddhhmmss");
            return this.store.createRecord("qr", {
                id: id,
                code: vinCode,
                created_date: new Date()
            });
        }
        else{
            return null;
        }
    },
    afterModel(model, transition) {
        if(!model){
            transition.send("goBack");
        }
    },
    activate(){
        return this._super();
    },
    deactivate(){
        return this._super();
    },
    actions:{
        willTransition(transition) {
            let p_controller = this.controllerFor(this.parentControllerName);
            p_controller.set("vinCode","");

            if(this.get("controller.isConfirmed")){
                this.set("controller.isConfirmed",false);
                return true;
            }
            else if(this.get("controller.model.hasDirtyAttributes")){
                this.controller.send("showCancelConfirm",transition);
                transition.abort();
            }
            else{
                return true;
            }
            return true;
        },
        goBack(){
            this.transitionTo(this.parentControllerName);
            Ember.run.next(()=>{
                window.$("textarea").focus();
            });
        }
    }
});
