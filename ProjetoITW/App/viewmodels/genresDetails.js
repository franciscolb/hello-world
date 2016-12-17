define(['plugins/router', 'durandal/app', 'knockout'], function (router, app, ko) {
	var viewModel = function() {
		console.log("Initiated genre presentation...");
		
		var self = this;
		var genresUri = 'http://192.168.160.39/api/Genres/' + location.hash.split('/')[1];
		self.genresData = ko.observableArray();
		
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
		
		getGenre = function() {
			console.log("CALL: get genre...");
			ajaxHelper(genresUri, 'GET').done(function(data) {
				self.genresData(data);
			});	
		}
		
		getGenre();
	}	
	
	return viewModel;
});