document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Prevent the form from submitting normally
    event.preventDefault();
  
    // Get the username and password values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    var expectedUsername = 'malitbog';
    var expectedPassword = 'MswdoMalitbog2024'; // Replace with your actual generated password
  
    // Check if the entered username and password match the expected values
    if (username === expectedUsername && password === expectedPassword) {
        window.location.href = 'list.html';
    } else {
        var errorMessage = document.getElementById('errorMessage');
        errorMessage.textContent = 'Error: Invalid username or password.';
        errorMessage.classList.remove('d-none');
    }
    
  });

