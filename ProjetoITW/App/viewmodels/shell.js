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
                { route: 'movies', moduleId: 'viewmodels/movies', nav: true, menu: '<span>  <i class="fa fa-video-camera" style="font-size:20px"></i> Filmes</span>'},
                { route: 'actors', moduleId: 'viewmodels/actors', nav: true, menu: '<span>  <i class="fa fa-users" style="font-size:20px"></i> Atores</span>'},
                { route: 'directors', moduleId: 'viewmodels/directors', nav: true, menu: '<span>  <i class="fa fa-user-circle-o" style="font-size:20px"></i> Realizadores</span>' },
                { route: 'genres', moduleId: 'viewmodels/genres', nav: true, menu: '<span>  <i class="fa fa-user" style="font-size:20px"></i> Géneros</span>' },
                { route: 'languages', moduleId: 'viewmodels/languages', nav: true, menu: '<span>      <img src="images/linguagens.png" style="width:30px; height:20px; " /> Linguagens</span>' },                
                { route: 'countries', moduleId: 'viewmodels/countries', nav: true, menu: '<span>  <i class="fa fa-globe" style="font-size:20px"></i> Países</span>' },
                { route: 'contactos', moduleId: 'viewmodels/contactos',nav: true, menu: '<span><i class="fa fa-address-book-o" style="font-size:20px"></i></span>       Contactos   </span>'  },
                { route: 'directorsDetails/:id',moduleId: 'viewmodels/directorsDetails', nav: false },
                { route: 'moviesDetails/:id', moduleId: 'viewmodels/moviesDetails', nav: false},
                { route: 'languagesDetails/:id', moduleId: 'viewmodels/languagesDetails', nav: false },
                { route: 'countriesDetails/:id', moduleId: 'viewmodels/countriesDetails', nav: false },
                { route: 'actorsDetails/:id', moduleId: 'viewmodels/actorsDetails', nav: false },
                { route: 'genresDetails/:id', moduleId: 'viewmodels/genresDetails', nav: false }





            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});