document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterDropdown = document.getElementById('filter-dropdown');
    const path = require('path');
    const sqlite3 = require('sqlite3').verbose();
    const tableArea = document.getElementById('tableArea');
    const dbPath = path.join(__dirname, 'my_database.db');
    const db = new sqlite3.Database(dbPath);

    db.run('PRAGMA foreign_keys = ON;', function(err) {
        if (err) {
          console.error(err.message);
        }
        console.log('Foreign key constraints enabled.');
      });

    // Define an array to store the fetched records
    const records = [];

    // SQL query to select all records from the personalinformation table
    const sql = 'SELECT * FROM PersonalInformation INNER JOIN ClienteleCategory ON PersonalInformation.ID = ClienteleCategory.PersonalInfo_ID';
    
    // Execute the SQL query to fetch records from the database
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        // Process the rows returned by the query
        rows.forEach((row) => {
            // Initialize an object to store the record for this row
            const record = {};
            // Iterate over each column in the row
            Object.keys(row).forEach((columnName) => {
                // Assign the value of the column to the corresponding key in the record object
                record[columnName] = row[columnName];
            });
            // Push the record object to the records array
            records.push(record);
        });
        // Display the records
        displayRecords(records);
    });


    // Function to display records in the table
    const displayRecords = (filteredRecords) => {
        tableArea.innerHTML = '';
        filteredRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.Full_Name}</td>
                <td>${record.Sex}</td>
                <td>${record.Contact_Number}</td>
                <td>${record.Email_Address}</td>
                <td>${record.Civil_Status}</td>
                <td>${record.Occupation}</td>
                <td>${record.Educational_Attainment}</td>
                <td>${record.Religion}</td>
                <td>${record.Monthly_Income}</td>
                <td>${record.Category}</td>
                <td><button class="btn btn-success info" id="info" type="button">Details</button></td>
                <td><button class="btn btn-danger delete" >Delete</button></td>
            `;
            const deleteButton = row.querySelector('.delete');
            const infoButton = row.querySelector('.info');
            // Add an event listener to the delete button
            deleteButton.addEventListener('click', () => {
                // Show confirmation dialog
                const userConfirmed = confirm(`Are you sure you want to delete the record for ${record.Full_Name}?`);
    
                if (userConfirmed) {
                    // SQL query to delete the record from the database
                    const sql = `DELETE FROM PersonalInformation WHERE id = ?`;
            
                // Execute the SQL query
                db.run(sql, [record.ID], (err) => {
                    if (err) {
                        return console.error(err.message);
                    }
                    // Remove the row from the table
                    tableArea.removeChild(row);
                }); 
            }
            });
            //Click event listener for the "Info" button (if needed)
           infoButton.addEventListener('click', () => {
                window.location.href = `details.html?id=${record.ID}`;
           });
            
            tableArea.appendChild(row);
        });
    };

    // Function to filter records based on search input and dropdown filter
    const filterRecords = () => {
        const searchText = searchInput.value.toLowerCase();
        const filterValue = filterDropdown.value.toLowerCase();
        const filteredRecords = records.filter(record => {
            const matchesSearch = record.Full_Name.toLowerCase().includes(searchText);
            const matchesFilter = filterValue === '' || record.Category.toLowerCase().includes(filterValue);
            return matchesSearch && matchesFilter;
        });
        displayRecords(filteredRecords);
    };

    // Event listeners for search input and filter dropdown
    searchInput.addEventListener('input', filterRecords);
    filterDropdown.addEventListener('change', filterRecords);
});

// Click event listener for the "Record" button
document.getElementById('record').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'submit-form.html';
});

// Click event listener for the "Logout" button
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = 'login.html';
});

