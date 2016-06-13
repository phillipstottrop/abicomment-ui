import { moduleForModel, test } from 'ember-qunit';

moduleForModel('anecdote', 'Unit | Model | anecdote', {
  // Specify the other units that are required for this test.
  needs: ['model:user', 'model:course']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
