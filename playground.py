import websocket
import json
import threading
import time
from typing import Optional, Dict, Any

class AnubisAudioInterface:
    def __init__(self, host: str = "169.254.98.248", port: int = 8080):
        self.host = host
        self.port = port
        self.ws_url = f"ws://{host}:{port}/service/ravenna"
        self.ws = None
        self.connected = False
        self.message_handlers = {}
        
    def connect(self):
        """Connect to the audio interface"""
        try:
            self.ws = websocket.WebSocketApp(
                self.ws_url,
                on_open=self._on_open,
                on_message=self._on_message,
                on_error=self._on_error,
                on_close=self._on_close
            )
            
            # Start WebSocket in a separate thread
            self.ws_thread = threading.Thread(target=self.ws.run_forever)
            self.ws_thread.daemon = True
            self.ws_thread.start()
            
            # Wait for connection
            timeout = 10
            while not self.connected and timeout > 0:
                time.sleep(0.1)
                timeout -= 0.1
                
            return self.connected
            
        except Exception as e:
            print(f"Connection error: {e}")
            return False
    
    def disconnect(self):
        """Disconnect from the audio interface"""
        if self.ws:
            self.ws.close()
            self.connected = False
    
    def _on_open(self, ws):
        print("Connected to Anubis audio interface")
        self.connected = True
    
    def _on_message(self, ws, message):
        try:
            data = json.loads(message)
            # Handle incoming messages if needed
            print(f"Received: {data}")
        except json.JSONDecodeError:
            print(f"Invalid JSON received: {message}")
    
    def _on_error(self, ws, error):
        print(f"WebSocket error: {error}")
    
    def _on_close(self, ws, close_status_code, close_msg):
        print("Connection closed")
        self.connected = False
    
    def _send_command(self, command: Dict[str, Any]) -> bool:
        """Send a command to the interface"""
        if not self.connected:
            print("Not connected to interface")
            return False
            
        try:
            message = json.dumps(command)
            self.ws.send(message)
            return True
        except Exception as e:
            print(f"Send error: {e}")
            return False
    
    def set_preamp_gain(self, module_id: int, channel_id: int, gain_db: float, input_mode: str = "mic") -> bool:
        """
        Set preamp gain for a specific module and channel
        
        Args:
            module_id: Module ID (typically found in the interface)
            channel_id: Channel ID (0-based)
            gain_db: Gain in dB (range depends on input mode)
            input_mode: "mic", "line", or "instrument"
        """
        # Convert dB to internal units (multiply by 10)
        gain_value = int(gain_db * 10)
        
        # Determine gain property based on input mode
        gain_property = f"{input_mode}Gain"
        
        command = {
            "path": f"$._modules[?(@.id=={module_id})][0].custom.ins.channels[{channel_id}]",
            "value": {gain_property: gain_value}
        }
        
        publish_command = {
            "topic": "/service/ravenna/settings",
            "payload": command
        }
        
        print(f"Setting {input_mode} gain to {gain_db}dB for module {module_id}, channel {channel_id}")
        return self._send_command(publish_command)
    
    def set_mixer_gain(self, strip_id: int, send_id: int, gain_db: float, gain_type: str = "gain") -> bool:
        """
        Set mixer strip gain
        
        Args:
            strip_id: Strip ID
            send_id: Send/Bus ID  
            gain_db: Gain in dB
            gain_type: "gain", "link_gain", or "group_gain"
        """
        # Convert dB to internal units (multiply by 10)
        # Special case for mute: -144.5 dB = -1445 internal units
        if gain_db <= -144:
            gain_value = -1445
        else:
            gain_value = int(gain_db * 10)
        
        command = {
            "path": f"$._oem_ui_process_engine.music.mixer.strips[?(@.id=={strip_id})][0].sends[?(@.id=={send_id})][0]",
            "value": {gain_type: gain_value}
        }
        
        publish_command = {
            "topic": "/service/ravenna/settings", 
            "payload": command
        }
        
        print(f"Setting mixer {gain_type} to {gain_db}dB for strip {strip_id}, send {send_id}")
        return self._send_command(publish_command)
    
    def set_master_gain(self, bus_id: int, gain_db: float) -> bool:
        """Set master bus gain"""
        gain_value = -1445 if gain_db <= -144 else int(gain_db * 10)
        
        command = {
            "path": f"$._oem_ui_process_engine.music.mixer.busses[?(@.id=={bus_id})][0]",
            "value": {"master_gain": gain_value}
        }
        
        publish_command = {
            "topic": "/service/ravenna/settings",
            "payload": command
        }
        
        print(f"Setting master gain to {gain_db}dB for bus {bus_id}")
        return self._send_command(publish_command)

# Usage example
def main():
    # Create interface connection
    interface = AnubisAudioInterface("169.254.98.248")  # Replace with your interface IP
    
    if interface.connect():
        print("Connected successfully!")
        
        # Examples of gain control
        
        # Set preamp gain (module 0, channel 0, mic input, +20dB)
        interface.set_preamp_gain(module_id=0, channel_id=0, gain_db=-90.0, input_mode="mic")
        
        # Set mixer strip gain (strip 0, send 0, -10dB)  
        interface.set_mixer_gain(strip_id=0, send_id=0, gain_db=-100.0)
        
        # Set master bus gain (bus 0, -5dB)
        interface.set_master_gain(bus_id=0, gain_db=-70.0)
        
        # Keep connection alive for a bit
        time.sleep(5)
        
        interface.disconnect()
    else:
        print("Failed to connect")

if __name__ == "__main__":
    # Install required dependency: pip install websocket-client
    main()