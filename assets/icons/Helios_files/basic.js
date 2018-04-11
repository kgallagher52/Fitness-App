function confirmDelete( name ) {

	var action = confirm( "Are you sure you want to delete " + name );
	return action;
	
}

function confirmRegenerate( name ) {

    var action = confirm( "Are you sure you want to Regenerate this License Code? A new code will replace this one." );
    return action;

}



function loadLicenses( selectedTeam, selectedUser ) {
	
	var divsToHide = document.getElementsByClassName( 'teamLicenses' + selectedUser );
	for ( var i = 0; i < divsToHide.length; i++ ) {
		divsToHide[i].style.display = 'none';
		console.log('teamLicenses');
	}
	document.getElementById( 'selectedTeam' + selectedTeam + '-' + selectedUser ).style.display = 'block';


}


var lastPreviousCheckbox = "";

(function() {
    $('.slider').click(function(){
       var previousCheckbox = $(this).siblings().first();
       lastPreviousCheckbox = previousCheckbox;
    });
})();

(function() {
    $('.modal').on('hidden.bs.modal', function () {
    	if($(lastPreviousCheckbox).prop('checked') == false){
    		$(lastPreviousCheckbox).prop('checked', true);
		} else {
            $(lastPreviousCheckbox).prop('checked', false);
        }
    });

})();



// LICENSE PAGE Sort Alphabetically JS //

function sortTable(n, id) {
    id = id || "";
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable"+id);
    switching = true;
    //Set the sorting direction to ascending:
    dir = "asc";
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 1; i < (rows.length - 1); i++) {
            //start by saying there should be no switching:
            shouldSwitch = false;
            /*Get the two elements you want to compare,
            one from current row and one from the next:*/
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /*check if the two rows should switch place,
            based on the direction, asc or desc:*/
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /*If a switch has been marked, make the switch
            and mark that a switch has been done:*/
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            //Each time a switch is done, increase this count by 1:
            switchcount ++;
        } else {
            /*If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again.*/
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

	
$(document).ready(function(){

    $('.userOption').mousedown(function(e) {
        e.preventDefault();
        $(this).prop('selected', !$(this).prop('selected'));
        return false;
    });

    $('select').mouseover(function(e) {
        $('.userOption').css('display', 'block');
        $('select').css('height', 'auto');
        $('.disabled').css('display', 'none');

        $('select').blur(function(e){
            $('.userOption').css('display', 'none');
            $('select').css('height', '38px');
            $('.disabled').css('display', 'inherit');

        });
    });


    $(function () {
        $('[data-toggle="popover"]').popover({
            trigger: 'focus'
        });
    });

    $('[data-toggle="popover"]').click(function() {
        $(this).popover('toggle'),
        $(this).trigger('focus')
    }).blur(function() {
        $(this).popover('hide');

    });




});



