var express = require("express");
var app = express();
var moment = require('moment');

//dates with these formats could be parsed correctly
var formats = ["MMMM DD YYYY", "MMMM YYYY DD", "YYYY DD MMMM", "YYYY MMMM DD", "DD YYYY MMMM", "DD MMMM YYYY",
					"MM-DD-YYYY", "YYYY-MM-DD","MM DD YYYY", "YYYY MM DD"];

//app config
app.set("view engine", "ejs");

app.get("/", function(request, response){
	response.render("index");
});

app.get("/:date", function(request, response){	

	var dateParam = request.params.date;
	
	var date = null;

	if(!isNaN(dateParam)){
		//dateParam was a number
		date = moment.unix(dateParam).utc();
	}else{				
		date = moment.utc(dateParam, formats);						
	}

	if(date.isValid()){
		//passed data was correct
		response.json({unix: +date.format("X"), natural: date.format("MMMM D, YYYY")});	
	}else{
		//passed data was incorrect
		response.json({unix: null, natural: null});	
	}	
});

//if Process env port is not defined - set 5000 as a port
app.set("port", process.env.PORT||5000);

app.listen(app.get("port"), function(){
	console.log("Server started");
})