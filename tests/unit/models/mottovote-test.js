import { moduleForModel, test } from 'ember-qunit';

moduleForModel('mottovote', 'Unit | Model | mottovote', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:motto']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
