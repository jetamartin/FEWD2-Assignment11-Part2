$(document).on("pagebeforeshow", "#employeeDetails", function () {
$.mobile.page.prototype.options.domCache = true;
//    console.log("EmpId when landing on employee details = " + empId);
    var employeeDataObject = $(this).data("employeeDataObject");
    //    window.console.log(employeeDataObject); 
    var employeeData = "";
    $.each(employeeDataObject, function () {
        $.each(this, function (key, value) {
            //                    if ( value.id === localStorage.employeeId ) {
            if (value.id === empId) {
                employee = value;

                var manager = populateManager(value);
                var managername = null;
                if (manager !== undefined && manager !== null) {
                    managername = manager.name;
                } else {
                    managername = "Board of Directors";                    
                }
                $('#employeeProfile').empty();
                $('#employeeProfile').append(
                    '<img src="' + value.image + '"><div> <h3>' + value.name + '</h3><p>' + value.title + '</p></div>');
                if (manager === null) {
                    employeeData += '<li ><h4>Manager</h4><p>' + managername + '</p></li>'
                } else {
                    employeeData += '<li ><a id="' + manager.id + '" href="#" target="viewManager"><h4>View Manager</h4><p>' + managername + '</p></a></li>'
                }
                if (value.subordinates.length === 0) {
                   employeeData += '<li><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></li>'
                } else {
                   employeeData += '<li><a id="viewDirectReports" href="#directReports" ><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></a></li>'
 
                }
                employeeData += '<li><a id="callOffice" href="tel:'+ value.officeNumber +'"><h4>Call Office</h4><p>' + value.officeNumber + '</p></a></li>'
                employeeData += '<li><a id="callCell" href="tel:'+ value.cellNumber +'"><h4>Call Cell</h4><p>' + value.cellNumber + '</p></a></li>'
                employeeData += '<li><a id="sendEmail" href="mailto:'+ value.email +'"><h4>Send Email</h4><p>' + value.email + '</p></a></li>'
                $("#employeeInfo").html(employeeData).listview("refresh");
            }
        });
    });
    //        });
    
    $('body').on('click', '#employeeInfo a', function(e) {
 //  if statment jQuery Mobile defect #2639 that causes click listener to called multiple times
 //  see last post on: https://github.com/jquery/jquery-mobile/issues/2369
      if (e.handled !== true) {      
           e.handled = true;
        var target = $(this).attr('target');
        if (target !== undefined && target !== null && target === "viewManager") {
                empId = $(this).attr('id');
                console.log("EmpId from employee details to manager details = " + empId);
                $.mobile.changePage( "#employeeDetails", { allowSamePageTransition: true} );            
        }        
        $('input[data-type="search"]').val("").trigger("change");
    }
    }); 
  
    
    
    
   function populateManager(employeeObject) {
    var manager = null; 
    var managerId = employeeObject.reportsTo; 
    $.each(employeeDataObject, function () {
        $.each(this, function (key, value) {
            if (value.id == managerId) {
                manager = value;
                return manager;                
            }
        });
    });
    return manager;
} 
    
    // Potential fix for BackButton repeated refresh
//    $(document).on('click', '#employeeDetailsBackbutton', function(e) { 
//      if (e.handled !== true) { 
//           e.handled = true;         
//          
//           //Page change function here
//          $.mobile.changePage( "#home", { allowSamePageTransition: true} );
//
//      }
// });
    
    
});
