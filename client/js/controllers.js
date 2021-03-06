'use strict';

/* Controllers */

angular.module('angular-client-side-auth')

	.controller('NavCtrl',
		['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
			$scope.user = Auth.user;
			$scope.userRoles = Auth.userRoles;
			$scope.accessLevels = Auth.accessLevels;

			$scope.logout = function () {
				Auth.logout(function () {
					$location.path('/login');
				}, function () {
					$rootScope.error = "Failed to logout";
				});
			};
		}])

	.controller('LoginCtrl',
		['$rootScope', '$scope', '$location', '$window', 'Auth', function ($rootScope, $scope, $location, $window, Auth) {
			$scope.rememberme = true;
			$scope.login = function () {
				Auth.login({
						email: $scope.email,
						password: $scope.password,
						rememberme: $scope.rememberme
					},
					function (res) {
						$location.path('/');
					},
					function (err) {
						$rootScope.error = "Failed to login";
					});
			};

			$scope.loginOauth = function (provider) {
				$window.location.href = '/auth/' + provider;
			};
		}])

	.controller('HomeCtrl', ['$rootScope', function ($rootScope) {

	}])

	.controller('RegisterCtrl',
		['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
			$scope.role = Auth.userRoles.user;
			$scope.userRoles = Auth.userRoles;

			$scope.register = function () {
				Auth.register({
						username: $scope.username,
						email: $scope.email,
						password: $scope.password,
						role: $scope.role
					},
					function () {
						$location.path('/');
					},
					function (err) {
						$rootScope.error = err;
					});
			};
		}])

	.controller('PrivateCtrl',
		['$rootScope', function ($rootScope) {

		}])

	.controller('AdminCtrl',
		['$rootScope', '$scope', 'Users', 'Auth', function ($rootScope, $scope, Users, Auth) {
			$scope.loading = true;
			$scope.userRoles = Auth.userRoles;

			Users.getAll(function (res) {
				$scope.users = res;
				$scope.loading = false;
			}, function (err) {
				$rootScope.error = "Failed to fetch users.";
				$scope.loading = false;
			});

		}]);

