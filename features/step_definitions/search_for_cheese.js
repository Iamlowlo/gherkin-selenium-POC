const assert = require('assert');
const async = require('async');
const { Given, When, Then } = require('cucumber');
const { Builder, By, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

Given('I\'m browsing', function(){
    this.driver = new Builder()
        .forBrowser('chrome')
        .build();
});

Given('I go to the Google search page', function(next){
    this.driver.get('http://www.google.es').then(next);
});

When('I search for "{word}"', function(searchWord, next){
    async.waterfall([
        (cb) => {
            this.driver.findElement(By.name('q'))
                .then(element => {
                    cb(null, element)
                })
                .catch(err => {
                    cb(err)
                });
        },
        (element, cb) => {
            element.sendKeys(searchWord)
                .then(() => {
                    cb(null, element);
                })
                .catch(err => {
                    console.error('ERR => Error typing', err);
                    cb(err)
                });
        },
        (element, cb) => {
            element.submit()
                .then(cb)
                .catch(err => {
                    console.error('ERR => Error submitting', err);
                });
        }
    ], (err, result) => {
        if (!err) {
            next()
        }
    })
});

Then('the page title should start with "{word}"', function(string){
    this.driver.getTitle()
        .then((title) => {
            assert.equal(0, title.toLowerCase().lastIndexOf(string));
            this.driver.quit();
        })
        .catch(function(err) {
            console.error('ERR ==> the page title should start with "{word}"', err);
        });
});