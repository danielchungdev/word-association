import { memo } from "react"
import { z } from "zod"
// import Link from "next/link"

const FooterPropsSchema = z.object({
    creds: z.boolean().optional(),
})

type FooterProps = z.infer<typeof FooterPropsSchema>

export const Footer = memo(function Footer({ creds = false }: FooterProps) {
    return (
        <>
            {/* <hr className="h-px my-4 w-48 mx-auto bg-gray-200 border-0" />
            <div className="text-center">
                <p className="text-xs">Built by <Link target="_blank" href="https://github.com/danielchungdev" className="text-orange-500 hover:text-orange-600 underline">Daniel Chung</Link></p>
                {creds && <p className="text-xs mt-1">Inspired by jasminandjulio</p>}
            </div> */}
        </>
    )
})