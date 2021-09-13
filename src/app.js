"use strict";
exports.__esModule = true;
exports.StringReversal = void 0;
var fs_1 = require("fs");
var StringReversal = /** @class */ (function () {
    /**
     * If a string argument is passed in after the `npm start` command, then we just complete the check on that
     * argument, otherwise we load the strings from a file instead.
     */
    function StringReversal() {
        /** Result string to be saved to results.txt */
        this.result = [];
        process.argv[2] ? this.stringIsReversible(process.argv[2]) : this.stringsAreReversibleFromFile();
    }
    /**
     * Uses the assumptions that case and whitespaces are ignored, and indicates whether a string is the same read
     * forwards as it is backwards. Logs a string indicating result to the console, but also returns the result as
     * a boolean.
     *
     * @param str the string to check reversibility on
     * @returns true if the string is reversible
     */
    StringReversal.prototype.stringIsReversible = function (str) {
        var cleanString = this.removeWhiteSpaces(str).toLowerCase();
        var result = cleanString === this.reverse(cleanString);
        console.log(this.generateResultString(str, result));
        return result;
    };
    /**
     * Takes the strings seperated purely by a comma from the ./words.txt file and saves the result of the check into
     * the results.txt at the root.
     */
    StringReversal.prototype.stringsAreReversibleFromFile = function () {
        var _this = this;
        this.loadStrings();
        this.strings.forEach(function (str) { return _this.result.push(_this.generateResultString(str, _this.stringIsReversible(str))); });
        this.writeResultToFile();
    };
    /**
     * Takes the result class property, converts to string and then saves this at the root as results.txt
     */
    StringReversal.prototype.writeResultToFile = function () {
        (0, fs_1.writeFile)('./results.txt', this.result.toString(), function (e) { return console.log(e); });
    };
    /**
     * Loads the strings from the words.txt file and splits them at the comma in each place
     */
    StringReversal.prototype.loadStrings = function () {
        this.strings = (0, fs_1.readFileSync)('src/words.txt').toString().split(',');
    };
    /**
     * Removes any whitespaces in the string provided and returns the clean version
     * @param str the string to remove the whitespaces from
     * @returns clean whitespace free string
     */
    StringReversal.prototype.removeWhiteSpaces = function (str) {
        return str.split(' ').join('');
    };
    /**
     * Reverses a string and returns it
     */
    StringReversal.prototype.reverse = function (str) {
        return str.split('').reverse().join('');
    };
    /**
     * Creates the string to indicate the result - either 'reversible' or 'NOT reversible.
     * @param str the initial string passed in that the check is being done on
     * @param reversible boolean value if the string is reversible
     * @returns clean string value
     */
    StringReversal.prototype.generateResultString = function (str, reversible) {
        return " " + str + " is" + (reversible ? '' : ' NOT') + " reversible";
    };
    return StringReversal;
}());
exports.StringReversal = StringReversal;
new StringReversal();
