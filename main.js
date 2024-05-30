const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'my_database.db'); //comment this if you want to create a new db
const db = new sqlite3.Database(dbPath) //comment this if you want to create a new db

function createDatabase() {
  // Specify the path where you want to store the SQLite database file
  const dbPath = path.join("./", 'my_database.db');
  
  // Create a new SQLite database instance
  const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
          console.error('Error opening database:', err.message);
      } else {
          console.log('Connected to the SQLite database.');
          // Create tables
          db.run(`
              CREATE TABLE IF NOT EXISTS PersonalInformation (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  Full_Name TEXT,
                  Sex TEXT,
                  Date_of_Birth TEXT,
                  Address TEXT,
                  Educational_Attainment TEXT,
                  Civil_Status TEXT,
                  Occupation TEXT,
                  Religion TEXT,
                  Company_Agency TEXT,
                  Monthly_Income REAL,
                  Contact_Number TEXT,
                  Email_Address TEXT
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS FamilyComposition (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  PersonalInfo_ID INTEGER,
                  Name TEXT,
                  Relationship TEXT,
                  Age INTEGER,
                  Birthday TEXT,
                  Educational_Attainment TEXT,
                  Occupation TEXT,
                  Monthly_Income REAL,
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID)
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS ClienteleCategory (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  PersonalInfo_ID INTEGER,
                  Solo_Parent_Code TEXT,
                  Clientele TEXT,
                  Living_Condition TEXT,
                  Health_Condition TEXT,
                  Reasons_Not_Attending_School TEXT,
                  Skills_Acquired TEXT,
                  Skills_Wanted TEXT,
                  Type_of_Disability TEXT,
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID)
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS SoloParentCategory (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  Code TEXT,
                  Description TEXT,
                  Requirements TEXT
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS SoloParentRequirements (
                  SoloParentCategory_ID INTEGER,
                  Requirement_Number INTEGER,
                  Requirement_Description TEXT,
                  FOREIGN KEY (SoloParentCategory_ID) REFERENCES SoloParentCategory(ID)
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS OrientationCertificates (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  PersonalInfo_ID INTEGER,
                  Certificate_Status TEXT CHECK(Certificate_Status IN ('Attended', 'Not Attended')),
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID)
              )
          `);
      }
  });

  // Close the database connection when the application quits
  app.on('before-quit', () => {
      db.close((err) => {
          if (err) {
              console.error('Error closing database:', err.message);
          } else {
              console.log('Disconnected from the SQLite database.');
          }
      });
  });
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 800,
    title: "MSWDO Malitbog Monitoring System",
    icon: path.join(__dirname, './assets/malitbog_logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false
      
    }
  });

  mainWindow.loadFile('login.html');
  mainWindow.webContents.on('did-finish-load', () => {
    if (mainWindow.webContents.getURL().endsWith('list.html')) {
      mainWindow.maximize();
    }

  });
  
}

function saveFormData(db, formData) {
  const stmt = db.prepare(`INSERT INTO PersonalInformation 
  (Full_Name, Sex, Date_of_Birth, Address, Educational_Attainment,
  Civil_Status, Occupation, Religion, Company_Agency, Monthly_Income,
  Contact_Number, Email_Address)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  // Insert into PersonalInformation table
  stmt.run(
    formData['Full Name'],
    formData['Sex/Gender'],
    formData['Date of Birth'],
    formData['address'],
    formData['Educational Attainment'],
    formData['civilstatus'],
    formData['Occupation'],
    formData['Religion'],
    formData['Company'],
    parseFloat(formData['Monthly Income']),
    formData['Contact Number'],
    formData['Email Address'],

    function(err) {
      if (err) {
          console.error(err.message);
          return;
      }

      // Retrieve the last inserted row ID (PersonalInfo_ID)
      const lastInsertedId = this.lastID;

      // Prepare the statement for inserting into ClienteleCategory table
      const stmt2 = db.prepare(`INSERT INTO ClienteleCategory 
          (PersonalInfo_ID, Living_Condition, Health_Condition, Reasons_Not_Attending_School, Skills_Acquired, Skills_Wanted,
          Type_of_Disability, Clientele)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

      // Insert into ClienteleCategory table using the last inserted row ID
      stmt2.run(
          lastInsertedId, // Use the last inserted row ID as PersonalInfo_ID
          formData['livingcon'],
          formData['Health Condition'],
          formData['Reason Not Attend School'],
          formData['Skills Acquired'],
          formData['Skills Want to Acquire'],
          formData['Disability Type'],
          formData['ClienteleCategory']
      );

      // Finalize the statement
      stmt2.finalize();
  }
  );

  // Finalize the statement
  stmt.finalize();

  // Retrieve the last inserted row ID (PersonalInfo_ID)

  console.log('Form data saved to database');

  db.all('SELECT * FROM PersonalInformation INNER JOIN ClienteleCategory ON PersonalInformation.ID = ClienteleCategory.PersonalInfo_ID', (err, rows) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Data from the database:', rows);

    // Send the fetched data to the renderer process
});

  console.log('Form data saved to database');
}

app.on('ready', () => {
  //const db = createDatabase(); //uncomment this if you want to create a db

  // Handle form data saving
  ipcMain.on('save-data', (event, formData) => {
      saveFormData(db, formData);
  });

});

app.whenReady().then(createWindow);