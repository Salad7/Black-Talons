function requestAnalysis(){
  isCustomerExist(document.getElementById("search").value,document.getElementById("company").value)
}
function isCustomerExist(f,l){
  var isFound = false
firebase.database().ref('/Users/').once('value').then(function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
  var childKey = childSnapshot.key;
  var childData = childSnapshot.val();
  console.log(f+l)
  console.log(childData["fname"]+childData["lName"])
  if((f+l) == childData["fname"]+childData["lName"]){
    console.log("Found match")
    isFound = true
    localStorage['first'] = f// only strings
    localStorage['last'] = l
    //Forward to Account
    window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/account.html';
  }
  // ...
});
// ...
});
if(isFound == false){
  window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/register.html';

}
}
function register(){
  var fName = document.getElementById('fname_reg').value
  var lName = document.getElementById('lname_reg').value;
  var email = document.getElementById('email_reg').value;
  var phone = document.getElementById('phone_reg').value;
  var address = document.getElementById('address_reg').value
  var city = document.getElementById('city_reg').value;
  var state = document.getElementById('state_reg').value;
  var zip = document.getElementById('zip_reg').value;
  var database = firebase.database();
  user = {
    fname: fName,
    lName: lName,
    email: email,
    phone: phone,
    address: address,
    city: city,
    state: state,
    zip: zip
  }
  firebase.database().ref().child('Users').push(user).key;
  localStorage['first'] = fName// only strings
  localStorage['last'] = lName
  window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/account.html';


}

function loadAccount(){
  console.log("ok")
  firebase.database().ref('/Users/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var data = childSnapshot.val();
    // console.log(data)
    console.log(data["fname"]+data["lName"])
    console.log(localStorage['first']+localStorage['last'])
    if(data["fname"]+data["lName"] == localStorage['first']+localStorage['last']){
    document.getElementById('fname_reg').value = data["fname"]
    document.getElementById('lname_reg').value = data["lName"]
    document.getElementById('email_reg').value = data["email"]
    document.getElementById('phone_reg').value = data["phone"]
    document.getElementById('address_reg').value = data["address"]
    document.getElementById('city_reg').value = data["city"]
   document.getElementById('state_reg').value = data["state"]
    document.getElementById('zip_reg').value = data["zip"]
  }
    // ...
  });
  // ...
});
loadNotes()
}

function submit(){
  first = document.getElementById("first").value
  last = document.getElementById("last").value
  date = document.getElementById("date").value
  notes = document.getElementById("notes").value
  health = document.getElementById("health").value
  //find name, update
  firebase.database().ref('/Users/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if("MohamedSalad" == childData["fname"]+childData["lName"]){
      console.log("Found match")
      isFound = true
      localStorage['first'] = childData["fname"]// only strings
      localStorage['last'] = childData["lName"]
      //Forward to Account
      note = {
        first: first,
        last: last,
        date: date,
        notes: notes,
        health: health
      }
      firebase.database().ref('/Users/').child(childKey).child('notes').push(note).key;
      window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/account.html';


    }
    // ...
  });
  // ...
  });
}

function loadNotes(){
  firebase.database().ref('/Users/').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData["notes"])

    firebase.database().ref('/Users/'+childKey+'/notes/').once('value').then(function(noteSnap) {
      noteSnap.forEach(function(noose) {
      var ck = noose.key;
      var cd = noose.val();
      console.log(cd)
      addToTable(cd)
      })
})

    // ...
  });
  // ...
  });




}

function addToTable(data){
  console.log(data)
  var div = document.createElement('div');
  div.innerHTML =
          '<div class="card" style="width:800px;margin:auto;display:block;margin-top:32px">\
            <header class="card-header">\
              <p class="card-header-title">\
                Notes from '+data["date"]+' - '+data["health"]+'\
              </p>\
            </header>\
            <div class="card-content">\
              <div class="content"> '+data["notes"]+'\
              </div>\
            </div>\
            <footer class="card-footer">\
              <a href="#" class="card-footer-item">Edit</a>\
              <a href="#" class="card-footer-item">Delete</a>\
            </footer>\
          </div>'
  document.getElementById('table').appendChild(div);
}

function addNote(){
  window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/addapointment.html';

}
function redirectAccount(){
  window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/account.html';

}

function redirectHome(){
  window.location.href = 'file:///Users/mohamedsalad/Documents/Github/BlackTalons/BlackTalons/Web/index.html';

}

// Came in for physical, no signs. next appointment for tetnus shot
