import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../components/ui/form'
import { Input } from '../components/ui/input'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

function FormTextInput({ form, name, label, placeholder = "" }) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-800 font-medium">{label}</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                type={
                  name !== "PasswordConfirm" && name !== "Password"
                    ? "text"
                    : isVisible
                    ? "text"
                    : "password"
                }
                className="h-[42px] border border-gray-300 rounded-md px-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </FormControl>

            {(name === "PasswordConfirm" || name === "Password") && (
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-600 hover:text-gray-800"
              >
                {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            )}
          </div>

          <FormMessage className="text-xs text-red-500 mt-1" />
        </FormItem>
      )}
    />
  )
}

export default FormTextInput
