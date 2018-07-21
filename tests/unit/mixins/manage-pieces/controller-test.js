import Ember from 'ember';
import ManagePiecesControllerMixin from '../../../mixins/manage-pieces/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | manage pieces/controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let ManagePiecesControllerObject = Ember.Object.extend(ManagePiecesControllerMixin);
  let subject = ManagePiecesControllerObject.create();
  assert.ok(subject);
});
