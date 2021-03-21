# signalk-over-n2k
Signal K Plugin which can read and send Signal K deltas over the NMEA2000 bus

The canboat pgns looks like this:

```
{"SignalK Over N2K Update",
     126720,
     PACKET_COMPLETE,
     PACKET_FAST,
     15,
     0,
     {{"Manufacturer Code", 11, RES_MANUFACTURER, false, "=999", "SignalK"},
      {"Reserved", 2, RES_NOTUSED, false, 0, ""},
      {"Industry Code", 3, RES_LOOKUP, false, "=4", "Marine Industry"},
      {"Proprietary ID", BYTES(2), RES_INTEGER, false, "=1", "Update"},
      {"Context", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"SourceId", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Path", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Value", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {0}}}
      
      ,
    {"SignalK Over N2K Meta",
     126720,
     PACKET_COMPLETE,
     PACKET_FAST,
     15,
     0,
     {{"Manufacturer Code", 11, RES_MANUFACTURER, false, "=999", "SignalK"},
      {"Reserved", 2, RES_NOTUSED, false, 0, ""},
      {"Industry Code", 3, RES_LOOKUP, false, "=4", "Marine Industry"},
      {"Proprietary ID", BYTES(2), RES_INTEGER, false, "=2", "Meta"},
      {"Context", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"SourceId", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Path", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Value", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {0}}}

```
