module.exports = {
  "PGNs": [
    {
        "PGN":252500,
        "Id":"signalKOverN2k",
        "Description":"Signal K Over N2K",
        "Type":"Fast",
        "Complete":true,
        "Length":15,
        "RepeatingFields":0,
        "Fields":[
          {
            "Order":1,
            "Id":"type",
            "Name":"Type",
            "BitLength":4,
            "BitOffset":0,
            "BitStart":0,
            "Type":"Lookup table",
            "Signed":false,
            "EnumValues":[
              {"name":"update","value":"0"},
              {"name":"meta","value":"1"},
              {"name":"put","value":"2"}]},
          {
            "Order":2,
            "Id":"reserved",
            "Name":"Reserved",
            "BitLength":4,
            "BitOffset":4,
            "BitStart":4,
            "Type":"Binary data",
            "Signed":false},
          {
            "Order":3,
            "Id":"context",
            "Name":"Context",
            "BitLength":128,
            "BitOffset":8,
            "BitStart":0,
            "Type":"ASCII or UNICODE string starting with length and control byte",
            "Signed":false},
          {
            "Order":4,
            "Id":"path",
            "Name":"Path",
            "BitLength":128,
            "BitStart":0,
            "Type":"ASCII or UNICODE string starting with length and control byte",
            "Signed":false},
          {
            "Order":5,
            "Id":"value",
            "Name":"Value",
            "BitLength":128,
            "BitStart":0,
            "Type":"ASCII or UNICODE string starting with length and control byte",
            "Signed":false}]}
  ]
}
