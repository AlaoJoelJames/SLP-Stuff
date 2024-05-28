document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();
  
    // Get the username and password values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var expectedUsername = 'Malitbog';
    var expectedPassword = 'password'; // Replace with your actual generated password
  
    // Check if the entered username and password match the expected values
    if (username === expectedUsername && password === expectedPassword) {
        window.location.href = 'document.html';
    } else {
      alert('Error: Invalid username or password.');
    }
    
  });

