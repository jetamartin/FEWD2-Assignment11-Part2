//$(document).ready(function(e) {
$(document).on("pagebeforeshow", "#employeeDetails", function () {
    var empId = $(this).data("empId");
    var employee = null;
    window.console.log("Employee Id: " + empId);
    var employeeDataObject = $(this).data("employeeDataObject");
    //    window.console.log(employeeDataObject); 
    var employeeData = "";
    //        $.getJSON("../data/employees.json", function(data) {
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
                    employeeData += '<li ><a id="' + manager.id + '" href="#"><h4>View Manager</h4><p>' + managername + '</p></a></li>'
                }
                if (value.subordinates.length === 0) {
                    console.log("Hey...no direct reports");
                   employeeData += '<li><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></li>'
                } else {
                   employeeData += '<li><a id="viewDirectReports" href="#" ><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></a></li>'
 
                }
                employeeData += '<li><a id="callOffice" href="#"><h4>Call Office</h4><p>' + value.officeNumber + '</p></a></li>'
                employeeData += '<li><a id="callCell" href="#"><h4>Call Cell</h4><p>' + value.cellNumber + '</p></a></li>'
                employeeData += '<li><a id="sendEmail" href="#"><h4>Send Email</h4><p>' + value.email + '</p></a></li>'
                $("#employeeInfo").html(employeeData).listview("refresh");
            }
        });
    });
    //        });
    
    var id = $(this).attr('id');
    window.console.log("ID = " + id); 
    $('body').on('click', '#employeeInfo a', function(e) {
        switch($(this).attr('id')) {
            case "viewDirectReports":
                {
                    window.console.log(employee);
                    console.log("viewDirect action code");
                    $("#directReports").data("employee", employee);
                    $(":mobile-pagecontainer").pagecontainer("change", "#directReports");
                }
                break;
            case "callOffice":
               console.log("callOffice action code");
                break;
           case "callCell":
                console.log("callCell action code");
                break;
           case "sendEmail":
                 console.log("email action code");
                break;
            default: {//manager id
                console.log("manager id");
                $("#managerDetails").data("empId", $(this).attr('id'));
                $(":mobile-pagecontainer").pagecontainer("change", "#managerDetails");
            }
        } 
        
        $('input[data-type="search"]').val("").trigger("change");
    }); 
  
    
    
    
   function populateManager(employeeObject) {
    console.log("PopulateManager starting");
    var manager = null; 
    var managerId = employeeObject.reportsTo; 
    console.log("ManagerId!!!! = [" + managerId + "]");
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