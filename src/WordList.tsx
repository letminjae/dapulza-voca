import { Link } from 'react-router-dom'
import useApis from './hooks/useApis';
import { Word } from './types';

function WordView(word: Word) {
  return (
    <div key={word.text}>
      {word.text} / {word.meaning}
    </div>
  )
}

function WordList() {
  const linkStyle = {
    display: 'block',
    padding: '8px'
  }

  // TODO
  // 훅을 이용해서, 화면이 로드되면 아래 주소에서 단어를 들고와서 화면에 표시
  // 아래 샘플 단어를 대체해야 함.
  // https://solution-tmp.s3.ap-northeast-2.amazonaws.com/vocabs.json
  // warning!
  // 만약 어떠한 이유로 작동이 되지 않는다면, 그 문제를 우회해서
  // 전체 기능이 동작하도록 코드를 구현.
  const wordlist = useApis();

  return (
    <section>
      {wordlist.map((word) => WordView(word))}
      <Link to='/' style={linkStyle}>
        홈으로
      </Link>
    </section>
  )
}

export default WordList
