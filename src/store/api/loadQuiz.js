import 'isomorphic-fetch'

const loadQuiz = async (category, difficulty, amount) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`
  )

  const json = await response.json()
  if (json.response_code) {
    return {
      error: {
        code: response.status
      }
    }
  }
  return {
    data: json['results']
  }
}

export default loadQuiz
