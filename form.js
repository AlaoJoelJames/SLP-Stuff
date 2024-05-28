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
    if (selectedOption === 'sc') {
      document.getElementById('senior_citizen').classList.remove('d-none');
    } else if (selectedOption === 'sp') {
      document.getElementById('solo_parent').classList.remove('d-none');
    }else if (selectedOption === 'osy') {
        document.getElementById('osyForm').classList.remove('d-none');
    }else if (selectedOption === 'pwd') {
        document.getElementById('pwdForm').classList.remove('d-none');
    }else if (selectedOption === 'wdc') {
        document.getElementById('wdcForm').classList.remove('d-none');
    }else if (selectedOption === 'tp') {
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
  
      const { ipcRenderer } = require('electron');
      const XLSX = require('xlsx');
      const fs = require('fs'); // Import the fs module
  
      // Function to export data to Excel
      const exportToExcel = async (dir) => {
        // Get form data
        const formData = new FormData(document.getElementById('submit-form'));
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
  
        try {
          // Read existing Excel file if it exists
          // Read existing Excel file if it exists
          let wb;
          let ws;
          let filePath = `./excel/FormData.xlsx`;
          if (fs.existsSync(filePath)) {
            const existingWb = XLSX.readFile(filePath);
            ws = existingWb.Sheets[existingWb.SheetNames[1]];
            const jsonData = XLSX.utils.sheet_to_json(ws);
            jsonData.push(data); // Append new data to existing data
            ws = XLSX.utils.json_to_sheet(jsonData, { header: Object.keys(data) });
            wb = existingWb; // Use existing workbook
          } else {
            // Create new workbook if the file doesn't exist
            wb = XLSX.utils.book_new();
            ws = XLSX.utils.json_to_sheet([data]);
            XLSX.utils.book_append_sheet(wb, ws, 'Form Data');
          }
  
    
          // Save workbook to file
          XLSX.writeFile(wb, filePath);
    
          console.log('Excel file saved successfully');
    
          // Reset form
          document.getElementById("submit-form").reset();
        } catch (error) {
          console.error('Error exporting to Excel:', error);
        }
      };
    
      // Export to Excel when button is clicked
      document.getElementById("export-button").addEventListener("click", async () => {
        try {
          const dir = await ipcRenderer.invoke('get-directory');
          await exportToExcel(dir);
        } catch (error) {
          console.error('Error exporting to Excel:', error);
        }
      });