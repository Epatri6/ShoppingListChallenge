'use strict';

/**
 * Note: I attempted to use a database of list items instead of simply
 * injecting/removing html directly. That's why there's some initilization
 * weirdness so as to mimic the starting conditions.
 */
function main() {

    //Item database
    let items = [];
    addItem('apples');
    addItem('oranges');
    items.push(
        `<li>
        <span class="shopping-item shopping-item__checked">milk</span>
        <div class="shopping-item-controls">
        <button class="shopping-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete">
            <span class="button-label">delete</span>
        </button>
        </div>
        </li>`);
    addItem('bread');
    renderItems();

    //Respond to add-item button click event
    $('form').submit(function(event) {
        event.preventDefault();
        validateEntry();
        renderItems();
    });

    //Respond to check button click events
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
        let oldHTML = $(this).closest('li').get(0).outerHTML;
        $(this).parent().siblings('.shopping-item').toggleClass('shopping-item__checked');
        items.splice(items.indexOf(oldHTML), 1, $(this).closest('li').get(0).outerHTML);
        renderItems();
    });

    //Responds to delete button click events
    $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
        let html = $(this).closest('li').get(0).outerHTML;
        removeItem(html);
        renderItems();
    });

    //Processes and submits add item requests
    function validateEntry() {
        let val = $('form input').val();
        //No empty items
        if(val === '') {
            return;
        }
        addItem(val);
        $('form input').val('');
    }

    //Adds text from entry form to database as a list item
    function addItem(item) {
        items.push(
            `<li>
            <span class="shopping-item">${item}</span>
            <div class="shopping-item-controls">
              <button class="shopping-item-toggle">
                <span class="button-label">check</span>
              </button>
              <button class="shopping-item-delete">
                <span class="button-label">delete</span>
              </button>
            </div>
            </li>`
        );
    }

    //Removes an item out of the database
    function removeItem(html) {
        items.splice(items.indexOf(html), 1);
    }

    //Renders our database into the html
    function renderItems() {
        let html = items.reduce(function(html, item) {
            return html + item;
        }, '');
        $('.shopping-list').html(html);
    }
}

$(main);