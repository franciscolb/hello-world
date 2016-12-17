define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated actor presentation...");
		
		var self = this;
		var actorsUri = 'http://192.168.160.39/api/Actors/' + location.hash.split('/')[1];
		self.actorsData = ko.observableArray();
		
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
		
		getActor = function() {
			console.log("CALL: get director...");
			ajaxHelper(actorsUri, 'GET').done(function(data) {
				self.actorsData(data);
			});	
		}
		
		getActor();
	}	
	
	return viewModel;
});