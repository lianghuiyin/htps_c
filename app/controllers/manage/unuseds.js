import Ember from 'ember';
import StandardListController from '../../mixins/standard-list/controller';
import ManagePiecesController from '../../mixins/manage-pieces/controller';

export default Ember.Controller.extend(StandardListController,ManagePiecesController,{
    modelName:"unused",
    routeName:"manage.unuseds",
    parentController:Ember.inject.controller('manage'),
    parentRouteName:"manage",
    pannelTitle:Ember.computed(function(){
        return "待打印";
    }),
    allArrangedResult: Ember.computed.sort('pickedResult', 'modifiedDateSortingDesc'),
    pickedResult:Ember.computed("filteredResult.@each.isUnused","isFiltered",function(){
        let isFiltered = this.get("isFiltered");
        let results = this.get("filteredResult").filterBy("isUnused",true);
        if(isFiltered){
            return results.filterBy("isOwn",true);
        }
        else{
            return results;
        }
    })
});
