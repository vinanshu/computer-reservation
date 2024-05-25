// Function to validate the ID number length
function validateIDNumber(idNumber) {
    return idNumber.length === 10;
}

// Event listener for registration form submission
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the entered ID number
    var idNumber = document.getElementById("idNumber").value;

    // Validate the ID number length
    if (!validateIDNumber(idNumber)) {
        // ID number is invalid
        alert("Please enter a valid 10-character ID number.");
        return; // Exit the function early
    }

    // Get other registration form data
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var course = document.getElementById("course").value;
    var year = document.getElementById("year").value;
    var section = document.getElementById("section").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    // Construct an object to hold the account information
    var account = {
        idNumber: idNumber,
        firstName: firstName,
        lastName: lastName,
        course: course,
        year: year,
        section: section,
        phoneNumber: phoneNumber
    };

    // Retrieve existing accounts from localStorage
    var existingAccounts = JSON.parse(localStorage.getItem("registeredAccounts")) || [];

    // Add the new account to the array
    existingAccounts.push(account);

    // Save the updated array back to localStorage
    localStorage.setItem("registeredAccounts", JSON.stringify(existingAccounts));

    // Display alert indicating successful registration
    alert("Registration successful!");

    // Reset the form to clear all input fields
    document.getElementById("registerForm").reset();
});

// Event listener for login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the entered ID number for login
    var loginIDNumber = document.getElementById("loginIDNumber").value;

    // Retrieve saved account information from localStorage
    var savedAccountsJSON = localStorage.getItem("registeredAccounts");

    // Check if there are saved accounts
    if (savedAccountsJSON) {
        // Parse the saved account information
        var savedAccounts = JSON.parse(savedAccountsJSON);

        // Check if the entered ID number matches any saved ID number
        var matchedAccount = savedAccounts.find(function(account) {
            return account.idNumber === loginIDNumber;
        });

        if (matchedAccount) {
            // If the ID number matches, login is successful
            alert("Login successful!");
            // Redirect to homepage.html after 2 seconds
            setTimeout(function() {
                window.location.href = "homepage.html";
            }, 2000); // 2 seconds delay
        } else {
            // ID number doesn't match any saved account
            alert("Invalid ID number. Please try again.");
        }
    } else {
        // No accounts registered yet
        alert("No accounts registered. Please register first.");
    }
});
