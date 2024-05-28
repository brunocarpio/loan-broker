const MIN_SCORE = 300
const MAX_SCORE = 900
const MIN_HISTORY = 1
const MAX_HISTORY = 30

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

exports.handler = async (event) => {
  console.log("event ", JSON.stringify(event))
  const ssn = event.Payload.ssn
  const requestId = event.Payload.requestId

  const ssnRegex = new RegExp("^\\d{3}-\\d{2}-\\d{4}$")

  if (ssnRegex.test(ssn)) {
    return {
      statusCode: 200,
      requestId: requestId,
      body: {
        ssn: ssn,
        score: getRandomInt(MIN_SCORE, MAX_SCORE),
        history: getRandomInt(MIN_HISTORY, MAX_HISTORY)
      }
    }
  } else {
    return {
      statusCode: 400,
      request_id: requestId,
      body: {
        ssn: ssn
      }
    }
  }
}
