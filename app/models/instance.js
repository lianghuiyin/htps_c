import DS from 'ember-data';

export default DS.Model.extend({
    order: DS.attr('string',{ defaultValue: '' }),//打印编号
    piece: DS.belongsTo('piece',{ async: true }),
    creater: DS.belongsTo('user', { async: false,inverse: null }),
    created_date: DS.attr('date')
});
