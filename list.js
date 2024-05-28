// String template for a single row
const rowTemplate = `
<a href="#">
    <tr>
        <td>MORITCHO</td>
        <td>Carlos</td>
        <td>Every night</td>
        <td>09951656425</td>
        <td>daddy@gmail.com</td>
        <td>Married</td>
        <td>Billionaire</td>
        <td>High School</td>
        <td>Islam</td>
        <td>150,000</td>
        <td>
          <button class="btn btn-info">Info</button>
        </td>
        <td>
          <button class="btn btn-danger">Delete</button>
        </td>
    </tr>
</a>
`;

// Repeat the row template 5 times
let rows = '';
for (let i = 0; i < 25; i++) {
rows += rowTemplate;
}

// Insert the rows into the table body
document.getElementById('tableArea').innerHTML = rows;




document.getElementById('addRecord').addEventListener('submit', function(event) {
event.preventDefault(); // Prevent the default form submission
window.location.href = 'submit-form.html'; // Redirect to submit-form.html
});