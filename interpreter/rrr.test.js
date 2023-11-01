const TM = require('./rrr')

test('Generating a sequence of Rrr words', () => {

    const res = new TM(`
        rRrRrrRrrRrrRrrRrRrrrRrrRrrrRrrr
        RrRrrrRrrRr`,
        '',
        ['ε', 'R', 'r']
    ).compute(100)

    expect(res).toBe('RrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrrRrr')
})

test('Adding two unary numbers', () => {

    const res = new TM(`
        rRrrrRrrrRrrRrRrRrrRrrrRrrRrrRrr
        RrrrRrrrRrrRrrRrrRrRrRrRrrrRrrrR
        rrrRrRrrRrrrr`,
        'rrRrrr', /* 2 + 3 */
        ['ε', 'R', 'r']
    ).compute()

    expect(res).toBe('rrrrr' /* 5 */)
})

test('Copier', () => {

    const res = new TM(`
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

    expect(res).toBe('rrrrrr')
})

test('Palindromes', () => {

    const res = new TM(`
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

    expect(res).toBe('r')
})

test('Hello World', () => {

    const res = new TM(`
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

    expect(res).toBe('Hello World')
})