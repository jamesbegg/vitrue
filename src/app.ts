import { readFileSync, writeFile } from 'fs';

export class StringReversal {
    /** Strings loaded from words.txt file */
    public strings: string[];
    /** Result string to be saved to results.txt */
    public result: string[] = [];

    /**
     * If a string argument is passed in after the `npm start` command, then we just complete the check on that
     * argument, otherwise we load the strings from a file instead.
     */
    constructor() {
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
    public stringIsReversible(str: string): boolean {
        const cleanString = this.removeWhiteSpaces(str).toLowerCase();

        const result = cleanString === this.reverse(cleanString);

        console.log(this.generateResultString(str, result));
        return result;
    }

    /**
     * Takes the strings seperated purely by a comma from the ./words.txt file and saves the result of the check into
     * the results.txt at the root.
     */
    public stringsAreReversibleFromFile(): void {
        this.loadStrings();

        this.strings.forEach(str => this.result.push(this.generateResultString(str, this.stringIsReversible(str))));

        this.writeResultToFile();
    }

    /**
     * Takes the result class property, converts to string and then saves this at the root as results.txt
     */
    private writeResultToFile(): void {
        writeFile('./results.txt', this.result.toString(), (e) => console.log(e));
    }

    /**
     * Loads the strings from the words.txt file and splits them at the comma in each place
     */
    private loadStrings(): void {
        this.strings = readFileSync('src/words.txt').toString().split(',');
    }

    /**
     * Removes any whitespaces in the string provided and returns the clean version
     * @param str the string to remove the whitespaces from
     * @returns clean whitespace free string
     */
    private removeWhiteSpaces(str: string): string {
        return str.split(' ').join('');
    }

    /**
     * Reverses a string and returns it
     */
    private reverse(str: string): string {
        return str.split('').reverse().join('');
    }

    /**
     * Creates the string to indicate the result - either 'reversible' or 'NOT reversible.
     * @param str the initial string passed in that the check is being done on
     * @param reversible boolean value if the string is reversible
     * @returns clean string value
     */
    private generateResultString(str: string, reversible: boolean): string {
        return ` ${str} is${reversible ? '' : ' NOT'} reversible`;
    }
}

new StringReversal();
