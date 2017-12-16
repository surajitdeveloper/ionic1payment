angular.module('starter.services', [])
.service('UserService', function() {
return{
  submit: function(facebook){
    var dataSource = $rootScope.baseUrl+'/facebook';
    var data = {
      //user_id: window.localStorage.getItem('userId')
      id: success.authResponse.userID,
			accessToken: success.authResponse.accessToken,
			userid: success.authResponse.email,
      //mobile: success.authResponse.mobile,
      lat: data.latitude,
			lng: data.logitude,
			gender: success.authResponse.gender
    }
    var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
    console.log(JSON.stringify(data));
    return $http.post(dataSource, data, config);
  }
} // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
   };

   var getUser = function(){
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
   };

   return {
     getUser: getUser,
     setUser: setUser
	 };
	 // for google
	 /*
	 var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };

 })*/
 return{
	userGoogle: function(google){
	 var dataSource = $rootScope.baseUrl+'/gmailLogin';
var data = {
 //user_id: window.localStorage.getItem('userId')
 id: success.authResponse.userId,
 accessToken: success.authResponse.accessToken,
 userid: success.authResponse.email,
 fname: success.authResponse.givenName,
 lname: success.authResponse.familyName,
 //gender: success.authResponse.gender,
 lat: data.latitude,
 lng: data.logitude

}
var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
console.log(JSON.stringify(data));
return $http.post(dataSource, data, config);
}
}
var setUser = function(user_data) {
window.localStorage.starter_google_user = JSON.stringify(user_data);
};

var getUser = function(){
return JSON.parse(window.localStorage.starter_google_user || '{}');
};

return {
getUser: getUser,
setUser: setUser
};


})
.factory('findAdd', function($http, $rootScope){
  return{
    getAdd: function(lat,lng){
      var dataSource = $rootScope.baseUrl+'/findAddress?lat='+lat+'&lng='+lng;//'http://ophub.ottocar.co.uk/service/findAdd?lat=22.5943182&lng=88.4203283';//
      console.log(dataSource);
      return $http.get(dataSource);
    }
  }
})

