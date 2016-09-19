import {app} from '../ngModule';

export class FooDirective implements ng.IDirective {
    static Name: string = 'foo';
    restrict = 'EA';
    bindToController = true;
    scope = {};
    controller = FooController;
    controllerAs = 'vm';
    templateUrl = 'fooDirective/foo.html';
}

export class FooController {
    static Name: string = 'fooController';
    foo: string;
    constructor() {
        this.foo = 'foo';
    }
}

app.directive(FooDirective.Name, () => new FooDirective());
