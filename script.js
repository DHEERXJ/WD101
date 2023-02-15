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
    const date_u=start_date
    const date_user=date_u.split("-").map((d) => Number(d))
    const date_year = (date_user[0] >= (date.getFullYear() - 55) && date_user[0] <= (date.getFullYear() - 18))
    let date_month;
    let date_day;
    if (date_user[0] === date.getFullYear() - 55) {
        date_month = date_user[1] >= (date.getMonth() + 1)
        date_day = date_user[2] >= (date.getDate())
    } else if (date_year) {
        date_month = true
        date_day = true
    } else if (date_user[0] === date.getFullYear() - 18) {
        date_month = date_user[1] <= (date.getMonth() + 1)
        date_day = date_user[2] <= (date.getDate())
    } else {
        date_month = false
        date_day = false
    }
    final=date_year && date_month && date_day;
    return final
}

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
