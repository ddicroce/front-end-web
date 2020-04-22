describe('functions', () => {

    describe('declaring them', () => {
        it('two different kinds and three ways', () => {


            // named functions
            function add(a: number, b: number): number {
                return a + b;
            }

            function logIt(message: string): void {
                console.log(message);
            }

            // anonymous functions

            const subtract = function (a: number, b: number): number {
                return a - b;
            }

            const multiply = (a: number, b: number) => a * b;

            const divide = (a: number, b: number) => {
                if (b === 0) {
                    console.log('You almost opened a black hole! You cannot divide by zero!');
                    return;
                } else {
                    return a / b;
                }
            }
            expect(add(2, 2)).toBe(4);
            expect(subtract(10, 2)).toBe(8);
            expect(multiply(5, 5)).toBe(25);
            expect(divide(20, 2)).toBe(10);
            let math = subtract;
            expect(math(10, 2)).toBe(8);
            math = divide;
            expect(math(100, 50)).toBe(2);
        });

    });
    describe('higher ordered functions', () => {
        it('a function that takes an argument of a function', () => {

            function doIt(message: string, decorator: (x: string) => string): void {
                console.log(decorator(message));
            }

            doIt('Hello World!', (s) => `***${s}***`);

            doIt('hello world', (s) => s.toUpperCase());

            const sum = [1, 2, 3, 4, 5, 6, 7, 8, 9].reduce((s, n) => s + n);
            expect(sum).toBe(45);

            function isEven(someNumber: number) {
                return someNumber % 2 === 0;
            }
            const evens = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(isEven);
            expect(evens).toEqual([2, 4, 6, 8]);
        });
        describe('a function that returns a function', () => {

            it('old skool function', () => {
                function tagMaker(tag: string, content: string) {
                    return `<${tag}>${content}</${tag}>`;
                }

                expect(tagMaker('h1', 'dog')).toBe('<h1>dog</h1>');
                expect(tagMaker('h1', 'cat')).toBe('<h1>cat</h1>');
                expect(tagMaker('p', 'story')).toBe('<p>story</p>');
            });
            it('an oop approach', () => {
                class TagMaker {
                    private tag: string;

                    constructor(tag: string) {
                        this.tag = tag;
                    }

                    make(element: string) {
                        return `<${this.tag}>${element}</${this.tag}>`
                    }

                }

                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');

                expect(h1Maker.make('dog')).toBe('<h1>dog</h1>');
                expect(h1Maker.make('cat')).toBe('<h1>cat</h1>');
                expect(pMaker.make('story')).toBe('<p>story</p>');

            });
            it('higher-ordered function version', () => {

                function tagMaker(tag: string): (content: string) => string {
                    return (content) => `<${tag}>${content}</${tag}>`;
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('dog')).toBe('<h1>dog</h1>');
                expect(h1Maker('cat')).toBe('<h1>cat</h1>');
                expect(pMaker('story')).toBe('<p>story</p>')

            });

        });

    });
    describe('arguments to functions', () => {
        it('optional and default arguments', () => {

            function formatName(first: string, last: string, mi?: string) {
                let formattedName = `${last}, ${first}`;
                if (mi) {
                    formattedName += ' ' + mi + '.';
                }
                return formattedName;
            }

            expect(formatName('Han', 'Solo')).toBe('Solo, Han');
            expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');

            function addThem(a: number = 10, b: number = 20, ...rest: number[]): number {
                const firstTwo = a + b;
                return rest.reduce((s, n) => s + n, firstTwo);
            }

            function doIt(a: number, b: number) {
                const sum = a + b;
                if (sum > 20) {
                    return sum;
                } else {
                    return sum.toString();
                }
            }
            const s2 = doIt(30, 20);

            expect(addThem(2, 2)).toBe(4);
            expect(addThem(5)).toBe(25);
            expect(addThem(undefined, 10)).toBe(20); // passing in undefined (and only undefined) says use the default for this parameter.
            expect(addThem(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
        });

    });
});
describe('the array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    describe('visiting each member of an array', () => {
        it('has forEach', () => {
            numbers.forEach(n => console.log(n));
        });

    });
    describe('methods that create a new array from another array', () => {
        it('filtering', () => {
            const odds = numbers.filter(n => n % 2 !== 0);
            expect(odds).toEqual([1, 3, 5, 7, 9]);
        });

        it('map', () => {

            const doubled = numbers.map(a => a * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);

            const stringified = numbers.map(n => n.toString());
            expect(stringified).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        });
    });
    describe('array methods that return a single (scalar) value', () => {

        it('testing membership of an array', () => {
            const allEven = numbers.every(n => n % 2 === 0);
            expect(allEven).toBe(false);

            const someEven = numbers.some(n => n % 2 === 0);
            expect(someEven).toBe(true);

        });
        it('has reduce', () => {
            const sum = numbers.reduce((s, n) => s + n);
            expect(sum).toBe(45);
            const sum2 = numbers.reduce((s, n) => s + n, 100);
            expect(sum2).toBe(145);
        });
    });

});

