'use client';

import { useAppDispatch, useAppSelector } from '@/store';
import { addOne, initCounterState, substractOne } from '@/store/counter/counterSlice';
import { useEffect } from 'react';

interface Props {
    value?: number;
}

export interface CounterResponse {
    method: string;
    count: number;
}

const getApiCounter = async(): Promise<CounterResponse> => {
    const data = await fetch( '/api/counter' ).then( res => res.json() );
    return data;
}

export const Counter = ({  value = 0 }: Props) => {

    const count = useAppSelector( state => state.counter.count );
    const dispatch = useAppDispatch();

    useEffect(() => {
        getApiCounter()
            .then(({ count }) => dispatch( initCounterState( count ) ) );
    }, [ dispatch ]);

    return (
        <>
        <div className="counter">{ count }</div>
        <div className="counter__actions">
            <button onClick={() => dispatch( substractOne() ) } className="button ghost-button">-1</button>
            <button onClick={() => dispatch( addOne() ) } className="button ghost-button">+1</button>
        </div>
        </>
    )
}