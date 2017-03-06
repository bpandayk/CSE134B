document.onload = function() {

  //Elements for email sign-in
  const emailLogin = document.getElementById('userEmail');
  const passLogin = document.getElementById('passEmail');
  const signInButton = document.getElementById('signInBtn');
  const googSignInBtn = document.getElementbyId('signInGoogBtn');

  //Elements for registering new account
  const userReg = document.getElementById('user');
  const passReg1 = document.getElementById('pass1');
  const passReg2 = document.getElementById('pass2');
  const emailReg = document.getElementById('emailReg');
  const signUpBtn = document.getElementById('signUpBtn');

  if (signInButton) {
    signInButton.addEventListener('click', signIn);
  }

  if (signUpBtn) {
    signUpBtn.addEventListener('click', signUp);
  }

}

function signIn() {
  const email = emailLogin.value;
  const pass = passLogin.value;

  console.log('WTFFFFFFFF');

  if (!email || !pass) {
    return console.log('Email and password required for login.');
  }

  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Sign-In Error', error);
    // ...
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

  return firebase.auth().signInWithPopop(provider).catch(function(error) {
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
  }
  else {
    console.log('User not logged in.');
  }
});
