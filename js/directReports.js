$(document).on("pagebeforeshow", "#directReports", function () {
    var listItems = '';
    var employee = $(this).data("employee"); 
//    window.console.log(employee);
    //    window.console.log(employeeDataObject); 
    var employeeData = "";
//    $.each(employee.subordinates, function () {
//        $.each(this, function (key, value) {
//            console.log("Value: ");
//            console.log(value);
////            listItems += '<li  data-filtertext="' + value.name +'"><a id="' + value.id + '" href="#"><img src="'+ value.image + '"><h4>'+ value.name + '</h4><p>' + value.title + '</p><span class="ui-li-count">'+value.subordinates.length + '</span></a></li>'; 
////            $("#directReportInfo").html(listItems).listview('refresh');
//        });
//    });
   $.each(employee.subordinates, function (key, value) {
            console.log("Current Subordinate Value: ");
            console.log(value);
            listItems += '<li  data-filtertext="' + value.name +'"><a id="' + value.id + '" href="#"><img src="'+ value.image + '"><h4>'+ value.name + '</h4><p>' + value.title + '</p><span class="ui-li-count">'+value.subordinates.length + '</span></a></li>'; 
            $("#directReportsInfo").html(listItems).listview('refresh');
    });
    

//    $('body').on('click', '#directReportsInfo a', function(e) {
//        // not sure if I want or need next line
//        window.console.log("MgrsId Passed to managerDetails = {" + $(this).attr('id') +"}"); 
//        $("#managerDetails").data("empId", $(this).attr('id'));
//        $(":mobile-pagecontainer").pagecontainer("change", "#directReports");
//        $('input[data-type="search"]').val("").trigger("change");
//    }); 
$('body').on('click', '#directReportsInfo a', function(e) { 
    console.log("!!!!The ID ====" + $(this).attr('id'));
    $("#employeeDetails").data("empId", $(this).attr('id'));
    $(":mobile-pagecontainer").pagecontainer("change", "#employeeDetails");
});
    
    
});

// Potential fix for BackButton repeated refresh
$(document).on('click', '#employeeDetailsBackbutton', function(e) { 
      if (e.handled !== true) { 
           e.handled = true;  
          
           //Page change function here
          $(":mobile-pagecontainer").pagecontainer("change", "#home"); 
      }
 });


//});