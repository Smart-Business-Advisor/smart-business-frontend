import { useId, useState } from "react"
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react"
import { FormControl, FormField, FormItem, FormLabel } from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import FormTextInput from "../../components/FormTextInput"

export default function PasswordValidator({ form, name }) {
  const id = useId()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible((prev) => !prev)

  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: "At least 8 characters" },
      { regex: /[0-9]/, text: "At least 1 number" },
      { regex: /[a-z]/, text: "At least 1 lowercase letter" },
      { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
      { regex: /[^A-Za-z0-9]/, text: "At least 1 special character" },
    ]
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }))
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const strength = checkStrength(field.value || "")
        const strengthScore = strength.filter((req) => req.met).length

        const getStrengthColor = (score) => {
          if (score === 0) return "bg-border"
          if (score <= 1) return "bg-red-500"
          if (score <= 2) return "bg-orange-500"
          if (score === 3) return "bg-amber-500"
          return "bg-emerald-500"
        }

        const getStrengthText = (score) => {
          if (score === 0) return "Enter a password"
          if (score <= 2) return "Weak password"
          if (score === 3 || score === 4) return "Medium password"
          return "Strong password"
        }

        return (
          <FormItem>
            <FormLabel className="text-gray">Password</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  id="password"
                  placeholder=""
                  type={isVisible ? "text" : "password"}
                  className=" h-10  text-gray-300 hover:text-blue-600"
                  {...field}
                />
              </FormControl>
              <button
                type="button"
                onClick={toggleVisibility}
                className="absolute inset-y-0 end-0 flex w-9 items-center justify-center"
              >
                {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
              </button>
            </div>
            {/* <button type="button" className="text-xs text-blue-400 hover:underline bg-transparent p-0 text-right cursor-pointer">Forgot your Password?</button> */}
            <FormTextInput form={form} label={"Confirm Password"} name={"PasswordConfirm"} />
            {field.value?.length > 0 && (
              <>
                <div className="bg-border mt-3 mb-4 h-1 w-full overflow-hidden rounded-full">
                  <div
                    className={`h-full ${getStrengthColor(strengthScore)} transition-all`}
                    style={{ width: `${(strengthScore / 4) * 100}%` }}
                  />
                </div>

                <p className="text-sm mb-2">
                  {getStrengthText(strengthScore)}. Must contain:
                </p>

                <ul className="space-y-1.5">
                  {strength.map((req, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {req.met ? (
                        <CheckIcon size={16} className="text-emerald-500" />
                      ) : (
                        <XIcon size={16} className="text-muted-foreground/80" />
                      )}
                      <span
                        className={`text-xs ${req.met ? "text-emerald-600" : "text-muted-foreground"}`}
                      >
                        {req.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </FormItem>
        )
      }}
    />
  )
}
