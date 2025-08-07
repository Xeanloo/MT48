# MT48 Mixer Control

A Python client for controlling the Merging Technologies MT48/Anubis audio interface via WebSocket using the CometD protocol.

## Overview

This project provides a Python interface to control mixer settings on MT48/Anubis audio interfaces. It uses WebSocket communication with the CometD protocol to send real-time commands to the device, replicating the functionality of the built-in web interface.

### Web Source Code (From MT48 Device):

The js files are the Original source code extracted from the MT48's web interface:

```
common/                    # Shared libraries from MT48 web interface
├── js/
│   ├── communicator.js    # Original WebSocket communication
│   ├── helper.js          # Utility functions
│   └── RavennaDeviceCache.js # Device state caching
├── settings/js/
│   └── new_settings.js    # Settings management
└── dojoCometD/           # CometD protocol implementation

music/js/                 # Music mixer JavaScript from web interface
├── mixer_event.js        # Event handling
├── mixer_update.js       # UI update functions
├── mixer_popup.js        # Popup dialogs
└── mixer.js             # Main mixer logic

MT48_music/
└── index.html           # Original web interface entry point
```

**Note**: The JavaScript files are included for reference and reverse engineering purposes. They show how the original web interface communicates with the device, which helped in developing the Python client.

### Available Commands

```python
# Set bus master gain
client.set_bus_gain(bus_id=2, gain_db=-45.0)

# Set strip send gain
client.set_strip_gain(strip_id=1000, send_id=2, gain_db=-20.0)

# Set preamp gain
client.set_preamp_gain(module_id=0, channel_id=0, gain_db=12.0)

# Custom JSONPath commands
client.set_mixer_setting(path="$._oem_ui_process_engine.music.mixer.busses[?(@.id==2)][0]",
                        value={"master_gain": -450})
```

## Understanding the Protocol

-   **WebSocket Endpoint**: `ws://[device-ip]/cometd`
-   **Protocol**: CometD (Bayeux) for reliable messaging
-   **Message Format**: JSON with JSONPath for targeting mixer elements
-   **Gain Format**: Integer values (dB × 10), with -1445 for mute

### Key JavaScript Files for Reference:

-   `communicator.js` - Shows how WebSocket connection is established
-   `mixer_update.js` - Contains functions lfile`UpdateBusMasterGainValue()`
-   `new_settings.js` - Demonstrates JSONPath usage for settings

## Gain Values

-   **Range**: -144.5dB to +6dB (approximately)
-   **Format**: Integers (multiply dB by 10)
-   **Mute**: -1445 (represents -144.5dB)
-   **Unity**: 0 (represents 0dB)

## Troubleshooting

### Connection Issues

-   Verify MT48 IP address (usually 169.254.98.248)
-   Check network connectivity
-   Ensure port 80 is accessible

### Commands Not Working

-   Check bus/strip IDs in `MIXER_ID.yaml`
-   Monitor WebSocket messages in console output
-   Compare with browser's developer tools on the web interface

## Development Notes

This Python client was developed by:

1. **Extracting** the web interface source code from the MT48 device
2. **Analyzing** the JavaScript to understand the communication protocol
3. **Reverse engineering** the JSONPath patterns and message formats
4. **Implementing** the same logic in Python

The original JavaScript files serve as documentation for how the official interface works.

## License

This project interfaces with Merging Technologies hardware. The original JavaScript code belongs to Merging Technologies. This Python implementation is for educational and personal use.
