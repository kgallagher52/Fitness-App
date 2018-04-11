$("#license").on("change", function () {        
    $modal = $('#createUser');
    $modal2 = $('#updateLicenseModel');
    if($(this).val() === 'newUser'){
        console.log("YAY");
        $modal2.modal('hide');
        $modal.modal('show');
        addUser();
    }
});

function addUser () {
    var btn = document.getElementById('addUser');
    btn.onclick = function() {
        $modal.modal('hide');
        $modal2.modal('show');
    };
}

$.get('manage/create', function(){
    console.log("recived ajax response");
});

