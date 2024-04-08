/**
 * Created by Q-Solutions Studio
 *
 * @category    Nanobots
 * @package     Nanobots_SessionTimeoutPopup
 * @author      Jakub Winkler <jwinkler@qsolutionsstudio.com>
 */
define(
    [
        'jquery',
        'ko',
        'mage/url',
        'uiComponent',
        'Magento_Customer/js/customer-data',
        'Magento_Ui/js/modal/modal',
        'Nanobots_SessionTimeoutPopup/js/model/timer'
    ],
    function ($, ko, urlBuilder, Component, customerData, modal, timer) {
        'use strict';

        return Component.extend({
            isActive: ko.observable(false),
            popupVisible: ko.observable(false),
            defaults: {
                template: 'Magento_Checkout/payment',
                mainPopupTitle: ko.observable('You will be logged out in:'),
                loggedOutMessage: 'You have been logged out. Click the button below to log back in:',
                loginButtonTitle: 'Login',
                activeMethod: '',
                sessionLifetime: 60,
                sessionTimeoutWarning: 30
            },

            initialize: function () {
                this._super();

                this.isActive.subscribe(function (data) {
                    if (data === true) {
                        timer.initializeTimer(this.sessionLifetime);
                    }
                }.bind(this));

                timer.timeLeft.subscribe(function (data) {
                    if (data <= this.sessionTimeoutWarning) {
                        this.popupVisible(true);
                    }

                    if (data <= 0) {
                        this.mainPopupTitle(this.loggedOutMessage);
                    }
                }.bind(this));

                this.popupVisible.subscribe(function (data) {
                   if (data === true) {
                       $('.popup-wrap').fadeIn(500);
                       $('.popup-box').removeClass('transform-out').addClass('transform-in');
                   }
                });

                /** initialize the timer when the customer logs in for the first time */
                let customer = customerData.get('customer');

                customer.subscribe(function (data) {
                    if (data.firstname) {
                        this.isActive(true);
                    }
                }, this);

                /** initialize the timer when customer is logged in */
                if (this.isCustomerLoggedIn()) {
                    this.isActive(true);
                }
            },

            /**
             *
             * @returns {boolean}
             */
            isCustomerLoggedIn: function () {
                const customerInfo = customerData.get('customer')();

                if (customerInfo.firstname && customerInfo.fullname) {
                    return true;
                }

                return false;
            },

            /**
             *
             * @returns {boolean}
             */
            isSessionTimedOut: function () {
                return timer.sessionTimedOut();
            },

            /**
             *
             * @returns {string|*}
             */
            getLoggedOutMessage: function () {
                return this.loggedOutMessage;
            },

            getButtonTitle: function () {
                return this.loginButtonTitle;
            },

            /**
             *
             * @returns {*}
             */
            getTimeLeft: function () {
                return timer.getTimeLeft();
            },

            /**
             *
             * @param seconds
             * @returns {`${string}:${string}:${string}`}
             */
            formatTimeLeft: function (seconds) {
                seconds = this.getTimeLeft();

                const hours = Math.floor(seconds / 3600),
                    minutes = Math.floor(seconds % 3600 / 60),
                    secondsLeft = seconds % 60,

                    paddedHours = String(hours).padStart(2, '0'),
                    paddedMinutes = String(minutes).padStart(2, '0'),
                    paddedSeconds = String(secondsLeft).padStart(2, '0');

                // Format the time string
                return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
            },

            /**
             *
             */
            loginClick: function () {
                window.location.href = urlBuilder.build('customer/account/login');
            }
        });
    }
);
