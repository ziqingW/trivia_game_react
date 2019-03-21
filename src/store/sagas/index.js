import QuizSagas from './Quiz'
import ApiErrors from './ApiErrors'
export default [...ApiErrors, ...QuizSagas]
