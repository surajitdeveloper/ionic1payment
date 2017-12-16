// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'star-rating', "ionic.contrib.ui.tinderCards",'ionic-toast', 'ngCordova'])

.run(function($ionicPlatform, DB, $rootScope, $ionicPopup, $state, $location, $filter, $locale, $ionicActionSheet) {
  $rootScope.baseUrl = 'http://vps137395.vps.ovh.ca/baby3/public/app';
  // $rootScope.originList = {};
  // $rootScope.meaningList = {};

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    $rootScope.userDetails = {};
    $rootScope.isLoggedIn = false;
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  //DB.init(); //Alert
  $ionicPlatform.registerBackButtonAction(function (event) {
    if( $state.current.name=="app.compare" ||  $state.current.name=="login"|| $state.current.name=="app.home"){
      var confirmPopup = $ionicPopup.confirm({
       title: '',
       template: '<span class="mono exit-text">Are you sure you want to exit?</span>'
       });
       confirmPopup.then(function(res) {
         if(res){
           ionic.Platform.exitApp();
          //  if(!ionic.Platform.isAndroid()){
          //    ionic.Platform.exitApp();
          //  }else{
          //    navigator.app.exitApp();
          //  }
         }else {
           console.log('You are not sure');
         }
       });
    }
    else {
      navigator.app.backHistory();
    }
  }, 100);
})
.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
      {
            name: 'documents',
            columns: [
                {name: 'id', type: 'integer primary key'},
                {name: 'title', type: 'text'}
            ]
        }
    ]
})
// .config(function ($httpProvider) {
//   $httpProvider.defaults.headers.common = {};
//   $httpProvider.defaults.headers.post = {};
//   $httpProvider.defaults.headers.put = {};
//   $httpProvider.defaults.headers.patch = {};
// })
.config(function ($cordovaAppRateProvider) {

 document.addEventListener("deviceready", function () {

  

   var prefs = {
     language: 'en',
     appName: 'BabyName',
     //iosURL: '<my_app_id>',
     androidURL: 'market://details?id=com.uniquesikhbabynames.app'
     //windowsURL: 'ms-windows-store:Review?name=<...>'
   };

   $cordovaAppRateProvider.setPreferences(prefs)

 }, false);
})
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.bookingProcess', {
    url: '/bookingProcess',
    views:
    {
      'menuContent':
      {
        templateUrl: 'templates/booking_process.html',
        controller: 'BookingProcess'
      }
    }
  })
  .state('app.policyShipping', {
    url: '/policyShipping',
    views:
    {
      'menuContent':
      {
        templateUrl: 'templates/policy_shipping.html',
        controller: 'PolicyShipping'
      }
    }
  })
  .state('app.returnPolicy', {
    url: '/returnPolicy',
    views:
    {
      'menuContent':
      {
        templateUrl: 'templates/return_policy.html',
        controller: 'ReturnPolicy'
      }
    }
  })
  .state('app.preferences', {
    url: '/preferences',
    views: {
      'menuContent': {
        templateUrl: 'templates/preferences.html',
        controller: 'PreferencesCtrl'
      }
    }
  })
  .state('app.aboutUnique', {
    url: '/aboutUnique',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutUnique.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.planList', {
    url: '/planList',
    views: {
      'menuContent': {
        templateUrl: 'templates/planList.html',
        controller: 'PlanListCtrl'
      }
    }
  })
  .state('app.buyPlan', {
    url: '/buyPlan',
    views: {
      'menuContent': {
        templateUrl: 'templates/buyPlan.html',
        controller: 'BuyPlanCtrl'//HomeCtrl
      }
    }
  })
  .state('app.uniqueName', {
    url: '/uniqueName',
    views: {
      'menuContent': {
        templateUrl: 'templates/uniqueName.html',
        controller: 'HomeCtrl'
      }
    }
  })
  .state('app.goAddFree', {
    url: '/goAddFree',
    views: {
      'menuContent': {
        templateUrl: 'templates/goAddFree.html',
        controller: 'GoAddfreeCtrl'
      }
    }
  })
  .state('app.compare', {
    url: '/compare',
    views: {
      'menuContent': {
        templateUrl: 'templates/compare.html',
        controller: 'CompareCtrl'
      }
    }
  })
  .state('app.connect', {
    url: '/connect',
    views: {
      'menuContent': {
        templateUrl: 'templates/compareModal.html',
        controller: 'ConnectCtrl'
      }
    }
  })
  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })
  .state('app.contactus', {
    url: '/contactus',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactus.html'
      }
    }
  })
  .state('app.tocondition', {
    url: '/tocondition',
    views: {
      'menuContent': {
        templateUrl: 'templates/tocondition.html'
      }
    }
  })
  .state('app.ppolicy', {
    url: '/ppolicy',
    views: {
      'menuContent': {
        templateUrl: 'templates/ppolicy.html'
      }
    }
  })
  .state('app.feedback', {
    url: '/feedback',
    views: {
      'menuContent': {
        templateUrl: 'templates/feedback.html',
        controller: 'FeedbackCtrl'
      }
    }
  })
  .state('app.rateus', {
    url: '/rateus',
    views: {
      'menuContent': {
        templateUrl: 'templates/rateus.html'
      }
    }
  })
  .state('app.moreapp', {
    url: '/moreapp',
    views: {
      'menuContent': {
        templateUrl: 'templates/moreapp.html'
      }
    }
  })
  .state('app.select', {
    url: '/select',
    views: {
      'menuContent': {
        templateUrl: 'templates/select.html',
        controller: 'SelectCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.searchname', {
      url: '/searchname',
      views: {
        'menuContent': {
          templateUrl: 'templates/searchname.html',
          controller: 'SearchCtrl'
        }
      }
    })
    .state('app.favourites', {
      url: '/favourites',
      views: {
        'menuContent': {
          templateUrl: 'templates/favourite.html',
          controller: 'FavListCtrl'
        }
      }
    })
    .state('app.byalphabet', {
      url: '/byalphabet',
      views: {
        'menuContent': {
          templateUrl: 'templates/byalphabet.html',
          controller: 'ByAlphaCtrl'
        }
      }
    })
    .state('app.gender', {
      url: '/gender',
      views: {
        'menuContent': {
          templateUrl: 'templates/gender.html',
          controller: 'GenderCtrl'
        }
      }
    })
    .state('app.category', {
      url: '/category',
      views: {
        'menuContent': {
          templateUrl: 'templates/category.html',
          controller: 'CategoryCtrl'
        }
      }
    })
    .state('app.nameListb', {
      url: '/nameListb',
      views: {
        'menuContent': {
          templateUrl: 'templates/nameListb.html',
          controller: 'NameListCtrl'
        }
      }
    })
    .state('app.nameListg', {
      url: '/nameListg',
      views: {
        'menuContent': {
          templateUrl: 'templates/nameListg.html',
          controller: 'NameListCtrl'
        }
      }
    })
    .state('app.nameLista', {
      url: '/nameLista',
      views: {
        'menuContent': {
          templateUrl: 'templates/nameLista.html',
          controller: 'NameListCtrl'
        }
      }
    })
    .state('app.bymeaning', {
      url: '/bymeaning',
      views: {
        'menuContent': {
          templateUrl: 'templates/bymeaning.html',
          controller: 'ByMeaningCtrl'
        }
      }
    })
    .state('app.byorigin', {
      url: '/byorigin',
      views: {
        'menuContent': {
          templateUrl: 'templates/byorigin.html',
          controller: 'ByOriginCtrl'
        }
      }
    })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })
  /*
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'AuthCtrl'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'AuthCtrlsignup'
  })
  .state('forgot', {
    url: '/forgot',
    templateUrl: 'templates/forgot.html',
    controller: 'AuthCtrlforgot'
  })*/
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'AuthCtrl'
      }
    }
  })
  .state('app.signup', {
    url: '/signup',
    views: {
      'menuContent': {
        templateUrl: 'templates/signup.html',
        controller: 'AuthCtrlsignup'
      }
    }
    
  })
  .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent': {
        templateUrl: 'templates/forgot.html',
        controller: 'AuthCtrlforgot'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
