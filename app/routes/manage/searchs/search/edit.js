import Ember from 'ember';
import StandardDetailEditRoute from '../../../../mixins/standard-detail/edit-route';

export default Ember.Route.extend(StandardDetailEditRoute,{
    controllerName: 'manage.searchs.search',
    activate(){
        let controller = this.controllerFor(this.controllerName);
        controller.set("isBaseFolded",false);
    	return this._super();
    }
});
