import {Button} from "@/components/ui/button";
import { SignInGoogleAction } from "@/action/action";

export const GoogleSignInButton = () => {
    return <form action={SignInGoogleAction}>
        <Button variant="outline" className="cursor-pointer" size={"icon"}>
            <img src={"/brand/google.svg"} className="w-[16px] h-[16px]" />
        </Button>
    </form>
}

export const AppleSignInButton = () => {
    return (
		<form>
			<Button variant="outline" className="cursor-pointer" size={"icon"} disabled>
				<img src={"/brand/apple.svg"} className="w-[16px] h-[16px]" />
			</Button>
		</form>
	);
}