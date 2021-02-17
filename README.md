# signalk-over-n2k
Signal K Plugin which can read and send Signal K deltas over the NMEA2000 bus

The canboat pgn looks like this:

```
{"Signal K Over N2K",
     252500,
     PACKET_COMPLETE,
     PACKET_FAST,
     15,
     0,
     {{"Type", 4, RES_LOOKUP, false, ",0=update,1=meta,2=put", ""},
      {"Reserved", 4, RES_BINARY, false, 0, ""},
      {"Context", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Path", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {"Value", BYTES(16), RES_STRINGLAU, false, 0, ""},
      {0}}}
```
