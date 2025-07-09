import {Button} from "@/components/ui/button";
import {signOut} from "@/auth";

export default function LogoutButton() {
    return <form action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
    }} className="w-1/2">
        <Button variant={"destructive"} className="cursor-pointer w-full">Keluar</Button>
    </form>
}