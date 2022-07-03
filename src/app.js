"use strict";
class User {
    #id;
    #name;
    address;
    #phone;
    #email;
    #password;
    #createdAt;
    #isAdmin = false;
    #isBusiness = false;
    constructor(user, users = []) {
        const { email, address, isAdmin, isBusiness, name, password, phone } = user;
        this.address = address;
        this.#id = this.generateUniqId(users);
        this.#name = this.setName(name);
        this.#phone = this.checkPhone(phone);
        this.#email = this.checkEmail(email, users);
        this.#password = this.checkPassword(password);
        this.#isBusiness = isBusiness;
        this.#isAdmin = isAdmin;
        this.#createdAt = new Date();
    }
    randomNumBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    generateUniqId(users = []) {
        const random = this.randomNumBetween(1_000_000, 9_999_999);
        const user = users.findIndex((user) => user._id === random);
        if (user === -1)
            return random;
        this.generateUniqId(users);
    }
    makeFirstLetterCapital(string) {
        const term = string.toLowerCase().trim();
        return term.charAt(0).toUpperCase() + term.slice(1);
    }
    setName({ first, last }) {
        const firstName = this.makeFirstLetterCapital(first);
        const lastName = this.makeFirstLetterCapital(last);
        return `${firstName} ${lastName}`;
    }
    changeBusinessStatus() {
        this.#isBusiness = !this.#isBusiness;
    }
    checkPhone(phoneNumber) {
        if (phoneNumber.match(/^0[0-9]{1,2}(\-?|\s?)[0-9]{3}(\-?|\s?)[0-9]{4}/g) ===
            null) {
            throw new Error("Please enter a valid phone number!");
        }
        return phoneNumber;
    }
    checkPassword(password) {
        if (password.match(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/g) === null)
            throw new Error("The password must contain at least one uppercase letter in English. One lowercase letter in English. Four numbers and one of the following special characters !@#$%^&*-");
        return password;
    }
    checkEmail(email, users = []) {
        if (email.match(/.+@.+\..{2,}/g) === null) {
            throw new Error("Please enter a standard email");
        }
        const user = users.findIndex((user) => user.email === email);
        if (user !== -1)
            throw new Error("User is already registered!");
        return email;
    }
    get _id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get email() {
        return this.#email;
    }
    get password() {
        return this.#password;
    }
    get createdAt() {
        return this.#createdAt;
    }
    get isAdmin() {
        return this.#isAdmin;
    }
    get isBusiness() {
        return this.#isBusiness;
    }
    get phone() {
        return this.#phone;
    }
}
const firstUser = new User({
    name: { first: "regular", last: "user" },
    address: {
        state: "USA",
        country: "big",
        city: "New York",
        street: "52",
        houseNumber: 109,
        zip: 562145,
    },
    phone: "050-0000000",
    email: "user@gmail.com",
    password: "Aa1234!",
    isBusiness: false,
    isAdmin: false,
});
let users = [firstUser];
const clearBtn = document.getElementById("btn-clear");
const sumbit = document.getElementById("sumbit");
const email = document.getElementById("email");
const password = document.getElementById("password");
const success = document.getElementById("success");
const fail = document.getElementById("fail");
clearBtn.addEventListener("click", () => clear());
sumbit.addEventListener("click", () => {
    checkUser(email.value, password.value, users), clear();
});
const clear = () => {
    email.value = "";
    password.value = "";
};
const checkUser = (email, password, users) => {
    const checkEmail = users.find((user) => user.email === email);
    if (!checkEmail || !email) {
        fail.innerText = "wrong email";
        setTimeout(() => {
            fail.innerText = "";
        }, 2000);
        return;
    }
    const checkPassword = users.find((user) => user.password === password);
    if (!checkPassword || !password) {
        fail.innerText = "wrong password";
        setTimeout(() => {
            fail.innerText = "";
        }, 2000);
        return;
    }
    success.hidden = false;
    setTimeout(() => {
        success.hidden = true;
    }, 2000);
};
