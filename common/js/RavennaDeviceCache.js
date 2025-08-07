const RavennaDeviceCache = {
    _document : null,
};

/**
 * Worker class to save an object into a file for debuggin
 */
RavennaDeviceCache.saveObject = (filename, obj) => {
    a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob([JSON.stringify(obj)], {type: "text/plain"}));
    a.download = filename;
    a.click();
}

/* JSONPath 0.8.0 - XPath for JSON
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
RavennaDeviceCache.jsonPath = (obj, expr, arg) => {
    var P = {
       resultType: arg && arg.resultType || "PATH",
       result: [],
       normalize: function(expr) {
          var subx = [];
          return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                     .replace(/'?\.'?|\['?/g, ";")
                     .replace(/;;;|;;/g, ";..;")
                     .replace(/;$|'?\]|'$/g, "")
                     .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
       },
       asPath: function(path) {
          var x = path.split(";"), p = "$";
          for (var i=1,n=x.length; i<n; i++)
             p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
          return p;
       },
       store: function(p, v) {
          if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
          return !!p;
       },
       trace: function(expr, val, path) {
          if (expr) {
             var x = expr.split(";"), loc = x.shift();
             x = x.join(";");
             if (val && val.hasOwnProperty(loc))
                P.trace(x, val[loc], path + ";" + loc);
             else if (loc === "*")
                P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
             else if (loc === "..") {
                P.trace(x, val, path);
                P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
             }
             else if (/,/.test(loc)) { // [name1,name2,...]
                for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                   P.trace(s[i]+";"+x, val, path);
             }
             else if (/^\(.*?\)$/.test(loc)) // [(expr)]
                P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
             else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
                P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
             else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
                P.slice(loc, x, val, path);
          }
          else
             P.store(path, val);
       },
       walk: function(loc, expr, val, path, f) {
          if (val instanceof Array) {
             for (var i=0,n=val.length; i<n; i++)
                if (i in val)
                   f(i,loc,expr,val,path);
          }
          else if (typeof val === "object") {
             for (var m in val)
                if (val.hasOwnProperty(m))
                   f(m,loc,expr,val,path);
          }
       },
       slice: function(loc, expr, val, path) {
          if (val instanceof Array) {
             var len=val.length, start=0, end=len, step=1;
             loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
             start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
             end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
             for (var i=start; i<end; i+=step)
                P.trace(i+";"+expr, val, path);
          }
       },
       eval: function(x, _v, _vname) {
          try { return $ && _v && eval(x.replace(/@/g, "_v")); }
          catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
       }
    };
 
    var $ = obj;
    if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
       P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
       return P.result.length ? P.result : false;
    }
 }

 /*****************************************************************
  * This method will get the result of jsonPath and will return an object
  * which contains the value of the path but also the parent object if available as well as the value name
  * to change.
  */
 RavennaDeviceCache.findObjectFromJsonPath = function(obj, jsonPath) {
    if(jsonPath.length == 1) {
        path = jsonPath[0];
    }
    else {
        return null;
    }
    // Remove $. from the given path
    path = path.substr(1, path.length - 1);

    let parent = null;
    let name = "";
    let index = -1;
    for (var i=0, path=path.split("]"), len=path.length; i<len; i++) {
        let isObject = path[i][1] === '\'';
        let t;
        if(isObject)
            t = path[i].substr(2, path[i].length - 3);
        else
            t = path[i].substr(1, path[i].length - 1);
        if(t === "")
            break;
        parent = obj;
        if(isObject) {
            name = t;
            obj = obj[name];
        }
        else {
            index = parseInt(t);
            obj = obj[index];
        }
        
    };
    
    return {
        parent: parent,
        name: name,
        value: obj,
        index : index
    };
};

/*****************************************************************
 * The method will return the sub value of the object.
 * The query is based on jsonPath syntax but may be recursive which is not supported
 * by the library. Hence, we implement the recursion ourselves. 
 * Example query = "$.music.mixer.strips[?(@.id==1002)][0].sends[?(@.id==0)][0]"
 */
  // example query = "$.music.mixer.strips[?(@.id==1002)][0].sends[?(@.id==0)][0]"
 RavennaDeviceCache.getSubValue2 = function(obj, query, subResult = null) {
    if(obj == null)
    return null;

    let jsonPathArgs = {
        resultType: "PATH"
    }

    const lbracket = query.indexOf("[");
    if(lbracket === -1) {
        if(query == "$") {
            return {
                parent: null,
                name: "",
                value: obj
            };
        }
        return RavennaDeviceCache.findObjectFromJsonPath(obj,
            RavennaDeviceCache.jsonPath(obj, query, jsonPathArgs));
    }
    const rbracket = query.indexOf("]", lbracket);
    if(rbracket === -1) {
        return null;
    }

    //if(subResult == null)
    {
        const subQuery = query.substr(0, rbracket + 1);
        if(subQuery != "$[0]")
        {
            subResult = RavennaDeviceCache.findObjectFromJsonPath(obj,
                RavennaDeviceCache.jsonPath(obj, subQuery, jsonPathArgs));
        }
    }

    const newQuery = "$" + query.substr(rbracket + 1, query.length - rbracket);
    return RavennaDeviceCache.getSubValue2(subResult.value, newQuery, subResult);
}

