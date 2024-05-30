
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');
    const dbPath = path.join(__dirname, 'my_database.db');
    const db = new sqlite3.Database(dbPath);

    db.run('PRAGMA foreign_keys = ON;', function(err) {
        if (err) {
          console.error(err.message);
        }
        console.log('Foreign key constraints enabled.');
      });


    // SQL query to select the name from the database
    const sqlPersonalInfo = 'SELECT * FROM PersonalInformation WHERE ID = ?';
    // Execute the SQL query
    // Execute the SQL query
db.get(sqlPersonalInfo, [id], (err, row) => {
    if (err) {
        return console.error(err.message);
    }

    // Set the value of each input field to the corresponding field from the database
    document.getElementById('inputfullname').value = row.Full_Name;
    document.getElementById('inputsex').value = row.Sex;
    document.getElementById('inputdate').value = row.Date_of_Birth;
    document.getElementById('inputaddress').value = row.Address;
    document.getElementById('inputattainment').value = row.Educational_Attainment;
    document.getElementById('inputcivil').value = row.Civil_Status;
    document.getElementById('inputoccupation').value = row.Occupation;
    document.getElementById('inputreligion').value = row.Religion;
    document.getElementById('inputcompany').value = row.Company_Agency;
    document.getElementById('inputincome').value = row.Monthly_Income;
    document.getElementById('inputcontact').value = row.Contact_Number;
    document.getElementById('inputemail').value = row.Email_Address;
    document.getElementById('clientele').value = row.Category;
    document.getElementById('clientele').value=row.Category;
    document.querySelectorAll('input, select').forEach(input => input.disabled = true);
});
// SQL query to select family composition
const sqlFamilyComposition = 'SELECT * FROM FamilyComposition WHERE PersonalInfo_ID = ?';

// Execute the SQL query
db.all(sqlFamilyComposition, [id], (err, rows) => {
    if (err) {
        return console.error(err.message);
    }

    // Log the rows to the console
    console.log(rows);

    // Loop over the rows and set the value of each input field
    rows.forEach((row, index) => {
        // Add 1 to the index because the IDs of the input fields start at 1
        const idSuffix = index + 1;

        document.getElementById(`famname${idSuffix}`).value = row.Name;
        document.getElementById(`famrelation${idSuffix}`).value = row.Relationship;
        document.getElementById(`famage${idSuffix}`).value = row.Age;
        document.getElementById(`fambirthday${idSuffix}`).value = row.Birthday;
        document.getElementById(`fameducation${idSuffix}`).value = row.FCEducational_Attainment;
        document.getElementById(`famoccupation${idSuffix}`).value = row.FCOccupation;
        document.getElementById(`famincome${idSuffix}`).value = row.FCMonthly_Income;
    });
});
        
    });


document.getElementById('cancel-button').addEventListener('click', function() {
    window.location.href = 'list.html';
  });