.factory('Payment', function($http,$rootScope){
  return{
    paymoney: function(){
      var dataSource = 'https://test.payu.in/_payment';
      var successurl = 'http://vps137395.vps.ovh.ca/baby2/public/app/payment/success';
      var failureurl = 'http://vps137395.vps.ovh.ca/baby2/public/app/payment/failure';
      var data={
        key: null,
        txnid: window.localStorage.getItem('userId') || null,
        amount: amount,
        productinfo: productinfo,
        firstname: firstname,
        email: email,
        phone: phone,
        surl: successurl,
        furl: failureurl,
        HASH: null
      }
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      console.log(JSON.stringify(data));
      return $http.post(dataSource, data, config);
    }
  }
})
.factory('Feedback', function($http, $rootScope){
  return{
    submit: function(feedback){
      var dataSource = $rootScope.baseUrl+'/feedback';
      var data={
        feedback: feedback,
        user_id: window.localStorage.getItem('userId')
       }
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      console.log(JSON.stringify(data));
      return $http.post(dataSource, data, config);
    }
  }
})
.factory('List', function($http, $rootScope){
  var alphabets = [
    {
			id: 26,
			name: 'All',
			value: "all"
		},
		{ id: 0,
      name: 'A',
      value: 'A'
    },
    { id: 1,
      name: 'B',
      value: 'B'
    },
    { id: 2,
      name: 'C',
      value: 'C'
    },
    { id: 3,
      name: 'D',
      value: 'D'
    },
    { id: 4,
      name: 'E',
      value: 'E'
    },
    { id: 5,
      name: 'F',
      value: 'F'
    },
    { id: 6,
      name: 'G',
      value: 'G'
    },
    { id: 7,
      name: 'H',
      value: 'H'
    },
    { id: 8,
      name: 'I',
      value: 'I'
    },
    { id: 9,
      name: 'J',
      value: 'J'
    },
    { id: 10,
      name: 'K',
      value: 'K'
    },
    { id: 11,
      name: 'L',
      value: 'L'
    },
    { id: 12,
      name: 'M',
      value: 'M'
    },
    { id: 13,
      name: 'N',
      value: 'N'
    },
    { id: 14,
      name: 'O',
      value: 'O'
    },
    { id: 15,
      name: 'P',
      value: 'P'
    },
    { id: 16,
      name: 'Q',
      value: 'Q'
    },
    { id: 17,
      name: 'R',
      value: 'R'
    },
    { id: 18,
      name: 'S',
      value: 'S'
    },
    { id: 19,
      name: 'T',
      value: 'T'
    },
    { id: 20,
      name: 'U',
      value: 'U'
    },
    { id: 21,
      name: 'V',
      value: 'V'
    },
    { id: 22,
      name: 'W',
      value: 'W'
    },
    { id: 23,
      name: 'X',
      value: 'X'
    },
    { id: 24,
      name: 'Y',
      value: 'Y'
    },
    { id: 25,
      name: 'Z',
      value: 'Z'
		}
  ]
  return{
    mlist: function(){
      var dataSource = $rootScope.baseUrl +'/meaninglist';
      console.log(dataSource);
      return $http.post(dataSource);
    },
    olist: function(){
      var dataSource = $rootScope.baseUrl +'/originlist';
      console.log(dataSource);
      return $http.post(dataSource);
    },
    alphaList: function() {
      return alphabets;
    }
  }
})
.factory('PlanList', function($http, $rootScope){
  return{
    list: function(){
      var dataSource = $rootScope.baseUrl +'/purchaseplan_list';
      //console.log(dataSource);
      var data = {
        user_id : window.localStorage.getItem('userId') || null
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    }
  }
})
.factory('StarList', function($http, $rootScope){
  return{
    update: function(star,fav){
      var dataSource = $rootScope.baseUrl +'/add_star';
      //console.log(dataSource);
      var data = {
        fav: fav,
        star: star,
        user_id : window.localStorage.getItem('userId') || null
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    },
    getList: function(){
      var dataSource = $rootScope.baseUrl +'/star_list';
      //console.log(dataSource);
      var data = {
        user_id : window.localStorage.getItem('userId') || null
      }
      //console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    }
  }
})
.factory('NameList', function($http, $rootScope){
  return{
    names: function(){
      var dataSource = $rootScope.baseUrl +'/name_list';
      console.log(dataSource);
      var data = {
        origin : window.localStorage.getItem('originId') || null,
        //mean_id : window.localStorage.getItem('meaningId') || null,
        name : window.localStorage.getItem('alpha')|| null,
        gender_id : window.localStorage.getItem('gender')||null,
        category_id : window.localStorage.getItem('category')|| null,
        user_id : window.localStorage.getItem('userId') || null,
        name_tag : 'Free'
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    },
    seen: function(id){
      console.log(id);
      var dataSource = $rootScope.baseUrl +'/add_user_seen';
      console.log(dataSource);
      var data = {
        name_id : id,
        user_id : window.localStorage.getItem('userId')
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    },
    fav: function(name_id){
      var dataSource = $rootScope.baseUrl +'/add_favorites';
      console.log(dataSource);
      var data = {
        name_id : name_id,
        user_id : window.localStorage.getItem('userId'),
			}
			//var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      console.log(data);
      return $http.post(dataSource,data);
    },
    favList: function(){
      var dataSource = $rootScope.baseUrl +'/fav_list?user_id='+window.localStorage.getItem('userId');
      console.log(dataSource);
      var data = {
        user_id : window.localStorage.getItem('userId')
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    }
  }
})
.factory('Compare', function($http, $rootScope){
  return{
    findSpouse: function(data){
      var dataSource = $rootScope.baseUrl +'/checkspouse';
      //console.log(dataSource);
      var data = {
        user_id : data
      }
      //console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    },
    addSpouse: function(data){
      var dataSource = $rootScope.baseUrl +'/addspouse';
      console.log(dataSource);
      var data = {
        user_id: window.localStorage.getItem('userId'),
        spouse_id: data
      }
      console.log(JSON.stringify(data));
      return $http.post(dataSource,data);
    },
    compareList: function(){
      var dataSource = $rootScope.baseUrl +'/comparemomandad?user_id='+window.localStorage.getItem('userId');
      console.log(dataSource);
      var data = {
        user_id: window.localStorage.getItem('userId')
      }
      console.log(JSON.stringify(data));
      return $http.get(dataSource);
    }
  }
})
.factory('UserService', function($http, $rootScope, $httpParamSerializer){
  return{
    login: function(data){
      var dataSource = $rootScope.baseUrl +'/login';
      var userdata = {
        userid: data.username,
        password: data.password,
        lat: data.latitude,
        lng: data.logitude
      }
      console.log(dataSource);
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      console.log(JSON.stringify(data));
      return $http.post(dataSource,userdata);
    },
    signup: function(data){
			var dataSource = $rootScope.baseUrl +'/signup';
			console.log(data);
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      return $http.post(dataSource, data);
    },
    forgot: function(data){
      var dataSource = $rootScope.baseUrl +'/forgot';
      var data = {
        userid: data
      }
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      return $http.post(dataSource, data);
    },
    updatePass: function(id,pass){
      var dataSource = $rootScope.baseUrl +'/updatepass';
      //console.log("dataSource");
      var data = {
        userid : id,
        password : pass
      }
      return $http.post(dataSource, data);
    }
  }
})
.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})
// Resource service example
.factory('Document', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM documents')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.insrt = function(data) {
        return DB.query("INSERT INTO documents (id, title) VALUES (?,?)",[data.id,data.title])
        .then(function(result){
            return DB.fetchAll(result);
        });
    };
    self.getById = function(id) {
        return DB.query('SELECT * FROM documents WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    return self;
})
.directive('ionSearchSelect', ['$ionicModal', '$ionicGesture', function($ionicModal, $ionicGesture) {
	return {
		restrict: 'E',
		scope: {
			options: "=",
			optionSelected: "="
		},
		controller: function($scope, $element, $attrs) {
			$scope.searchSelect = {
				title: $attrs.title || "Search",
				keyProperty: $attrs.keyProperty,
				valueProperty: $attrs.valueProperty,
				templateUrl: $attrs.templateUrl || 'templates/searchSelect.html',
				animation: $attrs.animation || 'slide-in-up',
				option: null,
				searchvalue: "",
				enableSearch: $attrs.enableSearch ? $attrs.enableSearch == "true" : true
			};

			$ionicGesture.on('tap', function(e) {

				if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
					if($scope.optionSelected) {
						$scope.searchSelect.option = $scope.optionSelected[$scope.searchSelect.keyProperty];
					}
				} else {
					$scope.searchSelect.option = $scope.optionSelected;
				}
				$scope.OpenModalFromTemplate($scope.searchSelect.templateUrl);
			}, $element);

			$scope.saveOption = function() {
				if(!!$scope.searchSelect.keyProperty && !!$scope.searchSelect.valueProperty) {
					for(var i = 0; i < $scope.options.length; i++) {
						var currentOption = $scope.options[i];
						if(currentOption[$scope.searchSelect.keyProperty] == $scope.searchSelect.option) {
							$scope.optionSelected = currentOption;
							break;
						}
					}
				} else {
					$scope.optionSelected = $scope.searchSelect.option;
				}
				$scope.searchSelect.searchvalue = "";
				$scope.modal.remove();
			};

			$scope.clearSearch = function() {
				$scope.searchSelect.searchvalue = "";
			};

			$scope.closeModal = function() {
				$scope.modal.remove();
			};
			$scope.$on('$destroy', function() {
				if($scope.modal) {
					$scope.modal.remove();
				}
			});

			$scope.OpenModalFromTemplate = function(templateUrl) {
				$ionicModal.fromTemplateUrl(templateUrl, {
					scope: $scope,
					animation: $scope.searchSelect.animation
				}).then(function(modal) {
					$scope.modal = modal;
					$scope.modal.show();
				});
			};
		}
	};
}])
.factory('CountryList', function(){
  var country = [
    {
	"results": [{
		"address_components": [{
			"long_name": "CF-402",
			"short_name": "CF-402",
			"types": ["street_number"]
		}, {
			"long_name": "5th Cross Road",
			"short_name": "5th Cross Rd",
			"types": ["route"]
		}, {
			"long_name": "CF Block",
			"short_name": "CF Block",
			"types": ["political", "sublocality", "sublocality_level_3"]
		}, {
			"long_name": "Sector 1",
			"short_name": "Sector 1",
			"types": ["political", "sublocality", "sublocality_level_2"]
		}, {
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "North 24 Parganas",
			"short_name": "North 24 Parganas",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}, {
			"long_name": "700064",
			"short_name": "700064",
			"types": ["postal_code"]
		}],
		"formatted_address": "CF-402, 5th Cross Rd, CF Block, Sector 1, Salt Lake City, Kolkata, West Bengal 700064, India",
		"geometry": {
			"location": {
				"lat": 22.5943207,
				"lng": 88.4202725
			},
			"location_type": "ROOFTOP",
			"viewport": {
				"northeast": {
					"lat": 22.595669680292,
					"lng": 88.421621480291
				},
				"southwest": {
					"lat": 22.592971719708,
					"lng": 88.418923519708
				}
			}
		},
		"place_id": "ChIJNx-9p-x1AjoRJVFgpx8vMsM",
		"types": ["street_address"]
	}, {
		"address_components": [{
			"long_name": "Swiming Pool (Saltlake)",
			"short_name": "Swiming Pool (Saltlake)",
			"types": ["bus_station", "establishment", "point_of_interest", "transit_station"]
		}, {
			"long_name": "5th Cross Road",
			"short_name": "5th Cross Rd",
			"types": ["route"]
		}, {
			"long_name": "CF Block",
			"short_name": "CF Block",
			"types": ["political", "sublocality", "sublocality_level_3"]
		}, {
			"long_name": "Sector 1",
			"short_name": "Sector 1",
			"types": ["political", "sublocality", "sublocality_level_2"]
		}, {
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "North 24 Parganas",
			"short_name": "North 24 Parganas",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}, {
			"long_name": "700064",
			"short_name": "700064",
			"types": ["postal_code"]
		}],
		"formatted_address": "Swiming Pool (Saltlake), 5th Cross Rd, CF Block, Sector 1, Salt Lake City, Kolkata, West Bengal 700064, India",
		"geometry": {
			"location": {
				"lat": 22.5946175,
				"lng": 88.4207743
			},
			"location_type": "GEOMETRIC_CENTER",
			"viewport": {
				"northeast": {
					"lat": 22.595966480292,
					"lng": 88.422123280292
				},
				"southwest": {
					"lat": 22.593268519708,
					"lng": 88.419425319708
				}
			}
		},
		"place_id": "ChIJF0yLq-x1AjoRisoxGPnf_GU",
		"types": ["bus_station", "establishment", "point_of_interest", "transit_station"]
	}, {
		"address_components": [{
			"long_name": "CF Block",
			"short_name": "CF Block",
			"types": ["political", "sublocality", "sublocality_level_3"]
		}, {
			"long_name": "Sector 1",
			"short_name": "Sector 1",
			"types": ["political", "sublocality", "sublocality_level_2"]
		}, {
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "CF Block, Sector 1, Salt Lake City, Kolkata, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 22.5959591,
					"lng": 88.4209381
				},
				"southwest": {
					"lat": 22.591534,
					"lng": 88.41463
				}
			},
			"location": {
				"lat": 22.5934922,
				"lng": 88.4179705
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 22.5959591,
					"lng": 88.4209381
				},
				"southwest": {
					"lat": 22.591534,
					"lng": 88.41463
				}
			}
		},
		"place_id": "ChIJQ7kzj-t1AjoR1mzlfob0uF8",
		"types": ["political", "sublocality", "sublocality_level_3"]
	}, {
		"address_components": [{
			"long_name": "Sector 1",
			"short_name": "Sector 1",
			"types": ["political", "sublocality", "sublocality_level_2"]
		}, {
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "Sector 1, Salt Lake City, Kolkata, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 22.603649,
					"lng": 88.423161
				},
				"southwest": {
					"lat": 22.580641,
					"lng": 88.394724
				}
			},
			"location": {
				"lat": 22.5911208,
				"lng": 88.4040291
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 22.603649,
					"lng": 88.423161
				},
				"southwest": {
					"lat": 22.580641,
					"lng": 88.394724
				}
			}
		},
		"place_id": "ChIJUVFUV-Z1AjoRZ_VSDr4NNGc",
		"types": ["political", "sublocality", "sublocality_level_2"]
	}, {
		"address_components": [{
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "Salt Lake City, Kolkata, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 22.603649,
					"lng": 88.447548
				},
				"southwest": {
					"lat": 22.5469371,
					"lng": 88.394724
				}
			},
			"location": {
				"lat": 22.5867296,
				"lng": 88.4170988
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 22.603649,
					"lng": 88.447548
				},
				"southwest": {
					"lat": 22.5469371,
					"lng": 88.394724
				}
			}
		},
		"place_id": "ChIJM2IVGcd1AjoRo9aQPWK8b2k",
		"types": ["political", "sublocality", "sublocality_level_1"]
	}, {
		"address_components": [{
			"long_name": "Bidhannagar",
			"short_name": "Bidhannagar",
			"types": ["locality", "political"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "Bidhannagar, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 22.6032001,
					"lng": 88.4667401
				},
				"southwest": {
					"lat": 22.5187401,
					"lng": 88.39232
				}
			},
			"location": {
				"lat": 22.5867296,
				"lng": 88.4170988
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 22.6032001,
					"lng": 88.4667401
				},
				"southwest": {
					"lat": 22.5187401,
					"lng": 88.39232
				}
			}
		},
		"place_id": "ChIJLZ9vmE10AjoR2ftJs2B-Plw",
		"types": ["locality", "political"]
	}, {
		"address_components": [{
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "NDDM Ward No - 26",
			"short_name": "NDDM Ward No - 26",
			"types": ["administrative_area_level_3", "political"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "Kolkata, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 23.0083628,
					"lng": 88.5428696
				},
				"southwest": {
					"lat": 22.3436288,
					"lng": 88.1165879
				}
			},
			"location": {
				"lat": 22.572646,
				"lng": 88.363895
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 23.0083628,
					"lng": 88.5428696
				},
				"southwest": {
					"lat": 22.3436288,
					"lng": 88.1165879
				}
			}
		},
		"place_id": "ChIJZ_YISduC-DkRvCxsj-Yw40M",
		"types": ["locality", "political"]
	}, {
		"address_components": [{
			"long_name": "700064",
			"short_name": "700064",
			"types": ["postal_code"]
		}, {
			"long_name": "Salt Lake City",
			"short_name": "Salt Lake City",
			"types": ["political", "sublocality", "sublocality_level_1"]
		}, {
			"long_name": "Kolkata",
			"short_name": "Kolkata",
			"types": ["locality", "political"]
		}, {
			"long_name": "North 24 Parganas",
			"short_name": "North 24 Parganas",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "Salt Lake City, Kolkata, West Bengal 700064, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 22.6037057,
					"lng": 88.4230988
				},
				"southwest": {
					"lat": 22.5802541,
					"lng": 88.3961118
				}
			},
			"location": {
				"lat": 22.5924571,
				"lng": 88.412665
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 22.6037057,
					"lng": 88.4230988
				},
				"southwest": {
					"lat": 22.5802541,
					"lng": 88.3961118
				}
			}
		},
		"place_id": "ChIJJ5ECY9t1AjoRGP0W-nPJ_wE",
		"types": ["postal_code"]
	}, {
		"address_components": [{
			"long_name": "North 24 Parganas",
			"short_name": "North 24 Parganas",
			"types": ["administrative_area_level_2", "political"]
		}, {
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "North 24 Parganas, West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 23.2437441,
					"lng": 89.1004976
				},
				"southwest": {
					"lat": 22.12293,
					"lng": 88.33068
				}
			},
			"location": {
				"lat": 22.6168099,
				"lng": 88.402895
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 23.2437441,
					"lng": 89.1004976
				},
				"southwest": {
					"lat": 22.12293,
					"lng": 88.33068
				}
			}
		},
		"place_id": "ChIJv975mQSi-DkRI4iUx-rgj0Q",
		"types": ["administrative_area_level_2", "political"]
	}, {
		"address_components": [{
			"long_name": "West Bengal",
			"short_name": "WB",
			"types": ["administrative_area_level_1", "political"]
		}, {
			"long_name": "India",
			"short_name": "IN",
			"types": ["country", "political"]
		}],
		"formatted_address": "West Bengal, India",
		"geometry": {
			"bounds": {
				"northeast": {
					"lat": 27.220707,
					"lng": 89.880039
				},
				"southwest": {
					"lat": 21.524921,
					"lng": 85.820958
				}
			},
			"location": {
				"lat": 22.9867569,
				"lng": 87.8549755
			},
			"location_type": "APPROXIMATE",
			"viewport": {
				"northeast": {
					"lat": 27.220707,
					"lng": 89.880039
				},
				"southwest": {
					"lat": 21.524921,
					"lng": 85.820958
				}
			}
		},
		"place_id": "ChIJh-iXE_8W-jkRCqLnwz06VHE",
		"types": ["administrative_area_level_1", "political"]
	}],
	"status": "OK"
}
  ]
   return {
     brandDetail: function(){
       return country;
     }
    }
});
