//$(document).ready(function(e) {
$(document).on("pagebeforeshow", "#employeeDetails", function () {
    var empId = $(this).data("empId");
    window.console.log("Employee Id: " + empId);
    var employeeDataObject = $(this).data("employeeDataObject");
    //    window.console.log(employeeDataObject); 
    var employeeData = "";
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
                $('#employeeProfile').empty();
                $('#employeeProfile').append(
                    '<img src="' + value.image + '"><div> <h3>' + value.name + '</h3><p>' + value.title + '</p></div>');
                employeeData += '<li ><a id="' + manager.id + '" href="#"><h4>View Manager</h4><p>' + managername + '</p></a></li>'
                employeeData += '<li><a href="#"><h4>View Direct Reports</h4><p>' + value.subordinates.length + '</p></a></li>'
                employeeData += '<li><a href="#"><h4>Call Office</h4><p>' + value.officeNumber + '</p></a></li>'
                employeeData += '<li><a href="#"><h4>Send Email</h4><p>' + value.email + '</p></a></li>'
                $("#employeeInfo").html(employeeData).listview("refresh");
            }
        });
    });
    //        });
    

    $('body').on('click', '#employeeInfo a', function(e) {
        // not sure if I want or need next line
        window.console.log("MgrsId Passed to managerDetails = {" + $(this).attr('id') +"}"); 
        $("#managerDetails").data("empId", $(this).attr('id'));
        $(":mobile-pagecontainer").pagecontainer("change", "#managerDetails");
        $('input[data-type="search"]').val("").trigger("change");
    }); 
  
    
    
    
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
});




//});