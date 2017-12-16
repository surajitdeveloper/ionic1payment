angular.module('starter.controllers', [])
.controller('BrowseCtrl', function($scope,$state, NameList,  $ionicLoading, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate){
  // $scope.browse = function(){
  //   $state.go('app.browse');
  // }
})
.controller('GoAddfreeCtrl', function($scope, $state, $rootScope, $ionicLoading){
  $scope.add = {};
  $scope.freeAdds=[
    {
      id: 0,
      name: 'Debit Card',
      value: 0
    },{
      id: 1,
      name: 'Credit card',
      value: 1
    },{
      id: 3,
      name: 'International Card',
      value: 3
    },{
      id: 4,
      name: 'Paytm Wallets',
      value: 4
    }];
})
.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $cordovaSocialSharing, $ionicHistory, $rootScope, $ionicSlideBoxDelegate, Compare, $ionicLoading, $cordovaAppRate, $ionicScrollDelegate, $ionicSideMenuDelegate) {
  $scope.students = {};
  $scope.choice = {};
  $scope.choice.fname = (window.localStorage.getItem('fname') != null || window.localStorage.getItem('fname') != 'null' || window.localStorage.getItem('fname') != undefined)?window.localStorage.getItem('fname'):"";
  $scope.choice.email = (window.localStorage.getItem('email') != null || window.localStorage.getItem('email') != "null" || window.localStorage.getItem('email') != undefined)?window.localStorage.getItem('email'):"";
  $scope.choice.user_pic = (localStorage.user_pic != null || localStorage.user_pic != "null" || localStorage.user_pic != undefined || localStorage.user_pic != "")?localStorage.user_pic:"img/sof.jpg";
  //$ionicScrollDelegate.scrollTop(true);
  $scope.home = function(){
    $state.go('app.home');
    $ionicHistory.nextViewOptions({
     historyRoot: true
    });
  }
  $scope.share = function(data){
    $cordovaSocialSharing.share();
  }

  $scope.rateUs = function(){
    $cordovaAppRate.navigateToAppStore().then(function (result) {
        // success
    });
  }
  $scope.loggedIn = window.localStorage.getItem('loggedIn') || false;
  console.log($scope.loggedIn);
  $scope.loggedOut = function(){
    
    $ionicLoading.show({template:'Logged Out....',duration: 1500});
    window.localStorage.setItem('loggedIn', '');
    window.localStorage.setItem("userId",null);
    window.localStorage.setItem("fname",null);
    window.localStorage.setItem("lname",null);
    window.localStorage.setItem("email",null);
    window.localStorage.setItem("mobile",null);
    window.localStorage.setItem("spouseID",null);
    window.localStorage.setItem('Preference', false);
    window.localStorage.setItem('user_pic', null);

    
    $scope.loggedIn = false;
    console.log($scope.loggedIn);
    //$scope.choice.email = "";
    //$scope.choice.user_pic = "";
    $scope.choice = {};
    $ionicHistory.clearCache().then(function(){ $state.go('app.home') });
    //$state.go('app.home');
    $ionicScrollDelegate.scrollTop(true);

    //window.location.reload(true);
    $ionicSideMenuDelegate.toggleLeft();

  }
  $scope.goto = function(page)
  {
    $ionicHistory.clearCache().then(function(){ $state.go(page)});
  }
  $ionicModal.fromTemplateUrl('templates/compareModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.compareModal = modal;
  });
  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  $scope.username;
  $scope.cancel = function(){
    $scope.compareModal.hide();
  }
  $rootScope.OTPdata = {};
  $rootScope.spouseData;
  $scope.resendOTP = function(){
    Compare.findSpouse($rootScope.spouseData).then(function(response){
      if(response.data.SuccessStatus ==='Success'){
        $rootScope.OTPdata = response.data;
        console.log($rootScope.OTPdata);
        console.log($rootScope.spouseData);
        $scope.timeForTimer = 30;
        $scope.timer = 30;
        $scope.done = true;
        startTimer();
      }else {
        $ionicLoading.show({
          template:response.data.message, duration: 1500
        });
      }
    })
  }
  $scope.doSearch = function(data){
    $rootScope.spouseData = data;
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
    });
    if(typeof data != 'undefined'){
      Compare.findSpouse(data).then(function(response){
        if(response.data.SuccessStatus ==='Success'){
          $rootScope.OTPdata = response.data;
          console.log($rootScope.OTPdata);
          console.log($rootScope.spouseData);
          $ionicLoading.hide();
          $ionicSlideBoxDelegate.enableSlide(true);
          $ionicSlideBoxDelegate.next();
          $ionicSlideBoxDelegate.enableSlide(false);
          startTimer();
        }else {
          $ionicLoading.show({
            template:response.data.message, duration: 1500
          });
        }
      })
    }else{
      $ionicLoading.show({
    	  template: 'enter spouse details',
        duration: 1000
    	});
    }

  }
  $scope.slideChanged = function(index) {

  };
  $scope.doVerify = function(data){
    if(typeof data != 'undefined'){
      if(data == $rootScope.OTPdata.OTP){
        Compare.addSpouse($rootScope.OTPdata.spouse_id).then(function(response){
          $ionicSlideBoxDelegate.enableSlide(true);
          $ionicSlideBoxDelegate.next();
          $ionicSlideBoxDelegate.enableSlide(false);
          window.localStorage.setItem('spouseID',$rootScope.OTPdata.spouse_id);
        })
      }else{
        $ionicLoading.show({
    	  template: 'Invalid OTP',
        duration: 1500
      	});
      }
    }else{
      $ionicLoading.show({
    	  template: 'enter otp recieved',
        duration: 1000
    	});
    }
  }
  $scope.doFinish = function(){
    $scope.compareModal.hide();
    $state.go('app.compare');
  }
  $scope.compare = function(){
    if(window.localStorage.getItem('loggedIn')){
      if(window.localStorage.getItem('spouseID')!= 0){
        $state.go('app.compare');
      }else {
        $scope.compareModal.show();//$state.go('app.compare');//
        $ionicSlideBoxDelegate.enableSlide(false);
      }
    }else{
      $state.go('login');
    }
  }
})
//UserService,
.controller('AuthCtrl', function($rootScope, $http,$scope, $state, UserService, $cordovaFacebook, $ionicLoading,$ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, $stateParams){
  $scope.home = function()
  {
    $state.go('app.home');
  }
  $scope.goto = function(page)
  {
    //alert(page);
    $state.go(page);
  }
  /*
  $scope.showPopup = function() {
      $scope.data = {}
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "text" ng-model = "data.model">',
         title: 'Title',
         subTitle: 'Subtitle',
         scope: $scope,
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
               onTap: function(e) {
						
                  if (!$scope.data.model) {
                     //don't allow the user to close unless he enters model...
                     e.preventDefault();
                  } else {
                     return $scope.data.model;
                  }
               }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });  
  */
  
  $scope.loginData = {};
  $scope.RegisterData = {};
  $scope.ForgotData = {};
  $scope.doLogin = function(){
    $ionicLoading.show({template:'Verifying...',duration: 1500});
    //console.log(JSON.stringify($scope.loginData));
    //$state.go('app.home');
    UserService.login($scope.loginData).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.message != 'your email or password is incorrect'){
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem("userId",response.data.users[0].id);
        window.localStorage.setItem("fname",response.data.users[0].fname);
        window.localStorage.setItem("lname",response.data.users[0].lname);
        window.localStorage.setItem("email",response.data.users[0].email);
        window.localStorage.setItem("mobile",response.data.users[0].mobile);
        window.localStorage.setItem("spouseID",response.data.users[0].spouseID);
        window.localStorage.setItem("activePlan",response.data.plan);
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
      }else{
        $ionicLoading.show({
          template: 'Please enter valid details!',
          duration: 1000
        });
      }
      /* else{
        $ionicLoading.show({templates: response.data.message,duration: 3000});
      } */
      //
    })
  }
  $scope.onSignIn = function()
  {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    window.plugins.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        console.log("user data get");
        console.log(user_data);
        $ionicLoading.hide(); 
        //ionicToast.show("Success",'bottom',false,'3000');
        window.localStorage.setItem('loggedIn', true);
        //window.localStorage.setItem("Token",result1.data.Token);/////
        //window.localStorage.setItem("userId",user_data.userId);
        window.localStorage.setItem("fname",user_data.givenName);
        window.localStorage.setItem("lname",user_data.familyName);
        window.localStorage.setItem("email",user_data.email);
        localStorage.user_pic = user_data.imageUrl;
        var dataSource = "http://vps137395.vps.ovh.ca/baby3/public/app/gmailLogin";
        dataSource += "?fname="+user_data.givenName+"&lname="+user_data.familyName+"&gender=Male&lat=22&lng=88&accessToken="+result1.data.Token+"&id="+user_data.userId+"&userid="+user_data.email;
        console.log(dataSource);
        $http.get(dataSource).success(function(data)
        {
          localStorage.userId = data.data;
          console.log("userid- "+data.data);
        });
        /*$http.post(dataSource,{fname: name_part[0], lname: name_part[1], gender: data.gender, lat: 22, lng: 88, accessToken: data.accessToken, id: data.id, userid: data.email})
        .success(function(user)
        {
        console.log(user);
        });*/
       // window.localStorage.setItem("gender",result1.data.gender);
       // window.localStorage.setItem("spouseID",result.data.spouseID);
       // window.localStorage.setItem("activePlan",result.data.plan);
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
        $rootScope.$viewHistory = {
          histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
          backView: null,
          forwardView: null,
          currentView: null,
          disabledRegistrableTagNames: []
        };
           /*if (data) {
                if (result1.data.Success) {
                  
                 } else{
                    $ionicLoading.show({templates: response.data.message,duration: 3000});
                  }
               }*/
        
      },
      function (msg) {
        console.log("could not login");
        console.log(msg);
        $ionicLoading.hide();
      }
    );
  }
  /*
  $scope.onSignIn = function() {

    $ionicLoading.show({
      template: 'Logging in...'
    });



    window.plugins.googleplus.login({
        'scopes': '',
        'webClientId': '803064132640-h7fretcj1vj2sqb4p24sdo1pu1dr121g.apps.googleusercontent.com',
        'offline': true
      },
      function(user_data) {
        $ionicLoading.hide();
        alert("success");
        alert(user_data);
      },
      function(msg) {
        $ionicLoading.hide();
        alert("failed");
        alert(msg);
      }
    );

  }
  */
  // start fb
  $scope.facebookSignIn = function() {

		$cordovaFacebook.login(["public_profile", "email", "user_friends"])
	    .then(function(success) {

				if(success.status === 'connected'){
          console.log(success);
          var data = {
						userID: success.authResponse.userID,
						accessToken: success.authResponse.accessToken
          }
          
          //console.log(success.data);
          //var data = success.authResponse;
          //console.log(data);
          ///////////////////////////////////////////////////////////////
          $http.get("https://graph.facebook.com/v2.1/me", {
             params: {access_token: data.accessToken, fields: "name,gender,location,picture,email,first_name, last_name, hometown", format: "json" }})
            .then(function(result) 
            {
              console.log("fb data----");  
              console.log(result); 
              ///////////////////////////////////////////////////

              var status = result.status;
              var data1 = result.data;
              console.log("facebookSign"+JSON.stringify(data1));
                if (status == 200) {
                    if (data1) {
                      //ionicToast.show(result.data.Message,'bottom',false,'3000');
                      window.localStorage.setItem('loggedIn', true);
                      window.localStorage.setItem("Token",data.accessToken);/////
                      data = data1;
                      window.localStorage.setItem("userId",data.id);
                      //window.localStorage.setItem("name",data.fname);
                      var userfullname = data.name;
                      var name_part = userfullname.split(" ");
                      window.localStorage.setItem("fname",name_part[0]);
                      window.localStorage.setItem("lname",name_part[1]);
                      window.localStorage.setItem("email",data.email);
                      localStorage.user_pic = data.picture.data.url;
                      var dataSource = "http://vps137395.vps.ovh.ca/baby3/public/app/facebookLogin";
                      dataSource += "?fname="+name_part[0]+"&lname="+name_part[1]+"&gender="+data.gender+"&lat=22&lng=88&accessToken="+localStorage.Token+"&id="+data.id+"&userid="+data.email;
                      console.log(dataSource);
                      $http.get(dataSource).success(function(data)
                    {
                      localStorage.userId = data.data;
                      console.log("userid- "+data.data);
                    });
                     // window.localStorage.setItem("mobile",result.data.mobile);
                     // window.localStorage.setItem("spouseID",result.data.spouseID);
                     // window.localStorage.setItem("activePlan",result.data.plan);
                      $state.go('app.home');  //for login done and goto app home page
                      $ionicLoading.hide();
                      $ionicScrollDelegate.scrollTop(true);
                      $rootScope.$viewHistory = {
                        histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
                        backView: null,
                        forwardView: null,
                        currentView: null,
                        disabledRegistrableTagNames: []
                      };
                     } else{
                        $ionicLoading.show({templates: response.data.message,duration: 3000});
                      }
                     }
                   
              ///////////////////////////////////////////////////
              /*window.localStorage.setItem('loggedIn', true);
                window.localStorage.setItem("Token",data.accessToken);/////
                window.localStorage.setItem("userId",data.userID);
                $state.go('app.home');
                $ionicLoading.hide();
						    then(function (response) {
							    if (response.data) {
								if (response.data.Success) {
									//ionicToast.show(response.data.Message,'bottom',false,'3000');
                  window.localStorage.setItem('loggedIn', true);
                  window.localStorage.setItem("Token",response.data.Token);/////
                  window.localStorage.setItem("userId",response.data.id);
                  window.localStorage.setItem("fname",response.data.fname);
                  window.localStorage.setItem("lname",response.data.lname);
                  window.localStorage.setItem("email",response.data.email);
                  window.localStorage.setItem("mobile",response.data.mobile);
                  window.localStorage.setItem("spouseID",response.data.spouseID);
                  window.localStorage.setItem("activePlan",response.data.plan);
                  // $rootScope.$viewHistory = {
									//   histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
									//   backView: null,
									//   forwardView: null,
									//   currentView: null,
									//   disabledRegistrableTagNames: []
									// };
									// window.localStorage.setItem('defaultState','home');
									//console.log('LoginNotify : '+window.localStorage.getItem('NotifyMe'));
                  $state.go('app.home');
                  $ionicLoading.hide();
										$state.transitionTo('home', $stateParams, {
										reload: true, inherit: false, notify: true
									});
								}
							}
						}, function (response) {
							$scope.msg = "Service not Exists";
					})*/     
        })

          /////////////////////////////////////////////////////////////
          ;
				}
	    }, function (error) {
	      //ionicToast.show(JSON.stringify(error),'middle',true,'3000');
	    });
		}


    // end fb
  $scope.local = window.localStorage.getItem('userLoc') == 'IN' ? true : false;
  console.log('Local :'+$scope.local);
  $scope.doSignup = function(){
    $ionicLoading.show({template:'Registering...'});

    
			var dataSource = 'http://vps137395.vps.ovh.ca/baby3/public/app/signup';
			var data = $scope.RegisterData;
      var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      var url = dataSource+"?email="+$scope.RegisterData.email+"&password="+$scope.RegisterData.password+"&mobile="+$scope.RegisterData.mobile;
      console.log(url);
      /*$http.get(dataSource, 
        {email:$scope.RegisterData.email,mobile:$scope.RegisterData.mobile,password:$scope.RegisterData.password}, 
        config).success(function(response){
      if(response.data.message == 'Successfully signed up'){
        $state.go('login');
        $ionicLoading.hide();
      }
      else{
        $ionicLoading.hide();
      }
    });*/
    $state.go('login');
    $ionicLoading.hide();
  }
  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  var otp;
  var id;
  $scope.doForgot = function(username){
    UserService.forgot(username).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.SuccessStatus == 'Success'){
        opt = response.data.OTP;
        id = response.data.id;
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(false);

      //$state.go('app.home');
      }else {

      }
    })
  }
  $scope.verify = function(data){
    if(data == opt){
      console.log('data');

      $ionicSlideBoxDelegate.enableSlide(true);
      $ionicSlideBoxDelegate.next();
      $ionicSlideBoxDelegate.enableSlide(false);

    }else {

    }
  }
  $scope.updatePass = function(pass,repass){
    if(pass === repass){

      UserService.updatePass(id,pass).then(function(response){

      })
    }
  }
  // $scope.backtoLogin = function(){
  //   $state.go('app.home');
  // }
})
.controller('AuthCtrlsignup', function($ionicHistory, $rootScope, $http,$scope, $state, UserService, $cordovaFacebook, $ionicLoading,$ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, $stateParams){
  $scope.home = function()
  {
    $state.go('app.home');
  }
  $scope.goto = function(page)
  {
    //alert(page);
    $state.go(page);
    window.location.reload(true);
  }
  $scope.loginData = {};
  $scope.RegisterData = {};
  $scope.ForgotData = {};
  $scope.doLogin = function(){
    $ionicLoading.show({template:'Verifying...',duration: 1500});
    UserService.login($scope.loginData).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.message != 'your email or password is incorrect'){
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem("userId",response.data.users[0].id);
        window.localStorage.setItem("fname",response.data.users[0].fname);
        window.localStorage.setItem("lname",response.data.users[0].lname);
        window.localStorage.setItem("email",response.data.users[0].email);
        window.localStorage.setItem("mobile",response.data.users[0].mobile);
        window.localStorage.setItem("spouseID",response.data.users[0].spouseID);
        window.localStorage.setItem("activePlan",response.data.plan);
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
      }else{
        $ionicLoading.show({
          template: 'Please enter valid details!',
          duration: 1000
        });
      }
    })
  }
  $scope.onSignIn = function()
  {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    window.plugins.googleplus.login(
      {},
      function (user_data) {
        console.log("user data get");
        console.log(user_data);
        $ionicLoading.hide(); 
        //ionicToast.show("Success",'bottom',false,'3000');
        window.localStorage.setItem('loggedIn', true);
        //window.localStorage.setItem("Token",result1.data.Token);/////
        window.localStorage.setItem("userId",user_data.userId);
        window.localStorage.setItem("fname",user_data.givenName);
        window.localStorage.setItem("lname",user_data.familyName);
        window.localStorage.setItem("email",user_data.email);
        localStorage.user_pic = user_data.imageUrl;
        var dataSource = "http://vps137395.vps.ovh.ca/baby3/public/app/gmailLogin";
        dataSource += "?fname="+user_data.givenName+"&lname="+user_data.familyName+"&gender=Male&lat=22&lng=88&accessToken="+result1.data.Token+"&id="+user_data.userId+"&userid="+user_data.email;
        console.log(dataSource);
        $http.get(dataSource).success(function(data)
        {
          localStorage.userId = data.data;
          console.log("userid- "+data.data);
        });
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
        $rootScope.$viewHistory = {
          histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
          backView: null,
          forwardView: null,
          currentView: null,
          disabledRegistrableTagNames: []
        };
          
        
      },
      function (msg) {
        console.log("could not login");
        console.log(msg);
        $ionicLoading.hide();
      }
    );
  }
  
  // start fb
  $scope.facebookSignIn = function() {

		$cordovaFacebook.login(["public_profile", "email", "user_friends"])
	    .then(function(success) {

				if(success.status === 'connected'){
          console.log(success);
          var data = {
						userID: success.authResponse.userID,
						accessToken: success.authResponse.accessToken
          }
          
          //console.log(success.data);
          //var data = success.authResponse;
          //console.log(data);
          ///////////////////////////////////////////////////////////////
          $http.get("https://graph.facebook.com/v2.1/me", {
             params: {access_token: data.accessToken, fields: "name,gender,location,picture,email,first_name, last_name, hometown", format: "json" }})
            .then(function(result) 
            {
              console.log("fb data----");  
              console.log(result); 
              ///////////////////////////////////////////////////


              var status = result.status;
              var data1 = result.data;
              console.log("facebookSign"+JSON.stringify(data1));
                if (status == 200) {
                    if (data1) {
                      //ionicToast.show(result.data.Message,'bottom',false,'3000');
                      window.localStorage.setItem('loggedIn', true);
                      window.localStorage.setItem("Token",data.accessToken);/////
                      data = data1;
                      window.localStorage.setItem("userId",data.id);
                      //window.localStorage.setItem("name",data.fname);
                      var userfullname = data.name;
                      var name_part = userfullname.split(" ");
                      window.localStorage.setItem("fname",name_part[0]);
                      window.localStorage.setItem("lname",name_part[1]);
                      window.localStorage.setItem("email",data.email);
                      localStorage.user_pic = data.picture.data.url;
                     // window.localStorage.setItem("mobile",result.data.mobile);
                     // window.localStorage.setItem("spouseID",result.data.spouseID);
                     // window.localStorage.setItem("activePlan",result.data.plan);
                     var dataSource = "http://vps137395.vps.ovh.ca/baby3/public/app/facebookLogin";
                     dataSource += "?fname="+name_part[0]+"&lname="+name_part[1]+"&gender="+data.gender+"&lat=22&lng=88&accessToken="+localStorage.Token+"&id="+data.id+"&userid="+data.email;
                     console.log(dataSource);
                     $http.get(dataSource).success(function(data)
                   {
                     localStorage.userId = data.data;
                     console.log("userid- "+data.data);
                   });
                      $state.go('app.home');  //for login done and goto app home page
                      $ionicLoading.hide();
                      $ionicScrollDelegate.scrollTop(true);
                      $rootScope.$viewHistory = {
                        histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
                        backView: null,
                        forwardView: null,
                        currentView: null,
                        disabledRegistrableTagNames: []
                      };
                     } else{
                        $ionicLoading.show({templates: response.data.message,duration: 3000});
                      }
                     }
                   



              ///////////////////////////////////////////////////
                  
        })

          /////////////////////////////////////////////////////////////
          ;
				}
	    }, function (error) {
	      //ionicToast.show(JSON.stringify(error),'middle',true,'3000');
	    });
		}


    // end fb
  $scope.local = window.localStorage.getItem('userLoc') == 'IN' ? true : false;
  console.log('Local :'+$scope.local);
  
    $scope.doSignup = function(){
      $ionicLoading.show({template:'Registering...'});
  
      
        var dataSource = 'http://vps137395.vps.ovh.ca/baby3/public/app/signup';
        var data = $scope.RegisterData;
        var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}//email="+$scope.RegisterData.email+"&
        var url = dataSource+"?password="+$scope.RegisterData.password+"&userid="+$scope.RegisterData.mobile+"&referal="+$scope.RegisterData.referral;
        console.log(url);
       $http.get(url).success(function(response)
      {
        //console.log(response);
        if(response.message == 'Successfully signed up'){
          $ionicHistory.clearCache();
          //$scope.go("login");
          window.location.href = "#/login";
          $ionicLoading.hide();
          window.location.reload(true);
        }
        else{
          $ionicLoading.hide();
        }
      });
        /*$http.get(dataSource, 
          {email:$scope.RegisterData.email,mobile:$scope.RegisterData.mobile,password:$scope.RegisterData.password}, 
          config).success(function(response){
        if(response.data.message == 'Successfully signed up'){
          $state.go('login');
          $ionicLoading.hide();
        }
        else{
          $ionicLoading.hide();
        }
      });*/
      $state.go('login');
      $ionicLoading.hide();
    }
  
  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  var otp;
  var id;
  $scope.doForgot = function(username){
    UserService.forgot(username).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.SuccessStatus == 'Success'){
        opt = response.data.OTP;
        id = response.data.id;
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(false);

      //$state.go('app.home');
      }else {

      }
    })
  }
  $scope.verify = function(data){
    if(data == opt){
      console.log('data');

      $ionicSlideBoxDelegate.enableSlide(true);
      $ionicSlideBoxDelegate.next();
      $ionicSlideBoxDelegate.enableSlide(false);

    }else {

    }
  }
  $scope.updatePass = function(pass,repass){
    if(pass === repass){

      UserService.updatePass(id,pass).then(function(response){

      })
    }
  }
  // $scope.backtoLogin = function(){
  //   $state.go('app.home');
  // }
})
.controller('AuthCtrlforgot', function($rootScope, $http,$scope, $state, UserService, $cordovaFacebook, $ionicLoading,$ionicScrollDelegate, $ionicSlideBoxDelegate, $timeout, $stateParams){
  $scope.home = function()
  {
    $state.go('app.home');
  }
  $scope.goto = function(page)
  {
    //alert(page);
    $state.go(page);
  }
  $scope.loginData = {};
  $scope.RegisterData = {};
  $scope.ForgotData = {};
  $scope.doLogin = function(){
    $ionicLoading.show({template:'Verifying...',duration: 1500});
    UserService.login($scope.loginData).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.message != 'your email or password is incorrect'){
        window.localStorage.setItem('loggedIn', true);
        window.localStorage.setItem("userId",response.data.users[0].id);
        window.localStorage.setItem("fname",response.data.users[0].fname);
        window.localStorage.setItem("lname",response.data.users[0].lname);
        window.localStorage.setItem("email",response.data.users[0].email);
        window.localStorage.setItem("mobile",response.data.users[0].mobile);
        window.localStorage.setItem("spouseID",response.data.users[0].spouseID);
        window.localStorage.setItem("activePlan",response.data.plan);
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
      }else{
        $ionicLoading.show({
          template: 'Please enter valid details!',
          duration: 1000
        });
      }
    })
  }
  $scope.onSignIn = function()
  {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    window.plugins.googleplus.login(
      {},
      function (user_data) {
        console.log("user data get");
        console.log(user_data);
        $ionicLoading.hide(); 
        //ionicToast.show("Success",'bottom',false,'3000');
        window.localStorage.setItem('loggedIn', true);
        //window.localStorage.setItem("Token",result1.data.Token);/////
        window.localStorage.setItem("userId",user_data.userId);
        window.localStorage.setItem("fname",user_data.givenName);
        window.localStorage.setItem("lname",user_data.familyName);
        window.localStorage.setItem("email",user_data.email);
        localStorage.user_pic = user_data.imageUrl;
        $state.go('app.home');
        $ionicLoading.hide();
        $ionicScrollDelegate.scrollTop(true);
        $rootScope.$viewHistory = {
          histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
          backView: null,
          forwardView: null,
          currentView: null,
          disabledRegistrableTagNames: []
        };
          
        
      },
      function (msg) {
        console.log("could not login");
        console.log(msg);
        $ionicLoading.hide();
      }
    );
  }
  
  // start fb
  $scope.facebookSignIn = function() {

		$cordovaFacebook.login(["public_profile", "email", "user_friends"])
	    .then(function(success) {

				if(success.status === 'connected'){
          console.log(success);
          var data = {
						userID: success.authResponse.userID,
						accessToken: success.authResponse.accessToken
          }
          
          //console.log(success.data);
          //var data = success.authResponse;
          //console.log(data);
          ///////////////////////////////////////////////////////////////
          $http.get("https://graph.facebook.com/v2.1/me", {
             params: {access_token: data.accessToken, fields: "name,gender,location,picture,email,first_name, last_name, hometown", format: "json" }})
            .then(function(result) 
            {
              console.log("fb data----");  
              console.log(result); 
              ///////////////////////////////////////////////////


              var status = result.status;
              var data1 = result.data;
              console.log("facebookSign"+JSON.stringify(data1));
                if (status == 200) {
                    if (data1) {
                      //ionicToast.show(result.data.Message,'bottom',false,'3000');
                      window.localStorage.setItem('loggedIn', true);
                      window.localStorage.setItem("Token",data.accessToken);/////
                      data = data1;
                      window.localStorage.setItem("userId",data.id);
                      //window.localStorage.setItem("name",data.fname);
                      var userfullname = data.name;
                      var name_part = userfullname.split(" ");
                      window.localStorage.setItem("fname",name_part[0]);
                      window.localStorage.setItem("lname",name_part[1]);
                      window.localStorage.setItem("email",data.email);
                      localStorage.user_pic = data.picture.data.url;
                     // window.localStorage.setItem("mobile",result.data.mobile);
                     // window.localStorage.setItem("spouseID",result.data.spouseID);
                     // window.localStorage.setItem("activePlan",result.data.plan);
                      $state.go('app.home');  //for login done and goto app home page
                      $ionicLoading.hide();
                      $ionicScrollDelegate.scrollTop(true);
                      $rootScope.$viewHistory = {
                        histories: { root: { historyId: 'root', parentHistoryId: null, stack: [], cursor: -1 } },
                        backView: null,
                        forwardView: null,
                        currentView: null,
                        disabledRegistrableTagNames: []
                      };
                     } else{
                        $ionicLoading.show({templates: response.data.message,duration: 3000});
                      }
                     }
                   



              ///////////////////////////////////////////////////
                  
        })

          /////////////////////////////////////////////////////////////
          ;
				}
	    }, function (error) {
	      //ionicToast.show(JSON.stringify(error),'middle',true,'3000');
	    });
		}


    // end fb
  $scope.local = window.localStorage.getItem('userLoc') == 'IN' ? true : false;
  console.log('Local :'+$scope.local);
  $scope.doSignup = function(){
    $ionicLoading.show({template:'Registering...'});
    UserService.signup($scope.RegisterData).then(function(response){
      console.log(response);
      console.log(JSON.stringify(response.data));
      if(response.data.message == 'Successfully signed up'){
        $state.go('login');
        $ionicLoading.hide();
      }
      else{
        $ionicLoading.hide();
      }
    })
  }
  $timeout(function(){
    $ionicSlideBoxDelegate.enableSlide(false);
  });
  var otp;
  var id;
  $scope.doForgot = function(username){
    $ionicLoading.show({template:'Verifying...',duration: 1500});
    UserService.forgot(username).then(function(response){
      console.log(JSON.stringify(response.data));
      if(response.data.SuccessStatus == 'Success'){
        opt = response.data.OTP;
        id = response.data.id;
        $ionicLoading.hide();
        $ionicSlideBoxDelegate.enableSlide(true);
        $ionicSlideBoxDelegate.next();
        $ionicSlideBoxDelegate.enableSlide(false);

      //$state.go('app.home');
      }else {

      }
    })
  }
  $scope.verify = function(data){
    if(data == opt){
      console.log('data');

      $ionicSlideBoxDelegate.enableSlide(true);
      $ionicSlideBoxDelegate.next();
      $ionicSlideBoxDelegate.enableSlide(false);

    }else {

    }
  }
  $scope.updatePass = function(pass,repass){
    if(pass === repass){

      UserService.updatePass(id,pass).then(function(response){

      })
    }
  }
  // $scope.backtoLogin = function(){
  //   $state.go('app.home');
  // }
})
.controller('ByAlphaCtrl', function($scope, $state, $stateParams, Document, List, $rootScope, $filter) {
  $scope.openGender = function(data){
    window.localStorage.setItem('alpha',$filter('uppercase')(data));
    $state.go('app.gender');
  }
  $scope.goBack = function(){
  $state.go('app.searchname');
}
})
.controller('GenderCtrl', function($scope, $state, $stateParams, Document, List, $rootScope) {
  $scope.openCategory = function(data){
    window.localStorage.setItem('gender',data);
    $state.go('app.category');
  }
  $scope.goBack = function(){
  $state.go('app.byalphabet');
}
})
.controller('NameListCtrl', function($http, $state, NameList, $scope, $ionicLoading,$ionicHistory, $timeout, $ionicSlideBoxDelegate, $ionicScrollDelegate){
  $scope.list = [];
  $scope.favlist = [];
  //$scope.students = {};
  //$scope.len;
  NameList.names().then(function(response){
    //console.log("view name"+JSON.stringify(response.data));
    /*for(i=0;i<response.data.length;i++){
      //$scope.list.push(response.data[i]);
      console.log(response.data[i]);
      //$scope.len=$scope.list.push.length[i];
    }*/
    //console.log("respo");
    //console.log(response.data);
    //console.log("data");
    $scope.total_result = response.data.namelist.length;
    var i = 1;
    angular.forEach(response.data.name_favorite,function(value,key)
    {
      if(value.status == 0)
      {
        $scope.favlist.push(value.name_id);
      }
    });
    //console.log($scope.favlist);
    angular.forEach(response.data.namelist, function (value, key) {
      if($scope.favlist.indexOf(value.id) != -1)
      {
        value.favorite = 'true';
      }
      value.current_result = i;
      //value.favorite = 'true';
      $scope.list.push(value);
      //console.log(value);
      i++;
    });

  })
  $scope.data = {};
  $scope.data.currSlide = $ionicSlideBoxDelegate.currentIndex();
  console.log('Current Slide = ' + $scope.data.currSlide);


  $scope.slideChanged = function(data) {
    console.log(data);
    NameList.seen(data).then(function(response){
      //$ionicLoading({template: 'added',duration:1000});
    })
  };
  $scope.home = function(data){

  }
  $scope.addFav = function(data, srl){ 
   if(window.localStorage.getItem('loggedIn')){
    if(window.localStorage.getItem('userId')>0){
      if(typeof $scope.list[srl-1].favorite == 'undefined' || $scope.list[srl-1].favorite == "false")
      {
        $scope.list[srl-1].favorite = 'true';
      }
      else
      {
        $scope.list[srl-1].favorite = 'false';
      }
      //console.log('AddFav '+data);
      var url = "http://vps137395.vps.ovh.ca/baby3/public/app";
      url = url+'/add_favorites';
      url += "?name_id="+data+"&user_id="+window.localStorage.getItem('userId');
      $http.get(url).then(function(response)
      {
        console.log(response);
      });
      /*
      function(name_id){
      var dataSource = $rootScope.baseUrl +'/add_favorites';
      console.log(dataSource);
      var data = {
        name_id : name_id,
        user_id : window.localStorage.getItem('userId'),
			}
			//var config = {headers : {'Content-Type': 'application/x-www-form-urlencoded;'}}
      console.log(data);
      return $http.post(dataSource,data);
    }
      */
      /*NameList.fav(data).then(function(response){
        //$ionicLoading({template: 'added',duration:1000});
      })*/
    }
    }else{
        $ionicLoading.show({
          template: '<span class="mono">Please Login !!!</span>',
          duration: 1500
        });
 }
  }
  $scope.home = function(){
    $state.go('app.home');
    $ionicHistory.nextViewOptions({
     historyRoot: true
    });
  }
  $scope.set_color = function(employee) {
    if(employee){
      return {color: "#56bae3"};
    }else{
      return {color: "#E91E63"};
    }
	}
  $scope.goBack = function(){
  $state.go('app.category');
}

////////////////////////////////

$scope.data.currentPage = 0;
var setupSlider = function() {
  //some options to pass to our slider
  $scope.sliderOptions = {
    initialSlide: 0,
    direction: 'horizontal', //or vertical
    speed: 300 //0.3s transition
  };

  //create delegate reference to link with slider
  $scope.sliderDelegate = null;

  //watch our sliderDelegate reference, and use it when it becomes available
  $scope.$watch('sliderDelegate', function(newVal, oldVal) {
    if (newVal != null) {
      $scope.sliderDelegate.on('slideChangeEnd', function() {
        $scope.currentPage = $scope.sliderDelegate.activeIndex;
        //use $scope.$apply() to refresh any content external to the slider
        $scope.$apply();
      });
    }
  });
};

setupSlider();

///////////////////////////////

})
.controller('CategoryCtrl', function($scope, $state){
  $scope.seenList = function(data){
    window.localStorage.setItem('category',data)
    if(window.localStorage.getItem('gender') == 'Male'){
      $state.go('app.nameListb');
    }
    else if(window.localStorage.getItem('gender') == 'Female'){
      $state.go('app.nameListg');
    }
    else{
      $state.go('app.nameListg');
    }
  }
  $scope.unseenList = function(data){
    window.localStorage.setItem('category',data)
    if(window.localStorage.getItem('gender') == 'Male'){
      $state.go('app.nameListb');
    }
    else if(window.localStorage.getItem('gender') == 'Female'){
      $state.go('app.nameListg');
    }
    else{
      $state.go('app.nameLista');
    }
  }
  $scope.favouriteList = function(data){
    window.localStorage.setItem('category',data)
    if(window.localStorage.getItem('gender') == 'Male'){
      $state.go('app.nameListb');
    }
    else if(window.localStorage.getItem('gender') == 'Female'){
      $state.go('app.nameListg');
    }
    else{
      $state.go('app.nameLista');
    }
  }
  $scope.List = function(data){
    window.localStorage.setItem('category',data)
    if(window.localStorage.getItem('gender') == 'Male'){
      $state.go('app.nameListb');
    }
    else if(window.localStorage.getItem('gender') == 'Female'){
      $state.go('app.nameListg');
    }
    else{
      $state.go('app.nameLista');
    }
  }
  $scope.goBack = function(){
  $state.go('app.gender');
}
})
.controller('SelectCtrl', function($scope, $state, $stateParams, ionicToast, StarList, List, $rootScope, $ionicLoading, StarList, $cordovaSocialSharing) {
  $scope.students = {};
  var message = '';
  var err = true;
  var msg = 'Selected name List is Empty';
  StarList.getList().then(function(response){
    console.log(response.data);
    $scope.students = response.data;
    if($scope.students.length<1){
      err = false;
    }else err = true;
    for(i=0;i<$scope.students.length;i++){
      message = message+$scope.students[i].name+'\n';
    }
    console.log(message);
  })

  $scope.shareName = function(){
    $cordovaSocialSharing.share(message);
  }
})
.controller('FavListCtrl', function($scope, $state, $stateParams, ionicToast, NameList, List, $rootScope, $ionicLoading, StarList, $cordovaSocialSharing) {
    $scope.students = {};
    $scope.len;
    NameList.favList().then(function(response){
      console.log(response.data);
      $scope.students = response.data;
      $scope.len=$scope.students.length;
    })
    $scope.$on('$ionicView.leave', function () {
        if($scope.finalSelect.length || $scope.finalFav.length){
          StarList.update($scope.finalSelect,$scope.finalFav).then(function(response){
            //console.log(JSON.stringify(response.data));
          })
        }
    })
    $scope.share = function(data){
      var message = 'Name: '+data.name+'\n'+'Meaning: '+data.english_meaning+'\n';
      $cordovaSocialSharing.share(message);
    }
    $scope.finalSelect = [];
    $scope.finalFav = [];
    $scope.hasSelect = function(value,id) {
      var len = $scope.finalSelect.length;
      if(len<5 || value=='true'){
        for (var i = 0; i < $scope.students.length; i++) {
          if ($scope.students[i].name_id === parseInt(id)) {
            if(value == 'true'){
              $scope.students[i].selected = 'false';
              $scope.finalSelect.splice($scope.finalSelect.indexOf($scope.students[i]),1);
            }
            else{
               $scope.students[i].selected = 'true';
               $scope.finalSelect.push($scope.students[i]);
             }
          }
        }
      }
    }
    $scope.hasFav = function(value,id) {
      //console.log(value+' '+id);
        for (var i = 0; i < $scope.students.length; i++) {
          if ($scope.students[i].name_id === parseInt(id)) {
            if(value == 'true'){
              $scope.students[i].favorite = 'false';
              $scope.finalFav.push($scope.students[i]);
            }
            else{
               $scope.students[i].favorite = 'true';
               $scope.finalFav.splice($scope.finalFav.indexOf($scope.students[i]),1);
             }
          }
        }
        console.log(JSON.stringify($scope.finalFav));
    }
    $scope.toggleSelect = function(show) {
      $scope.sel = !$scope.sel;
    };
    $scope.isFav = function(show) {
      return $scope.fav;
    };
    $scope.toggleFav = function(show) {
      $scope.fav = !$scope.fav;
    };
})
.controller('ByMeaningCtrl', function($scope, $state, $stateParams, ionicToast, Document, List, $rootScope, $ionicLoading, UserService) {
  //$scope.meaningList = {};
  $scope.editUser = {
    users : [],
    user: null
  };
  // window.localStorage.setItem('byCatId', $stateParams.byCatId);
  // console.log($stateParams.byCatId);
  List.mlist().then(function(response){
    console.log(JSON.stringify(response.data));
    //$scope.meaningList = response.data;
    for(i=0;i<response.data.length;i++)
    {
      var data = {
        id: i+1,
        name: response.data[i].meaning1,
        //selected: false
      }
      $scope.editUser.users.push(data);
    }
  })
  $scope.next = function(value){
    //console.log(value);
    if(typeof value != 'undefined'){
      window.localStorage.setItem('meaningId',$scope.editUser.user.id);
      $state.go('app.byalphabet');
    }else{
      //console.log(value);
      $ionicLoading.show({
  		  template: '<span class="mono">Select Meaning Before Proceeding</span>',
        //position: 'bottom',
        duration: 1500
        });
      //ionicToast.show('Select meaning','middle',true,'3000');
    }
  }
  $scope.goBack = function(){
  $state.go('app.searchname');
}
})
.controller('ByOriginCtrl', function($scope, $state, $stateParams, Document, List, $rootScope) {
  $scope.originList = {};
  // window.localStorage.setItem('byCatId', $stateParams.byCatId);
  // console.log($stateParams.byCatId);
  List.olist().then(function(response){
    console.log(JSON.stringify(response.data));
    $scope.originList = response.data;
  })
  $scope.openAlpha = function(data){
    window.localStorage.setItem('originId',data);
    $state.go('app.byalphabet');
  }
  $scope.goBack = function(){
  $state.go('app.searchname');
}
})

