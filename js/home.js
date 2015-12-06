$(document).ready(function() {

//    $(document).on("create", "#home", function(e) {
    var listItems = ''; 
    
    $.getJSON("../data/employees.json", function(data){
        window.console.log("JSON Data is loading");
        $.each(data, function() {
            $.each(this, function(key, value) {                    
                listItems += '<li  data-filtertext="' + value.name +'"><a id="' + value.id + '" href="#employeeDetails"><img src="'+ value.image + '"><h4>'+ value.name + '</h4><p>' + value.title + '</p> </a></li>';
                
                if ( $("ul#mainList").hasClass('ui-listview')) {
                        $("ul#mainList").html(listItems).listview('refresh');
                     } else {
                        $("ul#mainList").html(listItems).trigger('create');
                 }                                                       
            });   
        });                       
    });
//    });
   
$('body').on('click', '#mainList a', function(e) {
    $("#employeeDetails").data("empId", $(this).attr('id'));
 
////  Alternate approach is to use local storage as described below  
//    if(typeof(Storage)!=="undefined") {
//        localStorage.employeeId = $(this).attr('id')
////          localStorage.employeeId=e.currentTarget.getAttribute("id");        
//    }
$(":mobile-pagecontainer").pagecontainer("change", "#employeeDetails");
// Alternative way to change page..not sure if there is a diff between these
//    $.mobile.changePage("#employeeDetails");

    // Clear out search results after transitioning to Employee Details screen so that when you return
    // to the Search Screen the search results have been cleared out and the screen is blank.
    // The trigger("change") part was need so that logic below will fire otherwise programatically blanking the 
    // search results wouldn't trigger the logic (below) to display the welcome message. 
    $('input[data-type="search"]').val("").trigger("change");
    
});
// Show the Welcome Message if no search request have been made by the user (i.e., search input field is blank). 
$("input[data-type='search']").on("keyup change", function() {
    var searchInput = $(this).val(); 
    if (searchInput === "") {
        $("#welcomeMsg").show();
    } else {
        $("#welcomeMsg").hide();        
    }
});



//http://www.peachpit.com/articles/article.aspx?p=1929169&seqNum=2
//http://stackoverflow.com/questions/18051227/how-to-populate-a-jquery-mobile-listview-with-json-data    
});
