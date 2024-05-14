/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const sqlite3 = require('sqlite3').verbose();

document.getElementById('documentForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  // Connect to SQLite database
  const db = new sqlite3.Database('./data.db');

  // Insert document data into the database
  db.run('INSERT INTO documents (title, content) VALUES (?, ?)', [title, content], function(err) {
    if (err) {
      return console.error('Error inserting document:', err.message);
    }
    console.log('Document inserted successfully');

    // Close database connection
    db.close();
  });
});