import {Button} from "@/components/ui/button";
import { SignInGoogleAction } from "@/action/action";

export const GoogleSignInButton = ({title}: { title: string }) => {
    return <form className={"w-full"} action={SignInGoogleAction}>
        <Button variant="outline" className="w-full cursor-pointer">
            {title}
        </Button>
    </form>
}