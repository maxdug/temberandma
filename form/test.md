---
layout: default
title: Citi | Mobile Banking
description: Designing a money experience
section: design
---

<form name="signin" onsubmit="send(event)">
    <input type="text" required name="surname" placeholder="Surname"/><br/>
    <input type="text" required name="forename" placeholder="Name"/><br/>
    <input type="date" required name="birthday" placeholder="Birth date"/><br/>
    <input type="email" name="email" required placeholder="Email"/><br/>
    <label>Languages</label><br>
    <input type="radio" name="language" value="en"/> English <br/>
    <input type="radio" name="language" value="uk"/> Ukrainian <br/>
    <input type="radio" name="language" value="de"/> Germany <br/>
    <textarea maxlength="100" name="about" placeholder="About"></textarea><br/>
    <button type="submit">Go</button>
    <button type="reset" onclick="warnReload = false">Reset</button>
</form>

<script src="https://cdn.rawgit.com/lodash/lodash/4.16.4/dist/lodash.js"></script>
<script src="http://momentjs.com/downloads/moment-with-locales.js"></script>
<script src="https://rawgit.com/Marak/faker.js/7cddded9d18f571c3cd74b78dc57410f8b77697d/build/build/faker.js"></script>
<script>
    faker.locale = 'ru'
    moment.locale = 'ru'
    const form = document.forms[0]
    let warnReload = false
    function fake() {
        const data = {
            surname: faker.name.lastName(),
            forename: faker.name.firstName(),
            email: faker.internet.email(),
            birthday: moment(faker.date.between('1930-01-01', '2010-01-01')).format('YYYY-MM-DD'),
            language: _.sample(['en', 'de', 'uk']),
            about: faker.lorem.sentences(_.random(3, 10))
        }
        _.each(data, function (v, k) {
            form[k].value = v
        })
    }
    function send(e) {
        if (e instanceof Event) {
            e.preventDefault()
        }
        else {
            console.warn('First argument is not an event')
        }
        const data = new FormData()
        const names = _.uniq(_.map(form.querySelectorAll('[name]'), input => input.getAttribute('name')))
        names.forEach(function (name) {
            const value = form[name].value
            if (value && value.trim()) {
                data.append(name, value)
                warnReload = true
            }
        })
        const xhr = new XMLHttpRequest()
        xhr.open('POST', location.href)
        xhr.send(data)
        xhr.addEventListener('load', function () {
            warnReload = false
            for(const entry of data.entries()) {
                console.log(entry[0], entry[1])
            }
        })
    }
    window.addEventListener('beforeunload', function (e) {
        if (warnReload) {
            e.returnValue = true
        }
    })
//    form.addEventListener('submit', send)
    fake()
</script>
