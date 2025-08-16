import { useEffect, useState } from "react";

interface TypingProps {
    word: string;
}

const TypingWord:  React.FC<TypingProps> = ({word}) => {
    const [isTyping, setIsTyping] = useState(true);
    const [newWord, setNewWord] = useState<string>("");
    const [wordIndex, setWordIndex] = useState(0);
    
    useEffect(() => {
        const intervalTime = isTyping ? 200 : 100;
        if (isTyping && wordIndex < word.length) {
             const timeOut = setTimeout(() => {
                setNewWord(prev => prev + word.charAt(wordIndex));
                setWordIndex(wordIndex + 1);
            }, intervalTime);
            return () => clearTimeout(timeOut);
        } else if (!isTyping && wordIndex > 0) {
            const timeOut = setTimeout(() => {
                setNewWord(newWord.slice(0, -1));
                setWordIndex(wordIndex - 1);
            }, intervalTime);
            return () => clearTimeout(timeOut);
        } else if (wordIndex == word.length) {
            setIsTyping(false);
        } else if (wordIndex == 0) {
            setIsTyping(true);
        }

        
    },[isTyping, newWord, word, wordIndex]);

    return (
        <div>
            {newWord}
            <span className="animate-pulse">
                |
            </span>
        </div>
    )
}

export default TypingWord;