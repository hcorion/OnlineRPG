//Log In Data
var username;
var password;
var accountIndex;

//Used to store all the locations titles.
var locationTitle = new Array();
var locationDesc = new Array();
var locationImage = new Array();

//Parsing the userdata .json file located in the root directory.
var mydata = JSON.parse(userdata);

//Preparing the XML file for easier parsing
var TextData;
$.ajax({
    url: 'TextData.xml',
    async: false,
    dataType: "xml",
    success: function (xml) {
        $(xml).find('main').each(function () {
            TextData = $(this);
        });
    }
});
//Loading the location data and parsing it into arrays.
$(TextData).find("locations").each(function () {
        $(this).find("location").each(function () {

            locationTitle.push($("name", this).text());
            locationDesc.push($("startingTitle", this).text());
            locationImage.push($("Image", this).text());
        });
    });
//Called by LogIn() after successful log in.
function initWorld() {
    
    var spawnTown;
    $(TextData).find("data").each(function (){
        $(this).find("spawnTown").each(function (){
            spawnTown = ($("name", this).text());
        });
    });
    
    
    //Get the starting location and load it.
    var CorrectIndex;
    for (i = 0; i < locationTitle.length; i++) {
        if (locationTitle[i] == spawnTown) {
            CorrectIndex = i;
            LoadLocation(locationTitle[i]);
            
        }
    }
}

//Called after you click a link
function LoadLocation(location) {
    //Preparing things
    var DescLocationName = new Array();
    var DescLocationTitleName = new Array();
    var placesToGoText = " ";
    
    var DescPeopleName = new Array();
    var DescPeopleTitleName = new Array();
    var peopleToSeeText = " ";
    //Querying the database to load the Description and Image.
    


    for (i = 0; i < locationTitle.length; i++) {
        //For making sure were going to a valid location.
        if (locationTitle[i] == location) {
            $(TextData).find("locations").each(function () {
                $(this).find("location").each(function () {
                    if (locationTitle[i] == $('name', this).text()) {
                        $(this).find("toLocations").each(function () {
                            $(this).find("toLocation").each(function () {
                                DescLocationName.push($('displayName', this).text());
                                DescLocationTitleName.push($('titleName', this).text());
                            });
                        });
                    $(this).find("people").each(function () {
                            $(this).find("person").each(function () {
                                DescPeopleName.push($('displayName', this).text());
                                DescPeopleTitleName.push($('titleName', this).text());
                            });
                        });
                    }
                });
            });
            //Assembling the placesToGoText
            for (p = 0; p < DescLocationName.length; p++) {
                placesToGoText += '<a onclick="LoadLocation(' + "'" + DescLocationTitleName[p] + "'" + ');" href="#">' + DescLocationName[p] + '</a><br />';
            }
            //Assembling the peopleToSeeText
            for (p = 0; p < DescPeopleName.length; p++) { //WARNING! this text was copied over and needs to be editited before it is usable.
                peopleToSeeText += '<a href=\"#\" onclick=\"LoadXML(\'character\', \'' + DescPeopleTitleName[p] + '\');\">' + DescPeopleName[p] + '</a><br />';
                //peopleToSeeText += '<a href="#" onclick="LoadXML("character", "Fredrick A. Quackenboss");"> Fredrick A. Quackenboss </a><br />';
            }
            //alert(peopleToSeeText);
            //Setting the description of the location.
            document.getElementById("description").innerHTML = "<p>" + locationDesc[i].replace("{username}", username) + "</p><br />" +
                "<h5>Places To Go</h5><p>" + placesToGoText + "</p><br />" + 
                "<h5>People To See</h5>" + peopleToSeeText + "";
            //Setting the Title and image.
            document.getElementById("location").innerHTML = locationTitle[i];
            document.getElementById("preview").src = "./Images/Locations/" + locationImage[i];
            return 0;   
        }
    }
    alert("Uh oh! We don't have that location in our database!");
}

function LoadXML(xmlType, dataname) {
	if(typeof xmlType != "string")
	{alert("Hmm. your trying to load an xmltype that is not a string, it's a: " + typeof xmlType);}
	else
	{
		if (xmlType == "character") {
			var character;
                        var fileName;
			//for (i = 0, )
			$(TextData).find("characters").each(function (){
				$(this).find("character").each(function (){
					character = ($("titleName", this).text());
                                        if (character == dataname)
                                        {
                                            fileName = ($("dialogueFile", this).text());
                                            alert("Looks like  " + character + " has a dialogue file of " + fileName);
                                            //Load the dialogue XML file.
                                            var dialogueXML;
                                            var displayName;
                                            var startingDialogue;
                                            $.ajax({
                                                url: './xml/dialogue/' + fileName,
                                                async: false,
                                                dataType: "xml",
                                                success: function (xml) {
                                                    $(xml).find('main').each(function () {
                                                        dialogueXML = $(this);
                                                    });
                                                }
                                     
                                        });
                                            $(dialogueXML).find("data").each(function () {
                                                displayName = ($("displayName", this).text());
                                                startingDialogue = ($("startingDialogue", this).text());
                                                if (startingDialogue == "")
                                                {
                                                    alert("StartingDialogue doesn't have a value in " + fileName + ". Assuming initialMessage.");
                                                    startingDialogue = "initialMessage";
                                                }
                                                //Checking to see the character is hostile
                                                //because then we might need to fight him.
                                                if($("hostile", this).text() == "true"){
                                                    alert("Woops, hostile NPCs are not supported yet!");
                                                }
                                                else if ($("hostile", this).text() == "false") {
                                                    //Do anything specific with non-hostile NPCs
                                                }
                                                else ("Uh Oh. " + displayName + " doesn't appear to have a hostile value, or it is not true or false.")
                                            });
                                            var message;
                                            var responsesText;
                                            var toLocationsText;
                                            $(dialogueXML).find(startingDialogue).each(function () {
                                                $(this).find("message").each(function () {
                                                    message = ($("text", this).text());
                                                    alert(message);
                                                });
                                                $(this).find("lowerData").each(function () {
                                                    $(this).find("responses").each(function () {
                                                        $(this).find("response").each(function() {
                                                            
                                                        });
                                                    });
                                                });
                                            });
                                            //Now that we've got all the data we need, show it to the user.
                                            
                                            document.getElementById("description").innerHTML = "<p>" + message.replace("{username}", username).replace('\\n', "<br />") + "</p><br />" +
                "<h5>Responses</h5><p>" + displayName + "</p><br />" + 
                "<h5>Leave conversation</h5>" + displayName + "";
                                        }
				});
			});
		}
                else if (xmlType == "dialogue")
                {
                    
                }
		else {alert("A XML of type, " + xmlType + ", is not a valid XML to load.");}
	}
}

//Called after you press the Log In Button
function LogIn() {
    for (i = 0, len = mydata.length; i < len; i++) {
        if (document.getElementById('uname').value == mydata[i].username && document
            .getElementById('pswrd').value == mydata[i].password) {
            username = mydata[i].username;
            password = mydata[i].pswrd;
            accountIndex = i;
            initWorld();
            break;
        }
    }
}
