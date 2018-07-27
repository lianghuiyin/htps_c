import Ember from 'ember';
import ArchivePiecesControllerMixin from '../../../mixins/archive-pieces/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | archive pieces/controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let ArchivePiecesControllerObject = Ember.Object.extend(ArchivePiecesControllerMixin);
  let subject = ArchivePiecesControllerObject.create();
  assert.ok(subject);
});
