/**
 * @author Mauro Bolis
 */

var CuttedUrl;

$(document).ready(function(){
	
	//first: make the connection with the database
	persistence.store.websql.config(persistence, 'CuttrDatabase', 'A database used to store cuttr url', 1 * 1024 * 1024);
	
	//second: define the model
	CuttedUrl = persistence.define('CuttedUrl', {
	  originalUrl: "TEXT",
	  cuttedUrl: "TEXT",
	});
		
	//sync the model with the database	
	persistence.schemaSync();

	//show the cutted url
	CuttedUrl.all().list(null, function (results) {
	    results.forEach(function (r) {
	        $("#cuttedUrl").append("<p>"+r.originalUrl+"---"+r.cuttedUrl+"</p>")
	    });
	});


	$("#saveUrl").click(saveUrl);

});


function saveUrl(){
		
		
		var originalUrl = $("#original").val();
		var cuttedUrl = $("#cutted").val();
		
		var url = new CuttedUrl();
		url.originalUrl = originalUrl;
		url.cuttedUrl = cuttedUrl;
		
		persistence.add(url);
		
		persistence.flush();

}

