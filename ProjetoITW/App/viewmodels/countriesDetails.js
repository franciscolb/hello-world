define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated country presentation...");
		
		var self = this;
		var countriesUri = 'http://192.168.160.39/api/Countries/' + location.hash.split('/')[1];
		self.countriesData = ko.observableArray();
		
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
		
		getCountries = function() {
			console.log("CALL: get country...");
			ajaxHelper(countriesUri, 'GET').done(function(data) {
				self.countriesData(data);
			});	
		}
		
		getCountries();
	}	
	
	return viewModel;
});