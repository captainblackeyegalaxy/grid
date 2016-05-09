(function(modulesManager) {
    "use strict";
    
    modulesManager.set("grid.manager", gridsManager);
    
    function gridsManager() {
        var grids = [],
            util = modulesManager.get("util"),
            gridModule = modulesManager.get("grid");
        
        function create() {
            var containers = util.getArray(document.querySelectorAll(".gg"));

            containers.forEach(function(container) {
                grids.push(gridModule.create(container));
            });
        }

        return {
            create: create
        };

    }

})(modulesManager);