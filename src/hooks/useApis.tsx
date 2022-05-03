import axios from "axios";
import { useEffect, useState } from "react";
import { Word } from "../types";
 
const useApis = () => {
    const [wordlist, setWordlist] = useState<Word[]>([]);
 
  useEffect(() => {
    axios
      .get(
        'https://cors-anywhere.herokuapp.com/https://solution-tmp.s3.ap-northeast-2.amazonaws.com/vocabs.json'
      )
      .then((response) => {
        setWordlist(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
 
  return wordlist;
};
 
export default useApis;