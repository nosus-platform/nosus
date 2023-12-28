import React, {
    CSSProperties,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useReducer,
    useRef,
} from 'react';
import cn from 'classnames';

import s from './LoadingProgress.module.pcss';

interface LoadingProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    start?: number;
    max?: number;
    height?: number;
}

export interface LoadProgressRef {
    start: () => void;
    done: () => void;
}

type Action = { type: 'start' } | { type: 'tick'; payload?: number } | { type: 'stop' } | { type: 'reset' };
type ProgressState = 'idle' | 'load' | 'finish';

interface State {
    progress: number;
    state: ProgressState;
    readonly max: number;
}

const limit = (n: number) => (1 + 1 / n) ** n - 1;
const clampToMax = (n: number, max: number) => {
    return Math.min(n, max);
};

const reducer: React.Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'start': {
            return {
                ...state,
                state: 'load',
                progress: 0.05,
            };
        }
        case 'tick': {
            return {
                ...state,
                progress: clampToMax(limit(state.progress), state.max),
            };
        }
        case 'stop':
            return {
                ...state,
                state: 'finish',
                progress: 1,
            };

        case 'reset': {
            return {
                ...state,
                state: 'idle',
                progress: 0,
            };
        }
        default:
            return state;
    }
};

export const LoadingProgress = forwardRef<LoadProgressRef, LoadingProgressProps>(
    ({ className, color = 'red', start = 0.05, max = 0.995, height = 2, style, ...attrs }, ref) => {
        const barRef = useRef<HTMLDivElement>(null);
        const [{ state, progress }, dispatch] = useReducer(reducer, {
            progress: start,
            max,
            state: 'idle',
        });
        const cssVariables = useMemo(
            () =>
                ({
                    '--LoadingProgress-height': `${height}px`,
                    '--LoadingProgress-color': color,
                }) as CSSProperties,
            [height],
        );

        useImperativeHandle(
            ref,
            () => ({
                start: () => {
                    dispatch({ type: 'start' });
                },
                done: () => {
                    dispatch({ type: 'stop' });
                },
            }),
            [],
        );

        useEffect(() => {
            if (barRef.current) {
                const node = barRef.current;

                if (state !== 'idle') {
                    node.style.width = `${progress * 100}%`;
                } else {
                    node.style.transition = 'none';
                    node.style.removeProperty('width');

                    node.offsetHeight; // triggers reflow

                    node.style.removeProperty('transition');
                }
            }
        }, [progress, state]);

        const transitionEndHandle = useCallback(() => {
            if (state === 'load') {
                dispatch({ type: 'tick' });
            }

            if (state === 'finish') {
                dispatch({ type: 'reset' });
            }
        }, [state]);

        return (
            <div className={cn([s.LoadingProgress, className])} style={{ ...cssVariables, ...style }} {...attrs}>
                <div className={s.LoadingProgress__Bar} ref={barRef} onTransitionEnd={transitionEndHandle}>
                    <div className={s.LoadingProgress__Inner} />
                </div>
            </div>
        );
    },
);
