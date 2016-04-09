angular
  .module('app')
  .factory('AuthService', ['Schooluser', '$q', '$rootScope', function(Schooluser, $q,
      $rootScope) {
    function login(email, password) {
      return Schooluser
        .login({email: email, password: password})
        .$promise
        .then(function(response) {
          
          $rootScope.currentUser = {
            id: response.user.id,
            tokenId: response.id,
            email: email,
            schoolId: response.user.schoolId,
            admin : response.user.admin,
            student :response.user.student,
            teacher : response.user.teacher
          };
        });
    }

    function logout() {
      return Schooluser
       .logout()
       .$promise
       .then(function() {
         $rootScope.currentUser = null;
         
       });
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
      register: register
    };
  }]);
