const entry_names = document.getElementById("name");
const entry_email = document.getElementById("email");
const entry_password = document.getElementById("password");
const dob_entry = document.getElementById("dob");
const enter_terms = document.getElementById("acceptTerms");
const submission = document.getElementById("submit");
const entry_histroy = document.getElementById("dat");
const date = new Date();
let list_items = []
const dateValidity = (start_date) => {
    const date_use=start_date
    const date_user=date_use.split("-").map((d) => Number(d))
    const year_date = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let month_date;
    let day_date;
    if (date_user[0] === date.getFullYear() - 55) {
        month_date = date_user[1] >= (date.getMonth() + 1)
        day_date = date_user[2] >= (date.getDate())
    } else if (year_date) {
        month_date = true
        day_date = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        month_date = date_user[1] <= (date.getMonth() + 1)
        day_date = date_user[2] <= (date.getDate())
    } else {
        month_date = false
        day_date = false
    }
    finish=year_date && month_date && day_date;
    return finish
const isvalid = (element) => {
    return element.validity.valid
}

const digits = (num) => {
    if (num < 10) {
        return "0" + string(num);
    } else {
        return num;
    }
}
const sendStorage = (name, email, password, dob, terms) => {
    const userData = {
        name,
        email,
        password,
        dob,
        terms
    }
    list_items.push(userData)
    localStorage.setItem('userData', JSON.stringify(list_items))
}


submission.addEventListener("click", () => {
    const date_user = dob_entry.value

    if (!dateValidity(date_user)) {
        dob_entry.setCustomValidity(`Date must be between ${date.getFullYear() - 55}-${digits(date.getMonth() + 1)}-${digits(date.getDate())} and ${date.getFullYear() - 18}-${digits(date.getMonth() + 1)}-${digits(date.getDate())}`)
    } else {
        dob_entry.setCustomValidity("")
    }

    const allValid = isvalid(entry_names) && isvalid(entry_email) && isvalid(entry_password) && isvalid(dob_entry)

    if (allValid) {
        sendStorage(entry_names.value, entry_email.value, entry_password.value, dob_entry.value, enter_terms.checked)
    }
})
const getStorage = () => {
    list_items = JSON.parse(localStorage.getItem("userData"))
    if (list_items === null) {
        list_items = []
    } else {
        const view = list_items.map((entry) => {
            let rows = ""
            const allKeys = Object.keys(entry)

            for (let i = 0; i < allKeys.length; i++) {
                rows += `<td>${entry[allKeys[i]]}</td>`
            }

            return `<tr>${rows}</tr>`
        })
        entry_histroy.innerHTML += view.join("\n")
    }
}



getStorage()
