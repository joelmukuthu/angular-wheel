describe('Module: wheelie', function () {
    it('is created', function () {
        var app;
        expect(function () {
            app = angular.module('wheelie');
        }, 'not to error');
        expect(app, 'to be defined');
    });
});
