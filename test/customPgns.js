const chai = require('chai')
chai.Should()
chai.use(require('chai-things'))
chai.use(require('chai-json-equal'));

const { FromPgn, pgnToActisenseSerialFormat } = require('@canboat/canboatjs')
const PropertyValues =  require('@signalk/server-api').PropertyValues

const canboatMappings = require('../dist/pgns')
const n2kMappings = require('../dist/n2k-signalk')

describe('custom pgns', function () {

  const propertyValues = new PropertyValues();

  propertyValues.emitPropertyValue({
    timestamp: Date.now(),
    setter: 'customPgns',
    name: 'canboat-custom-pgns',
    value: canboatMappings
  })
  
  var fromPgn = new FromPgn({
    onPropertyValues: (name, cb) => {
      propertyValues.onPropertyValues(name, cb)
    }
  })

  it(`custom pgn in`, function (done) {
    try {
      let pgn = fromPgn.parseString(input)
      delete pgn.input
      pgn.should.jsonEqual(expected)
      done()
    } catch ( e ) {
      done(e)
    }
  })

  it(`custom pgn out`, function (done) {

    var actisense = pgnToActisenseSerialFormat(expected)
    actisense = actisense.slice(actisense.indexOf(','))
    actisense.should.equal(input.slice(input.indexOf(',')))
    done()
  })

})


const input = '2017-04-15T14:57:58.469Z,2,126720,0,255,52,e7,9b,01,00,02,01,0a,01,73,6f,75,72,63,65,2e,30,20,01,65,6e,76,69,72,6f,6e,6d,65,6e,74,2e,77,69,6e,64,2e,73,70,65,65,64,41,70,70,61,72,65,6e,74,04,01,31,30'

const expected = {
  description: "SignalK Over N2K Update",
  timestamp: "2017-04-15T14:57:58.469Z",
  prio: 2,
  src: 0,
  dst: 255,
  pgn: 126720,
  fields: {
    "Manufacturer Code": "SignalK",
    "Industry Code": "Marine Industry",
    "Proprietary ID": "Update",
    SourceId: 'source.0',
    Path: 'environment.wind.speedApparent',
    Value: '10'
  }
}
