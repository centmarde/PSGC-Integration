const login = document.getElementById("login_form");

login.onsubmit = async (e) => {
    e.preventDefault();

    const submitButton = document.querySelector("#login_form button");
    submitButton.disabled = true;
    submitButton.innerHTML = `<div class="spinner-border spinner-border-sm me-2" role="status"></div><span>Loading...</span>`;

   
    setTimeout(() => {
        alert("Work in Progress Click the Sign-up button to proceed");
        
       
        login.reset();
        submitButton.disabled = false;
        submitButton.innerHTML = "Log-in";
    },1500); 
};
