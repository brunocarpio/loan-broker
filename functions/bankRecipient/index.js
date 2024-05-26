const MAX_LOAN_AMOUNT = process.env.MAX_LOAN_AMOUNT
const MIN_CREDIT_SCORE = process.env.MIN_CREDIT_SCORE
const MAX_CREDIT_SCORE = 1000
const BASE_RATE = process.env.BASE_RATE
const BANK_ID = process.env.BANK_ID

function calcRate(amount, score) {
  console.log("MAX_LOAN_AMOUNT ", MAX_LOAN_AMOUNT)
  console.log("MIN_CREDIT_SCORE ", MIN_CREDIT_SCORE)
  console.log("BASE_RATE ", BASE_RATE)
  console.log("BANK_ID", BANK_ID)
  if (amount <= MAX_LOAN_AMOUNT
    && score >= MIN_CREDIT_SCORE) {
    const rate = parseFloat(BASE_RATE)
      + Math.random() * ((MAX_CREDIT_SCORE - score) / 100.0)
    return Math.round((rate+Number.EPSILON)*100)/100
  }
}

exports.handler = async (event) => {
  console.log("event ", JSON.stringify(event))
  const message = event.Records[0].Sns.Message
  console.log("message ", message)
  const data = JSON.parse(message)
  const amount = data.amount
  const term = data.term // not used
  const score = data.credit.score
  const history = data.credit.history // not used
  const requestId = event.Records[0].Sns.MessageAttributes.requestId.Value

  console.log('Loan Request over %d at credit score %d', amount, score)
  const rate = calcRate(amount, score)
  console.log('computed rate ', rate)
  if (rate) {
    const quote = {
      rate: rate,
      bankId: BANK_ID,
      requestId: requestId
    }
    console.log('quote ', JSON.stringify(quote))
    return quote
  } else {
    console.log('Rejecting Loan')
  }
}

