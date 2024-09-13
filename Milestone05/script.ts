const form = document.getElementById ('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById ('resume-display') as HTMLDivElement;
const shareablaLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const sharableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

//handle form submission;
form.addEventListener('submit',(event:Event) => {
    event.preventDefault();

    //collect input veriable
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById ('name') as HTMLInputElement ).value;
    const email = (document.getElementById ('email') as HTMLInputElement ).value;
    const phone = (document.getElementById ('phone') as HTMLInputElement ).value;
    const education = (document.getElementById ('education') as HTMLInputElement ).value;
    const experience = (document.getElementById ('experience') as HTMLInputElement ).value;
    const skills = (document.getElementById ('skills') as HTMLInputElement ).value;

    //save form data in localstorage as with the usename as the key.
    const resumeData ={
        name,
        email,
        phone,
        education,
        experience,
        skills
    };
    localStorage.setItem(username,JSON.stringify(resumeData)); //save the data locally.

    //generate the resume content dynamically 
    const resumeHTML = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Information</h3>
    <p><b>Name:</b><span contenteditable = "true">${name}</span></p>
    <p><b>Email:</b><span contenteditable = "true">${email}</span></p>
    <p><b>Phone:</b><span contenteditable = "true">${phone}</span></p>

    <h3>Education</h3>
    <p contenteditable = "true">${education}</p>

    <h3>Experience</h3>
    <p contenteditable = "true">${experience}</p>

    <h3>Skills</h3>
    <p contenteditable = "true">${skills}</p>
    `;
    //Display genrated Resume
    
     resumeDisplayElement.innerHTML = resumeHTML;

     //generate the shareable URL with the username only.
     const sharableURL =`${window.location.origin}?username = ${encodeURIComponent(username)}`;

     //dislay the sharable link
     shareablaLinkContainer.style.display = 'block';
     sharableLinkElement.href = sharableURL;
     sharableLinkElement.textContent =sharableURL;
});
//handle pdf download
downloadPdfButton.addEventListener('click', ()=>{
    window.print(); //this will open the print dialog and allow the user to save as pdf
});
//prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded' ,() => {
    const urlparams = new URLSearchParams(window.location.search);
    const username = urlparams.get('username');

    if(username){
        //autofill form id data is found in local storage
        const saveResumeData = localStorage.getItem(username);

        if(saveResumeData){
            const resumeData = JSON.parse(saveResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;
        }
    }
});


