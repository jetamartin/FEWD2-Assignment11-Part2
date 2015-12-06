//$(document).ready(function(e) {
$(document).on("pagebeforeshow", "#employeeDetails", function () {
    var empId = $(this).data("empId");
    var employeeDataObject = null;
    var employeeData = "";
        $.getJSON("../data/employees.json", function(data) {
            employeeDataObject = data;
            window.console.log(employeeDataObject);
            $.each(data, function() {
                $.each(this, function(key, value) {
//                    if ( value.id === localStorage.employeeId ) {
                        if ( value.id === empId ) {
                        var directReportId = value.reportsTo;
                        $('#employeeProfile').empty();
                        $('#employeeProfile').append(
                            '<img src="' + value.image + '"><div> <h3>' + value.name + '</h3><p>' + value.title + '</p></div>');
                        employeeData += '<li><a href="#"><h4>View Manager</h4><p>'+value.reportsTo+'</p></a></li>'
                        employeeData += '<li><a href="#"><h4>View Direct Reports</h4><p>'+value.reportsTo+'</p></a></li>'
                        employeeData += '<li><a href="#"><h4>Call Office</h4><p>'+value.officeNumber+'</p></a></li>' 
                        employeeData += '<li><a href="#"><h4>Send Email</h4><p>'+value.email+'</p></a></li>'                         
                        $("#employeeInfo").html(employeeData).listview("refresh");    
                    }    
                });   
            });                       
        });
    });

//});