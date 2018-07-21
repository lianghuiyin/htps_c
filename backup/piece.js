import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    number: DS.attr('string',{ defaultValue: '' }),
    order: DS.attr('string',{ defaultValue: '' }),
    count: DS.attr('number',{ defaultValue: 0 }),
    printed_count: DS.attr('number',{ defaultValue: 0 }),
    is_printed: DS.attr('boolean', {defaultValue: false}),
    ots: DS.attr('string',{ defaultValue: '' }),
    delegate_number: DS.attr('string',{ defaultValue: '' }),
    accessory_factory: DS.attr('string',{ defaultValue: '' }),
    vehicle_type: DS.attr('string',{ defaultValue: '' }),
    test_content: DS.attr('string',{ defaultValue: '' }),
    send_person: DS.attr('string',{ defaultValue: '' }),
    charge_person: DS.attr('string',{ defaultValue: '' }),
    send_date: DS.attr('date'),
    place: DS.attr('string',{ defaultValue: '' }),
    is_enable:DS.attr('boolean', {defaultValue: false}),
    description: DS.attr('string',{ defaultValue: '' }),
    creater: DS.belongsTo('user', { async: false,inverse: null }),
    created_date: DS.attr('date'),
    modifier: DS.belongsTo('user', { async: false,inverse: null }),
    modified_date: DS.attr('date'),
    searchKeys:Ember.computed("name",function(){
        if(!this.get("id")){
            return [];
        }
        return [this.get("name").toLowerCase(),this.get("number").toLowerCase(),this.get("order").toLowerCase(),
            this.get("accessory_factory").toLowerCase(),this.get("vehicle_type").toLowerCase(),
            this.get("send_date").format("yyyy-MM-dd"),this.get("place").toLowerCase()];
    }),
    nameDidChange:Ember.observer('name', function() {
        let name = this.get("name");
        if(this.get("hasDirtyAttributes") && !this.get("isDeleted")){
            name = name.trim();
            if(Ember.isEmpty(name)){
                this.get('errors').add('name', '不能为空');
            }
            else if(name.length > 20){
                this.get('errors').add('name', '长度不能超过20字符');
            }
            else{
                // var curId = this.get("id");
                // var isRepeated = this.store.peekAll('project').filter(function (project) {
                //     return project.get("id") !== curId && project.get("name") === name;
                // }).length > 0;
                // if(isRepeated){
                //     this.get('errors').add('name', '不能重复');
                // }
            }
        }
    }),
    descriptionDidChange:Ember.observer('description',function(){
        var description = this.get("description");
        if(this.get("hasDirtyAttributes") && !this.get("isDeleted")){
            description = description.trim();
            if(!Ember.isEmpty(description) && description.length > 200){
                this.get('errors').add('description', '长度不能超过200字符');
            }
        }
    })
});
