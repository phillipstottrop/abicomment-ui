import { moduleForModel, test } from 'ember-qunit';

moduleForModel('promtableentry', 'Unit | Model | promtableentry', {
  // Specify the other units that are required for this test.
  needs: ['model:promtable', 'model:user']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
