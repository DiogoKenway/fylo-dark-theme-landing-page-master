const fields = document.querySelectorAll('[required]')

function validateField(field) {

    function verifyErrors() {
        let foundError = false

        for(let key in field.validity) {
            
            if (field.validity[key] && !field.validity.valid) {
                foundError = key
            }
        }

        return foundError
    }


    function customMessage (typeError) {
        const messages = {
            text: { valueMissing: "Please fill this field" },
            email: { 
                valueMissing: "Email is Required",
                typeMismatch: "Please enter a valid email address"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector("span.error-message")

        if (message) {
            spanError.innerHTML = message
        } else {
            spanError.innerHTML = ""
        }
    }

    return function () {
        const error = verifyErrors()
        const message = customMessage(error)

        if (error) {
            const message = customMessage(error)
            setCustomMessage(message)
        } else {
            setCustomMessage()
        }
    }
}


function customValidation(event) {
    const field = event.target
    const validation = validateField(field)

    validation()
}

for(let field of fields) {
    field.addEventListener("invalid", event => {
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener('blur', customValidation)
}

document.querySelector("form").onsubmit = event => {
    event.preventDefault()
    console.log("formulário Enviado com Sucesso!")
}