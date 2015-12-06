//$(document).ready(function() {
$(document).on("pageinit", "#home", function () {
    var employeeDataObject = null;
    var listItems = ''; 
    var directReportId;    
    $.getJSON("../data/employees.json", function(data){
        employeeDataObject = data;
        window.console.log(employeeDataObject);
        $.each(data, function() {
            $.each(this, function(key, value) { 
                populateSubordinates(value); 
                
                listItems += '<li  data-filtertext="' + value.name +'"><a id="' + value.id + '" href="#employeeDetails"><img src="'+ value.image + '"><h4>'+ value.name + '</h4><p>' + value.title + '</p><span class="ui-li-count">'+value.subordinates.length + '</span></a></li>';       
                
                if ( $("ul#mainList").hasClass('ui-listview')) {
                        $("ul#mainList").html(listItems).listview('refresh');
                     } else {
                        $("ul#mainList").html(listItems).trigger('create');
                 }                                                       
            });   
        });
       window.console.log(employeeDataObject); 
       $("#employeeDetails").data("employeeDataObject", employeeDataObject);
        $("#managerDetails").data("employeeDataObject", employeeDataObject);
    });
function populateSubordinates(managerObject) {
    console.log("PopulateSubord starting");
    managerObject.subordinates = [];  
    var managerId = managerObject.id;
    console.log("ManagerId = " + managerId); 
    $.each(employeeDataObject, function() {
        $.each(this, function(key, value) {
            if (value.reportsTo == managerId) {
                console.log("Before if test");                
                managerObject.subordinates.push(value);
                console.log(managerObject);
            }
        });
   });
}
 

   
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
