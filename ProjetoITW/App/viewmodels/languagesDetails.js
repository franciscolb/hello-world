define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated language presentation...");
		
		var self = this;
		var languagesUri = 'http://192.168.160.39/api/Languages/' + location.hash.split('/')[1];
		self.languagesInfo = ko.observableArray();
		
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
		
		getLanguage = function() {
			console.log("CALL: get language...");
			ajaxHelper(languagesUri, 'GET').done(function(data) {
				self.languagesInfo(data);
			});	
		}
		
		getLanguage();
	}	
	
	return viewModel;
});