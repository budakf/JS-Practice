// Prototypical Inheritance

let string = "Lorem$Ipsum 1 7 9 234"

// String.prototype.newFunctionName = function(){}

String.prototype.getNumberInString = function () {
    const numberArray = []
    let temporaryNumber = 0

    for (let i = 0; i < this.length; ++i) {
        if (!isNaN(this[i]) && this[i] !== " ") {
            temporaryNumber = temporaryNumber * 10 + parseInt(this[i])
            if (i + 1 < this.length && (isNaN(this[i + 1]) || this[i + 1] === " ")) {
                numberArray.push(temporaryNumber)
                temporaryNumber = 0
            } else if (i + 1 == this.length) {
                numberArray.push(temporaryNumber)
            }
        }
    }
    return numberArray
}

console.log(string.getNumberInString())

// Prototypical Inheritance Contd.

let animal = {
    mobility: true,
    eat: function () {
        console.log("Animals eat")
    }

}

let cat = {
    say: function meow() {
        console.log("Cats say meow")
    },
    __proto__: animal
}

cat.say()
cat.eat()



///// Bind, Call, Apply Functions

let person = {
    name: "Fatih",
    greet: function () {
        console.log("hello,", this.name)
    }
}

person.greet()

const greet = person.greet.bind({
    name: "Bind"
})

greet()

const greet1 = person.greet

greet1.call({
    name: "Call"
})

greet1.apply({
    name: "Apply"
})



// DeepCopy Function For Object
// Primitive Types( boolean number string null undefined symbol) are immutable
// however primitive types` variables can be changed by reassignment
// Namely, Values are immutable, variables are not.

let str = "Primitive"
let str2 = str

str[0] = "N"
console.log("str: ", str, "str2: ", str2) // str:  Primitive str2:  Primitive

str2 = "New Value"
console.log("str: ", str, "str2: ", str2) // str:  Primitive str2:  New Value


// Objects are mutable and stored by reference 
// lets have an object like that below

let obj = {
    name: "object",
    attribute1: {
        key: "key1",

    }
}

let obj2 = obj

// then obj2 and obj refers same object(same memory address), namely through above assignment operation, shallow copy is done.
// if we want to do deep copy, we must use external library or write our own deepCopy function like that below

function deepCopy(obj) {

    let newObj = {}
    for (let key of Object.keys(obj)) {
        if (obj[key] instanceof Object)
            newObj[key] = deepCopy(obj[key])
        else
            newObj[key] = obj[key]
    }

    return newObj
}

// JS Classes

class Set {

    constructor(array) {
        if (array instanceof Array) {
            this.array = array
            console.log("Array")
        } else {
            this.array = [array]
        }
    }


    add(value) {
        if (!this.has(value)) {
            this.array.push(value)
        }
    }

    delete(value) {
        this.array = this.array.filter(x => x !== value)
    }

    has(value) {
        this.array.includes(value)
    }

    toArray() {
        return this.array
    }
}

let s = new Set(1)

s.add(123)
s.add(54)
s.delete(1)

console.log(s.toArray())
