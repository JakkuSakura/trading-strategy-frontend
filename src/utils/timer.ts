import {createSignal, onCleanup} from "solid-js";

export const interval = 1000;

export interface TimerProps {
    interval: number;
}

// increment the counter every N seconds
export const useTimer = ({interval}: TimerProps) => {
    const [nowTime, setNowTime] = createSignal<number>(Date.now());

    const timer = setInterval(() => {
        setNowTime(Date.now());
    }, interval);

    onCleanup(() => {
        clearInterval(timer);
    })
    return nowTime;

}