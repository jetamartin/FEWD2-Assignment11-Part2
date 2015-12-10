$(document).on("pagebeforeshow", "#directReports", function () {
    var listItems = '';
    var employeeData = "";    
    var employee = JSON.parse(localStorage.getItem('employee')); 
    
   $.each(employee.subordinates, function (key, value) { 
            console.log("Current Subordinate Value: ");
            console.log(value);
            listItems += '<li  data-filtertext="' + value.name +'"><a id="' + value.id + '" href="#"><img src="'+ value.image + '"><h4>'+ value.name + '</h4><p>' + value.title + '</p><span class="ui-li-count">'+value.subordinates.length + '</span></a></li>'; 
            $("#directReportsInfo").html(listItems).listview('refresh');
    });

$('body').on('click', '#directReportsInfo a', function(e) {
//  if statment addresses jQuery Mobile defect #2639 that causes click listener to called multiple times
//  see last post on: https://github.com/jquery/jquery-mobile/issues/2369
    if (e.handled !== true) {      
        e.handled = true;
        localStorage.empId = $(this).attr('id');
        $.mobile.changePage( "#employeeDetails", { allowSamePageTransition: true} );
    }
});
    
    
});

// Potential fix for BackButton repeated refresh
//$(document).on('click', '#directReportsBackbutton', function(e) { 
//      if (e.handled !== true) { 
//           e.handled = true;  
//          
//           //Page change function here
////          $(":mobile-pagecontainer").pagecontainer("change", "#employeeDetails"); 
//          $.mobile.changePage( "#employeeDetails", { allowSamePageTransition: true} );
//      }
// });


//});