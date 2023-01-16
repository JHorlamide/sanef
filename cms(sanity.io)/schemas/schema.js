import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import news from './news'
import event from './event'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([news, event]),
})
