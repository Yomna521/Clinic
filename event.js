//Modal box for Contact us
var modalBox = document.getElementById("myModal");

document.getElementById("contact").onclick= contactinfo;
document.getElementById("close").onclick= closeModal;

function contactinfo(){
    modalBox.style.display = "block";
}

function closeModal() {
    modalBox.style.display = "none";
}

//drop down list for Services
var service = document.getElementById("service");
var myDropdown = document.getElementById("myDropdown");

service.onclick= dropdown;

function dropdown() {
    myDropdown.classList.toggle("show");
}

//if user clicks away close the pop up
window.onclick = function(event) {
    if (event.target == modalBox) {
        modalBox.style.display = "none";
    }

    if (!event.target == service) {
          if(myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
    }
} 


  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('#service')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }