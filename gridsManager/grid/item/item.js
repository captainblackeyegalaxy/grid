(function(modulesManager) {
    "use strict";

    modulesManager.set("grid.item", item);

    function item() {

        var itemElement,
            width = 0,
            util = modulesManager.get("util");

        function setItemElement(newItemElement) {
            itemElement = newItemElement;
            return this;
        }
        
        function getItemElement() {
            return itemElement;
        }
        
        function getWidth() {
            return width;
        }

        function setWidth(containerLayoutSize, sizes) {
            width = getItemSize(itemElement.dataset.grid.split(" "), containerLayoutSize, sizes);
            return this;
        }

        function setCss() {
            itemElement.style = "width: " + width + "%";
            return this;
        }
        
        function getItemSize(itemClassList, containerLayoutSize, sizes) {
            var itemClassListArr = util.getArray(itemClassList);
            
            var indexOfContainerLayoutSize = sizes.indexOf(containerLayoutSize);
            
            for(var i=indexOfContainerLayoutSize; i>=0; i--) {
                var indexOfItemSize,
                    isFound = false;
                    
                for(var itemIndex=0; itemIndex<itemClassListArr.length; itemIndex++) {
                    indexOfItemSize = itemClassListArr[itemIndex].indexOf(sizes[i]);
                    if(indexOfItemSize > -1) {
                        isFound = true;
                        break;
                    }
                }
                
                if(isFound) {
                    var slicedItem = itemClassListArr[itemIndex].slice(1);
                    var slicedItemArr = slicedItem.split("of");
                    return +slicedItemArr[0] / +slicedItemArr[1] * 100;
                }
            }
        }
        
        return {
            setItemElement: setItemElement,
            getItemElement: getItemElement,
            getWidth: getWidth,
            setWidth: setWidth,
            setCss: setCss
        };
    }

})(modulesManager);
