import { moduleForModel, test } from 'ember-qunit';

moduleForModel('vote', 'Unit | Model | vote', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:vote-option']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
