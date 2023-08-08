import { useEffect } from 'react'
import store2 from 'store2'

const PAGE_ON_LOAD_MESSAGE = 'page-on-load-message'

/**
 * usePageOnLoadMessage hook reads the page-on-load-message from local-storage and immediately
 * removes it after invoking the callback function with the message.
 *
 * @param callback - Callback function to be called with the page-on-load-message as an argument
 *
 * @example
 *
 * const MyComponent = () => {
 *  const handleMessage = (message: string) => {
 *    console.log(message)
 *  }
 *
 *  usePageOnLoadMessage(handleMessage)
 *
 *  return <div>Hello World</div>
 * }
 */
export const usePageOnLoadMessage = (callback: (message: string) => void) => {
  useEffect(() => {
    const message = store2.get(PAGE_ON_LOAD_MESSAGE)

    if (message) {
      store2.remove(PAGE_ON_LOAD_MESSAGE)
      callback(message)
    }

    // make sure this callback get's called only on mount and doesn't rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

/**
 * setPageOnLoadMessage sets the page-on-load-message in local-storage with the message
 *
 * @param message - Message to be stored in local-storage as page-on-load-message
 *
 * @example
 *
 * setPageOnLoadMessage("Welcome to the site!")
 */
export const setPageOnLoadMessage = (message: string) => store2.set(PAGE_ON_LOAD_MESSAGE, message)
