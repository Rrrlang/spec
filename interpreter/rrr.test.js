const TM = require('./rrr')
const fs = require('fs')

test('Generating a sequence of Rrr words', () => {

    const out = new TM(`
        rRrRrrRrrRrrRrrRrRrrrRrrRrrrRrrr
        RrRrrrRrrRr`,
        '',
        ['ε', 'R', 'r']
    ).compute(100)

    expect(out).toBe('RrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrr')
})

test('Adding two unary numbers', () => {

    const out = new TM(`
        rRrrrRrrrRrrRrRrRrrRrrrRrrRrrRrr
        RrrrRrrrRrrRrrRrrRrRrRrRrrrRrrrR
        rrrRrRrrRrrrr`,
        'rrRrrr', // 2 + 3
        ['ε', 'R', 'r']
    ).compute()

    expect(out).toBe('rrrrr') // 5
})

test('Copier', () => {

    const out = new TM(`
        rRrrrRrrRrrRrrRrrRrrrRrrrRrrRrrR
        rrRrRrRrrRrrrRrrrRrrrRrrrRrrRrrr
        RrrrRrRrrrRrRrrrrRrrrrRrrrRrrrRr
        RrrrrRrrrrRrRrRrRrrrrrRrrrrrRrrr
        RrrrRrRrrrrrRrrrrrRrrRrrrRrrRrRr
        RrRrrrRrrRrrrrrrRrrrrrrRrrrRrrrR
        rrRrrrrrrRrrrrrrRrRrRrRrrrrrrrRr
        rrrrrrRrrrRrRrRrrrrrrrr`,
        'rrr',
        ['ε', 'R', 'r']
    ).compute()

    expect(out).toBe('rrrrrr')
})

test('Palindromes', () => {

    const out = new TM(`
        rRrrrRrRrrRrrRrrRrrRrrRrrRrrRrrR
        rrrRrrrRrrRrrRrrRrRrRrRrrrRrrrRr
        RrRrRrRrrrRrrrRrRrRrrrrRrrrrRrrR
        rrRrRrrrrRrrrrRrrrRrrrRrRrrrrRrr
        rrRrRrRrrRrRrRrrRrRrrRrrrrrRrrrr
        rRrrRrrRrrRrrrrrRrrrrrRrrrRrrrRr
        rRrrrrrRrrrrrRrRrRrRrrrrrrRrrrrr
        rRrRrRrRrRrrrrrrRrrRrRrRrrrrRrRr
        RrrrRrrRrrrrrrrrRrrrRrrRrRrRrrrr
        rrrRrrrrrrRrrrRrRrRrrrrrrrRrrrrr
        rrRrrRrRrRrrrrrrrRrrrrrrrRrrrRrR
        rRrrrrrrrRrrrrrrrRrRrrRrrRrrrrrr
        rr`,
        'RRrRR',
        ['ε', 'R', 'r']
    ).compute()

    expect(out).toBe('r')
})

test('Hello World', () => {

    const out = new TM(`
        rRrRrrRrrRrrRrrRrRrrrRrrRrrrRrrr
        RrRrrrrRrrRrrrrRrrrrRrRrrrrRrrRr
        rrrrRrrrrrRrRrrrrrRrrRrrrrrrRrrr
        rrrRrRrRrrRrrrrrrrRrrrrrrrRrRrrr
        rrrRrrRrrrrrrrrRrrrrrrrrRrRrrrrr
        RrrRrrrrrrrrrRrrrrrrrrrRrRrrrrrr
        rRrrRrrrrrrrrrrRrrrrrrrrrrRrRrrr
        rRrrRrrrrrrrrrrrRrrrrrrrrrrrRrRr
        rrrrrrrRrrRrrrrrrrrrrrr`,
        '',
        ['ε','H','e','l','o','W','r','d']
    ).compute()

    expect(out).toBe('Hello World')
})

test('Universal machine', () => {

    const utm = fs.readFileSync('./utm.rrr').toString()

    // adding two unary numbers
    const program = `
        rRrrRrrRrrRrRrRrRrrRrrRrrRrrRrrR
        rrRrrRrrRrrRrRrRrRrrrRrrrRrrRrRr
        rRrrrr`

    let out = new TM(
        utm,
        program + 'RR' + 'rrRrrrR', // 2 + 3
        ['ε', 'R', 'r', '+', '#', '*'] // universal machine's alphabet
    ).compute(99999)

    // extract only the working tape
    out = out.substring(0, out.lastIndexOf('#'))
    out = out.substring(out.lastIndexOf('#') + 1)
    out = out.replaceAll(/\*|R/g,'')  // remove meaningless symbols

    expect(out).toBe('rrrrr') // 5
})