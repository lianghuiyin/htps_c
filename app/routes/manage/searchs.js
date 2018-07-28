import Ember from 'ember';
import StandardListRoute from '../../mixins/standard-list/route';
import ArchivePiecesRoute from '../../mixins/archive-pieces/route';

export default Ember.Route.extend(StandardListRoute,ArchivePiecesRoute,{
    modelName:"search",
    controllerName: 'manage.searchs',
    parentControllerName:"manage",
    model(){
        return this.store.peekAll('piece');
    },
    actions:{
        goNew(){
        	return true;
        }
    }
});
