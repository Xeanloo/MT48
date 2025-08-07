/*
 *                      JSON ROUTER CLASS
 *  
 *  This class is a Json Path router class, that uses a list of key / callbacks and 
 *  applies a parsing routing on data received by the "triage" function.
 *  The triage function will send every subtree matching the key element registered using
 *  the notifyMe function, by calling the callback given to the notifyMe function.
 *  
 *  The notifyMe function returns an Id that can be used to deregister the key/callback pair
 */

class JsonRouter {
    constructor() {
        console.log("JSON router init")
        this.keysAndCallbacks = [];
        this.keysIds = 0;
    }
    
    keys() {
        console.log(this.keysAndCallbacks);
    }

    notifyMe_on_channel(channel, key, callback) {
        //console.log("Notifying of Channel: " + channel + ", key: " + key);
        if (this.keysAndCallbacks.some(item => item.Key == key && item.Channel == channel)) {
            // Key is already there
            //console.log("Key is already there; Channel: " + channel + ", key: " + key);
            let Item = this.keysAndCallbacks.filter(item => item.Key == key && item.Channel == channel);
            this.keysIds += 1;
            let thisId = this.keysIds;
            let C = {
                fn: callback,
                Id: thisId
            }
            Item[0].Callbacks.push(C);
            return thisId;
        }
        else {            
            this.keysIds += 1;
            let thisId = this.keysIds;
            let Item = {
                Channel: channel
                , Key: key
                , Callbacks: [{
                    fn: callback,
                    Id: thisId
                }]
            }

            //console.log("Adding new key; Channel: " + channel + ", key: " + key + " thisId: " + thisId);
            this.keysAndCallbacks.push(Item);
            return thisId;
        }
    }
    notifyMe(key, callback) {        
        this.notifyMe_on_channel("*", key, callback);
    }
    unnotifyMe(Id) {
        // Here we should delete the element with Id X, or remove the callback ??? What is the Id returned from the notifyMe function ?
        for(let k in this.keysAndCallbacks) {
            for(let c in this.keysAndCallbacks[k].Callbacks) {
                if(this.keysAndCallbacks[k].Callbacks[c].Id == Id) {
                    this.keysAndCallbacks[k].Callbacks.splice(c,1);
                    if(this.keysAndCallbacks[k].Callbacks.length == 0) {
                        this.keysAndCallbacks.splice(k,1);
                    }
                    return;
                }
            }
        }
    }
    triage(channel, data) {
        ///console.log("routing...")
        for (let item of this.keysAndCallbacks) {
            try {
                if (item.Channel == channel || item.Channel == "*") {
                    if (data.path.startsWith(item.Key)) {
                        for (let call of item.Callbacks) {
                            for (let call of item.Callbacks) {
                                try {
                                    call.fn(data);
                                }
                                catch (e) {}
                            }
                        }
                    }
                    else {
                        let fields = item.Key.split(/\.|\[(\d+)\]|\[(\?\(@.+\))\]|\[(\*)\]/);
                        let pathFields = data.path.split(/\.|\[(\d+)\]|\[(\?\(@.+\))\]|\[(\*)\]/);
                        let error = false;
                        let myData = {};
                        for (let i = 0; i < fields.length; i++) {
                            let field = fields[i];

                            if (field == undefined || field == "") continue;

                            if (pathFields.length <= fields.length && field == pathFields[i]) {
                                //console.log(field + " == " + pathFields[i])
                                myData.value = data.value;
                                if (i == fields.length - 1) {
                                    break;
                                }
                                else continue;
                            }
                            // Checking if it is an indirection field
                            let indirection = false;
                            let indirection_field = "";
                            let indirection_value = "";
                            if (field.indexOf("@") != -1) {
                                indirection = true;
                                field = field.replace(/ /g, '')
                                let params = field.match(/\?\(@\.(.+)==(.+)\)/)
                                //console.log(params)
                                //console.log(field)
                                indirection_field = params[1];
                                indirection_value = params[2];
                            }
                            if (field == "*") {
                                indirection = true;
                                indirection_field = "*";
                            }
                            //console.log(field)
                            // All good

                            if (field == "$") {
                                //console.log(">>>> root")
                                myData.value = data.value;
                            }
                            else if (indirection && Array.isArray(myData.value)) {
                                //console.log("indirection " + indirection_field + " : " + indirection_value)
                                if (indirection_field == "*") {
                                    myData.value = myData.value;
                                    break;
                                }
                                else {
                                    for (let elem of myData.value) {
                                        if (elem[indirection_field] == indirection_value) {
                                            myData.value = [elem];
                                            break;
                                        }
                                    }
                                }
                            }
                            else if (myData.value == null) {
                                //console.log(">>>> wrong field " + field + " ")
                                //console.log(myData)
                                error = true;
                                break;
                            }
                            else if (myData.value[field] != null) {
                                //console.log(">>>> found field")
                                myData.value = myData.value[field];
                            }
                            else {
                                //console.log(">>>> wrong field " + field + " ")
                                //console.log(myData)
                                error = true;
                                break;
                            }
                        }
                        if (error) {
                            continue;
                        }
                        else {
                            myData.path = item.Key;
                            for (let call of item.Callbacks) {
                                try {
                                    call.fn(myData);
                                }
                                catch(e) {}
                            }
                        }
                    }
                }
            }
            catch (e) {}
        }
    }
}
// Unit test
var RouterTestData = {
    path: "$"
    , value: {
        a: {
            b: [
                {
                    Id: 4
                    , c: [
                        {
                            Id: 3,
                            Prout: 56
                        }
                        , {
                            Id: 5
                        }
                    ]
                }
                , {
                    a: "r"
                }
                , {
                    a: "s"
                }
            ]
        }
    }
}
var RouterApp = new JsonRouter();

