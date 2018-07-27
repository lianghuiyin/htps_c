import Ember from 'ember';
import ArchivePiecesRouteMixin from '../../../mixins/archive-pieces/route';
import { module, test } from 'qunit';

module('Unit | Mixin | archive pieces/route');

// Replace this with your real tests.
test('it works', function(assert) {
  let ArchivePiecesRouteObject = Ember.Object.extend(ArchivePiecesRouteMixin);
  let subject = ArchivePiecesRouteObject.create();
  assert.ok(subject);
});
