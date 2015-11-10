  //Log In Data
  var username;
  var password;
  var accountIndex;
  //Parsing the userdata .json file located in the root directory.
  var mydata = JSON.parse(userdata);
  
  //reading the data XML file using Jquery
  var name;
$.ajax({
  url: 'TextData.xml',
  async : false,
  dataType: "xml",
  success: function(xml) {
			$(xml).find('main').each(function()
			{
                $(this).find("data").each(function()
				{
					$(this).find("spawnTown").each(function()
					{
						name = $(this).text();
						alert(name);
					});
				});
			});
		}
	});
	var DaXML;
	$.ajax({
	url: 'TextData.xml',
	async : false,
	dataType: "xml",
	success: function(xml) 
	{
		$(xml).find('main').each(function()
		{
			DaXML = $(this);
		});
	}
	});
  //Called by LogIn() after successful log in.
  function initWorld()
  {
	document.getElementById("description").innerHTML = "Welcome to OnlineRPG, " + username + "! It's currently still in development.";
	document.getElementById("location").innerHTML = "Home Page";
	document.getElementById("location").innerHTML = name;
	
	//Get world startingTitle
	var desc;
	$(DaXML).find("locations").each(function(){$(this).find("location").each(function(){$(this).find("startingTitle").each(function(){desc = $(this).text();});});});
	document.getElementById("description").innerHTML = desc.replace("{username}", username);
	var image;
	$(DaXML).find("locations").each(function(){$(this).find("location").each(function(){$(this).find("Image").each(function(){image = $(this).text();});});});
	document.getElementById("preview").src="./Images/Locations/" + image;
  }
  
  //Called after you press the Log In Button
  function LogIn() {
	for (i = 0, len = mydata.length; i < len; i++)
	{
		if (document.getElementById('uname').value == mydata[i].username && document.getElementById('pswrd').value == mydata[i].password)
		{
			username = mydata[i].username;
			password = mydata[i].pswrd;
			accountIndex = i;
			initWorld();
			break;
		}
	}
  }