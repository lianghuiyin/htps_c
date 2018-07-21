import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    code: DS.attr('string',{ defaultValue: "" }),
    created_date: DS.attr('date'),
    title:Ember.computed("code",function(){
        if(!this.get("id")){
            return "";
        }
        var code = this.get("code");
        if(code){
        	return code.trim().substr(0,10);
        }
        else{
        	return "";
        }
    }),
});

