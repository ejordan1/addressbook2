var AddressBook = function(){
  contacts = [],
  idCounter = 0
}

var Contact = function(firstName, lastName, homePhone, cellPhone, emailAddress, physicalAddress){
  this.firstName = firstName,
  this.lastName = lastName,
  this.homePhone = homePhone,
  this.cellPhone = cellPhone,
  this.emailAddress = emailAddress,
  this.physicalAddress = physicalAddress
}


var Address = function(address1, address2){
  this.address1 = address1,
  this.address2 = address2
}

// var Address = function(houseNumber, streetName, cityName, zipCode, stateName){
//   this.houseNumber = houseNumber,
//   this.streetName = streetName,
//   this.cityName = cityName,
//   this.zipCode = zipCode,
//   this.stateName = stateName
// }



Contact.prototype.printInfo = function(){
  console.log(this.firstName, this.lastName, this.homePhone, this.cellPhone, this.emailAddress, this.physicalAddress);
}

Contact.prototype.fullName = function(){
  return (this.firstName + " " + this.lastName);
}

//takes in contact, adds to addressBook
AddressBook.prototype.addContact = function(contact){
  contacts.push(contact);
  contact.id = idCounter;
  idCounter ++;
}

AddressBook.prototype.printAddressBook = function(){
  contacts.forEach(function(contact) {
    contact.printInfo();
  });
}

AddressBook.prototype.deleteContact = function(id){
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].id === id) {
      delete contacts[i];
    }
  }
}

var myAddressBook = new AddressBook();

var e = new Contact("E", "A", "S", "S", "S", "S");
var g = new Contact("G", "1", "3", "4", "2", "2");
var h = new Contact("h", "2", "2", "2", "2", "2");


myAddressBook.addContact(e);
myAddressBook.addContact(g);
myAddressBook.addContact(h);
myAddressBook.printAddressBook();
console.log("deleting... e ");
myAddressBook.deleteContact(e);
myAddressBook.printAddressBook();

// to do: getcontactbyid


// Front end logic
$(document).ready(function(){

  var theAddressBook = new AddressBook();
  $("#contactForm").submit(function(event){


    var userInput = {
      firstName: $("#firstName").val(),
      lastName: $("#lastName").val(),
      homePhone: $("#homePhone").val(),
      cellPhone: $("#cellPhone").val(),
      emailAddress: $("#emailAddress").val(),
      physicalAddress: new Address ($("#address1").val(), $("#address2").val())
    }

    var newContact = new Contact(userInput.firstName, userInput.lastName, userInput.homePhone, userInput.cellPhone, userInput.emailAddress, userInput.physicalAddress);

    theAddressBook.addContact(newContact);
    //"<div class=\'col-md-12 card bg-success\'>" + "<div class=\'card-header\' id=\'header" + newContact.id + "\'>" +  newContact.fullName() + "</div>" + "</div>"

    $("#contactShow").append("<div class=\'col-md-12 card bg-success\' id=\'card" + newContact.id + "\'>" + "<div class=\'card-header\' id=\'header" + newContact.id + "\'>" +  newContact.fullName() + "</div>" + "<div class=\'card-body hide\' id=\'body" + newContact.id + "\'> <ul><li> Home Phone: " + newContact.homePhone + "</li><li> Cell Number: " + newContact.cellPhone + "</li><li>Email Address: " + newContact.emailAddress + "</li><li>Address: " + newContact.physicalAddress + "</li></ul><button type=\'button\' name=\'deleteContact\' id=\'" + newContact.id + "\'>Remove Contact</button></div></div>");

    $("#header" + newContact.id).click(function(){
      $("#body" + newContact.id).slideToggle();
    });

    $("#" + newContact.id).click(function(){
      theAddressBook.deleteContact(this.id);
      $("#card" + newContact.id).slideToggle();


    });

    // $("#contactShow").append("<ul>"  + newContact.fullName() + "</ul>");
    emptyInputs();



    event.preventDefault();
  });
});

function emptyInputs(){
  document.getElementById('firstName').value = ''; //resets form field after user submit
  document.getElementById('lastName').value = '';
  document.getElementById('homePhone').value = '';
  document.getElementById('cellPhone').value = '';
  document.getElementById('emailAddress').value = '';
  document.getElementById('address1').value = '';
  document.getElementById('address2').value = '';
}

// FIX ADDRESS DISPLAY THAT IS A NESTED OBJECT
