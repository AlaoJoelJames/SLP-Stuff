document.getElementById('add-row').addEventListener('click', function() {
    // Get the table body
    var tbody = document.querySelector('#submit-form tbody');
  
    // Create a new row
    var row = document.createElement('tr');
    var placeholders = {
        'famname': 'Name',
        'famrelation': 'Relationship',
        'famage': 'Age',
        'fameducation': 'Educational Attainment',
        'famoccupation': 'Occupation',
        'famincome': 'Monthly Income (PHP)'
      };
    // Create the cells for the row
    var cells = ['famname', 'famrelation', 'famage', 'fameducation', 'famoccupation', 'famincome'];
    cells.forEach(function(cell) {
      var td = document.createElement('td');
      var input = document.createElement('input');
      input.type = 'text';
      input.className = 'form-control';
      input.placeholder = placeholders[cell];
      input.id = cell + (tbody.children.length + 1);
      td.appendChild(input);
      row.appendChild(td);
    });
  
    // Add a date input for the birthday
    var td = document.createElement('td');
    var input = document.createElement('input');
    input.type = 'date';
    input.className = 'form-control';
    td.appendChild(input);
    row.insertBefore(td, row.children[3]);
  
     // Create the delete button
    var deleteTd = document.createElement('td');
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'btn btn-danger';
    deleteButton.addEventListener('click', function() {
        tbody.removeChild(row);
    });
    deleteTd.appendChild(deleteButton);
    row.appendChild(deleteTd);
    // Add the row to the table
    tbody.appendChild(row);
  });

document.getElementById('cancel-button').addEventListener('click', function() {
    window.location.href = 'list.html';
  });


function hideAllForms() {
    document.getElementById('senior_citizen').classList.add('d-none');
    document.getElementById('solo_parent').classList.add('d-none');
    document.getElementById('osyForm').classList.add('d-none');
    document.getElementById('pwdForm').classList.add('d-none');
    document.getElementById('wdcForm').classList.add('d-none');
    document.getElementById('tpForm').classList.add('d-none');
    // Add more lines to hide the other forms...
  }
  
  document.getElementById('clientele').addEventListener('change', function() {
    // Hide all forms
    hideAllForms();

    // Show the form for the selected option
    var selectedOption = this.value;
    if (selectedOption === 'Senior Citizen') {
      document.getElementById('senior_citizen').classList.remove('d-none');
    } else if (selectedOption === 'Solo Parent') {
      document.getElementById('solo_parent').classList.remove('d-none');
    }else if (selectedOption === 'Out of School Youth') {
        document.getElementById('osyForm').classList.remove('d-none');
    }else if (selectedOption === 'Person With Disability') {
        document.getElementById('pwdForm').classList.remove('d-none');
    }else if (selectedOption === 'Woman in Difficult Circumstance') {
        document.getElementById('wdcForm').classList.remove('d-none');
    }else if (selectedOption === 'Teenage Pregnant/Mother') {
        document.getElementById('tpForm').classList.remove('d-none');
    }
  });
  
  document.getElementById('willingness').addEventListener('change', function() {
    // Hide the yesWilling div
    document.getElementById('yesWilling').classList.add('d-none');
  
    // If the selected option is "yes", show the yesWilling div
    if (this.value === 'yes') {
      document.getElementById('yesWilling').classList.remove('d-none');
    }
  });

  document.getElementById('willingness2').addEventListener('change', function() {
    // Hide the yesWilling div
    document.getElementById('yesWilling2').classList.add('d-none');
  
    // If the selected option is "yes", show the yesWilling div
    if (this.value === 'yes') {
      document.getElementById('yesWilling2').classList.remove('d-none');
    }
  });

      document.getElementById('export-button').addEventListener('click', () => {
        event.preventDefault();
    
        var checkedRadioButton = document.querySelector('input[name="Senior Citizen"]:checked');
            // Check if a radio button is checked
            if (checkedRadioButton !== null) {
                // If a radio button is checked, retrieve its value
                var livingCondition = checkedRadioButton.value;
                console.log("Living condition:", livingCondition);
            } else {
                // If no radio button is checked
                console.log("No living condition selected");
          }
        // Get form data
        const formData = {
            'Full Name': document.getElementById('inputfullname').value,
            'Sex/Gender': document.getElementById('inputsex').value,
            'Date of Birth': document.getElementById('inputdate').value,
            'address': document.getElementById('inputaddress').value,
            'Educational Attainment': document.getElementById('inputattainment').value,
            'civilstatus': document.getElementById('inputcivil').value,
            'Occupation': document.getElementById('inputoccupation').value,
            'Religion': document.getElementById('inputreligion').value,
            'Company': document.getElementById('inputcompany').value,
            'Monthly Income': document.getElementById('inputincome').value,
            'Contact Number': document.getElementById('inputcontact').value,
            'Email Address': document.getElementById('inputemail').value,
            'livingcon': livingCondition,
            'Health Condition': document.getElementById('healthCondition').value,
            'Reason Not Attend School': document.getElementById('inputsnotattend').value,
            'Skills Acquired': document.getElementById('skillsacquired').value,
            'Skills Want to Acquire': document.getElementById('skillswantacquire').value,
            'Disability Type': document.getElementById('inputdisable').value,
            'ClienteleCategory': document.getElementById('clientele').value

        };
    
        // Send form data to the main process to save it in the database
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('save-data', formData);
        window.location.href = 'list.html';

    });