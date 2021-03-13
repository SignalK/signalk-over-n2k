/*
 * Copyright 2021 Scott Bender <scott@scottbender.net>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const canboatMappings = require('./pgns')
const n2kMappings = require('./n2k-signalk')

export default function (app: any) {
  const error = app.error
  const debug = app.debug
  let onStop: any = []
  let n2kOutEvent: string
  let allowPUT: boolean

  function onDelta (delta: any) {
    if (delta.updates) {
      delta.updates.forEach((update: any) => {
        if (update.values) {
          update.values
            .map((pv: any) => {

              return {
                prio: 6,
                src: 3,
                dst: 255,
                pgn: 126720,
                fields: {
                  "Manufacturer Code": 999,
                  "Industry Code": 4,
                  "Proprietary ID": 1,
                  "Context": "vessels.self",
                  SourceId: update.$source,
                  Path: pv.path,
                  Value: pv.value != null ? JSON.stringify(pv.value) : null
                }
              }
            })
            .forEach((pgn: any) => {
              debug('sending %j', pgn)
              app.emit(n2kOutEvent, pgn)
            })
        }
      })
    }
  }

  function putCallBack(res:any) {
    if ( res.state === 'COMPLETED' && res.statusCode !== 200 ) {
      app.error('unable to send PUT: ' + JSON.stringify(res))
    }
  }
  
  function canboatCallback(pgn:any) {
    const val = !pgn.fields.Value || pgn.fields.Value === 'null' ? null : JSON.parse(pgn.fields.Value)
    const context = !pgn.fields.Context ? 'vessels.self' : pgn.fields.Context
    
    if ( pgn.fields['Proprietary ID'] === "Put" ) {
      if ( !allowPUT ) {
        app.error('PUTs not allowed')
      } else {
        app.putPath(`${context}.${pgn.fields.Path}`, val, putCallBack)
      }
    } else if ( pgn.fields['Proprietary ID'] === "Meta" ) {
      app.handleMessage(`signalk-over-n2k.${pgn.src}`, {
        context,
        updates: [{
          meta: [
            {
              path: pgn.fields.Path,
              value: val
            }
          ]
        }]
      })
    }
  }

  const plugin: Plugin = {
    start: function (props: any) {
      n2kOutEvent = props.n2kOutEvent || 'nmea2000JsonOut'
      allowPUT = props.allowPUT
      
      canboatMappings.PGNs.forEach((mapping:any) => {
        mapping.callback = canboatCallback
      })
      app.emitPropertyValue('canboat-custom-pgns', canboatMappings)
      app.emitPropertyValue('pgn-to-signalk', {
        126720: n2kMappings
      })

      if (props.paths) {
        const subscriptions = props.paths.map((pi: any) => {
          return { path: pi.path, period: 1000 }
        })

        app.subscriptionmanager.subscribe(
          {
            context: 'vessels.self',
            subscribe: subscriptions
          },
          onStop,
          (err: any) => {
            app.setProviderError(err)
          },
          onDelta
        )
      }
    },

    stop: function () {
      onStop.forEach((f: any) => f())
      onStop = []
    },

    id: 'signalk-over-n2k',
    name: 'N2K Over Signal K',
    description: 'Signal K Plugin which can read and send Signal K deltas over the NMEA2000 bus',
    schema: {
      type: 'object',
      properties: {
        n2kOutEvent: {
          type: 'string',
          title: 'NMEA2000 Out Event',
          description: 'The event to emit to send nmea2000, defaults to nmea2000JsonOut',
          default: 'nmea2000JsonOut'
        },
        allowPUT: {
          type: 'boolean',
          title: 'Allow PUTs',
          description: 'Allow PUT requests from the nmea2000 network',
          default: false
        },
        paths: {
          title: 'Paths to send over n2k',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                title: 'Path',
                description: 'The full Signal K path, wild cards supported'
              }
            }
          }
        }
      }
    }
  }

  return plugin
}

interface Plugin {
  start: (app: any) => void
  stop: () => void
  id: string
  name: string
  description: string
  schema: any
}
