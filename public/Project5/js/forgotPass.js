var emailForgot, sendBtn;

window.onload = function() {

  emailForgot = document.getElementById('forgotEmail');
  sendBtn = document.getElementById('forgot-submit');

  if (sendBtn) {
    sendBtn.addEventListener('click', resetPass);
  }

};


function resetPass() {
  const emailAddress = emailForgot.value;

  console.log(emailAddress);

  if (!emailAddress) {
    document.getElementById('PassFailMsg').style.visibility = "visible";
    return console.log('Valid Email Required.');
  }
  else {
    document.getElementById('PassFailMsg').style.visibility = "hidden";
  }
  firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
    alert("Password reset email sent!")
  }, function(error) {
    alert("Error sending password reset email. Please make sure email is valid and try again!")
  });
}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAupx69r_nEJqhkmzUAelKgZhPoguFrbXY",
  authDomain: "cse134b-team-alpha.firebaseapp.com",
  databaseURL: "https://cse134b-team-alpha.firebaseio.com",
  storageBucket: "cse134b-team-alpha.appspot.com",
  messagingSenderId: "730498444325"
};
firebase.initializeApp(config);
