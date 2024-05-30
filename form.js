// document.getElementById('add-row').addEventListener('click', function() {
//     // Get the table body
//     var tbody = document.querySelector('#submit-form tbody');
  
//     // Create a new row
//     var row = document.createElement('tr');
//     var placeholders = {
//         'famname': 'Name',
//         'famrelation': 'Relationship',
//         'famage': 'Age',
//         'fameducation': 'Educational Attainment',
//         'famoccupation': 'Occupation',
//         'famincome': 'Monthly Income (PHP)'
//       };
//     // Create the cells for the row
//     var cells = ['famname', 'famrelation', 'famage', 'fameducation', 'famoccupation', 'famincome'];
//     cells.forEach(function(cell) {
//       var td = document.createElement('td');
//       var input = document.createElement('input');
//       input.type = 'text';
//       input.className = 'form-control';
//       input.placeholder = placeholders[cell];
//       input.id = cell + (tbody.children.length + 1);
//       td.appendChild(input);
//       row.appendChild(td);
//     });
  
//     // Add a date input for the birthday
//     var td = document.createElement('td');
//     var input = document.createElement('input');
//     input.type = 'date';
//     input.className = 'form-control';
//     td.appendChild(input);
//     row.insertBefore(td, row.children[3]);
  
//      // Create the delete button
//     var deleteTd = document.createElement('td');
//     var deleteButton = document.createElement('button');
//     deleteButton.textContent = 'X';
//     deleteButton.className = 'btn btn-danger';
//     deleteButton.addEventListener('click', function() {
//         tbody.removeChild(row);
//     });
//     deleteTd.appendChild(deleteButton);
//     row.appendChild(deleteTd);
//     // Add the row to the table
//     tbody.appendChild(row);
//   });

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
    }else if (selectedOption === 'Person with Disability') {
        document.getElementById('pwdForm').classList.remove('d-none');
    }else if (selectedOption === 'Women in Difficult Circumstances') {
        document.getElementById('wdcForm').classList.remove('d-none');
    }else if (selectedOption === 'Teenage Pregnant/Mother') {
        document.getElementById('tpForm').classList.remove('d-none');
    }
  });
  
  document.getElementById('willingness').addEventListener('change', function() {
    // Hide the yesWilling div
    document.getElementById('yesWilling').classList.add('d-none');
  
    // If the selected option is "yes", show the yesWilling div
    if (this.value === 'Yes') {
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
        // let familyData = []
        // window.onload = function() {
        //   let table = document.getElementById('submit-form');
        //   if (table) {
        //       let rows = Array.from(table.rows).slice(1); // exclude header row
        //       familyData = rows.map(row => {
        //         let cells = Array.from(row.cells);
        //         return {
        //             'famName': cells[0].querySelector('input').value,
        //             'Relationship': cells[1].querySelector('input').value,
        //             'Age': cells[2].querySelector('input').value,
        //             'Birthday': cells[3].querySelector('input').value,
        //             'fam Educational Attainment': cells[4].querySelector('input').value,
        //             'fam Occupation': cells[5].querySelector('input').value,
        //             'fam Monthly Income': cells[6].querySelector('input').value,
        //         };
        //     });
        //   } else {
        //       console.error('Table with id "submit-form" not found');
        //   }
        // };
        
        // Get form data
        const formData = {
            'Full Name': document.getElementById('inputfullname').value,
            'Sex/Gender': document.getElementById('inputsex').value,
            'Date of Birth': document.getElementById('inputdate').value,
            'Address': document.getElementById('inputaddress').value,
            'Educational Attainment': document.getElementById('inputattainment').value,
            'Civil Status': document.getElementById('inputcivil').value,
            'Occupation': document.getElementById('inputoccupation').value,
            'Religion': document.getElementById('inputreligion').value,
            'Company': document.getElementById('inputcompany').value,
            'Monthly Income': document.getElementById('inputincome').value,
            'Contact Number': document.getElementById('inputcontact').value,
            'Email Address': document.getElementById('inputemail').value,
            'Clientele Category': document.getElementById('clientele').value,
            'Solo Parent Category': document.querySelector('input[name="Solo Parent Category"]:checked') ? document.querySelector('input[name="Solo Parent Category"]:checked').value : null,
            'SC Living Condition': document.querySelector('input[name="Senior Citizen"]:checked') ? document.querySelector('input[name="Senior Citizen"]:checked').value : null,
            'SC Health Condition': document.getElementById('healthCondition').value,
            'OSY Reasons Not Attending School': document.getElementById('inputsnotattend').value,
            'OSY Skills Acquired': document.getElementById('skillsacquired').value,
            'OSY Skills Wanted': document.getElementById('skillswantacquire').value,
            'Economic Condition': document.getElementById('economicCondition').value,
            'OSY Willing to School': document.getElementById('willingness').value,
            'OSY School Type': document.querySelector('input[name="yesWilling"]:checked') ? document.querySelector('input[name="yesWilling"]:checked').value : null,
            'Disability Type': document.getElementById('inputdisable').value,
            'WDC Living Condition': document.querySelector('input[name="wdc radio"]:checked') ? document.querySelector('input[name="wdc radio"]:checked').value : null,
            'WDC Skills Acquired': document.getElementById('wdcskillsacquired').value,
            'WDC Skills Wanted': document.getElementById('wdcskillswantacquire').value,
            'TPM Living Condition': document.querySelector('input[name="tpradio"]:checked') ? document.querySelector('input[name="tpradio"]:checked').value : null,
            'TPM Skills Acquired': document.getElementById('tpmskillsacquired').value,
            'TPM Skills Wanted': document.getElementById('tpmskillswantacquire').value,
            'TPM Willing to School': document.getElementById('willingness2').value,
            'TPM School Type': document.querySelector('input[name="yesWilling2"]:checked') ? document.querySelector('input[name="yesWilling2"]:checked').value : null,
            'famname': document.getElementById('famname1').value,
            'famrelation': document.getElementById('famrelation1').value,
            'famage': document.getElementById('famage1').value,
            'fameducation': document.getElementById('fameducation1').value,
            'famoccupation': document.getElementById('famoccupation1').value,
            'famincome': document.getElementById('famincome1').value,
            'fambirthday': document.getElementById('fambirthday1').value,
            'famname2': document.getElementById('famname2').value,
            'famrelation2': document.getElementById('famrelation2').value,
            'famage2': document.getElementById('famage2').value,
            'fameducation2': document.getElementById('fameducation2').value,
            'famoccupation2': document.getElementById('famoccupation2').value,
            'famincome2': document.getElementById('famincome2').value,
            'fambirthday2': document.getElementById('fambirthday2').value,
            'famname3': document.getElementById('famname3').value,
            'famrelation3': document.getElementById('famrelation3').value,
            'famage3': document.getElementById('famage3').value,
            'fameducation3': document.getElementById('fameducation3').value,
            'famoccupation3': document.getElementById('famoccupation3').value,
            'famincome3': document.getElementById('famincome3').value,
            'fambirthday3': document.getElementById('fambirthday3').value,
            'famname4': document.getElementById('famname4').value,
            'famrelation4': document.getElementById('famrelation4').value,
            'famage4': document.getElementById('famage4').value,
            'fameducation4': document.getElementById('fameducation4').value,
            'famoccupation4': document.getElementById('famoccupation4').value,
            'famincome4': document.getElementById('famincome4').value,
            'fambirthday4': document.getElementById('fambirthday4').value,
            'famname5': document.getElementById('famname5').value,
            'famrelation5': document.getElementById('famrelation5').value,
            'famage5': document.getElementById('famage5').value,
            'fameducation5': document.getElementById('fameducation5').value,
            'famoccupation5': document.getElementById('famoccupation5').value,
            'famincome5': document.getElementById('famincome5').value,
            'fambirthday5': document.getElementById('fambirthday5').value,

        };
    
        // Send form data to the main process to save it in the database
        const { ipcRenderer } = require('electron');
        ipcRenderer.send('save-data', formData);
        window.location.href = 'list.html';

    });