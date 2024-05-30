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

          db.run('PRAGMA foreign_keys = ON;', function(err) {
            if (err) {
              console.error(err.message);
            }
            console.log('Foreign key constraints enabled.');
          });

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
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS ClienteleCategory (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  Category TEXT,
                  PersonalInfo_ID INTEGER,
                  SoloParent INTEGER NULL,
                  SeniorCitizen INTEGER NULL,
                  Osy INTEGER NULL,
                  Pwd INTEGER NULL,
                  Wdc INTEGER NULL,
                  Tpm INTEGER NULL,
                  FOREIGN KEY (SoloParent) REFERENCES SoloParent(ID),
                  Foreign KEY (SeniorCitizen) REFERENCES SeniorCitizen(ID),
                  FOREIGN KEY (Osy) REFERENCES Osy(ID),
                  FOREIGN KEY (Pwd) REFERENCES Pwd(ID),
                  FOREIGN KEY (Wdc) REFERENCES Wdc(ID),
                  FOREIGN KEY (Tpm) REFERENCES Tpm(ID),
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS SoloParent (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  SpCategory INTEGER,
                  PersonalInfo_ID INTEGER,
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS SeniorCitizen (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                LivingCondition TEXT,
                HealthCondition TEXT,
                PersonalInfo_ID INTEGER,
                FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS Osy (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  ReasonsNotAttendingSchool TEXT,
                  SkillsAcquired TEXT,
                  SkillsWanted TEXT,
                  EconomicCondition TEXT,
                  WillingToSchool TEXT,
                  SchoolType TEXT,
                  PersonalInfo_ID INTEGER,
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
              CREATE TABLE IF NOT EXISTS Pwd (
                  ID INTEGER PRIMARY KEY AUTOINCREMENT,
                  DisabilityType TEXT,
                  PersonalInfo_ID INTEGER,
                  FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
          CREATE TABLE IF NOT EXISTS Wdc (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              LivingCondition TEXT, 
              SkillsAcquired TEXT,
              SkillsWanted TEXT,
              PersonalInfo_ID INTEGER,
              FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
              )
          `);
          db.run(`
          CREATE TABLE IF NOT EXISTS Tpm (
              ID INTEGER PRIMARY KEY AUTOINCREMENT,
              LivingCondition TEXT, 
              SkillsAcquired TEXT,
              SkillsWanted TEXT,
              WillingToSchool TEXT,
              SchoolType TEXT,
              PersonalInfo_ID INTEGER,
              FOREIGN KEY (PersonalInfo_ID) REFERENCES PersonalInformation(ID) ON DELETE CASCADE
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
    formData['Address'],
    formData['Educational Attainment'],
    formData['Civil Status'],
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
          (PersonalInfo_ID, Category, SoloParent, SeniorCitizen, Osy, Pwd, Wdc, Tpm)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

      // Insert into ClienteleCategory table using the last inserted row ID
      stmt2.run(
          lastInsertedId, // Use the last inserted row ID as PersonalInfo_ID
          formData['Clientele Category'],
          formData['Solo Parent'],
          formData['Senior Citizen'],
          formData['Out of School Youth'],
          formData['Person with Disability'],
          formData['Women in Difficult Circumstances'],
          formData['Teenage Pregnant/Mother']
      );

      // Finalize the statement
      stmt2.finalize();

      // Check which category is selected and insert into the appropriate table
  if (formData['Clientele Category']==='Solo Parent') {
    // Insert into SoloParent table
    const stmt3 = db.prepare(`INSERT INTO SoloParent (SpCategory, PersonalInfo_ID) VALUES (?,?)`);
    stmt3.run(parseInt(formData['Solo Parent Category']),lastInsertedId);
    stmt3.finalize();
  } else if (formData['Clientele Category']==='Senior Citizen') {
    // Insert into SeniorCitizen table
    const stmt4 = db.prepare(`INSERT INTO SeniorCitizen (LivingCondition, HealthCondition, PersonalInfo_ID) VALUES (?, ?, ?)`);
    stmt4.run(formData['SC Living Condition'], formData['SC Health Condition'],lastInsertedId);
    stmt4.finalize();
  } else if (formData['Clientele Category']==='Out of School Youth') {
    // Insert into Osy table
    const stmt5 = db.prepare(`INSERT INTO Osy (ReasonsNotAttendingSchool, SkillsAcquired, SkillsWanted, EconomicCondition, WillingToSchool, SchoolType, PersonalInfo_ID) VALUES (?, ?, ?, ?, ?, ?,?)`);
    stmt5.run(formData['OSY Reasons Not Attending School'], formData['OSY Skills Acquired'], formData['OSY Skills Wanted'], formData['Economic Condition'], formData['OSY Willing to School'], formData['OSY School Type'],lastInsertedId);
    stmt5.finalize();
  } else if (formData['Clientele Category']==='Person with Disability') {
    // Insert into Pwd table
    const stmt6 = db.prepare(`INSERT INTO Pwd (DisabilityType, PersonalInfo_ID) VALUES (?,?)`);
    stmt6.run(formData['Disability Type']),lastInsertedId;
    stmt6.finalize();
  } else if (formData['Clientele Category']==='Women in Difficult Circumstances') {
    // Insert into Wdc table
    const stmt7 = db.prepare(`INSERT INTO Wdc (LivingCondition, SkillsAcquired, SkillsWanted,PersonalInfo_ID) VALUES (?, ?, ?, ?)`);
    stmt7.run(formData['WDC Living Condition'], formData['WDC Skills Acquired'], formData['WDC Skills Wanted'],lastInsertedId);
    stmt7.finalize();
  } else if (formData['Clientele Category']==='Teenage Pregnant/Mother') {
    // Insert into Tpm table
    const stmt8 = db.prepare(`INSERT INTO Tpm (LivingCondition, SkillsAcquired, SkillsWanted, WillingToSchool, SchoolType, PersonalInfo_ID) VALUES (?, ?, ?, ?, ?, ?)`);
    stmt8.run(formData['TPM Living Condition'], formData['TPM Skills Acquired'], formData['TPM Skills Wanted'], formData['TPM Willing to School'], formData['TPM School Type'],lastInsertedId);
    stmt8.finalize();
  }

      // Insert into FamilyComposition table
      const stmt9 = db.prepare(`INSERT INTO FamilyComposition 
          (PersonalInfo_ID, Name, Relationship, Age, Birthday, Educational_Attainment, Occupation, Monthly_Income)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

          stmt9.run(lastInsertedId, formData['famname'], formData['famrelation'], formData['famage'], formData['fambirthday'], formData['fameducation'], formData['famoccupation'], formData['famincome']);
          stmt9.run(lastInsertedId, formData['famname2'], formData['famrelation2'], formData['famage2'], formData['fambirthday2'], formData['fameducation2'], formData['famoccupation2'], formData['famincome2']);
          stmt9.run(lastInsertedId, formData['famname3'], formData['famrelation3'], formData['famage3'], formData['fambirthday3'], formData['fameducation3'], formData['famoccupation3'], formData['famincome3']);
          stmt9.run(lastInsertedId, formData['famname4'], formData['famrelation4'], formData['famage4'], formData['fambirthday4'], formData['fameducation4'], formData['famoccupation4'], formData['famincome4']);
          stmt9.run(lastInsertedId, formData['famname5'], formData['famrelation5'], formData['famage5'], formData['fambirthday5'], formData['fameducation5'], formData['famoccupation5'], formData['famincome5']);

      // // Assume formData['Family Composition'] is an array of family member objects
      // formData['Family Composition'].forEach(familyMember => {
      //   stmt9.run(
      //     lastInsertedId, // Use the last inserted row ID as PersonalInfo_ID
      //     familyMember['famName'],
      //     familyMember['Relationship'],
      //     parseInt(familyMember['Age']),
      //     familyMember['Birthday'],
      //     familyMember['fam Educational Attainment'],
      //     familyMember['fam Occupation'],
      //     parseFloat(familyMember['fam Monthly Income'])
      //   );
      // });

      stmt9.finalize();
  }
  );

  // Finalize the statement
  stmt.finalize();

  // Retrieve the last inserted row ID (PersonalInfo_ID)

  console.log('Form data saved to database');

  db.all(`
    SELECT * FROM PersonalInformation
  
  `, (err, rows) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Data from the database:', rows);
  });
  
  console.log('Form data saved to database');
}

app.on('ready', () => {
  //const db = createDatabase(); //uncomment this if you want to create a db
  db.run('PRAGMA foreign_keys = ON;', function(err) {
    if (err) {
      console.error(err.message);
    }
    console.log('Foreign key constraints enabled.');
  });
  // Handle form data saving
  ipcMain.on('save-data', (event, formData) => {
      saveFormData(db, formData);
  });

});

app.whenReady().then(createWindow);