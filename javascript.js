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
                PeopleToSeeText += '<a onclick="LoadLocation(' + "'" + DescLocationTitleName[p] + "'" + ');" href="#">' + DescLocationName[p] + '</a><br />';
            }
            //Setting the description of the location.
            document.getElementById("description").innerHTML = "<p>" + locationDesc[i].replace("{username}", username) + "</p><br />" +
                "<h5>Places To Go</h5><p>" + placesToGoText + "</p>";
            //Setting the Title and image.
            document.getElementById("location").innerHTML = locationTitle[i];
            document.getElementById("preview").src = "./Images/Locations/" + locationImage[i];
            return 0;
        }
    }
    alert("Uh oh! We don't have that location in our database!");
}

function loadXML(xmlType) {
	if(typeof xmlType != "string")
	{alert("Hmm. your trying to load an xmltype that is not a string, it's a: " + typeof xmlType);}
	else
	{
		if (xmlType == "dialogue") {
			
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
