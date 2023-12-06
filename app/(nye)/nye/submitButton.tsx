'use client'
import { useFormStatus } from 'react-dom'

export function SubmitButton () {
  const { pending } = useFormStatus()

  return (
    <button type={'submit'}

            className={`btn ml-auto w-full text-center md:text-left md:w-auto ${pending ? 'opacity-40' : ''}`}
            aria-disabled={pending}><span
      className="hs-icon link-arrow-right mr-1"></span> get ticket</button>
  )
}
