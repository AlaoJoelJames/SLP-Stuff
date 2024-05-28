document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const filterDropdown = document.getElementById('filter-dropdown');
    const tableArea = document.getElementById('tableArea');
  
    // Sample data (you can replace this with your actual data fetching logic)
    const records = [
        { lastName: 'Smith', firstName: 'John', sex: 'Male', contact: '1234567890', email: 'john.smith@example.com', status: 'Single', occupation: 'Engineer', education: 'Bachelor\'s', religion: 'Christian', income: 5000, category: 'solo parent' },
        { lastName: 'Doe', firstName: 'Jane', sex: 'Female', contact: '0987654321', email: 'jane.doe@example.com', status: 'Married', occupation: 'Doctor', education: 'PhD', religion: 'Atheist', income: 7000, category: 'senior citizen' },
        // Add more records as needed
    ];
  
    const displayRecords = (filteredRecords) => {
        tableArea.innerHTML = '';
        filteredRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${record.lastName}</td>
                <td>${record.firstName}</td>
                <td>${record.sex}</td>
                <td>${record.contact}</td>
                <td>${record.email}</td>
                <td>${record.status}</td>
                <td>${record.occupation}</td>
                <td>${record.education}</td>
                <td>${record.religion}</td>
                <td>${record.income}</td>
                <td>${record.category}</td>
                <td><button class="btn btn-info" id="info" type="button">Info</button></td>
                <td><button class="btn btn-danger">Delete</button></td>
            `;
            tableArea.appendChild(row);
        });
    };
  
    const filterRecords = () => {
        const searchText = searchInput.value.toLowerCase();
        const filterValue = filterDropdown.value.toLowerCase();
        const filteredRecords = records.filter(record => {
            const matchesSearch = record.lastName.toLowerCase().includes(searchText);
            const matchesFilter = filterValue === '' || record.category.toLowerCase().includes(filterValue);
            return matchesSearch && matchesFilter;
        });
        displayRecords(filteredRecords);
    };
  
    searchInput.addEventListener('input', filterRecords);
    filterDropdown.addEventListener('change', filterRecords);
  
    // Initial display of all records
    displayRecords(records);
  });
  
  document.getElementById('record').addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'submit-form.html'; 
  });
  
  document.getElementById('logout').addEventListener('click', function(event) {
      event.preventDefault(); 
      window.location.href = 'login.html'; 
  });
  
  document.getElementById('info').addEventListener('click', function(event) {
      event.preventDefault(); 
      window.location.href = 'info.html'; 
  });