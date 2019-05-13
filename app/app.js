    /* Angular Module */

    angular.module('app', ['youtube-embed', 'ngRoute', 'ngProgress'])

        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/movies.html',
                    controller: 'HomeCtrl'
                })
                .when('/movies/:id1', {
                    templateUrl: 'templates/moviedetails.html',
                    controller: 'MovieDetailsCtrl'
                })
                .when('/tv', {
                    templateUrl: 'templates/tv.html',
                    controller: 'TvCtrl'
                })
                .when('/tv/:id2', {
                    templateUrl: 'templates/tvdetails.html',
                    controller: 'TvDetailsCtrl'
                })
                .when('/celebs', {
                    templateUrl: 'templates/celebs.html',
                    controller: 'CelebCtrl'
                })
                .when('/celebs/:id3', {
                    templateUrl: 'templates/celebsdetails.html',
                    controller: 'CelebDetailsCtrl'
                })
                .when('/search/:query', {
                    templateUrl: 'templates/search.html',
                    controller: 'HomeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });

            $locationProvider.html5Mode(true);
            }])

        /* Home/Movie Page Controller */

        .controller("HomeCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            $scope.quantity = 10;
            $scope.nowplaying = [];
            $http.get('https://api.themoviedb.org/3/movie/now_playing?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&page=1&region=US')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        $scope.nowplaying.push(result);
                    });
                });

            $scope.size = 3;
            $scope.movies = [];
            $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&page=1&region=US')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        $scope.movies.push(result);
                        $scope.progressbar.complete();
                    });
                });

            /* Global Search Function */

            $scope.search = function (searchQ) {
                $scope.progressbar = ngProgressFactory.createInstance();
                $scope.progressbar.start();
                $scope.progressbar.setColor('#FFD54F');
                var searchQuery = $http.get('https://api.themoviedb.org/3/search/movie?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&query=' + searchQ);
                searchQuery.success(function (response) {

                    $scope.searched = response.results;
                })

                $http.get('https://api.themoviedb.org/3/search/tv?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&query=' + searchQ + '&page=1').success(function (response) {

                    $scope.searchedTv = response.results;
                })

                $http.get('https://api.themoviedb.org/3/search/person?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&query=' + searchQ + '&page=1&include_adult=true').success(function (response) {
                    $scope.progressbar.complete();
                    $scope.searchedP = response.results;
                })
            }
        })

        /* Tv Page Controller */

        .controller("TvCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            $scope.air = [];
            $http.get('https://api.themoviedb.org/3/tv/airing_today?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        $scope.air.push(result);
                    });
                });

            $scope.popular = [];
            $http.get('https://api.themoviedb.org/3/tv/popular?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        $scope.popular.push(result);

                    });
                });

            $scope.topRated = [];
            $scope.topRatedPara = [];
            $scope.topRatedHead = [];
            $http.get('https://api.themoviedb.org/3/tv/top_rated?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        var par = result.overview;
                        var para = par.substr(0, 150);
                        console.log(result);
                        $scope.topRatedPara.push(para);
                        $scope.topRated.push(result);
                        $scope.progressbar.complete();
                    });
                });
        })

        /* Celebrity Page Controller */

        .controller("CelebCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            $scope.popularPeople = [];
            $http.get('https://api.themoviedb.org/3/person/popular?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&page=1')
                .success(function (response) {
                    angular.forEach(response.results, function (result) {
                        $scope.popularPeople.push(result);
                        $scope.progressbar.complete();
                    });
                });
        })

        /* MovieDetails Page Controller */

        .controller("MovieDetailsCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {

            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            var mId = $routeParams.id1;
            var id = "/" + mId + "";
            var movieInfo = $http.get('https://api.themoviedb.org/3/movie' + id + '?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            movieInfo.success(function (response) {
                $scope.details = response;
                var year = response.release_date;
                var substr = year.substr(0, 4);
                $scope.years = '(' + substr + ')';
            });
            var movieCredits = $http.get('https://api.themoviedb.org/3/movie' + id + '/credits?api_key=8c9ba774510fc41113f2a633e881d8ab');
            movieCredits.success(function (response) {

                $scope.casts = response.cast;
                $scope.crew = response.crew;

            });
            var movieSimilar = $http.get('https://api.themoviedb.org/3/movie' + id + '/similar?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            movieSimilar.success(function (response) {

                $scope.similar = response.results;

            });

            var movieImages = $http.get('https://api.themoviedb.org/3/movie' + id + '/images?api_key=8c9ba774510fc41113f2a633e881d8ab');
            movieImages.success(function (response) {

                $scope.images = response.posters;
                $scope.images2 = response.backdrops;
            });
            var movieVideos = $http.get('https://api.themoviedb.org/3/movie' + id + '/videos?api_key=8c9ba774510fc41113f2a633e881d8ab')
            movieVideos.success(function (response) {
                var url = response.results;
                $scope.videos = url;
            });
            var movieReviews = $http.get('https://api.themoviedb.org/3/movie' + id + '/reviews?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&page=1')
            movieReviews.success(function (response) {
                $scope.review = response.results;
                $scope.progressbar.complete();
            });
        })

        /* Tv Details Page Controller */

        .controller("TvDetailsCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            var tvId = $routeParams.id2;
            var id1 = "/" + tvId + "";
            var tvInfo = $http.get('https://api.themoviedb.org/3/tv' + id1 + '?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            tvInfo.success(function (response) {
                var year = response.first_air_date;
                var substr = year.substr(0, 4);
                $scope.tvYear = '(' + substr + ')';
                $scope.tvDetails = response;
                if (response.in_production == true) {
                    $scope.showStatus = "Ongoing Series";
                } else {
                    $scope.showStatus = "Ended";
                }
            })
            var tvCredits = $http.get('https://api.themoviedb.org/3/tv' + id1 + '/credits?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            tvCredits.success(function (response) {
                $scope.stars = response.cast;

            });
            var tvSimilar = $http.get('https://api.themoviedb.org/3/tv' + id1 + '/similar?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US&page=1');
            tvSimilar.success(function (response) {

                $scope.similarShows = response.results;

            });

            var tvImages = $http.get('https://api.themoviedb.org/3/tv' + id1 + '/images?api_key=8c9ba774510fc41113f2a633e881d8ab');
            tvImages.success(function (response) {

                $scope.images = response.posters;
                $scope.images2 = response.backdrops;

            });
            var tvVideos = $http.get('https://api.themoviedb.org/3/tv' + id1 + '/videos?api_key=8c9ba774510fc41113f2a633e881d8ab')
            tvVideos.success(function (response) {
                var tvurl = response.results;
                $scope.videostv = tvurl;
                $scope.progressbar.complete();
            });
        })

        /* Celebrity Details Page Controller */

        .controller("CelebDetailsCtrl", function ($scope, $http, $routeParams, ngProgressFactory) {
            $scope.progressbar = ngProgressFactory.createInstance();
            $scope.progressbar.start();
            $scope.progressbar.setColor('#FFD54F');
            var pId = $routeParams.id3;
            var id2 = "/" + pId + "";
            var celebInfo = $http.get('https://api.themoviedb.org/3/person' + id2 + '?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            celebInfo.success(function (response) {
                $scope.progressbar.stop();
                $scope.peopleDetail = response;
            });


            var celebCredits = $http.get('https://api.themoviedb.org/3/person' + id2 + '/combined_credits?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            celebCredits.success(function (response) {
                var n = response.cast.length;
                $scope.credit = n;

            });

            var celebMovies = $http.get('https://api.themoviedb.org/3/person' + id2 + '/movie_credits?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            celebMovies.success(function (response) {
                $scope.knownMovies = response.cast;

            });

            var celebTV = $http.get('https://api.themoviedb.org/3/person' + id2 + '/tv_credits?api_key=8c9ba774510fc41113f2a633e881d8ab&language=en-US');
            celebTV.success(function (response) {
                $scope.knownTV = response.cast;
                $scope.progressbar.complete();
            });
        })

        /* Scroll Directive */

        .directive('scrollToItem', function () {
            return {
                restrict: 'A',
                scope: {
                    scrollTo: "@"
                },
                link: function (scope, $elm, attr) {

                    $elm.on('click', function () {
                        $('html,body').animate({
                            scrollTop: $(scope.scrollTo).offset().top
                        }, "slow");
                    });
                }
            }
        })
