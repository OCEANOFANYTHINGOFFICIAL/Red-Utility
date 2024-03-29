// Function to handle form submission
function submitForm() {
    var form = document.getElementById('contactForm');
    
    // Set the form target to the iframe
    form.target = 'hidden_iframe';
    
    // Submit the form
    form.submit();

    // Show the form submission message
    document.getElementById('formSubmited').classList.remove('d-none');
    
    // reset the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
    
    // Prevent the default form submission behavior
    return false;
}

  // Attach the submitForm function to the form submit event
document.getElementById('contactForm').addEventListener('submit', submitForm);