.controller('SearchCtrl', function($scope, $state, $ionicSlideBoxDelegate,Document, CountryList, List, $rootScope, $http) {
  $scope.openAlpha = function(data){

    if(window.localStorage.getItem('Preference') == 'true'){
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('meaningId','');
      window.localStorage.setItem('originId','');
      window.localStorage.setItem('alpha', window.localStorage.getItem('prefAlpha'));
      window.localStorage.setItem('gender', window.localStorage.getItem('prefGender'));
      $state.go('app.category');
    }else{
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('meaningId','');
      window.localStorage.setItem('originId','');
      $state.go('app.byalphabet');
    }
  }
  $scope.openMean = function(data){
    if(window.localStorage.getItem('Preference') == 'true'){
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('originId','');
      window.localStorage.setItem('meaningId', window.localStorage.getItem('prefMeaning'));
      window.localStorage.setItem('alpha', window.localStorage.getItem('prefAlpha'));
      window.localStorage.setItem('gender', window.localStorage.getItem('prefGender'));
      $state.go('app.category');
    }else {
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('originId','');
      $state.go('app.bymeaning');
    }
  }
  $scope.db_count = 0;
  $http.post("http://vps137395.vps.ovh.ca/baby3/public/app/namecount").then(
    function(result)
    {
      $scope.db_count = result.data.count;
    },
    function(error)
    {
      console.log(error);
    }
  );
  $scope.openOrigin = function(data){
    if(window.localStorage.getItem('Preference') == 'true'){
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('originId', window.localStorage.getItem('prefOrigin'));
      window.localStorage.setItem('meaningId','');
      window.localStorage.setItem('alpha', window.localStorage.getItem('prefAlpha'));
      window.localStorage.setItem('gender', window.localStorage.getItem('prefGender'));
      $state.go('app.category');
    }else {
      window.localStorage.setItem('nameBy',data);
      window.localStorage.setItem('meaningId','');
      $state.go('app.byorigin');
    }
  }
  $scope.goBack = function(){
  $state.go('app.home');
}
})
.controller('CompareCtrl', function($scope, $state, Compare){
  $scope.list = {};
  Compare.compareList().then(function(response){
    $scope.list = response.data;
    console.log($scope.list);
  })
  $scope.show = 0;
  $scope.changeList = function(data){
    $scope.show = data;
  }
})
.controller('FeedbackCtrl', function($scope, $state, $rootScope, $ionicLoading, $timeout, Feedback, $ionicHistory){
    $scope.submit = function(data){
      //console.log(JSON.stringify(data));
      Feedback.submit(data).then(function(response){
        $state.go('app.home');
        $ionicHistory.clearCache();
        if(response.data.SuccessStatus == 'Success'){
          console.log(JSON.stringify(response.data));
        }
      })
    }
})
.controller('ConnectCtrl', function($scope, $state, findAdd, $ionicSlideBoxDelegate, Document, CountryList, List, $rootScope, $ionicModal, $ionicLoading, $timeout, $document, Compare, $cordovaGeolocation, findAdd, $timeout){
  $scope.username;
  $ionicSlideBoxDelegate.enableSlide(false);
  $scope.cancel = function(){
    $state.go('app.home');
  }
  $rootScope.OTPdata = {};
  $rootScope.spouseData;
  $scope.resendOTP = function(){
    Compare.findSpouse($rootScope.spouseData).then(function(response){
      if(response.data.SuccessStatus ==='Success'){
        $rootScope.OTPdata = response.data;
        console.log($rootScope.OTPdata);
        console.log($rootScope.spouseData);
        $scope.timeForTimer = 30;
        $scope.timer = 30;
        $scope.done = true;
        startTimer();
      }else {
        $ionicLoading.show({
          template:response.data.message, duration: 1500
        });
      }
    })
  }
  $scope.doSearch = function(data){
    if(data != undefined){
      console.log(data);
      $rootScope.spouseData = data;
      $ionicLoading.show({
        template: '<ion-spinner class="spinner-balanced" icon="bubbles"></ion-spinner>'
      });
      Compare.findSpouse(data).then(function(response){
        //console.log(response.data);
        if(response.data.SuccessStatus === 'Success'){
          $rootScope.OTPdata = response.data;
          //console.log($rootScope.OTPdata);
          //console.log($rootScope.spouseData);
          $ionicLoading.hide();
          //$ionicSlideBoxDelegate.enableSlide(true);
          $ionicSlideBoxDelegate.next();
          //$ionicSlideBoxDelegate.enableSlide(false);
          startTimer();
        }else {
          $ionicLoading.show({
            template:response.data.message, duration: 1500
          });
        }
      })
    }else{
      $ionicLoading.show({
    	  template: 'enter spouse details',
        duration: 1000
    	});
    }

  }
  $scope.slideChanged = function() {
    //console.log(index);
  };

  $scope.doVerify = function(data){
    if(data != undefined){
      if(data == $rootScope.OTPdata.OTP){
        Compare.addSpouse($rootScope.OTPdata.spouse_id).then(function(response){
          //$ionicSlideBoxDelegate.enableSlide(true);
          $ionicSlideBoxDelegate.next();
          //$ionicSlideBoxDelegate.enableSlide(false);
          window.localStorage.setItem('spouseID',$rootScope.OTPdata.spouse_id);
        })
      }else{
        $ionicLoading.show({
    	  template: 'Invalid OTP',
        duration: 1500
      	});
      }
    }else{
      $ionicLoading.show({
    	  template: 'enter otp recieved',
        duration: 1000
    	});
    }
  }
  $scope.doFinish = function(){
    $scope.compareModal.hide();
    $state.go('app.compare');
  }
  // Timer
    var mytimeout = null; // the current timeoutID
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function() {
      if ($scope.timer === 0) {
        $scope.$broadcast('timer-stopped', 0);
        $timeout.cancel(mytimeout);
        return;
      }
      $scope.timer--;
      mytimeout = $timeout($scope.onTimeout, 1000);
    };
    // functions to control the timer
    // starts the timer
    $scope.startTimer = function() {
      mytimeout = $timeout($scope.onTimeout, 1000);
      $scope.started = true;
    };

    // stops and resets the current timer
    $scope.stopTimer = function(closingModal) {
      if (closingModal != true) {
        $scope.$broadcast('timer-stopped', $scope.timer);
      }
      $scope.timer = $scope.timeForTimer;
      $scope.started = false;
      $scope.paused = false;
      $timeout.cancel(mytimeout);
    };
    // pauses the timer
    $scope.pauseTimer = function() {
      $scope.$broadcast('timer-stopped', $scope.timer);
      $scope.started = false;
      $scope.paused = true;
      $timeout.cancel(mytimeout);
    };

    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function(event, remaining) {
      if (remaining === 0) {
        $scope.done = true;
      }
    });
    // UI
    // When you press a timer button this function is called

      //$scope.timeForTimer = val;
      $scope.timer = 30;
      $scope.started = false;
      $scope.paused = false;
      $scope.done = false;


    // This function helps to display the time in a correct way in the center of the timer
    $scope.humanizeDurationTimer = function(input, units) {
      // units is a string with possible values of y, M, w, d, h, m, s, ms
      if (input == 0) {
        return 0;
      } else {
        var duration = moment().startOf('day').add(input, units);
        var format = "";
        if (duration.hour() > 0) {
          format += "H[h] ";
        }
        if (duration.minute() > 0) {
          format += "m[m] ";
        }
        if (duration.second() > 0) {
          format += "s[s] ";
        }
        return duration.format(format);
      }
    };
})
.controller('PlanListCtrl', function($scope, $state, PlanList){
  $scope.List = {};
  PlanList.list().then(function(response){
    $scope.List = response.data;
    console.log(response);
  });
  $scope.gotoname = function(plan_id, alphabet, gender)
  {
    var appctrl = "";
    localStorage.gender = gender;
    localStorage.alpha = alphabet;
    if(gender == "Male")
      appctrl = "nameListb";
    if(gender == "Female")
      appctrl = "nameListg";
    if(gender == "Unisex")
      appctrl = "nameLista";
    var go = "#app/"+appctrl;
    console.log(go);
    window.location.href=go;
      
  }
  $scope.addMorePlan = function(){
    $state.go('app.buyPlan');
  }
})
.controller('HomeCtrl', function($scope, $state, findAdd, $ionicSlideBoxDelegate, Document, CountryList, List, $rootScope, $ionicModal, $ionicLoading, $timeout, $document, Compare, $cordovaGeolocation, Payment,$stateParams) {
  //$scope.isSelected = false;
  $scope.sel = false;
  $scope.fav = true;

  $scope.isSelected = function(show) {
    return $scope.sel;
  };
  getCurrentPosition();
  $scope.payment = function(plan_available, alphabet, gender, plan)
  {
    //$scope.go("app.buyPlan");
    window.location.href="#/app/buyPlan";
  }
  function getCurrentPosition(){
    var posOptions = {timeout: 10000, enableHighAccuracy: false};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude
        var lng = position.coords.longitude
        console.log('Lat : '+lat+', lng : '+lng);
        findAdd.getAdd(lat,lng).then(function(response){
          var res = response.data.results[0].address_components;
          console.log(res[8]);
          for(i=0;i<res.length;i++){
            if(res[i].types[0] === "country"){
              window.localStorage.setItem('userLoc',res[i].short_name)
              console.log('Resp: '+res[i].short_name);
              console.log('Saved Loc: '+window.localStorage.getItem('userLoc'));
            }
          }
        })
      }, function(err) {
        // error
      });
  }
  $ionicModal.fromTemplateUrl('templates/planModal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.planModal = modal;
  });
  $scope.showPlan = function(){
    $scope.planModal.show();
  }
  $scope.close = function(){
    $scope.planModal.hide();
  }
  $scope.searchName = function(){
    if(window.localStorage.getItem('loggedIn') == 'true'){
      window.localStorage.setItem('name_tag', 1);
    }else{
      window.localStorage.setItem('name_tag', 0);
    }
    $state.go('app.searchname');
  }
  $scope.openCompare = function(){
    
    console.log('fwydgi');
  if(window.localStorage.getItem('loggedIn')){
    if(window.localStorage.getItem('spouseID')!= 0){
      $state.go('app.compare');
    }else {
      $state.go('app.connect');
    }
  }else{
    $ionicLoading.show({
    template: '<span class="mono">Please Login !!!</span>',
    duration: 1500
    });
    $state.go('login');
  }
  
}
  $scope.favList = function(){
    if(window.localStorage.getItem('loggedIn')){
      $state.go('app.favourites');
    }else{
      $ionicLoading.show({
  		  template: '<span class="mono">Please Login !!!</span>',
        duration: 1500
  		});
    }
  }
  //console.log(JSON.stringify($scope.countyList));
  $scope.nameList = function(){
    if(window.localStorage.getItem('loggedIn')){
      $state.go('app.select');
    }else{
      $ionicLoading.show({
  		  template: '<span class="mono">Please Login !!!</span>',
        duration: 1500
  		});
    }
  }
  $scope.viewUnique = function(){
    if(window.localStorage.getItem('loggedIn')){
      var temp = window.localStorage.getItem('viewUnique') || false;
      console.log('temp '+temp);
      if(temp){
        var paymentStatus = window.localStorage.getItem('activePlan') || false;
        console.log('activePlan '+paymentStatus);
        if(paymentStatus == 'False'){
          $state.go('app.buyPlan');
        }else {
          window.localStorage.setItem('name_tag', 2);
          $state.go('app.planList');
        }
      }else{
        window.localStorage.setItem('viewUnique',true);
        $state.go('app.aboutUnique');
      }
    }else{
      $ionicLoading.show({
  		  template: '<div class="mono" style="width:100%; font-size:100%">Please Login !!!</div>',
        duration: 1500,

  		});
    }
  }

  //openBuyPlan

})
.controller('BuyPlanCtrl', function($interval,$scope, $stateParams, List, $state, $http, $cordovaInAppBrowser, $rootScope) {
  $scope.price = [];

 

  $http.get("http://vps137395.vps.ovh.ca/baby3/public/app/planlist").success(function(data)
  {
    angular.forEach(data, function (value, key) {
      if(value.rate > 0)
      {
        $scope.price.push({plan: value.plan_name, price: value.rate+"#"+value.plan_id+"#"+value.plan_name});
      }
    });
  });
  $scope.options = {};
  $scope.choice = {};
  $scope.options.alpha = List.alphaList();
  $scope.options.gender = [
    {
      id: 0,
      name: 'BOY',
      value: 'Male'
    },
    {
      id: 1,
      name: 'GIRL',
      value: 'Female'
    },
    {
      id: 2,
      name: 'ALL',
      value: 'Unisex'
    }
  ];
  $scope.options.available = [
    {
    id: 0,
    name: 'By Alphabet',
    value: 'ba'
  },{
    id: 1,
    name: 'By Meaning',
    value: 'bm'
  },{
    id: 2,
    name: 'By Origin',
    value: 'bo'
  }
];
$scope.payment = function(plan_available, alphabet, gender, plan){

  //console.log(plan); 
  var plan_part = plan.split("#");
  var plan_price = plan_part[0];
  var plan_id = plan_part[1];
  var plan_name = plan_part[2];

  var txnid = "USBN-txn-"+Math.floor(Math.random() * 2222222222);

  localStorage.txnid = txnid;

  var pay_url = "http://vps137395.vps.ovh.ca/baby3/test_pay.php?plan_available="+plan_available+"&alphabet="+alphabet+"&gender="+gender+"&plan_price="+plan_price+"&plan_id="+plan_id+"&plan_name="+plan_name+"&firstname="+localStorage.fname+"&email="+localStorage.email+"&userid="+localStorage.userId+"&txnid="+localStorage.txnid;

  console.log(pay_url);

  var options = {
    location: 'no',
    clearcache: 'yes',
    toolbar: 'no'
  };
  localStorage.pay_status = "pending";
  $cordovaInAppBrowser.open(pay_url, '_blank', options)
  .then(function(event) {
    // success
  })
  .catch(function(event) {
    // error
  });

  $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
    
    $interval( function(){ 
      $http.post("http://vps137395.vps.ovh.ca/baby3/public/app/payment_status",{
        txnid: localStorage.txnid
      }).success(function(data){
        if(localStorage.pay_status != "pending")
        {
          console.log(data.status);
          if(data.status == "Success")
          {
            localStorage.pay_status = "success";
            $cordovaInAppBrowser.close();
            $ionicLoading.show({
              template: '<span class="mono">Payment Successful</span>',
              duration: 1500
            });
          }
        }
         })
     }, 3000);
      });
      $rootScope.$on('$cordovaInAppBrowser:loaderror', function(e, event){
        console.log("failure");
          });
        
          $rootScope.$on('$cordovaInAppBrowser:exit', function(e, event){
            //console.log("stop");
            $scope.go("app.planList");
            window.location.reload(true);
          });

  /*var browser = new $cordovaInAppBrowser(pay_url, '_self');

  browser.on('loadstop').subscribe(function(event){ 
    
      // do stuff here
    
    });*/

  var paymentStatus = window.localStorage.getItem('paymentStatus') || false;
  //console.log('paymentStatus '+paymentStatus);
  // $scope.options.alpha = List.alphaList();
  if(paymentStatus){
    window.localStorage.setItem('paymentStatus',false);

  }else {
     window.localStorage.setItem('paymentStatus',true);
     $state.go('app.planList');  //   $state.go('app.uniqueName');
  }
  $scope.openCompare = function(){
    console.log('fwydgi');
  if(window.localStorage.getItem('loggedIn')){
    if(window.localStorage.getItem('spouseID')!= 0){
      $state.go('app.compare');
    }else {
      $state.go('app.connect');
    }
  }else{
    $state.go('login');
  }
}
$scope.viewPlan = function(){
  $state.go('app.planList');
}
}

