import { Authors } from "./Authors.js"
import { sendLetter } from "./dataAccess.js"
import { Topics } from "./Topics.js"
import { Letters } from "./Letters.js"

export const LetterApp = () => {
    return `
    <h1>Pen Pal Society</h1>
    <section class="authors">
    <label for="authorSelect">Author</label>
    <select name="authorSelect" id="authorSelect">
        ${Authors()}
    </select>
    </section>
    <label for="letterField">Letter</label>
    <textarea id="letterField" name="letterField" rows="15" columns="10"></textarea>
    <section class="topics">
    <h3>Topic</h3>
        ${Topics()}
    </section>
    <section class="recipients">
    <label for="recipientSelect">Recipient</label>
    <select name="recipientSelect" id="recipientSelect">
        ${Authors()}
    </select>
    </section>
    <button class="button" id="sendLetter">Send Letter</button>
    <section class="sentLetters">
    <h2>Letters</h2>
        ${Letters()}
    </section>
    `
}

document.addEventListener(
    "click", event => {
        if (event.target.id === "sendLetter") {
            const authorId = document.getElementById("authorSelect").value
            const recipientId = document.getElementById("recipientSelect").value
            const body = document.getElementById("letterField").value
            
            const topicChecked = document.querySelector("input[name='topic']:checked")
            if (!topicChecked) {
                window.alert("Please select a topic")
                return
            }
            const topicId = topicChecked.value

            const pendingLetter = {
                authorId: authorId,
                recipientId: recipientId,
                body: body,
                topicId: topicId,
                timestamp: Date.now()
            }



            sendLetter(pendingLetter)

            console.log(`Info to sent to api: ${pendingLetter.authorId}, ${pendingLetter.recipientId}, ${pendingLetter.topicId}, ${pendingLetter.body}, ${pendingLetter.dateComposed}`)
        }
    }
)