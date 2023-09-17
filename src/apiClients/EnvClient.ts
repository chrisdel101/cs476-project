import { onRequest } from 'firebase-functions/v2/https'
import { getFirestore } from 'firebase-admin/firestore'

export interface EnvironmentVariable {
  value: string
}

const AuthClient = {
  requestVerificationCode: (EnvironmentVariable: EnvironmentVariable) => {
    return fetch(`example.com`, {
      method: 'POST',
      body: JSON.stringify(EnvironmentVariable),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  },
  // Take the text parameter passed to this HTTP endpoint and insert it into
  // Firestore under the path /messages/:documentId/original
  addMessage: onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text
    // Push the new message into Firestore using the Firebase Admin SDK.
    const writeResult = await getFirestore()
      .collection('messages')
      .add({ original: original })
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` })
  }),
}

export default AuthClient
