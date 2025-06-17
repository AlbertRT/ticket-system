import {Button} from "@/components/ui/button";
import {signOut} from "@/auth";

export default function LogoutButton() {
    return <form action={async () => {
        "use server"
        await signOut({ redirectTo: "/" })
    }} className="w-full">
        <Button variant={"destructive"} className="w-full cursor-pointer">Keluar</Button>
    </form>
}