'use client'

import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";

export default function AuthButton({ text }: { text: string }) {
    const { pending } = useFormStatus();

    return <Button type="submit" className="w-full cursor-pointer flex items-center justify-center" disabled={pending}>
        { pending ? <LoaderCircle className="w-4 animate-spin" /> : text }
    </Button>
}