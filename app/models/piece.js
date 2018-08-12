import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    number: DS.attr('string',{ defaultValue: '' }),//零件号
    order: DS.attr('string',{ defaultValue: '' }),//打印编号
    count: DS.attr('number',{ defaultValue: 0 }),//数量
    printed_count: DS.attr('number',{ defaultValue: 0 }),//已打印数量
    is_printed: DS.attr('boolean', {defaultValue: false}),//是否已全部打印
    is_archived:DS.attr('boolean', { defaultValue: false }),
    ots: DS.attr('string',{ defaultValue: '' }),//ots状态
    delegate_number: DS.attr('string',{ defaultValue: '' }),//委托编号
    accessory_factory: DS.attr('string',{ defaultValue: '' }),//配套厂
    vehicle_type: DS.attr('string',{ defaultValue: '' }),//车辆
    test_content: DS.attr('string',{ defaultValue: '' }),//试验内容
    send_person: DS.attr('string',{ defaultValue: '' }),//送样人员
    charge_person: DS.attr('string',{ defaultValue: '' }),//主管人员
    send_date: DS.attr('date'),//送样时间
    place: DS.attr('string',{ defaultValue: '' }),//存放地点
    is_enable:DS.attr('boolean', {defaultValue: true}),//是否启用
    description: DS.attr('string',{ defaultValue: '' }),//备注
    creater: DS.belongsTo('user', { async: false,inverse: null }),
    created_date: DS.attr('date'),
    modifier: DS.belongsTo('user', { async: false,inverse: null }),
    modified_date: DS.attr('date'),
    searchKeys:Ember.computed("name",function(){
        if(!this.get("id")){
            return [];
        }
        var name = this.get("name"),
            number = this.get("number"),
            // order = this.get("order"),
            accessory_factory = this.get("accessory_factory"),
            vehicle_type = this.get("vehicle_type"),
            send_date = this.get("send_date"),
            place = this.get("place");
        var re = [];
        if(name){
            re.push(name.toLowerCase());
        }
        if(number){
            re.push(number.toLowerCase());
        }
        // if(order){
        //     re.push(order.toLowerCase());
        // }
        if(accessory_factory){
            re.push(accessory_factory.toLowerCase());
        }
        if(vehicle_type){
            re.push(vehicle_type.toLowerCase());
        }
        // if(send_date){
        //     re.push(send_date.format("yyyy-MM-dd"));
        // }
        if(place){
            re.push(place.toLowerCase());
        }
        return re;
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
    }),
    isUnused:Ember.computed("is_enable",function(){
        if(!this.get("is_enable")){
            return false;
        }
        else{
            return !this.get("is_printed");
        }
    }),
    isReleased:Ember.computed("is_enable",function(){
        if(!this.get("is_enable")){
            return false;
        }
        else{
            return this.get("is_printed");
        }
    }),
    isArchivable:Ember.computed("is_archived",function(){
        return !(this.get("is_archived") || this.get("isNew"));
    })
});
