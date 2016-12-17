define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated director presentation...");
		
		var self = this;
		var directorUri = 'http://192.168.160.39/api/Directors/' + location.hash.split('/')[1];
		self.directorsInfo = ko.observableArray();
		
		function ajaxHelper(uri, method, data) {
			return $.ajax({
				type: method,
				url: uri,
				dataType: 'json',
				contentType: 'application/json',
				data: data ? JSON.stringify(data) : null,
				error: function (jqXHR, textStatus, errorThrown) {
					console.log("AJAX Call[" + uri + "] Fail...");
					self.error(errorThrown);
				}
			});
		}
		
		getDirector = function() {
			console.log("CALL: get director...");
			ajaxHelper(directorUri, 'GET').done(function(data) {
				self.directorsInfo(data);
				console.log(data);
			});	
		}
		
		getDirector();
	}	
	
	return viewModel;
});