/*****************************************************************
 * See getSubValue. Wrapped here to export in case anyone else needs to use it. 
 * Probably there is an easier way but I do not want to find out today.
 */ 
/*Deprecated
RavennaDeviceCache.getSubValue = (obj, query) => {
    let result = RavennaDeviceCache.getSubValue2(obj, query);
    if(result.length == 1) {
    // Should return a single object while the 
    // getSubValue2 will surely return an array
        return result[0]; 
    }
} */

/*****************************************************************
 * Handles the case where the query refers to a value instead of an object. In which 
 * case a copy of the value is returned by the getSubValue and merge will not work. We
 * need to set the value to the referenced object directly.
 */
/*Deprecated
RavennaDeviceCache.extractQueryObjectAndIndex = (obj, query) => {
    const lbracket = query.lastIndexOf("[");
    if(lbracket === -1) {
        return null;
    }
    const rbracket = query.lastIndexOf("]");
    if(rbracket === -1) {
        return null;
    }
    const newQuery = query.substr(0, lbracket);
    const index = query.substr(lbracket + 1, rbracket - lbracket - 1);

    return {
        obj : RavennaDeviceCache.getSubValue(obj, newQuery),
        index: parseInt(index)
    };
}*/

/*****************************************************************
 * Return session in document from the id
 * / i == 0 for sources, i == 1 for sinks
 */
RavennaDeviceCache.findSessionObject = (id, i) => {
    let doc = RavennaDeviceCache._document;

    if(!doc) {
        return null;
    }

    let sessions;
    if(i == 0) {
        sessions = doc.sessions.sources;
    }
    else if(i == 1) {
        sessions = doc.sessions.sinks;
    }
    else {
        return null;
    }

    for(index = 0; index < sessions.length; index++) {
        if(sessions[index] && sessions[index].id == id) {
            return {
                index: i,
                session: sessions[index]
            }
        }
    }
    return null;
}

/*****************************************************************
 * lodash merge will merge arrays. This is not the behavior we wish. We need arrays to be
 * merged but also end up with the same size
 */
RavennaDeviceCache.makeArraysEqualSize = (target, source) => {
    while (target.length > source.length) { 
        target.pop(); 
    }
    while (target.length > source.length) { 
        target.push(source[target.length]); 
    }
}

/*****************************************************************
 * lodash merge will merge arrays. This is not the behavior we wish. We need arrays to be
 * merged but also end up with the same size
 */
RavennaDeviceCache.prepareMerge = (target, source) => {
    if(target.constructor === Array) {
        RavennaDeviceCache.makeArraysEqualSize(target, source);
        let i;
        for(i = 0; i < target.length; i++) {
            RavennaDeviceCache.prepareMerge(target[i], source[i]);
        }

    }
    else
    {
        Object.entries(source).forEach(([key, value]) => {
            if(/*value.constructor === Array || */typeof value === 'object') { // Array is also an object
                let existing = target[key];
                if(existing) {
                    RavennaDeviceCache.prepareMerge(existing, value);
                }
            }
        });
    }
    
}

/*****************************************************************
 * 
 */
RavennaDeviceCache.merge = (target, source) => {
    RavennaDeviceCache.prepareMerge(target, source);
    merge(target, source);
}

/*****************************************************************
 * Update the cache
 */
