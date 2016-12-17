define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    console.log("ready!");
    var ViewModel = function () {
        
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchActorsUri = 'http://192.168.160.39/api/Actors/Search/';
        var actorsUri = 'http://192.168.160.39/api/Actors/';
        var actorsCountUri = 'http://192.168.160.39/api/Actors/Count';
        self.searchText = ko.observable("");
        self.actors = ko.observableArray();
        self.actorsCount = ko.observable(null);
        self.error = ko.observable();
        self.actorInfo = ko.observableArray();
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
        getAllActors = function () {
            console.log('CALL: getAllActors...')
            ajaxHelper(actorsCountUri, 'GET').done(function (data) {
                self.actorsCount(data);
            });
            ajaxHelper(actorsUri, 'GET').done(function (data) {
                self.actors(data);
                $('#showactor').hide();
            });
            
        };
        clearActors = function () {
            getAllActors();
            self.searchText("");
            $('#alerta').addClass('hidden');
        };
        searchActors = function () {
            console.log('CALL: searchActors...')
            ajaxHelper(searchActorsUri + self.searchText(), 'GET').done(function (data) {
                self.actors(data);
                console.log(data.length);
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
        getAllActors();
    };
    return ViewModel;
});
