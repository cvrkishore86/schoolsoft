angular
  .module('app')
  .factory('AuthService', ['Schooluser', 'userPersistenceService', '$q', '$rootScope', function(Schooluser, userPersistenceService, $q,
      $rootScope) {
	  var currentUser ;
    function login(email, password) {
      return Schooluser
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
        	
          currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email,
            schoolId: response.user.schoolId,
            admin : response.user.admin,
            student :response.user.student,
            teacher : response.user.teacher
          };
          $rootScope.currentUser = currentUser;
          userPersistenceService.setCookieData(currentUser);
        });
    }

    function logout() {
      return Schooluser
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
         userPersistenceService.clearCookieData();
       });
    }
    
    function getCurrentUser() {
    	return currentUser;
    }

    function register(email, password) {
      return Schooluser
        .create({
         email: email,
         password: password
       })
       .$promise;
    }

    return {
      login: login,
      logout: logout,
      register: register,
      getCurrentUser : getCurrentUser
    };
  }]);
