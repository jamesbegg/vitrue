# String reversal application

## Using the application

### Option 1: Single word from terminal
You can pass a single word (no whitespace) in the terminal when calling `npm start`. So for example by doing `npm start noon` I would see "noon is reversible" logged to the console.

### Option 2: Multiple words from `src/words.txt` file
By adding multiple words seperated only by a comma (no whitespace) then we can do a large batch of words in 1 single go - the results are logged to the console, but are also saved to a `results.txt` file at the root.


## Assumptions
- Regular characters being used, and not surrogate pairs in UFT-16 strings

## Tooling

### Application build
- Typescript
- Node

### Testing
- Jest used as unit testing tool (ts-jest required to work with Typescript)
- Standard Arrange -> Action -> Assertion approach
- TDD (red/green/refactor) cycle used

### Code quality
- ESLint used (alongside VSC editor extension)