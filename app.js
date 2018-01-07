var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.items = ['Батон', 'Кефир', 'Столярный клей', 'Молоко','Автоматввввввввв ввввввввввввввввв'];
}]);

app.directive('todoList',[function(){
    return {
        restrict: 'E',
        scope: {
            needBuyItems: '=items',
            purchasedItems: '='
        },
        replace: false,
        templateUrl: 'List.html',
        link: function (scope, element, attr) {
           scope.needBuy = undefined;
           scope.purchased = undefined;

           scope.btnClick = function() {
               scope.bindAttr = 'new Value from directive'
           };

           //Highlight on mouse
           scope.onMouseenter = function(idx, typeList){
               scope[typeList] = idx;
           };
           scope.onMouseleave = function(){
               scope.needBuy = undefined;
               scope.purchased = undefined;
           };

           scope.sendCheckedItems = function(inpTypeList, toTypeList) {
               debugger;
               var items = angular.element(document.querySelectorAll('.' + inpTypeList + ' .row-list'));
               var sendList = [];
               for (var i = 0; i < items.length; i++) {
                   var item = items[i];
                   if (angular.element(item.querySelectorAll('input')) && angular.element(item.querySelectorAll('input'))[0] &&
                       angular.element(item.querySelectorAll('input'))[0].type == "checkbox" && angular.element(item.querySelectorAll('input'))[0].checked == true) {
                       var itemText = item.querySelectorAll(".list-elem-text").textContent;
                       sendList.push(itemText);
                       if (scope[inpTypeList + 'List'].indexOf(itemText) != -1) {
                           scope[inpTypeList + 'List'].splice(scope[inpTypeList + 'List'].indexOf(itemText), 1);
                       }
                       scope[toTypeList + 'List'].push(itemText);
                   }
               }

           };

        }
    }
}]);