import { Employee } from "../src/hr";




describe('modules', () => {
    // a module is a typescript source-code file that "exports one or more things."
    // anythning that exists insied a module is basically private to that module until youexport it.
    // every file that needs a thing (type, function, const, variable, interface, class, etc) that exists in another
    // module must explicitly import it.


});

it( ` `, () => {
});

describe('hr stuff', () => {

    it( `has an employee `, () => {
        const bob = new Employee();
        bob.id = '122';
        bob.firstName = 'Robert';
        bob.lastName = 'Smith';
        bob.job = 'Singer';
        bob.workFromHomedat = 'Friday (he\'s in love)';
        const info = bob.getInfo();
    });
});