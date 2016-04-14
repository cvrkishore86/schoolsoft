angular
  .module('app').factory("userPersistenceService", ["$cookies", function($cookies) {
		var userName = "";

		return {
			setCookieData: function(username) {
				
				$cookies.put("userName", JSON.stringify(username));
			},
			getCookieData: function() {
				userName = $cookies.get("userName");
				return angular.fromJson(userName);
			},
			clearCookieData: function() {
				userName = "";
				$cookies.remove("userName");
			}
		}
	}
]);