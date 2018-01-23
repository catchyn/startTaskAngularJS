var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.items = ['Батон', 'Кефир', 'Столярный клей', 'Молоко','Автоматввввввввв ввввввввввввввввв'];
}]);

app.directive('todoList', [function(){
    return {
        restrict: 'E',
        scope: {
            initItems: '=',
            initTitle: '@',
            resultTitle: '@',
            multiSelect: '@'
        },
        replace: false,
        templateUrl: 'list.html',
        link: function (scope, element, attr) {
           scope.initIdx   = undefined;
           scope.resultIdx = undefined;
           scope.initCbShow = false;
           scope.resultCbShow = false;
           scope.resultItems = [];

           scope.btnClick = function() {
               scope.bindAttr = 'new Value from directive'
           };

           //Highlight on mouse
           scope.onMouseenter = function(idx, typeList){
               scope[typeList + 'Idx'] = idx;
           };
           scope.onMouseleave = function(){
               scope.initIdx = undefined;
               scope.resultIdx = undefined;
           };

           scope.checkedItem = function(typeList, idx, value) {
               if (scope[typeList + 'CbShow'] == true) {
                   var items = angular.element(document.querySelectorAll('.' + typeList + ' .row-list'));
                   var cbObj = angular.element(items[idx].querySelector('input'))[0];
                   if (value !== undefined) {
                       cbObj.checked = value;
                   } else {
                       cbObj.checked = !cbObj.checked;
                   }
               }
           };

           scope.sendCheckedItems = function(inTypeList, toTypeList) {
               var items = angular.element(document.querySelectorAll('.' + inTypeList + ' .row-list'));
               for (var i = 0; i < items.length; i++) {
                   var item = items[i];
                   if (angular.element(item.querySelectorAll('input')) && angular.element(item.querySelectorAll('input'))[0] &&
                       angular.element(item.querySelectorAll('input'))[0].type == "checkbox" && angular.element(item.querySelectorAll('input'))[0].checked == true) {
                           var itemText = angular.element(item.querySelectorAll(".list-elem-text"))[0].textContent;

                           scope[inTypeList + 'Items'] = scope[inTypeList + 'Items'] || [];
                           if (scope[inTypeList + 'Items'].indexOf(itemText) != -1) {
                               scope[inTypeList + 'Items'].splice(scope[inTypeList + 'Items'].indexOf(itemText), 1);
                           }

                           scope[toTypeList + 'Items'] = scope[toTypeList + 'Items'] || [];
                           scope[toTypeList + 'Items'].push(itemText);
                   }
               }
           };

           scope.checkFewItems = function(typeList) {
               scope[typeList + 'CbShow'] = !scope[typeList + 'CbShow'];
           };

           scope.checkAllItems = function(typeList) {
               var items = angular.element(document.querySelectorAll('.' + typeList + ' .row-list'));
               for (var i = 0; i < items.length; i++) {
                   scope.checkedItem(typeList, i, true);
               }
           };

           scope.unCheckAllItems = function(typeList) {
               var items = angular.element(document.querySelectorAll('.' + typeList + ' .row-list'));
               for (var i = 0; i < items.length; i++) {
                   scope.checkedItem(typeList, i, false);
               }
           };
        }
    }
}]);