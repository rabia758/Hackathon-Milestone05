var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareablaLinkContainer = document.getElementById('shareable-link-container');
var sharableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
//handle form submission;
form.addEventListener('submit', function (event) {
    event.preventDefault();
    //collect input veriable
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    //save form data in localstorage as with the usename as the key.
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); //save the data locally.
    //generate the resume content dynamically 
    var resumeHTML = "\n    <h2><b>Editable Resume</b></h2>\n    <h3>Personal Information</h3>\n    <p><b>Name:</b><span contenteditable = \"true\">".concat(name, "</span></p>\n    <p><b>Email:</b><span contenteditable = \"true\">").concat(email, "</span></p>\n    <p><b>Phone:</b><span contenteditable = \"true\">").concat(phone, "</span></p>\n\n    <h3>Education</h3>\n    <p contenteditable = \"true\">").concat(education, "</p>\n\n    <h3>Experience</h3>\n    <p contenteditable = \"true\">").concat(experience, "</p>\n\n    <h3>Skills</h3>\n    <p contenteditable = \"true\">").concat(skills, "</p>\n    ");
    //Display genrated Resume
    resumeDisplayElement.innerHTML = resumeHTML;
    //generate the shareable URL with the username only.
    var sharableURL = "".concat(window.location.origin, "?username = ").concat(encodeURIComponent(username));
    //dislay the sharable link
    shareablaLinkContainer.style.display = 'block';
    sharableLinkElement.href = sharableURL;
    sharableLinkElement.textContent = sharableURL;
});
//handle pdf download
downloadPdfButton.addEventListener('click', function () {
    window.print(); //this will open the print dialog and allow the user to save as pdf
});
//prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get('username');
    if (username) {
        //autofill form id data is found in local storage
        var saveResumeData = localStorage.getItem(username);
        if (saveResumeData) {
            var resumeData = JSON.parse(saveResumeData);
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
        }
    }
});
