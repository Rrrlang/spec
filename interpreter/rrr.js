class Tape {

    constructor(input) {
        this.mem = []
        if (input) Array.from(input)
            .forEach((v, i) => this.mem[i] = v)
    }

    read(pos) {
        const s = this.mem[pos]
        return s ? s : 'ε'
    }

    write(pos, symbol) {
        this.mem[pos] = symbol
    }

    output() {
        const keys = Object.keys(this.mem)
            .sort((a, b) => a - b)

        let out = ''
        for (let i = Math.min(...keys); 
                 i < Math.max(...keys) + 1; i++) {
            const s = this.mem[i]
            out += s && s !== 'ε' ? s : ' '
        }
        return out.trim()
    }
}

class Head {

    constructor(tape) {
        this.tape = tape
        this.pos = 0    
    }

    read() {
        return this.tape.read(this.pos)
    }

    write(symbol) {
        this.tape.write(this.pos, symbol)
    }

    move(direction) {
        if ('<' === direction) this.pos--
        if ('>' === direction) this.pos++
    }

    position() {
        return this.pos
    }
}

class Control {

    constructor(rules) {
        this.rules = rules 
        this.state = rules[0].state // initialize with the first state       
    }

    next(read) {
        const rule = this.rules.find(r =>
            r.state === this.state && 
            r.read === read)

        if (!rule) return null

        this.state = rule.next
        
        return rule
    }
}

class Rule {

    constructor(q, r, w, m, qn) {
        this.state = q
        this.read = r
        this.write = w
        this.move = m
        this.next = qn
    }
}

class DescNumber {

    constructor(dn) {
        this.dn = dn.replaceAll(/[^Rr]/g, '') // clean up
    }

    parse(
        alphabet,
        numeral = 'r',
        separator = 'R',
        moves = ['<', '>']
    ) {
        const rules = []
        let qtuplet = ''
        let elCount = 0

        for (let i = 0; i < this.dn.length; i++) {
            const s = this.dn[i]
            if (s !== numeral && s !== separator)
                throw new Error('Invalid DN ' + s)

            qtuplet += s

            if (separator === s) elCount++
            if (elCount % 5 === 0 &&
                elCount > 0 ||
                i === this.dn.length - 1
            ) {
                const qt = qtuplet.split(separator)
                const rule = new Rule(
                    'q' + (qt[0].length - 1),
                    alphabet[qt[1].length - 1],
                    alphabet[qt[2].length - 1],
                    moves[qt[3].length - 1],
                    'q' + (qt[4].length - 1)
                )
                rules.push(rule)
                qtuplet = ''
                elCount = 0
            }
        }
        return rules
    }
}

class TM {

    constructor(tm, input, alphabet) {
        this.tape = new Tape(input.replaceAll(/(\s|\r\n|\n|\r)/gm, ''))
        this.head = new Head(this.tape)
        this.control = new Control(
            new DescNumber(tm).parse(alphabet))
    }

    compute(maxSteps = 1000) {
        let steps = 0

        let next
        while ((next = this.control.next(this.head.read())) && ++steps < maxSteps) {

            this.head.write(next.write)
            this.head.move(next.move)
        }

        if (steps >= maxSteps) console.warn('MAX STEPS EXCEEDED!')
        
        return this.tape.output()
    }
}

module.exports = TM
