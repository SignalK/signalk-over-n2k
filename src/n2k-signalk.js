
module.exports = [
  {
    node: (n2k) => {
      return n2k.fields.Path
    },
    value: (n2k) => {
      const val = n2k.fields.Value
      return val === 'null' ? null : JSON.parse(val)
    },
    filter: (n2k) => {
      return n2k.fields['Proprietary ID']  === 'Update'
    },
    context: (n2k) => {
      return n2k.fields.Context
    }
  }
]
