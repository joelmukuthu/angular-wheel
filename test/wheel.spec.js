describe('Module: jm.wheel', function () {
    it('is created', function () {
        var app;
        expect(function () {
            app = angular.module('jm.wheel');
        }, 'not to error');
        expect(app, 'to be defined');
    });
});
