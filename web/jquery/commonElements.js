// url = cabecera.html
function showHeader(url) {
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		dataType: "html",
		async: true,
		success: function (htmlText) {
			$("#intranetHeader").html(htmlText);
			showClock(); // Llamada a clock.js
			$("#txtBuscar").keyup(typeSearchInput);
			$("#txtBuscar").click(cleanSearchText);
			$("#imgBuscar").click(searchPage);
			showUser();
		}
	});
}


// url = pie.html
function showFooter(url) {
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		dataType: "html",
		async: true,
		success: function (htmlText) {
			$("#intranetFooter").html(htmlText);
			showYearFooter(); // Llamada a clock.js
		}
	});
}

function showUser()
{
	var url = "/common/code/current_user_info.aspx";
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		dataType: "json",
		async: true,
		success: showUserOnFinish
	});
}

function logoutUser() {
	var url = "/common/code/logout.aspx";
	$.ajax({
		type: "GET",
		url: url,
		cache: false,
		dataType: "text",
		async: true,
		success: logoutOnFinish
	});
}

/// Returned JSON is like this:
/// {
///     "userName": "username",
///     "domain": "JLF-ES",
///     "displayName": "UserName UserSurname",
///     "firstName": "UserName",
///     "secondName": "UserSurname",
///     "description": "User Occupation",
///     "office": "",
///     "telephoneNumber": "",
///     "email": "username@nemak.com",
///     "address": {
///         "street": "",
///         "city": "",
///         "province": "",
///         "postalCode": "",
///         "country": ""
///     },
///     "memberOf": [
///         "CN=...",
///         "CN=...",
///         "..."
///     },
///     "company": "JL French",
///     "department": "",
///     "title": ""
/// }

var showUserAttempts = 0;
var maxShowUserAttempts = 4;

function showUserOnFinish(jsonText)
{
	showUserAttempts++;
	var user = jsonText;
	if (user.displayName !== "") 
	{
		$("#headerUser").html("Bienvenid@, <b>" + user.displayName + "</b>");
		//$("headerUser").innerHTML = "Bienvenid@, <b>" + user.displayName + "</b><input type='button' value='logout' onclick='logoutUser();'/>";
	}
	else 
	{
		if (showUserAttempts < maxShowUserAttempts) // We try to obtain User data a maximun number of times
		{
			setTimeout("showUser()", 500);
			//showUser();
		}
	}
}

function logoutOnFinish(jsonText) 
{
	$("#headerUser").html("");
	var url = "/";
	window.location = url;  
}

function cleanSearchText()
{
	var textoBuscar = $("#txtBuscar").val();
	if (textoBuscar == "search...")
	{
		$("#txtBuscar").val("");
	}  
}

function typeSearchInput(event)
{
	// MSIE hack
	if (window.event)
	{
		event = window.event;
	}
	// event.keyCode holds the ASCII value of the key pressed
	var k = 13;
	if (event != null)
	{
		k=event.keyCode;
		if (k==13 || k==32) // 13 = tecla INTRO, 32 = tecla ESPACIO
		{
			searchPage(); 
		}
	}
	return true;
}

function searchPage()
{    
	var textoBuscar = $("#txtBuscar").val();
	var url = "/buscador_paginas.html?buscar=" + textoBuscar;
	window.location = url;   
}



// Nos dice si el navegador es Internet Explorer o no
function ie()
{
	var ret = true;
	browserName=navigator.appName;
	if (browserName=="Microsoft Internet Explorer")
	{
		//alert("ie");
		ret = true;
	}
	else
	{
		//alert("NOT ie");
		return false;
	}
	return ret;
}

// Nos devuelve el valor en píxeles de la posición "left" del objeto dentro de la página
function getPosLeft (obj) 
{
	var myleft=0;
	while(obj != null) 
	{
		try
		{
			myleft+= obj.offsetLeft;
			obj= obj.offsetParent;
		}
		catch(e)
		{
			break;
		}
	}
	return myleft;
}

// Nos devuelve el valor en píxeles de la posición "top" del objeto dentro de la página
function getPosTop (obj) 
{
	var mytop=0;
	while(obj != null) 
	{
		try
		{
			mytop+= obj.offsetTop;
			obj= obj.offsetParent;
		}
		catch (e)
		{
			break;
		}
	}
	return mytop;
}