(function(modulesManager) {
    "use strict";

    modulesManager.set("util", util);

    function util() {

        return {
            getArray: function getArray(arrayLike) {
                return Array.prototype.slice.call(arrayLike);
            },
            getElementsByNodeType: function getElementsByNodeType(element, nodeType, matchedElements) {
                matchedElements = matchedElements || [];
                if (element.nodeType === nodeType) {
                    matchedElements.push(element);
                }

                for (var i = 0; i < element.childNodes.length; i++) {
                    getElementsByNodeType(element.childNodes[i], nodeType, matchedElements);
                }

                return matchedElements;
            },
            removeElements: function removeElements(elementsArr) {
                elementsArr.forEach(function(element) {
                    element.parentNode.removeChild(element);
                });
            }
        }
    }

})(modulesManager);