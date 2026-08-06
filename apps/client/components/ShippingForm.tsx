import { ShippingFormInputs, shippingFormSchema } from "@repo/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

export default function ShippingForm({ setShippingForm }: { setShippingForm: (data: ShippingFormInputs) => void })  {
    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm<ShippingFormInputs>({
        resolver: zodResolver(shippingFormSchema)
    })

    const router = useRouter()
    const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
        setShippingForm(data)
        router.push("/cart?step=3", {scroll: false})

    }
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleShippingForm)}>
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium">Name</label>
                <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="name" placeholder="John Doe" {...register("name")} 
                value="John Doe"
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-500 font-medium">Email</label>
                <input className="border-b border-gray-200 py-2 outline-none text-sm" type="email" id="email" placeholder="johndoe@gmail.com" {...register("email")} value="johndoe@gmail.com" />
                {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-sm text-gray-500 font-medium">Phone </label>
                <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="phone" placeholder="12345678" {...register("phone")} value="123456789" />
                {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium">Address</label>
                <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="address" placeholder="123 Main st, Ikeja" {...register("address")} value="123 Main st, Ikeja" />
                {errors.address && (
                    <p className="text-sm text-red-500">{errors.address.message}</p>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm text-gray-500 font-medium">City</label>
                <input className="border-b border-gray-200 py-2 outline-none text-sm" type="text" id="city" placeholder="Lagos" {...register("city")} value="Lagos" />
                {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-600 transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2">
                Continue
                <ArrowRight className="w-3 h-3" />
            </button>
        </form>
    )
}