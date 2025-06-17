"use client"

import {Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {GetDevice} from "@/action/QuickLoginAction";
import { signIn } from "next-auth/react";
import {useEffect, useState} from "react";
import {UserDevice} from "@/types/type";

export function QuickLogin({ device_token }: { device_token: string }) {
    const [user_device, setUserDevice] = useState<UserDevice | null>(null);
    useEffect(() => {
        (async () => {
            const device = await GetDevice(device_token);
            setUserDevice(device);
        })()
    }, []);

    const handleQuickLogin = async () => {
        if (!user_device) {
            return
        }


        await signIn("device-login", {
            device_token,
            device_id: user_device.id,
            redirectTo: "/"
        })

    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button className="cursor-pointer">Masuk</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Sudah pernah login? Cari perangkat mu disini!</DialogTitle>
            </DialogHeader>
            <Button className="w-full cursor-pointer" variant={"ghost"} size="lg" onClick={handleQuickLogin}>
                <span className="font-bold">{user_device?.device_name}</span>
            </Button>
        </DialogContent>
    </Dialog>
}