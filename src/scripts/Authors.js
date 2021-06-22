import { getAuthors } from "./dataAccess.js"

export const Authors = () => {
    const authors = getAuthors()

    let html = authors.map(author => {
                    return `<option value="${author.id}">
                        ${author.name}
                    </option>`
    }).join("")

    return html
}