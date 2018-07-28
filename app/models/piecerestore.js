import DS from 'ember-data';

export default DS.Model.extend({
    piece: DS.belongsTo('piece',{ async: false }),
    creater: DS.belongsTo('user', { async: false }),
	created_date: DS.attr('date')
});