RavennaDeviceCache.update = (path, value) => {
    
// Debugging
    if(false) {
        RavennaDeviceCache.saveObject("RavennaDeviceCache.txt", {
            document: RavennaDeviceCache._document,
            path : path,
            value: value
        });
    }

// Handle sessions
    if (path.startsWith("$.sessions")) {
        for (i = 0; i < 2; i++) // sources/sinks
        {
            let what = i == 0 ? "sources" : "sinks";
            
            let regex = "\\$\\.sessions\\.";
			regex = regex.concat(what);
            regex = regex.concat("\\[\\?\\(\\@\\.id==([0-9]+)\\)\\]\\[0\\](\\.streams\\[0\\])?");
            
            let result = path.match(regex);
            if(result) {
                let id = result[1];
                let existing = findSessionObject(id, i);
                if(existing) {
                    if (!value) {
                    // Delete existing
                        let arrayValue = i == 0 ? RavennaDeviceCache._document.sessions.sources : RavennaDeviceCache._document.sessions.sinks;
                        arrayValue.splice(existing.index, 1);
                    }
                    else {
                    // Do a merge
                        RavennaDeviceCache.merge(existing.session, value);
                    }
                }
                else if (!value) {
                // Trying to delete something that it is not there (deleted already probably)
                // Ignore
                    return;
                }
                else {
                // Does not exist, we need to create a new one
                    let arrayValue = i == 0 ? RavennaDeviceCache._document.sessions.sources : RavennaDeviceCache._document.sessions.sinks;
                    arrayValue.push(value);
                }
            // we did what we had to do
                return;
            }
        }
        // If we are here, we did not handle the notification probably because the id is not given
        // It maybe the case that the we got the sources/sinks as an array which in this case it means
        // that a source/sink has been added/modified. (It is not consistent, the array does not contain all the sources/sinks)
        // but only the one that has just been created/modified).
        if(value)
        {
            let id = value[0].id;
            let bSourcesAsArray = path == "$.sessions.sources";
            let bSinksAsArray = path == "$.sessions.sinks";
            if(bSourcesAsArray || bSinksAsArray)
            {
                let existing = findSessionObject(id, bSourcesAsArray ? 0 : 1);
                if(existing) {
                    RavennaDeviceCache.merge(existing.session, value);
                }
                else {
                    let arrayValue = bSourcesAsArray ? RavennaDeviceCache._document.sessions.sources : RavennaDeviceCache._document.sessions.sinks;
                    arrayValue.push(value);
                }

                return;
            }
        }
        
    }
    
// General handling
    if (path === "$" && value.identity && value.sessions)
	{
        if(!value._oem_ui_process_engine && RavennaDeviceCache._document && typeof RavennaDeviceCache._document === 'object' && RavennaDeviceCache._document._oem_ui_process_engine) {
            value._oem_ui_process_engine = RavennaDeviceCache._document._oem_ui_process_engine;
        }
        RavennaDeviceCache._document = value;
    }
	else if (path === "$._connections") {
    // Ignore
        return;
    }
    else if(value != null) {
    // We have received a change somewhere inside the document
        let doc = RavennaDeviceCache._document;
    // Sanity check
        if(!doc) {
            return;
        }
        
    // Find value in document
        let find = RavennaDeviceCache.getSubValue2(doc, path);
        if(/*value.constructor === Array || */typeof value === 'object') { // Array is also an object
            if(find.parent) {
                RavennaDeviceCache.prepareMerge(find.parent[find.name], value);
                RavennaDeviceCache.merge(find.parent[find.name], value);
            }
            else {
                RavennaDeviceCache.prepareMerge(find.value, value);
                RavennaDeviceCache.merge(find.value, value);
            }

        }
    // Copy values and arrays
        else {
            find.parent[find.name] = value;
        }
    }
}

/*****************************************************************
 * Return the document
 */
RavennaDeviceCache.document = () => {
    return RavennaDeviceCache._document;
}

/*****************************************************************
 * Debugging full object
 */
RavennaDeviceCache.debugQuery = (obj) => {
    RavennaDeviceCache.update("$", obj.document);
    RavennaDeviceCache.update(obj.path, obj.value);
}

/*****************************************************************
 * Debugging full object
 */
RavennaDeviceCache.debugGetSubValue = (obj) => {

    let result = RavennaDeviceCache.getSubValue2(obj, "$._modules[?(@.id==150)][0].custom.outs.channels[0].phase");

    return result;
}

/*****************************************************************
 * Simple test
 */
RavennaDeviceCache.uniteTest1 = () => {
    RavennaDeviceCache.update("$", {
        name: "Dev",
        identity : 12,
        sessions: 13,
        arr : [
            {
                attribute : "Yes"
            }
        ],
        _oem_ui_process_engine : {
            attr: 5
        }
    });

    RavennaDeviceCache.update("$", {
        name: "Dev",
        identity : 10,
        sessions: 110
    });
    //RavennaDeviceCache.update("$.arr[0]", {
    //    attribute: "No"
    //});

    return RavennaDeviceCache.document()._oem_ui_process_engine.attr;
}

/*****************************************************************
 * Arrays replacement test
 */
RavennaDeviceCache.uniteTest2 = () => {

    let doc = {
        name: "Dev",
        identity : 12,
        sessions: 13,
        arr : [{name:"myname1"}], 
        obj : {
            name:"test",
            arr2: [1, 2, 3]
        }
    };


    RavennaDeviceCache.update("$", doc);

    //RavennaDeviceCache.update("$", {
    //   name: "Dev",
    //   arr : [{name:"myname0"}, {name: "myName2"}], 
    //   obj : {
    //       arr2: [3]
    //   }
    //});

    RavennaDeviceCache.update("$.arr", [{name:"myname0"}, {name: "myName2"}]);
    
    return RavennaDeviceCache.document();
}