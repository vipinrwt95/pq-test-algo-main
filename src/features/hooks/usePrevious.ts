// credit: https://usehooks.com/usePrevious/

import { useEffect, useRef } from 'react'

// Hook
export const usePrevious = <T>(value: T): T => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref: any = useRef<T>()
  // Store current value in ref
  useEffect(() => {
    ref.current = value
  }, [value]) // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current
}

/** [Usage]
 * 
function App() {
  // State value and setter for our example
  const [count, setCount] = useState<number>(0);
  // Get the previous value (was passed into hook on last render)
  const prevCount: number = usePrevious<number>(count);
  // Display both current and previous count value
  return (
    <div>
      <h1>
        Now: {count}, before: {prevCount}
      </h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
 */
