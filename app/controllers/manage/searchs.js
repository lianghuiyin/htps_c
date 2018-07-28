import Ember from 'ember';
import StandardListController from '../../mixins/standard-list/controller';
import ManagePiecesController from '../../mixins/manage-pieces/controller';
import ArchivePiecesController from '../../mixins/archive-pieces/controller';

export default Ember.Controller.extend(StandardListController,ManagePiecesController,ArchivePiecesController,{
    modelName:"search",
    routeName:"manage.searchs",
    parentController:Ember.inject.controller('manage'),
    parentRouteName:"manage",
    isEmptyKeyFetchable:false,
    pannelTitle:Ember.computed(function(){
        return "搜索";
    }),
    allArrangedResult: Ember.computed.sort('pickedResult', 'modifiedDateSortingDesc'),
    pickedResult:Ember.computed("filteredResult","searchKey","isFiltered",function(){
        let isFiltered = this.get("isFiltered");
        let searchKey = this.get("searchKey");
        if(!searchKey){
            return [];
        }
        let results = this.get("filteredResult");
        if(isFiltered){
            return results.filterBy("isOwn",true);
        }
        else{
            return results;
        }
    })
});
