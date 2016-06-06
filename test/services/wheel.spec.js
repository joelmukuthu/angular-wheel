describe('Service: jmWheel', function () {
    var element;

    beforeEach(module('jm.wheel'));

    beforeEach(function () {
        var html = [
            '<div style="height: 100px; overflow: auto">',
            '<div style="height: 1000px"></div>',
            '</div>'
        ].join('');
        element = angular.element(html);
        angular.element(document).find('body').append(element);
    });

    afterEach(function () {
        angular.element(document).find('body').empty();
    });

    it('provides a \'bind\' function and an \'unbind\' function', inject(function (jmWheel) {
        expect(jmWheel.bind, 'to be a function');
        expect(jmWheel.unbind, 'to be a function');
    }));

    describe('.bind', function () {
        var jmWheel;

        beforeEach(inject(function (_jmWheel_) {
            jmWheel = _jmWheel_;
        }));

        it('throws an error if an \'up\' callback is provided but is not a function', function () {
            expect(function () {
                jmWheel.bind(element, {
                    up: 1
                });
            }, 'to throw', new Error('The \'up\' callback must be a function'));
        });

        it('throws an error if a \'down\' callback is provided but is not a function', function () {
            expect(function () {
                jmWheel.bind(element, {
                    down: ''
                });
            }, 'to throw', new Error('The \'down\' callback must be a function'));
        });

        it('throws an error if neither \'up\' or \'down\' callbacks are provided', function () {
            expect(function () {
                jmWheel.bind(element, {});
            }, 'to throw', new Error('At least one callback (\'up\' or \'down\') must be provided'));
        });

        it('does not throw an error if only an \'up\' callback is provided', function () {
            expect(function () {
                jmWheel.bind(element, {
                    up: function () {}
                });
            }, 'not to error');
        });

        it('does not throw an error if only a \'down\' callback is provided', function () {
            expect(function () {
                jmWheel.bind(element, {
                    down: function () {}
                });
            }, 'not to error');
        });

        it('stores a reference to the \'bindWheel\' function in the element\'s data', function () {
            jmWheel.bind(element, {
                down: function () {},
                up: function () {}
            });
            expect(element.data('___jmWheel_bindWheel___'), 'to be a function');
        });
    });

    describe('when bound to an element', function () {
        var upSpy,
            downSpy;

        beforeEach(inject(function (_jmWheel_) {
            upSpy = sinon.spy().named('mousewheelUp');
            downSpy = sinon.spy().named('mousewheelDown');

            _jmWheel_.bind(element, {
                up: upSpy,
                down: downSpy
            });
        }));

        it('calls the \'up\' callback with the event on mousewheel up', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: 120,
                detail: -120,
                deltaY: -120
            });
            expect(upSpy, 'to have calls satisfying', function () {
                upSpy({
                    type: 'wheel',
                    wheelDelta: 120,
                    detail: -120,
                    deltaY: -120
                });
            });
        });

        it('calls the \'down\' callback with the event on mousewheel down', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: -120,
                detail: 120,
                deltaY: 120
            });
            expect(downSpy, 'to have calls satisfying', function () {
                downSpy({
                    type: 'wheel',
                    wheelDelta: -120,
                    detail: 120,
                    deltaY: 120
                });
            });
        });

        it('does not call the \'up\' callback on mousewheel down', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: -120,
                detail: 120,
                deltaY: 120
            });
            expect(upSpy, 'was not called');
        });

        it('does not call the \'down\' callback on mousewheel up', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: 120,
                detail: -120,
                deltaY: -120
            });
            expect(downSpy, 'was not called');
        });

      // from a bug report: https://github.com/joelmukuthu/angular-snapscroll/issues/16
        it('does not call any callback if mousewheel delta is 0', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: 0,
                detail: 0,
                deltaY: 0
            });
            expect(upSpy, 'was not called');
            expect(downSpy, 'was not called');
        });

        it('does not call any callback if mousewheel delta is NaN', function () {
            element.triggerHandler({
                type: 'wheel',
                wheelDelta: NaN,
                detail: NaN,
                deltaY: NaN
            });
            expect(upSpy, 'was not called');
            expect(downSpy, 'was not called');
        });

        it('uses event.originalEvent to get the mousewheel delta if the property is set', function () {
            element.triggerHandler({
                type: 'wheel',
                // this represents mousewheel up
                deltaY: -120,
                // but this represents mousewheel down
                originalEvent: {
                    deltaY: 120
                }
            });

            expect(upSpy, 'was not called');
            expect(downSpy, 'to have calls satisfying', function () {
                downSpy({
                    deltaY: 120
                });
            });
        });
    });

    describe('.unbind', function () {
        var upSpy,
            downSpy,
            jmWheel;

        beforeEach(inject(function (_jmWheel_) {
            jmWheel = _jmWheel_;
            upSpy = sinon.spy().named('mousewheelUp');
            downSpy = sinon.spy().named('mousewheelDown');

            jmWheel.bind(element, {
                up: upSpy,
                down: downSpy
            });
        }));

        it('unsets the reference to the \'bindWheel\' function in the element\'s data', function () {
            jmWheel.unbind(element);
            expect(element.data('___jmWheel_bindWheel___'), 'to be null');
        });

        it('prevents further calling of the \'up\' and \'down\' callbacks', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(upSpy, 'to have calls satisfying', function () {
                upSpy({
                    type: 'wheel',
                    deltaY: -120
                });
            });

            element.triggerHandler({
                type: 'wheel',
                deltaY: 120
            });
            expect(downSpy, 'to have calls satisfying', function () {
                downSpy({
                    type: 'wheel',
                    deltaY: 120
                });
            });

            upSpy.reset();
            downSpy.reset();
            jmWheel.unbind(element);

            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(upSpy, 'was not called');

            element.triggerHandler({
                type: 'wheel',
                deltaY: 120
            });
            expect(downSpy, 'was not called');
        });

        it('does not unbind if the reference to the \'bindWheel\' function in the element\'s data does not exist', function () {
            element.data('___jmWheel_bindWheel___', null);
            jmWheel.unbind(element);

            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(upSpy, 'to have calls satisfying', function () {
                upSpy({
                    type: 'wheel',
                    deltaY: -120
                });
            });
        });

        it('does not unbind if the reference to the \'bindWheel\' function in the element\'s data is not a function', function () {
            element.data('___jmWheel_bindWheel___', true);
            jmWheel.unbind(element);

            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(upSpy, 'to have calls satisfying', function () {
                upSpy({
                    type: 'wheel',
                    deltaY: -120
                });
            });
        });
    });
});
