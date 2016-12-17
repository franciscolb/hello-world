define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated movie presentation...");
		
		var self = this;
		var moviesUri = 'http://192.168.160.39/api/Movies/' + location.hash.split('/')[1];
		self.moviesInfo = ko.observableArray();
		
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
		
		getMovie = function() {
			console.log("CALL: get movie...");
			ajaxHelper(moviesUri, 'GET').done(function(data) {
				self.moviesInfo(data);
				console.log(data);
			});	
		}
		
		getMovie();
	}	
	
	return viewModel;
});