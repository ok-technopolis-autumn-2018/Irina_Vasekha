import '../styles/default.scss';



document.addEventListener("DOMContentLoaded", function () {
    var input = document.querySelector('.todo-creator_text-input');
    var list = document.querySelector('.todo-list');
    var clear = document.querySelector('.todo-toolbar_clear-completed');
    var filters = document.querySelector('.filters');
    var check = document.querySelector('.todo-creator_check-all');
    var remained = 3;
    var filter = 'All';


    input.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            var text = input.value.trim();
            if (text.length !== 0) {
                input.value = "";
                add(text);
            }
        }
    });


    check.addEventListener('click', function (e) {
        e.preventDefault();
        remained = 0;
        document.querySelector('.todo-toolbar_unready-counter').innerHTML = remained + " items left";
        var checkboxes = list.querySelectorAll('.custom-checkbox_target');
        for (var i = checkboxes.length - 1; i >= 0; i--) {
        	var item = checkboxes[i].closest('.todo-list_item');
            if (!checkboxes[i].checked) {
				checkboxes[i].checked=true;
                if(filter === 'Completed'){
   			        item.classList.remove('__hidden');
		        }
		        item.classList.add('__checked');
       		}
        }
    });

    filters.addEventListener('click', function (e) {
        var element = e.target;
        var items = document.getElementsByClassName('filters_item');
        if (element.className === 'filters_item') {
        	for (var j = 0; j < items.length; j++) {
        		items[j].classList.remove('__selected');
        	}
        	element.classList.add('__selected');
        	filter = element.innerHTML;
    	}
		var items = list.querySelectorAll('.todo-list_item');
		if(filter === 'Completed'){
			for (var j = 0; j < items.length; j++) {
    			if(!items[j].classList.contains('__checked')){
        			items[j].classList.add('__hidden');
 	       		} else {
    	   			items[j].classList.remove('__hidden');
        		}
    		}
    	} else if(filter === 'Active') {
    		for (var j = 0; j < items.length; j++) {
        		if(items[j].classList.contains('__checked')) {
           			items[j].classList.add('__hidden');
        		} else {
           			items[j].classList.remove('__hidden');
           		}
        	}
    	} else {
    		for (var j = 0; j < items.length; j++) {
				items[j].classList.remove('__hidden');
			}
		}
	});

    list.addEventListener('click', function (e) {
        if (e.target.className === 'todo-list_item_remove') {
            var element = e.target.parentElement;
            if(!element.classList.contains('__checked')){
                remained--;
			    document.querySelector('.todo-toolbar_unready-counter').innerHTML = remained + " items left";
            }
            element.parentNode.removeChild(element);
        } else if (e.target.className === 'custom-checkbox_target') {
        	var item = e.target.parentElement.parentElement;
            if (e.target.checked) {
            	item.classList.add('__checked');
                remained--;
                if(filter === 'Active'){
                	item.classList.add('__hidden');
                }
    	    } else {
				item.classList.remove('__checked');
            	remained++;
            	if(filter === 'Completed'){
            		item.classList.add('__hidden');
            	}
        	}
			document.querySelector('.todo-toolbar_unready-counter').innerHTML = remained + " items left";
    	}
	});

    clear.addEventListener('click', function () {
        var checkboxes = list.querySelectorAll('.custom-checkbox_target');
        for (var i = checkboxes.length - 1; i >= 0; i--) {
            var item = checkboxes[i].closest('.todo-list_item');
            if (checkboxes[i].checked) {
                item.parentNode.removeChild(item);
            }
        }
    });

	function add(text) {
		list.insertAdjacentHTML(
      		"beforeend",
            '<div class="todo-list_item">' +
                '<div class="custom-checkbox todo-list_item_ready-marker">' +
                    '<input type="checkbox" class="custom-checkbox_target" aria-label="Mark todo as ready"/>' +
                    '<div class="custom-checkbox_visual">' +
                        '<div class="custom-checkbox_visual_icon"></div>' +
                    '</div>' +
                '</div>' +
                '<button class="todo-list_item_remove" aria-label="Delete todo"></button>' +
                '<div class="todo-list_item_text-w">' +
                    '<textarea class="todo-list_item_text">' + text + '</textarea>' +
                '</div>' +
            '</div>'
        );
    	remained++;
    	document.querySelector('.todo-toolbar_unready-counter').innerHTML = remained + " items left";
	}
});


















