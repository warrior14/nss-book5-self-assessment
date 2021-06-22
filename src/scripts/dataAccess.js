import { render } from "./main.js"
const mainContainer = document.querySelector("#container")

const API = "http://localhost:8088"

const applicationState = {
    authors: [],
    letters: [],
    topics: []
}


export const fetchExternalData = () => {
    return Promise.all([
        fetch(`${API}/authors`),
        fetch(`${API}/letters`),
        fetch(`${API}/topics`)
    ]).then(responses => {
        return Promise.all(responses.map(response => {
            return response.json()
        }))
    }).then(externalData => {
        applicationState.authors = externalData[0]
        applicationState.letters = externalData[1]
        applicationState.topics = externalData[2]
    })
}

export const getAuthors = () => {
    return applicationState.authors.map((author) => {
        return ({...author})
    })
}

export const getTopics = () => {
    return applicationState.topics.map((topic) => {
        return ({...topic})
    })
}

export const getLetters = () => {
    return applicationState.letters.map((letter) => {
        return ({...letter})
    })
}

export const sendLetter = (userPendingLetter) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPendingLetter)
    }

    return fetch(`${API}/letters`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            render()
        })
}