/*console.log("JSON ROUTER UNIT TEST")
var RouterTest = new JsonRouter();
console.log("UNIT TEST JSON ROUTER: Notify me...")
var RouterIdTest1 = RouterTest.notifyMe("$.a.b[0].c.[?(@.Id ==   5)][0]", function (data) {
    console.log("UNIT TEST JSON ROUTER: SUCCESS !!!");
    console.log(data)
});
RouterTest.keys();
console.log("UNIT TEST JSON ROUTER: triage... 1")
RouterTest.triage(RouterTestData);
console.log("UNIT TEST JSON ROUTER: triage... 2.1 true")
RouterTest.triage({path: "$.a.b[0].c.[?(@.Id ==   5)]", value: [{Id:5}]});
console.log("UNIT TEST JSON ROUTER: triage... 2.2 true")
RouterTest.triage({path: "$.a.b[0].c.[?(@.Id ==   5)][0]", value: {Id:5}});
console.log("UNIT TEST JSON ROUTER: triage... 2.3 false")
RouterTest.triage({path: "$.a.b[0].c.[?(@.Id ==       4)]", value: [{Id:5}]});
console.log("UNIT TEST JSON ROUTER: triage... 3")
RouterTest.triage({path: "$.a.b[0].c", value: [{Id:5},{Id:4}]});

console.log("UNIT TEST JSON ROUTER: triage... 4")
var RouterIdTest2 = RouterTest.notifyMe("$._oem_ui_process_engine.monitoring.speaker_set",function(data) {console.log("SUCESS") ; console.log(data);});
RouterTest.triage({path : "$._oem_ui_process_engine.monitoring.speaker_set",
value : {mute: true}})


console.log("UNIT TEST JSON ROUTER: Double me...")
var RouterIdTest3 = RouterTest.notifyMe("$.a.b[0].c.[?(@.Id ==   5)][0]", function (data) {
    console.log("UNIT TEST JSON ROUTER: SUCCESS !!!");
    console.log(data)
});

console.log("UNIT TEST JSON ROUTER: done");
console.log("UNIT TEST JSON ROUTER: Trying to remove callback of Id " + RouterIdTest1)
RouterTest.unnotifyMe(RouterIdTest1);
RouterTest.unnotifyMe(RouterIdTest2);
RouterTest.unnotifyMe(RouterIdTest3);


console.log("UNIT TEST JSON ROUTER: Re trying triage")
RouterTest.triage(RouterTestData);

console.log("UNIT TEST JSON ROUTER: Re Notify me...")
var RouterIdTest1 = RouterTest.notifyMe("$.a.b[0].c.[?(@.Id ==   5)][0]", function (data) {
    console.log("UNIT TEST JSON ROUTER: SUCCESS !!!");
    console.log(data)
});
console.log("UNIT TEST JSON ROUTER: Trying any (*)")
var RouterIdTest3 = RouterTest.notifyMe("$.a.b[0].c[*]", function (data) {
    console.log("UNIT TEST JSON ROUTER: SUCCESS !!!");
    console.log(data)
});
RouterTest.triage(RouterTestData);


console.log("UNIT TEST JSON ROUTER: Trying any (*)")
var RouterIdTest4 = RouterTest.notifyMe("$.a.b[0].c[?(@.Id==3)][0].Prout", function (data) {
    console.log("UNIT TEST JSON ROUTER: SUCCESS !!!");
    console.log(data)
});
RouterTest.triage(RouterTestData);

RouterTest.unnotifyMe(RouterIdTest1);
RouterTest.unnotifyMe(RouterIdTest3);
RouterTest.unnotifyMe(RouterIdTest4);
RouterTest.keys();
console.log("UNIT TEST JSON ROUTER: End of Test \\o\\ \\o/ /o/")
*/