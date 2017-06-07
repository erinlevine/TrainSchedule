var config = {
    apiKey: "AIzaSyCzn78NKDPBKEMeEpFnpPFRDZnBF1MGcuA",
    authDomain: "trainschedule-b8ac1.firebaseapp.com",
    databaseURL: "https://trainschedule-b8ac1.firebaseio.com",
    projectId: "trainschedule-b8ac1",
    storageBucket: "trainschedule-b8ac1.appspot.com",
    messagingSenderId: "539883479478"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

//When the submit button is clicked, we will run the snapshot function below.
$("#click-button").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();

      // Grabs user input
	  var trainNameForm = $("#trainNameForm").val().trim();
	  var destinationForm = $("#destinationForm").val().trim();
		
//	  var firstTrainTimeForm = moment($("#trainTimeForm").val().trim().format('HHmm'));
//	  var frequencyForm = $("#frequencyForm").val().trim().format("mm");

	  // Creates local "temporary" object for holding inputs
	  var newTrain = {
		train: trainNameForm,
		destination: destinationForm,
//		first: firstTrainTimeForm,
//		frequency: frequencyForm
    };
	//Setting the new values in the database
	database.ref().push(newTrain);
	
	//Console.logging to make sure the new data has been stored to the database
	console.log(newTrain.train);
  	console.log(newTrain.destination);
	
	//Clearing the inputs
	 $("#trainNameForm").val("");
  	 $("#destinationForm").val("");
});

//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());
	
  // Store everything into a variable.
  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
	
  console.log(trainName);
  console.log(trainDestination);
	
  //Adding into the table
  $("#trainScheduleTable > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td></tr>");
});