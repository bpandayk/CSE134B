var emailLogin, passLogin, signInButton, googSignInBtn;
var userReg, passReg1, passReg2, emailReg, signUpBtn;

window.onload = function() {

  //Elements for email sign-in
  emailLogin = document.getElementById('userEmail');
  passLogin = document.getElementById('passEmail');
  signInButton = document.getElementById('signInBtn');
  googSignInBtn = document.getElementById('signInGoogBtn');

  //Elements for registering new account
  userReg = document.getElementById('user');
  passReg1 = document.getElementById('pass1');
  passReg2 = document.getElementById('pass2');
  emailReg = document.getElementById('emailReg');
  signUpBtn = document.getElementById('signUpBtn');

  if (signInButton) {
    signInButton.addEventListener('click', signIn);
  }

  if (signUpBtn) {
    signUpBtn.addEventListener('click', signUp);
  }

  if (googSignInBtn) {
    googSignInBtn.addEventListener('click', signInGoog);
  }

};

function signIn() {
  const email = emailLogin.value;
  const pass = passLogin.value;

  console.log(email);

  if (!email || !pass) {
    return console.log('Email and password required for login.');
  }

  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Sign-In Error', error);
  });
}

function signUp() {
  const regEmail = emailReg.value;
  const regPass = passReg1.value;
  const regPassCheck = passReg2.value;
  const regUsername = userReg.value;

  if (regPass != regPassCheck) {
    return console.log('Passwords do not match.');
  }

  firebase.auth().createUserWithEmailAndPassword(regEmail, regPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Sign-Up Error', error);
    // ...
  });
}

function signInGoog() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  return firebase.auth().signInWithPopup(provider).catch(function(error) {
    console.log('Error signing in with Google.', error);
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

firebase.auth().onAuthStateChanged(function(firebaseUser) {
  if (firebaseUser) {
    console.log('User', firebaseUser);
    window.location.href="addmovie.html";
  }
  else {
    console.log('User not logged in.');
  }
});
