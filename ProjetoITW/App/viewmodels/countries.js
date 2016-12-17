define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    console.log("ready!");
    var ViewModel = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchCountriesUri = 'http://192.168.160.39/api/Countries/Search/{title}?name=';
        var countriesUri = 'http://192.168.160.39/api/Countries/';
        var countriesCountUri = 'http://192.168.160.39/api/Countries/Count';
        self.searchText = ko.observable("");
        self.countries = ko.observableArray();
        self.countriesCount = ko.observable(null);
        self.error = ko.observable();
        self.countryinformation = ko.observableArray();
        self.searchTextGood = ko.computed(function () {
            return (self.searchText().length < 3)
        }, self);
        //--- Funções internas
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
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
            })
        }
        //--- Funções visíveis do exterior
        getAllCountries = function () {
            console.log('CALL: getAllCountries...')
            ajaxHelper(countriesCountUri, 'GET').done(function (data) {
                self.countriesCount(data);
            });
            ajaxHelper(countriesUri, 'GET').done(function (data) {
                self.countries(data);
            });
        };
        clearCountries = function () {
            getAllCountries();
            self.searchText("");
            $('#alerta').addClass('hidden');

        };
        searchCountries = function () {
            console.log('CALL: searchCountries...')
            ajaxHelper(searchCountriesUri + self.searchText(), 'GET').done(function (data) {
                self.countries(data);
                if (data.length==0) {
                        $('#alerta').removeClass('hidden');
                    }
                else if (data!=0){
                !$("#alerta").hasClass('hidden');
                $("#alerta").addClass('hidden');
                }
            });
        }
        //---- Chamada inicial
        getAllCountries();
    };
    return ViewModel;
});