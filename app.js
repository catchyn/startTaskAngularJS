var app = angular.module('app', ['dndLists']);

app.controller('MainCtrl', ['$scope', function ($scope) {
    $scope.items = [
        {
            text: 'Батон',
            num: 2,
            sysname: 'bread'
        },
        {
            text: 'Кефир',
            num: 1,
            sysname: 'chefir'
        },
        {
            text: 'Яблоко',
            num: 1,
            sysname: 'Apple'
        },
        {
            text: 'Молоко',
            num: 2,
            sysname: 'milk'
        },
        {
            text: 'Очень длинное название очень длинное название чень длинное название',
            num: 1,
            sysname: 'long'
        }
    ];
}]);

app.directive('todoList', [function(){
    return {
        restrict: 'E',
        scope: {
            initItems: '=',
            initTitle: '@',
            initValue: '@',
            initText: '@',
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

           //TODO: Сделать проверку на тип данных
           var formObj = function(list) {
              var resList = [];
              for (var i = 0; i < list.length; i++ ) {
                  var obj = list[i];
                  obj["label"] = obj[scope.initValue];
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
               var deleteItemCount = 0;
               for (var i = 0; i < items.length; i++) {
                   var item = items[i];
                   if (angular.element(item.querySelectorAll('input')) && angular.element(item.querySelectorAll('input'))[0] &&
                       angular.element(item.querySelectorAll('input'))[0].type == "checkbox" && angular.element(item.querySelectorAll('input'))[0].checked == true) {
                           scope[toTypeList + 'Items'].push(scope[inTypeList + 'Items'][i - deleteItemCount]);
                           scope[inTypeList + 'Items'].splice(i - deleteItemCount, 1);
                           deleteItemCount++;
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