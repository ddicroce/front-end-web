describe('variables and types', () => {

    describe('declaring variables', () => {
        it('using the let binding', () => {
            let x: string | number;

            x = 'dog';

            x = 12;

            let y: string | string[] = 'Bird'; // initializing.

            y = ['dog', 'cat', 'mouse'];

            // x = [];

        });
        it('has a const', () => {
            const PI = 3.14; // You must initialize.

            const friends = ['Sean', 'Amy', 'David'];

            friends[2] = 'Andrew';
            // friends = [];

            const movie = {
                title: 'Thor',
                yearReleased: 2017
            };

            movie.title = 'Thor: Ragnorak';

            movie.yearReleased = 2018;

            expect(movie.title).toBe('Thor: Ragnorak');

        });
        it('here is why var is bad and should not be used.', () => {
            const age = 22;

            if (age > 21) {
                // tslint:disable-next-line: no-var-keyword
                var message = 'Old Enough';
            }

            expect(message).toBe('Old Enough');
        });
        it('let fixes this', () => {
            const age = 22;
            let message: string;
            if (age > 21) {
                message = 'Old Enough';
            }
            // tslint:disable-next-line: no-var-keyword
            expect(message).toBe('Old Enough');
        });

    });
});
describe('literals', () => {
    it('has string literals', () => {
        const message = 'She told me "You look nice!"';
        const message2 = 'The author was Flannery O\'Connor'

        // tslint:disable-next-line: quotemark
        const message3 = "His name is Bill O'Brien";

    });
    it('has literal strings', () => {
        const message = `She told me "You look nice today"`;
        const message3 = `His name is Bill O'Brien`;

        const story = `Chapter 1.
        It was a dark and stormy night.
        The end.`;

        const someMarkup = `<div>
        <p>Some Text Here</p>
        </div>`;

        const name = 'Bob';
        const age = 32;

        const info = 'His name is ' + name + ' and his age is ' + age + '.';
        const info2 = `His name is ${name} and his age is ${age}.`;

        expect(info).toEqual(info2);

    });
    it('has number literals', () => {
        const n1 = 1;
        const n2 = 1.3;
        const n3 = 0xff; // Hexadecimal (base 16)
        const n4 = 0b10101; // Binary (base 2)
        const n5 = 0o23; // octal
        const big = 123_492_038_203;
        expect(big).toEqual(123492038203);
    });
    describe('array literals and tuple types', () => {
        it('two ways to declare an array', () => {
            let numbers: number[];
            numbers = [1, 2, 3];

            let friends: Array<string>;
            friends = ['Amy', 'David', 'Jessika'];

            let luckyStuff: (number | string)[];
            luckyStuff = [42, 'Cats', 99, 'Dogs'];

            let luckyStuff2: Array<number | string>;
            luckyStuff2 = [20, 9, 'Pizza'];

        });
        it('supports array destructuring', () => {
            //                 0        1        2     3
            const friends = ['Sean', 'Billy', 'Rich', 'Ed'];

            // const f1 = friends[0];
            // const f2 = friends[1];
            // const f4 = friends[3];
            const [f1, f2, , f4] = friends;

            expect(f1).toBe('Sean');
            expect(f2).toBe('Billy');
            expect(f4).toBe('Ed');

            const workQueue = ['Take out Trash', 'Clean Garage', 'Fix Post', 'Pull Weeds'];

            const [first, ...rest] = workQueue;

            expect(first).toBe('Take out Trash');
            expect(rest).toEqual(['Clean Garage', 'Fix Post', 'Pull Weeds']);
        });
        describe('tuples', () => {

            it('an oop-like example', () => {

                interface FormatNameResult { formattedName: string, numberOfLetters: number };

                function formatName(first: string, last: string): FormatNameResult {
                    const formattedName = `${last}, ${first}`;
                    return {
                        formattedName,
                        numberOfLetters: formattedName.length
                    }
                }

                const { formattedName: name, numberOfLetters: letters } = formatName('Han', 'Solo');
                expect(name).toBe('Solo, Han');
                expect(letters).toBe(9);

            });
            it('using tuples', () => {
                // const luckyThings: Array<string | number>;
                let musician: [string, string, number, string];

                musician = ['Warren', 'Ellis', 61, 'Violin'];

                type ThingyWithLettersInIt = string;
                type FormattedNameTuple = [string, number];
                function formatName(first: string, last: string): FormattedNameTuple {
                    const fullName = `${last}, ${first}`;
                    return [fullName, fullName.length];
                }

                type MathOp = (a: number, b: number) => number;

                const add: MathOp = (a, b) => a + b;
                const multiply: MathOp = (a, b) => a * b;

                expect(add(2, 2)).toBe(4);
                expect(multiply(3, 3)).toBe(9);

                const myname: ThingyWithLettersInIt = 'Jeff';

                const [name, len] = formatName('Han', 'Solo');

                expect(name).toBe('Solo, Han');
                expect(len).toBe(9);

            });
        });

    });
    describe('object literals and interfaces', () => {
        it('implicit interfaces', () => {

            interface Employee {
                firstName: string;
                lastName: string;
                department: string;
                phoneNumber?: string;
            };

            const jill: Employee = {
                firstName: 'Jill',
                lastName: 'Jones',
                department: 'DEV',
                phoneNumber: '555-1212'
            };

            const karl: Employee = {
                firstName: 'Karl',
                lastName: 'Schmidt',
                department: 'DEV'
            }

            interface Product {
                sku: number;
                description: string;
                price: number;
            }
            const product: Product = {
                sku: 3939,
                description: 'Beer',
                price: 13.99
            }
            const bread: Product = {
                sku: 393939,
                description: 'Bread',
                price: 3.99
            }

        });
        it('supports structural typing - aka "duck" typing', () => {

            interface ThingWithMessage { message: string }
            function logIt(thingy: ThingWithMessage) {
                console.log(`At ${new Date().toISOString()}: ${thingy.message}`)
            }

            const phoneCall = {
                from: 'Mom',
                message: 'Give me a call'
            };
            logIt(phoneCall);

            const anotherCall: ThingWithMessage = {
                message: 'Pick up dry cleaning!'
            }


            logIt(anotherCall);

            class EmailMessage implements ThingWithMessage {
                message: string;
                from: string;
                subject: string
            }
            const email = new EmailMessage();
            email.message = 'Call me at lunch';
            email.from = 'Rich';
            email.subject = 'Call?';

            logIt(email);



        });

    });
});

describe('some other stuff', () => 
{
it('enums', () => {
    enum SeatType {window, aisle, middle};

    const mySeat: SeatType = SeatType.aisle;
});

it('has literal unio types', () =>
{
    type SeatType = 'Window' | 'Aisle' | 'Middle';

    function getPriceFor (seat: SeatType)
    {
        switch(seat)
        {
            case 'Window':
                {
                return 150;

            }
            case 'Middle':
                {
                    return 75;
                }
                case 'Aisle':
                {
                return 175;
                }
        }
        return true;
    }
    // const mySeat = getPriceFor('Aisle');
    // it(mySeat,() => {
    //     expect(175).toBeTrue();
    // })
});
});