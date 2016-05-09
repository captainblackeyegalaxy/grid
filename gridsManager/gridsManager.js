(function(modulesManager) {
    "use strict";
    
    modulesManager.set("grid.manager", gridsManager);
    
    function gridsManager() {
        var grids = [],
            util = modulesManager.get("util"),
            gridModule = modulesManager.get("grid");
        
        function create(sizesArr) {
            var containers = util.getArray(document.querySelectorAll(".gg"));

            containers.forEach(function(container) {
                grids.push(gridModule.create(container, sizesArr));
            });
        }

        return {
            create: create
        };

    }

})(modulesManager);