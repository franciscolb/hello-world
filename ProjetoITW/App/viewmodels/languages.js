﻿define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {
    console.log("ready!");
    var ViewModel = function () {
        console.log('ViewModel initiated...')
        //---Variáveis locais
        var self = this;
        var searchLanguagesUri = 'http://192.168.160.39/api/Languages/Search/';
        var languagesUri = 'http://192.168.160.39/api/Languages/';
        var languagesCountUri = 'http://192.168.160.39/api/Languages/Count';
        self.searchText = ko.observable("");
        self.languages = ko.observableArray();
        self.languagesCount = ko.observable(null);
        self.error = ko.observable();
        self.languagedata = ko.observableArray();
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
        getAllLanguages = function () {
            console.log('CALL: getAllLanguages...')
            ajaxHelper(languagesCountUri, 'GET').done(function (data) {
                self.languagesCount(data);
            });
            ajaxHelper(languagesUri, 'GET').done(function (data) {
                self.languages(data);
            });
        };
        clearLanguages = function () {
            getAllLanguages();
            self.searchText("");
            $('#alerta').addClass('hidden');
        };
        searchLanguages = function () {
            console.log('CALL: searchLanguages...')
            ajaxHelper(searchLanguagesUri + self.searchText(), 'GET').done(function (data) {
                self.languages(data);
                if (data.length==0) {
                        $('#alerta').removeClass('hidden');
                    }
                else if (data!=0){
                !$("#alerta").hasClass('hidden');
                $("#alerta").addClass('hidden');
                }
            });
        }
        pesquisaautomatica = function() {
            console.log('pesquisa');
            if (self.searchText().length >= 3){
                ajaxHelper(searchLanguagesUri + self.searchText(), 'GET').done(function (data){
                    self.languages(data);
                    if (data.length==0) {
                        $('#alerta').removeClass('hidden');
                    }
                else if (data!=0){
                !$("#alerta").hasClass('hidden');
                $("#alerta").addClass('hidden');
                }
                });
            } else {
                getAllLanguages();
                !$("#alerta").hasClass('hidden');
                $("#alerta").addClass('hidden');
            }
        };
        //---- Chamada inicial
        getAllLanguages();
    };
    return ViewModel;
});