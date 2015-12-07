$(document).on("pagebeforeshow", "#managerDetails", function () {
    var empId = $(this).data("empId");
    window.console.log("Employee Id of MGR: " + empId);
    var employeeDataObject = $(this).data("employeeDataObject");
    //    window.console.log(employeeDataObject); 
    var managerData = "";
    //        $.getJSON("../data/employees.json", function(data) {
    $.each(employeeDataObject, function () {
        $.each(this, function (key, value) {
            //                    if ( value.id === localStorage.employeeId ) {
            if (value.id === empId) {
                var manager = populateManager(value);
                var managername = null;
                if (manager !== undefined && manager !== null) {
                    managername = manager.name;
                } else {
                    managername = "Board of Directors";                    
                }
                $('#managerProfile').empty();
                $('#managerProfile').append(
                    '<img src="' + value.image + '"><div><h3>' + value.name + '</h3><p>' + value.title + '</p></div>');
                managerData += '<li><a href="#"><h4>View Manager</h4><p>' + managername + '</p></a></li>';
                managerData += '<li><a href="#"><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></a></li>';
                managerData += '<li><a href="#"><h4>Call Office</h4><p>' + value.officeNumber + '</p></a></li>';
                managerData += '<li><a href="#"><h4>Call Cell</h4><p>' + value.cellNumber + '</p></a></li>'
                managerData += '<li><a href="#"><h4>Send Email</h4><p>' + value.email + '</p></a></li>';
                $("#managerInfo").html(managerData).listview("refresh");
            }
        });
    });
  
    //        });
    
   function populateManager(employeeObject) {
    console.log("PopulateManager starting");
    var manager = null; 
    var managerId = employeeObject.reportsTo; 
    console.log("ManagerId = [" + managerId + "]");
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
$(document).on('click', '#managerDetailsBackbutton', function(e) { 
      if (e.handled !== true) { 
           e.handled = true;  
          
           //Page change function here
          $(":mobile-pagecontainer").pagecontainer("change", "#home"); 
      }
 });
});