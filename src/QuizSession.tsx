import { useEffect, useState, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Quiz, QuizResult, State} from './types'

// Action
type Select = {
  type: 'SELECT'
  payload: {
    quizIndex: number
    selected: string
  }
}

type Action =
  | Select
  | {
      type: 'CORRECT'
      currentCount: number
      currentIndex: number
      payload: number
    }
  | {
      type: 'INCORRECT'
      correctCount: number
      inCorrectCount: number
    }
  | {
      type: 'COMPLETE'
      isCompleted: boolean
    }

const initialData: State = {
  isCompleted: false,
  correctCount: 0,
  inCorrectCount: 0,
  currentIndex: 0,
  payload: 1,
  quizList: [
    {
      index: 0,
      text: 'apple',
      answer: 'n. 사과',
      selections: ['n. 사과', 'n. 밀가루 반죽', 'a. 지속적인, 끈질긴']
    },
    {
      index: 1,
      text: 'brick',
      answer: 'n. 벽돌',
      selections: ['n. 벽돌', 'v. 뛰다, 급증하다', 'n. 사과']
    },
    {
      index: 2,
      text: 'leap',
      answer: 'v. 뛰다, 급증하다',
      selections: ['n. 벽돌', 'n. 완성, 성취', 'a. 지속적인, 끈질긴']
    },
    {
      index: 3,
      text: 'horn',
      answer: 'n. 뿔, 경적',
      selections: ['n. 관광, 관광 사업', 'n. 밀가루 반죽', 'n. 뿔, 경적']
    }
  ],
  quizResults: []
}

function quizSessionReducer(state: State, action: Action) {
  switch (action.type) {
    case 'CORRECT':
      return {
        ...state,
        currentIndex: state.currentIndex++,
        correctCount: state.correctCount++
      }
    case 'INCORRECT':
      return {
        ...state,
        currentIndex: state.currentIndex++,
        inCorrectCount: state.inCorrectCount++
      }
    case 'COMPLETE':
      return {
        ...state,
        isCompleted: true
      }
    default:
      throw new Error('Error : Cannot read Action')
  }
}

// View
function QuizSessionView(selector: State, onClick: (selected: string) => void, dispatch: Function) {
  function QuizView(quiz: Quiz) {
    const articleStyle = {
      marginTop: '16px',
      padding: '8px',
      background: '#efefef'
    }
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const htmlTarget = e.target as HTMLElement
      if (htmlTarget.innerText === quiz.answer) {
        dispatch({ type: 'CORRECT' })
      } else {
        dispatch({ type: 'INCORRECT' })
      }
      if (selector.quizList.length - 1 === selector.currentIndex) {
        dispatch({ type: 'COMPLETE' })
      }
    }
    return (
      <article style={articleStyle}>
        <header>{quiz.text}</header>
        {quiz.selections.map((sel, idx) => {
          return (
            <button key={idx} onClick={handleClick}>
              {sel}
            </button>
          )
        })}
      </article>
    )
  }

  const currentQuiz = selector.quizList[selector.currentIndex]

  return (
    <section>
      <div>완료 여부: {selector.isCompleted ? '완료' : '미완료'}</div>
      <div>맞은 개수 {selector.correctCount}</div>
      <div>틀린 개수 {selector.inCorrectCount}</div>
      {selector.isCompleted ? <Link to='/'>홈으로</Link> : QuizView(currentQuiz)}
    </section>
  )
}

function QuizSession() {
  const [selector, dispatch] = useReducer(quizSessionReducer, initialData)
  const [initalLoaded, setInitalLoaded] = useState(false)
  const [state, setState] = useState<State | null>(null)

  const initState: () => Promise<State> = async () => {
    // 임시로 1초간 타임 아웃.
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // TODO
    // initialData를 State 타입으로 변경 후 리턴한다.
    // quizList[].selections 을 만드는 조건은
    // 해당 단어의 뜻 하나와 다른 단어의 뜻 둘을 포함하여
    // 3지 선다형 뜻 찾기 문제 보기로 변환한다.
    // 아래 데이터는 예시 데이터이므로 삭제.
    return {
      isCompleted: false,
      correctCount: 0,
      inCorrectCount: 0,
      currentIndex: 0,
      payload: 1,
      quizList: [],
      quizResults: []
    }
  }

  useEffect(() => {
    ;(async () => {
      // 초기 데이터 불러오기
      if (!initalLoaded) {
        const initialState = await initState()
        setState(initialState)
        setInitalLoaded(true)
      }
    })()
  }, [initalLoaded])

  const quizSelected = () => {
    if (state == null) return

    return setState(selector)
  }

  return <div>{state ? QuizSessionView(selector, quizSelected, dispatch) : '로딩중...'}</div>
}

export default QuizSession
