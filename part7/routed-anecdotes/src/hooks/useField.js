import { useState } from "react"

const useField = (name) => {
  const [value, setValue] = useState('')
  const reset = () => setValue('')

  return [
    {
      name,
      value,
      onChange: (event) => setValue(event.target.value),
    },
    reset
  ]
}

export default useField