describe('some practical examples', () => {

    it('shopping', () => {
        interface CartItem {
            name: string;
            qty: number;
            price: number;
        }

        const cart: CartItem[] = [
            { name: 'Eggs', qty: 1, price: 2.99 },
            { name: 'Bread', qty: 3, price: 3.57 },
            { name: 'Shampoo', qty: 2, price: 7.25 }
        ];

        interface Bill {
            totalQty: number;
            totalPrice: number;
        }

        const initialState: Bill = {
            totalPrice: 0,
            totalQty: 0
        };

        const finalBill: Bill = cart.reduce((state: Bill, nextCartItem: CartItem) => ({
            totalQty: state.totalQty + nextCartItem.qty,
            totalPrice: state.totalPrice + (nextCartItem.qty * nextCartItem.price)
        }), initialState)

        expect(finalBill.totalQty).toBe(6);
        expect(finalBill.totalPrice).toBe(28.2);
    });
    it('practice 2', () => {
        interface BowlingGame {
            playerName: string;
            score: number;
        }

        const scores: BowlingGame[] = [
            { playerName: 'Jeff', score: 127 },
            { playerName: 'Henry', score: 227 },
            { playerName: 'Stacey', score: 212 },
            { playerName: 'Violet', score: 118 }
        ];

        interface Results {
            highScore: number;
            highScorer: string;
            lowScore: number;
            lowScorer: string;
        }

        const initialState: Results = {
            highScore: -1,
            highScorer: null,
            lowScore: 301,
            lowScorer: null
        }

        const results: Results = scores.reduce((state: Results, game: BowlingGame) => ({
            highScore: game.score > state.highScore ? game.score : state.highScore,
            highScorer: game.score > state.highScore ? game.playerName : state.highScorer,
            lowScore: game.score < state.lowScore ? game.score : state.lowScore,
            lowScorer: game.score < state.lowScore ? game.playerName : state.lowScorer
        }), initialState)

        const expected = {
            highScore: 227,
            highScorer: 'Henry',
            lowScore: 118,
            lowScorer: 'Violet'
        }

        expect(results).toEqual(expected);

        const age = 22;
        let message: string;
        if (age > 21) {
            message = 'Old Enough';
        } else {
            message = 'Too Young';
        }

        message = age > 21 ? 'Old Enough' : 'Too Young';
    });
    describe('sneak peak', () => {
        it('basic redux', () => {
            interface Action { type: string }
            class Increment implements Action {
                readonly type = 'increment'
            }

            class Decrement implements Action {
                readonly type = 'decrement';
            }

            class Reset implements Action {
                readonly type = 'reset';
            }


            interface ApplicationState {
                count: number;
            }

            const initialState: ApplicationState = {
                count: 0
            };

            const actions: Action[] = [
                new Increment(),
                new Decrement(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Reset(),
                new Decrement(),
                new Decrement(),
                new Increment(),
                new Increment(),
                new Increment(),
                new Increment()
            ];

            const result: ApplicationState = actions.reduce((state: ApplicationState, action: Action) => {
                switch (action.type) {
                    case 'increment': {
                        return { count: state.count + 1 }
                    }
                    case 'decrement': {
                        return { count: state.count - 1 }
                    }
                    case 'reset': {
                        return { count: 0 }
                    }
                }
            }, initialState);
            expect(result.count).toBe(2);

            // CURSOR - current set of records
        });
    });
});
