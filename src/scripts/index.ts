import './fooDirective/foo';

angular.element(document).ready(function(){
    console.log('ready. bootstrapping app.');
    angular.bootstrap(document, ['app']);
});