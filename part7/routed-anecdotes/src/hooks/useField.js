import { useState } from "react"

const useField = (name) => {
  const [value, setValue] = useState('')

  return {
    name,
    value,
    onChange: (event) => setValue(event.target.value)
  }
}

export default useField
