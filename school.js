function submitEntry(event) {
    event.preventDefault();
    console.log('submitEntry start');

    var username = document.getElementById('name').value;
    var usercontent = document.getElementById('content').value;

    if (username.trim() === "") {
        alert("Please enter some text.");
        return;
    }
    document.getElementById("name").value = "";
    document.getElementById("content").value = "";
    
    // إظهار رسالة النجاح
    const successMessage = document.getElementById("success-message");
    successMessage.style.display = "block";
    
    // إخفاء الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        successMessage.style.display = "none";
    }, 3000);

    // URL of your deployed Google Apps Script Web App (replace with your actual URL)
    var url = 'https://script.google.com/macros/s/AKfycbyYEjs1T-bflLAbxeb7czcll3013xDKwbqM3yHGkNUPIlB4h7COqSPX1YXsWuv6ObQl0A/exec';

    // Send the data to the Google Apps Script Web App via a POST request
    fetch(url, {
        method: 'POST',
        mode: "no-cors",
        body: new URLSearchParams({
            'content': usercontent ,
            'username': username
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(response => response.text())
    .then(data => {
        console.log('Response:' + data);
        
        document.getElementById('responseMessage').innerText = "Your entry was submitted!";
    })
    .catch(error => {
        document.getElementById('responseMessage').innerText = ".";
        console.error('Error:', error);
    });
}  