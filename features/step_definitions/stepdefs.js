const assert = require('assert');
const { Given, When, Then } = require('cucumber');


const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');



const isItFriday = function(today) {
    return today === 'Friday'
};

Given('today is {string}', function (day) {
    this.today = day
});

When('I ask whether it\'s Friday yet', function () {
    this.actualAnswer = isItFriday(this.today) ? 'Yep' : 'Nope'
});

Then('I should be told {string}', function (expectedAnswer) {
    assert.equal(this.actualAnswer, expectedAnswer)
});