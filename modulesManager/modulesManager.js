"use strict";

function md() {
    
    var modules = {};
    
    function get(moduleName) {
        if(modules[moduleName]) {
            return modules[moduleName]();
        } else {
            console.error("module does not exist");
        }
    }
    
    function set(moduleName, moduleFunction) {
        if(modules[moduleName] !== undefined) {
            console.warn(moduleName + "already exist as moduleName");
        }
        
        modules[moduleName] = moduleFunction;
    }
    
    return {
        get: get,
        set: set
    };
}

var modulesManager = md();