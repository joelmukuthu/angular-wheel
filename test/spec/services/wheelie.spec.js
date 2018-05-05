describe('Service: wheelie', function () {
    var element;

    beforeEach(module('wheelie'));

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

    it('provides a \'bind\' function and an \'unbind\' function', inject(function (wheelie) {
        expect(wheelie.bind, 'to be a function');
        expect(wheelie.unbind, 'to be a function');
    }));

    describe('.bind', function () {
        var wheelie;

        beforeEach(inject(function (_wheelie_) {
            wheelie = _wheelie_;
        }));

        it('throws an error if an \'up\' callback is provided but is not a function', function () {
            expect(function () {
                wheelie.bind(element, {
                    up: 1
                });
            }, 'to throw', new Error('The \'up\' callback must be a function'));
        });

        it('throws an error if a \'down\' callback is provided but is not a function', function () {
            expect(function () {
                wheelie.bind(element, {
                    down: ''
                });
            }, 'to throw', new Error('The \'down\' callback must be a function'));
        });

        it('throws an error if a \'left\' callback is provided but is not a function', function () {
            expect(function () {
                wheelie.bind(element, {
                    left: 1
                });
            }, 'to throw', new Error('The \'left\' callback must be a function'));
        });

        it('throws an error if an \'right\' callback is provided but is not a function', function () {
            expect(function () {
                wheelie.bind(element, {
                    right: 1
                });
            }, 'to throw', new Error('The \'right\' callback must be a function'));
        });

        it('throws an error if no callbacks are provided', function () {
            expect(function () {
                wheelie.bind(element, {});
            }, 'to throw', new Error(
                'At least one callback (\'up\', \'down\', \'left\' or \'right\') must be provided'
            ));
        });

        it('does not throw an error if only an \'up\' callback is provided', function () {
            expect(function () {
                wheelie.bind(element, {
                    up: function () {}
                });
            }, 'not to error');
        });

        it('does not throw an error if only a \'down\' callback is provided', function () {
            expect(function () {
                wheelie.bind(element, {
                    down: function () {}
                });
            }, 'not to error');
        });

        it('does not throw an error if only a \'left\' callback is provided', function () {
            expect(function () {
                wheelie.bind(element, {
                    left: function () {}
                });
            }, 'not to error');
        });

        it('does not throw an error if only a \'right\' callback is provided', function () {
            expect(function () {
                wheelie.bind(element, {
                    right: function () {}
                });
            }, 'not to error');
        });

        it('stores a reference to the \'bindWheel\' function in the element\'s data', function () {
            wheelie.bind(element, {
                down: function () {},
                up: function () {}
            });
            expect(element.data('___wheelie_bindWheel___'), 'to be a function');
        });
    });

    describe('when bound to an element', function () {
        var upSpy;
        var downSpy;
        var leftSpy;
        var rightSpy;

        beforeEach(inject(function (_wheelie_) {
            upSpy = sinon.spy().named('wheelUp');
            downSpy = sinon.spy().named('wheelDown');
            leftSpy = sinon.spy().named('wheelLeft');
            rightSpy = sinon.spy().named('wheelRight');

            _wheelie_.bind(element, {
                up: upSpy,
                down: downSpy,
                left: leftSpy,
                right: rightSpy
            });
        }));

        it('calls the \'up\' callback with the event on wheel up', function () {
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

        it('calls the \'down\' callback with the event on wheel down', function () {
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
        });

        it('calls the \'left\' callback with the event on wheel left', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: -120
            });
            expect(leftSpy, 'to have calls satisfying', function () {
                leftSpy({
                    type: 'wheel',
                    deltaX: -120
                });
            });
        });

        it('calls the \'right\' callback with the event on wheel right', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: 120
            });
            expect(rightSpy, 'to have calls satisfying', function () {
                rightSpy({
                    type: 'wheel',
                    deltaX: 120
                });
            });
        });

        it('does not call the \'up\' callback on wheel down', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaY: 120
            });
            expect(upSpy, 'was not called');
        });

        it('does not call the \'down\' callback on wheel up', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(downSpy, 'was not called');
        });

        it('does not call the \'up\' callback on wheel left', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: -120
            });
            expect(upSpy, 'was not called');
        });

        it('does not call the \'down\' callback on wheel right', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: 120
            });
            expect(downSpy, 'was not called');
        });

        it('does not call the \'left\' callback on wheel up', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaY: -120
            });
            expect(leftSpy, 'was not called');
        });

        it('does not call the \'right\' callback on wheel down', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaY: 120
            });
            expect(leftSpy, 'was not called');
        });

        // from a bug report: https://github.com/joelmukuthu/angular-snapscroll/issues/16
        it('does not call any callback if wheel delta is 0', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: 0,
                deltaY: 0
            });
            expect(upSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
            expect(rightSpy, 'was not called');
        });

        it('does not call any callback if wheel delta is undefined', function () {
            element.triggerHandler({
                type: 'wheel',
                deltaX: undefined,
                deltaY: undefined
            });
            expect(upSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
            expect(rightSpy, 'was not called');
        });

        it('uses event.originalEvent to get the wheel delta if the property is set', function () {
            element.triggerHandler({
                type: 'wheel',
                // this represents wheel up
                deltaY: -120,
                // but this represents wheel down
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
            wheelie;

        beforeEach(inject(function (_wheelie_) {
            wheelie = _wheelie_;
            upSpy = sinon.spy().named('wheelUp');
            downSpy = sinon.spy().named('wheelDown');

            wheelie.bind(element, {
                up: upSpy,
                down: downSpy
            });
        }));

        it('unsets the reference to the \'bindWheel\' function in the element\'s data', function () {
            wheelie.unbind(element);
            expect(element.data('___wheelie_bindWheel___'), 'to be null');
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

            upSpy.resetHistory();
            downSpy.resetHistory();
            wheelie.unbind(element);

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
            element.data('___wheelie_bindWheel___', null);
            wheelie.unbind(element);

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
            element.data('___wheelie_bindWheel___', true);
            wheelie.unbind(element);

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

    describe('when bound with a class-name to ignore', function () {
        var upSpy;
        var downSpy;
        var leftSpy;
        var rightSpy;
        var ignoredElement;
        var elementNotIgnored;

        beforeEach(inject(function (_wheelie_) {
            var html = [
                '<div style="height: 100px; overflow: auto">',
                '<div style="height: 1000px">',
                '<div class="ignore-me">',
                '</div>',
                '<div class="do-not-ignore-me">',
                '</div>',
                '</div>',
                '</div>'
            ].join('');

            var element = angular.element(html);
            angular.element(document).find('body').append(element);

            ignoredElement = document.querySelector('div.ignore-me');
            elementNotIgnored = document.querySelector('div.do-not-ignore-me');

            upSpy = sinon.spy().named('wheelUp');
            downSpy = sinon.spy().named('wheelDown');
            leftSpy = sinon.spy().named('wheelLeft');
            rightSpy = sinon.spy().named('wheelRight');

            _wheelie_.bind(element, {
                up: upSpy,
                down: downSpy,
                left: leftSpy,
                right: rightSpy
            }, 'ignore-me');
        }));

        function createWheelEvent(deltaObject) {
            // ideally: return new WheelEvent('wheel', deltaObject); but
            // PhantomJS doesn't support it: https://github.com/ariya/phantomjs/issues/11289
            var event = document.createEvent('WheelEvent');
            event.initEvent('wheel', true, true);
            Object.keys(deltaObject).forEach(function (key) {
                event[key] = deltaObject[key];
            });
            return event;
        }

        function trigger(element, event) {
            // would use triggerHandler but it doesn't bubble the event up
            element.dispatchEvent(event);
        }

        it('does not call any callback on wheel up on an element with the ignored class-name', function () {
            trigger(ignoredElement, createWheelEvent({
                deltaY: -120
            }));
            expect(upSpy, 'was not called');
            expect(rightSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
        });

        it('does not call any callback on wheel down on an element with the ignored class-name', function () {
            trigger(ignoredElement, createWheelEvent({
                deltaY: 120
            }));
            expect(upSpy, 'was not called');
            expect(rightSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
        });

        it('does not call any callback on wheel left on an element with the ignored class-name', function () {
            trigger(ignoredElement, createWheelEvent({
                deltaX: -120
            }));
            expect(upSpy, 'was not called');
            expect(rightSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
        });

        it('does not call any callback on wheel right on an element with the ignored class-name', function () {
            trigger(ignoredElement, createWheelEvent({
                deltaX: 120
            }));
            expect(upSpy, 'was not called');
            expect(rightSpy, 'was not called');
            expect(downSpy, 'was not called');
            expect(leftSpy, 'was not called');
        });

        it('calls the \'up\' callback on wheel up on an element not containing the ignored class-name', function () {
            trigger(elementNotIgnored, createWheelEvent({
                deltaY: -120
            }));
            expect(upSpy, 'to have calls satisfying', function () {
                upSpy({
                    type: 'wheel',
                    deltaY: -120
                });
            });
        });

        it('calls the \'down\' callback on wheel down on an element not containing the ignored class-name', function () {
            trigger(elementNotIgnored, createWheelEvent({
                deltaY: 120
            }));
            expect(downSpy, 'to have calls satisfying', function () {
                downSpy({
                    type: 'wheel',
                    deltaY: 120
                });
            });
        });

        it('calls the \'left\' callback on wheel left on an element not containing the ignored class-name', function () {
            trigger(elementNotIgnored, createWheelEvent({
                deltaX: -120
            }));
            expect(leftSpy, 'to have calls satisfying', function () {
                leftSpy({
                    type: 'wheel',
                    deltaX: -120
                });
            });
        });

        it('calls the \'right\' callback on wheel right on an element not containing the ignored class-name', function () {
            trigger(elementNotIgnored, createWheelEvent({
                deltaX: 120
            }));
            expect(rightSpy, 'to have calls satisfying', function () {
                rightSpy({
                    type: 'wheel',
                    deltaX: 120
                });
            });
        });
    });
});
