const MIN_SCORE = 300
const MAX_SCORE = 900
const MIN_HISTORY = 1
const MAX_HISTORY = 30

function getRandomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min))
}

exports.handler = async (event) => {
  console.log("event ", JSON.stringify(event))
  const ssn = event.ssn
  const requestId = event.requestId

  const ssnRegex = new RegExp("^\\d{3}-\\d{2}-\\d{4}$")

  if (ssnRegex.test(ssn)) {
    const credit = {
      requestId: requestId,
      ssn: ssn,
      score: getRandomInt(MIN_SCORE, MAX_SCORE),
      history: getRandomInt(MIN_HISTORY, MAX_HISTORY)
    }
    console.log('credit ', credit)
    return {
      statusCode: 200,
      body: credit
    }
  } else {
    const message = JSON.stringify({ error: 'Invalid SSN', requestId: requestId, ssn: ssn })
    throw new Error(message)
  }
}
