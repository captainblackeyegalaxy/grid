(function(modulesManager) {
    "use strict";

    modulesManager.set("grid", Grid);

    function Grid() {
        var sizes,
            rowDetails = {
                currentRowWidth: 0,
                rowNumber: 1
            },
            item = modulesManager.get('grid.item'),
            util = modulesManager.get('util');

        function create(container, sizesArr) {
            sizes = sizesArr || ['x','l','m','s','t'];
            var items = util.getArray(container.querySelectorAll("[data-grid]")),
                containerLayoutSize = getLayoutSize(container.classList);
            
            clearComments(container);
            
            items.forEach(function(newItem, index) {
                item.setItemElement(newItem).setWidth(containerLayoutSize, sizes).setCss();
                updateRow(item, index, items.length);
            });
        }

        function clearComments(container) {
            var commentsArr = util.getElementsByNodeType(container, document.COMMENT_NODE);
            util.removeElements(commentsArr);
        }

        function getLayoutSize(classList) {
            var classListArr = util.getArray(classList);

            for (var i = 0; i < sizes.length; i++) {
                if (classListArr.indexOf(sizes[i]) > -1) {
                    return sizes[i];
                }
            }
        }

        function updateRow(item, itemIndex, itemsLength) {

            // handle first row
            if (isFirstItem()) {
                createFirstRowComment(item.getItemElement());
            } 

            // handle rows between first and last
            rowDetails.currentRowWidth += item.getWidth();
            if (rowDetails.currentRowWidth > 100 && !isLastItem(itemIndex, itemsLength)) { // bigger than full width row (100%)
                rowDetails.rowNumber += 1;
                rowDetails.currentRowWidth = item.getWidth();
                createBetweenRowsComment(item.getItemElement());
            }

            // handle last row
            if(isLastItem(itemIndex, itemsLength)) {
                createLastRowComment(item.getItemElement());   
            }
        }

        function isFirstItem() {
            return rowDetails.rowNumber === 1 && rowDetails.currentRowWidth === 0;
        }

        function isLastItem(itemIndex, itemsLength) {
            var itemNumber = itemIndex + 1;
            return itemNumber === itemsLength;
        }

        function createFirstRowComment(item) {
            var beginOfNewRowComment = document.createComment("----- row " + rowDetails.rowNumber + " begins -----");
            item.parentNode.insertBefore(beginOfNewRowComment, item);
        }

        function createLastRowComment(item) {
            var endOfRowComment = document.createComment("----- row " + rowDetails.rowNumber + " ends -----");
            item.parentNode.appendChild(endOfRowComment);
        }

        function createBetweenRowsComment(item) {
            var comments = document.createDocumentFragment();
            var endOfRowComment = document.createComment("----- row " + (rowDetails.rowNumber-1) + " ends -----");
            var beginOfNewRowComment = document.createComment("----- row " + rowDetails.rowNumber + " begins -----");
            comments.appendChild(endOfRowComment);
            comments.appendChild(beginOfNewRowComment);
            item.parentNode.insertBefore(comments, item.nextSibling);
        }

        return {
            create: create
        };
    }

    // demonstration code
    window.addEventListener('resize', function(event) {
        var container = document.querySelector('.gg');
        if (event.target.innerWidth < 950) {
            container.classList.remove('l');
            container.classList.add('m');
            var gridManager = modulesManager.get('grid.manager');
            gridManager.create();
        }
        else {
            container.classList.add('l')
            container.classList.remove('m');
            var gridManager = modulesManager.get('grid.manager');
            gridManager.create();
        }
    });

})(modulesManager);