/**
 * Created by Q-Solutions Studio
 *
 * @category    Nanobots
 * @package     Nanobots_SessionTimeoutPopup
 * @author      Jakub Winkler <jwinkler@qsolutionsstudio.com>
 */
define([
    'jquery',
    'ko'
], function ($, ko) {
    'use strict';

    return {
        timeLeft: ko.observable(null),
        sessionTimedOut: ko.observable(false),

        initializeTimer: function (totalTime, warningTime = 100) {
            this.timeLeft(totalTime);
            let timeout = totalTime,
                interval = setInterval(function () {
                timeout--;

                this.timeLeft(timeout);

                // When the timer reaches 5 minutes
                if (totalTime === warningTime) {
                    console.error('Only 5 minutes left!');
                }

                // When the timer reaches 0
                if (this.timeLeft() <= 0) {
                    this.sessionTimedOut(true);
                    clearInterval(interval);
                    console.log('Timer ended.');
                }
            }.bind(this), 1000);
        },

        getTimeLeft: function () {
            return this.timeLeft();
        }
    };
});
