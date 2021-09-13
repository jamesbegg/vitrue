import { StringReversal } from './app';
import * as fs from 'fs';

// File name
describe('app', () => {
    let app: StringReversal;
    beforeEach(() => {
        app = new StringReversal();
    });

    // Method name
    describe('stringIsReversible', () => {
        // Test name constructed from Assertion + Arrange
        test('should return true if the string is the same in reverse as the passed in value', () => {
            // Arrange
            const mirrorString = 'Top spot';

            // Action
            const value = app.stringIsReversible(mirrorString);

            // Assertion
            expect(value).toEqual(true);
        });

        test('should return false if the string is not the same in reverse as the passed in value', () => {
            const basicString = 'hello';

            const value = app.stringIsReversible(basicString);

            expect(value).toEqual(false);
        });
    });

    describe('stringsAreReversibleFromFile', () => {
        afterEach(() => {
            // @ts-ignore
            jest.spyOn(app, 'generateResultString').mockClear();
        });

        test('should create an array of the correct responses from generateResultString', () => {
            // @ts-ignore
            jest.spyOn(app, 'generateResultString').mockReturnValue('test');
            // @ts-ignore
            jest.spyOn(app, 'loadStrings').mockReturnValue();
            // @ts-ignore
            jest.spyOn(app, 'writeResultToFile').mockReturnValue('');
            app.strings = ['hello', 'hello'];

            app.stringsAreReversibleFromFile();

            expect(app.result).toEqual(['test', 'test'])
        })
    });

    describe('writeResultToFile', () => {
        test('should call writeFile when invoking writeResultToFile', () => {
            jest.spyOn(fs, 'writeFile').mockReturnValue();

            // @ts-ignore
            app.writeResultToFile();

            expect(fs.writeFile).toHaveBeenCalled();
        });
    });

    describe('loadStrings', () => {
        test('should set the value of strings to the result of readFileSync', () => {
            jest.spyOn(fs, 'readFileSync').mockReturnValue({ toString: () => 'testing' } as any);

            // @ts-ignore
            app.loadStrings();

            expect(app.strings).toEqual(['testing']);
        });
    });

    describe('removeWhiteSpaces', () => {
        test('should remove all the whitespaces from the string passed in if the string contains whitespaces', () => {
            const whiteSpaceString = 'Hello world from here';

            // @ts-ignore
            const value = app.removeWhiteSpaces(whiteSpaceString);

            expect(value).toEqual('Helloworldfromhere');
        });

        test('should just return the string if there are no whitespaces in the string provided', () => {
            const basicString = 'Hello';

            // @ts-ignore
            const value = app.removeWhiteSpaces(basicString);

            expect(value).toEqual('Hello');
        });
    });

    describe('reverse', () => {
        test('should reverse the string and return it', () => {
            const basicString = 'hello';

            // @ts-ignore
            const value = app.reverse(basicString);

            expect(value).toEqual('olleh');
        });
    });

    describe('generateResultString', () => {
        test('should return the result string including "NOT" if we pass in false for reversible', () => {
            // @ts-ignore
            jest.resetAllMocks();
            const str = 'test';

            // @ts-ignore
            const value = app.generateResultString(str, false);

            expect(value).toEqual(` test is NOT reversible`);
        });

        test('should return the result string not including "NOT" if we pass in true for reversible', () => {
            const str = 'test';

            // @ts-ignore
            const value = app.generateResultString(str, true);

            expect(value).toEqual(` test is reversible`);
        });
    });
});