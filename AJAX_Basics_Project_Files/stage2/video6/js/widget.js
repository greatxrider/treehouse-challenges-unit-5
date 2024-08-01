var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) { // Check if request is complete
    if (xhr.status === 200) { // Check if request was successful
      console.log(xhr.responseText);
      try {
        var employees = JSON.parse(xhr.responseText); // Parse JSON response
        var statusHTML = '<ul class="bulleted">';

        // Iterate over employees array
        for (var i = 0; i < employees.length; i++) {
          var className = employees[i].inoffice ? 'in' : 'out'; // Determine class based on status
          statusHTML += `<li class="${className}">${employees[i].name}</li>`;
        }

        statusHTML += '</ul>';
        document.getElementById('employeeList').innerHTML = statusHTML; // Update HTML
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    } else {
      console.error('Request failed. Status:', xhr.status);
    }
  }
};

// Open the request and send it
xhr.open('GET', 'data/employees.json');
xhr.send();
