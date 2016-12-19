define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        search: function() {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/welcome', nav: false},
                { route: 'movies', moduleId: 'viewmodels/movies', nav: true, menu: '<span><img src="images/movies.png" style="width:30px; height:24px; " />Filmes</span>'},
                { route: 'actors', moduleId: 'viewmodels/actors', nav: true, menu: '<span>  <img src="images/actor.png" style="width:30px; height:24px; "/> Atores</span>'},
                { route: 'directors', moduleId: 'viewmodels/directors', nav: true, menu: '<span>  <img src="images/directors.png" style="width:30px; height:24px; "/> Realizadores</span>' },
                { route: 'genres', moduleId: 'viewmodels/genres', nav: true, menu: '<span>  <img src="images/generos.png" style="width:30px; height:24px; "/>  Géneros</span>' },
                { route: 'languages', moduleId: 'viewmodels/languages', nav: true, menu: '<span>      <img src="images/portugal.png" style="width:30px; height:24px; " /> Linguagens</span>' },                
                { route: 'countries', moduleId: 'viewmodels/countries', nav: true, menu: '<span>  <img src="images/pais.png" style="width:30px; height:24px; "/> Países</span>' },
                { route: 'contactos', moduleId: 'viewmodels/contactos',nav: true, menu: '<span><img src="images/contactos.png" style="width:30px; height:24px; "/>       Contactos   </span>'  },
                { route: 'directorsDetails/:id',moduleId: 'viewmodels/directorsDetails', nav: false },
                { route: 'moviesDetails/:id', moduleId: 'viewmodels/moviesDetails', nav: false},
                { route: 'languagesDetails/:id', moduleId: 'viewmodels/languagesDetails', nav: false },
                { route: 'countriesDetails/:id', moduleId: 'viewmodels/countriesDetails', nav: false },
                { route: 'actorsDetails/:id', moduleId: 'viewmodels/actorsDetails', nav: false },
                { route: 'genresDetails/:id', moduleId: 'viewmodels/genresDetails', nav: false }





                ]).buildNavigationModel();
            $('.navbar-collapse').click(function(){
                $(".navbar-collapse").collapse('hide');
            });
            
            return router.activate();
        }
    };
});