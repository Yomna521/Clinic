// ajax to request saving form data into database and read the response
$(document).ready(function() {
	$('#submit').on('click', function(e) {
		e.preventDefault();
    values = validateInfo();
		if(values != ''){
			var aj = $.ajax({
				url: "book.php",
				type: "POST",
				data: values,
				cache: false})
				.done( function(dataResult){
          
          try {
            var dataResult = JSON.parse(dataResult);
                } 
          catch (e) {
            console.error('Could not parse JSON!');
                }
					
					if(dataResult.ok){
            alert(dataResult.messages);	
            $( '.form' ).each(function(){
            this.reset();
});	
					}
					else {
					   alert(dataResult.messages);
					}
					
				})
        .fail (function(){
           alert("Error");
          })
      
    }
	});
});

// function for validating form values

function checkItem(item,pattern){
  var val = item;
  return pattern.test(val);
}

// check if date is atleast two days from today

function checkDate(item){
  var val = Date.parse(item);
  var tomtom = new Date();
  tomtom.setDate(tomtom.getDate()+2);
  if(val >= tomtom){
    return true;
  }
  else false;
}

function validateInfo(){
  var ul = document.getElementById("form-errors");
  
  var queryString = $('.form').serializeArray();
  $('#form-errors').empty();
  var values= {};
  var ok = true;
  //read input values into a dictionary and if any value is missing halt and return false
  jQuery.each( queryString, function( i, field ) {
    values[field.name] = field.value;
    if(field.value == ""){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Please fill all fields"));
      ul.appendChild(li);
      ok = false;
      return ok;
    }
  });

  var name = values['fname'] + " " + values['lname'];

  //check if each field doesn't contain gibberish
  if(ok){
    if(!checkItem(name,/^[a-zA-Z-' ]*$/)){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Invalid Name!"));
      ul.appendChild(li);
      ok = false;
    }
    if(!checkItem(values["phone"],/[01]{2}[0-2|5][0-9]{8}$/)){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Invalid Phone Number!"));
      ul.appendChild(li);
      ok = false;
    }
    if(!checkItem(values["age"],/^\S[0-9]{0,2}$/)){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Invalid Age!"));
      ul.appendChild(li);
      ok = false;
    }
    if(!checkItem(values["email"],/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ )){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Invalid Email!"));
      ul.appendChild(li);

      ok = false;
    }
    if(!checkDate(values["date"])){
      var li = document.createElement("li");
      li.appendChild(document.createTextNode("Invalid Date!"));
      ul.appendChild(li);
      ok = false;
    }
}
// if inputs are valid return the values dictionary else return a blank string
  if(ok)  return values;
  return '';
  }