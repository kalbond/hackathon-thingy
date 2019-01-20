(function(){
    
    require('./styles/styles.scss');
    var $ = require('jquery');
    require('jquery-validation');
    var fbDatabaseRef = firebase.database().ref();
    var addNewUserRef = fbDatabaseRef.push();
    $(document).ready(function(){
        getPageDimensions();
        onLoad();
    });

    function getPageDimensions(){
        let height = window.innerHeight;
        $('section.first').css('height', height);
    }

    function onLoad(){
        $('form.registration').on('submit', function(event){
            event.preventDefault();
            if($('.registration').valid()){
                writeUserData(
                    $('#first-name').val(),
                    $('#last-name').val(),
                    $('#age').val(),
                    $('#school').val(),
                    $('#email').val()
                )
                fbDatabaseRef.on('child_added', function(data) {
                    console.log("Added ", data)
                });
            }
        });  
    }

    function writeUserData(firstName, lastName, age, school, email) {
        addNewUserRef.set({
            firstName: firstName,
            lastName: lastName,
            age: age,
            school: school,
            email: email
        });
    }

})();