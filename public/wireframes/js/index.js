var emailLogin, passLogin, signInButton, googSignInBtn;
var userReg, passReg1, passReg2, emailReg, signUpBtn;
var user;

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
    document.getElementById('signInFailMsg').style.visibility = "visible";
    return console.log('Email and password required for login.');
  }
  else {
    document.getElementById('signInFailMsg').style.visibility = "hidden";
  }

  firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('Sign-In Error', error);
    document.getElementById('signInFailMsg').style.visibility = "visible";
  });
}

function signUp() {
  const regEmail = emailReg.value;
  const regPass = passReg1.value;
  const regPassCheck = passReg2.value;
  const regName = userReg.value;

  if (regPass != regPassCheck) {
    return console.log('Passwords do not match.');
  }

  firebase.auth().createUserWithEmailAndPassword(regEmail, regPass).then(function(result) {
    // The signed-in user info.
    user = result.user;
    document.getElementById('signUpFailMsg').style.visibility = "hidden";
    user.updateProfile({ displayName: regName }).then(function() {
        window.location.href="addmovie.html";      // Update successful.
    }, function(error) {
      // An error happened.
      console.log('Error updating display name.', error);
    });
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('signUpFailMsg').style.visibility = "visible";
    return console.log('Sign-Up Error', error);
    // ...
  });
}

function signInGoog() {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  user = result.user;
  // ...
  }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  console.log("Error signing in with Google.", error);
  document.getElementById('signInFailMsg').style.visibility = "visible";
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
