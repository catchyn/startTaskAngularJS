var app = angular.module('app', ['dndLists']);

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

           var formObj = function(list) {
              var resList = [];
              for (var i = 0; i < list.length; i++ ) {
                  var obj = {};
                  obj["label"] = "elem" + i;
                  obj["item"] = list[i];
                  resList.push(obj);
              }
              return resList;
           };

           scope.initItems   = formObj(scope.initItems);
           scope.resultItems = formObj(scope.resultItems);

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

                           scope[inTypeList + 'Items']["item"] = scope[inTypeList + 'Items']["item"] || [];
                           if (scope[inTypeList + 'Items']["item"].indexOf(itemText) != -1) {
                               scope[inTypeList + 'Items']["item"].splice(scope[inTypeList + 'Items']["item"].indexOf(itemText), 1);
                           }

                           scope[toTypeList + 'Items']["item"] = scope[toTypeList + 'Items']["item"] || [];
                           scope[toTypeList + 'Items']["item"].push(itemText);
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

           scope.models = {
               selected: null,
               lists: {
                   'init': scope.initItems,
                   'result': scope.resultItems
               }
           };

           scope.deleteElement = function(typeList, idx){
               scope.models.lists[typeList].splice(idx, 1);
           };

            scope.$watch('models', function (model) {
                scope.modelAsJson = angular.toJson(model, true);
            }, true);
        }
    }
}]);