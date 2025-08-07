// CometD basic
dojo.require('dojox.cometd');
dojo.require("dojox.cometd.ack");

dojo.addOnLoad(function () {
    var cometURL = "http://" + window.location.host + "/cometd";
    Communicator = new dojox.Cometd();
    Communicator.websocketEnabled = true;
    Communicator.configure({ url: cometURL, maxNetworkDelay: 5000 });
    console.log(Communicator);

    Communicator.addListener("/meta/connect", _metaConnect);
    
    
    console.log(Communicator.getStatus());

    Communicator.handshake();

});

dojo.addOnUnload(dojox.cometd, "disconnect");
var _subscriptions = [];
var Communicator;

// Subscribe / unsubscribe
function _unsubscribe() {
    for (var i = 0; i < _subscriptions.length; i++)
        Communicator.unsubscribe(_subscriptions[i]);
    _subscriptions = [];
}

function _subscribe() {
    _subscriptions.push(Communicator.subscribe("/ravenna/settings", function (message) {
        var path = message.data.path;
        var value = message.data.value;
/*
		if (path == "$")
		{
			var eJSTree = document.getElementById("json_tree");
			if (eJSTree)
			{
				var jsText = JSON.stringify(value);
				eJSTree.innerHTML = jsText;
			}
		}
*/
        RavennaDeviceCache.update(path, value);

        RouterApp.triage("/ravenna/settings", message.data);
    }));

    _subscriptions.push(Communicator.subscribe("/ravenna/status", function (message) {
        var path = message.data.path;
        var value = message.data.value;
        
        RavennaDeviceCache.update(path, value);

        RouterApp.triage("/ravenna/status", message.data);
    }));

    _subscriptions.push(Communicator.subscribe("/ravenna/monitoring_meters", function (message) {
        var path = message.data.path;
        var value = message.data.value;

        RouterApp.triage("/ravenna/monitoring_meters", message.data);
    }));

    _subscriptions.push(Communicator.subscribe("/ravenna/meter", function(message) {
        var path = message.data.path;
        var value = message.data.value;

        RouterApp.triage("/ravenna/meter", message.data);
    }));

/*    
    _subscriptions.push(Communicator.subscribe("/ravenna/query", function (message) {
        var query = message.data.query;
        var result = message.data.result;
        if(query == "devices")
        {
            $('ul.ulDev li.devLi').remove(); //avoid duplicate the same device in the list

            result[0].name="Anubis";                        //JSON CHANGES (raw) to display a few devices (normally only anubis emulator so wrong hostname for now) ___START___
            result[0].hostname="Anubis_1";                  //
            result[1] = { "name" : "Horus",                 //
                "hostname" : "Horus_1",           //
                "adress" : "1",                   //
                "port" : "2",                     //
                "txt_records":[]                  //
            }                                   //
            result[2] = { "name" : "Hapi",                  //
                "hostname" : "Hapi_1",            //
                "adress" : "1",                   //
                "port" : "2",                     //
                "txt_records":[]                  //
            }                                   //
            result[3] = { "name" : "Nadac",                 //
                "hostname" : "Nadac_1",           //
                "adress" : "1",                   //
                "port" : "2",                     //
                "txt_records":[]                  //
            }                                   //
            result[4] = { "name" : "unrecognized hostname", // 
                "hostname" : "wrong",             //
                "adress" : "1",                   //
                "port" : "2",                     //
                "txt_records":[]                  //
            }                                   //JSON CHANGES ___END___

            for(i in result){ //for each device
                (function(i){
                    setTimeout(function(){
                        let classN;
                        var url= '<a href="http://' + result[i].address + ':'  + result[i].port + '/monitoring/index.html';
                        var iconSrc = '<div class="divImg"><img src="css/';
                        var ul = document.getElementById("UD");         //the list to append devices
                        var li = document.createElement("li");          //line to display the ith device infos
                        let icon = document.createElement("div");       //icon container
                        icon.classList.add("divImg");
                        if(result[i].hostname.startsWith("Anubis_")){              
                            classN = "anubis";                              //class for device proper style
                            iconSrc += "anubis.png" ;                       //associate the right icon
                        }
                        else if(result[i].hostname.startsWith("Horus_")){
                            classN = "horus";
                            iconSrc += "Horus.png"
                        }
                        else if(result[i].hostname.startsWith("Hapi_")){
                            classN = "hapi"; 
                            iconSrc += "Hapi.png";
                        }
                        else if(result[i].hostname.startsWith("Nadac_")){
                            classN = "nadac"; 
                            iconSrc += "Nadac.png";
                        }
                        else{                                //in case the hostname isn't recognized
                            classN = "broken";
                            iconSrc += "Error.png";
                        }
                        iconSrc += '" height="50" width="50"></div>'
                        url += '" target="_blank">'; // to open the UI in a new tab
                        // url += '>';             // use this one to open in the same page
                        li.classList.add(classN);   
                        li.classList.add("devLi"); // common class to all devices
                        $(ul).append(li);
                    
                        var x = iconSrc + url  + "Device : " + result[i].name + '</a>'; //button url + text string
                        li.innerHTML = x;
                    }, 800 * i);
                }(i));
            }
            
        }
    }));
*/

    _subscriptions.push(Communicator.subscribe("/ravenna/errors", function() {}));
    _subscriptions.push(Communicator.subscribe("/ravenna/status", function (message) {
        var path = message.data.path;
        var value = message.data.value;
    }));
}

function _connectionSucceeded() {
    self._trackData = [];

    self.Communicator.startBatch();
    _unsubscribe();
    _subscribe();
    self.Communicator.publish("/service/ravenna/commands", { command: "update" });
    //self.Communicator.publish("/service/ravenna/query", { query: "devices" });
    self.Communicator.endBatch();
    popUpOverlay.style.display = "none";
    console.log("overlay caché");
}

function _connectionBroken() {
    popUpOverlay.style.display = "flex";
    console.log("overlay affiché");
}

function _metaConnect(message) {
    
    self._connected = message.successful === true;
    //console.log("_metaConnect: message : ", message.successful);
    if (!self._wasConnected && self._connected) {
        _connectionSucceeded();
        self._wasConnected = self._connected;
    }
    else if (self._wasConnected && !self._connected) {
        _connectionBroken();
        self._wasConnected = self._connected;    
    }
}