$scope.browse = function(){
  $state.go('app.browse');
}
//   Payment.paymoney().then(function(response){
//     console.log('payment'+JSON.stringify(response));
//             // window.localStorage.setItem("userId",response.data.txnid);
//             // window.localStorage.setItem("amount",response.data.amount);
//             // window.localStorage.setItem("productinfo",response.data.productinfo);
//             // window.localStorage.setItem("firstname",response.data.firstname);
//             // window.localStorage.setItem("email",response.data.email);
//             // window.localStorage.setItem("phone",response.data.phone);
//             //window.localStorage.setItem("userId",response.data.txnid);
//             //window.localStorage.setItem("userId",response.data.txnid);
// })
})
.controller("BookingProcess", function($scope)
{

})
.controller("PolicyShipping", function($scope)
{
  
})
.controller("ReturnPolicy", function($scope)
{
  
})
.controller('PreferencesCtrl', function($scope, $stateParams, List, $state) {
  $scope.options = {};
  $scope.choice = {};
  $scope.options.alpha = List.alphaList();
  $scope.options.meaning = [];
  List.olist().then(function(response){
    $scope.options.origin = response.data;
    console.log('fyugiu'+JSON.stringify($scope.options));
  })
  List.mlist().then(function(response){

    angular.forEach(response.data, function (value, key) {

      $scope.options.meaning.push(value);
      
    });

    //console.log($scope.options.meaning);
  })
  $scope.options.gender = [
    {
      id: 0,
      name: 'BOY',
      value: "Male"
    },
    {
      id: 1,
      name: 'GIRL',
      value: 'Female'
    },
    {
      id: 2,
      name: 'ALL',
      value: 'Unisex'
    }
  ];
  $scope.choice.alphabetId = window.localStorage.getItem('prefAlpha');
  $scope.choice.origin = window.localStorage.getItem('prefOrigin');
  $scope.choice.meaning = window.localStorage.getItem('prefMeaning');
  $scope.choice.gender = window.localStorage.getItem('prefGender');
  $scope.choice.fname = window.localStorage.getItem('fname');
  $scope.choice.user_pic = localStorage.user_pic;
  $scope.savePreferences = function() {
    window.localStorage.setItem('Preference', true);
    window.localStorage.setItem('prefAlpha', $scope.choice.alphabetId);
    window.localStorage.setItem('prefOrigin', $scope.choice.origin);
    window.localStorage.setItem('prefMeaning', $scope.choice.meaning);
    window.localStorage.setItem('prefGender', $scope.choice.gender);
    localStorage.user_pic = $scope.choice.user_pic;
    console.log(JSON.stringify($scope.choice));
    $state.go('app.home');
  }
});
