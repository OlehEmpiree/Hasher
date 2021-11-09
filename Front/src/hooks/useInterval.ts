import {DependencyList, useEffect, useRef} from "react";

function useInterval(callback: () => void, delay: number, deps?: DependencyList) {
    const savedCallback = useRef<() => void>(callback);

    function tick() {
        savedCallback.current();
    }

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);

    // eslint-disable-next-line
    useEffect(tick, deps || []);
}

export default useInterval;
