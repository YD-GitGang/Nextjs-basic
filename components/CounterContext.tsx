import { useState, createContext } from 'react'
import type React from 'react'

type Counter = { 'count': number, 'setCount': React.Dispatch<React.SetStateAction<number>>}  // (※2)
export const CounterContext = createContext<Counter>({ count: 0, setCount: (s: React.SetStateAction<number>) => {} })  // (※1)

type CounterContextProviderProps = { children: React.ReactNode }  // (※4)
export const CounterContextProvider = ({ children }: CounterContextProviderProps) => {  // (※3)
    const [count, setCount] = useState(0)

    return (                                                       // (※5)
        <CounterContext.Provider value={{count, setCount}} >
            {children}
        </CounterContext.Provider>
    )
}

/*
 - (※1)
 - createContextでコンテキストオブジェクトを作る。コンテキストオブジェクトはProvider((※5)で使う)とConsumer(より簡単なuseContextを代わりに使う)の
 - 2つのコンポーネントを持つ。
 -
 - (※2)
 - コンテキストオブジェクトの型は各コンポーネントで共有したいもの(今回はcountとsetCount)。'count'の''無くてもOK、多分。
 - setCountの型 → ジェネリクス？React.SetStateAction<number>バージョンのReact.DispatchなのでsetCountの引数にはReact.SetStateAction<number>が入
 - ってくる、だから(※1)の s はReact.SetStateAction<number>型、多分。(※1)の()内はProviderが無い時の初期値らしいが、どう役に立つのか分からない。因
 - みに初期値は0と何も起こらない空の関数。
 -
 - (※3)
 - CounterContext.Providerで挟みたいものを挟むためのコンポーネント、多分。
 - 引数の型に直接React.ReactNodeが記述できないのは何故だろう...。(※4)を用意する必要がある...。
*/