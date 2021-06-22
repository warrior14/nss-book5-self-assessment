import { getAuthors, getLetters, getTopics } from "./dataAccess.js"



export const Letters = () => {
    const letters = getLetters()
    const authors = getAuthors()
    const topics = getTopics()
    
    let html = letters.map(letter => {
        const letterAuthor = authors.find(author => author.id === parseInt(letter.authorId))
        const letterTopic = topics.find(topic => topic.id === parseInt(letter.topicId))
        const letterRecipient = authors.find(author => author.id === parseInt(letter.recipientId))

        return `<div class="letter">
                    Dear ${letterRecipient.name} (${letterRecipient.email}),
                    <br>
                    <br>
                    ${letter.body}
                    <br>
                    <br>
                    Sincerely, ${letterAuthor.name} (${letterAuthor.email})
                    <br>
                    <br>
                    <div class="timestamp">
                        Sent on ${new Date(letter.timestamp).toLocaleDateString()}
                    </div>
                    <div class="letterTopic">
                        ${letterTopic.name}
                    </div>
        </div>`
    }).join("")

    return html
}