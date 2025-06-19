"use client"

import {useEffect} from "react";
import {syncDeviceInfo} from "@/action/syncDeviceInfo";
import Cookies from "js-cookie";
import {toast} from "sonner";

export function SyncDeviceInfo({ access_token, user_id }: { access_token: string; user_id: string }) {
    useEffect(() => {
        (async () => {
            const device_token = await syncDeviceInfo(access_token, user_id)

            if (device_token) {
                Cookies.set("device_token", device_token, {
                    secure: true,
                    sameSite: "Strict",
                    path: "/",
                    expires: 30 // 30 hari
                });

                toast.success("Perangkat tersimpan otomatis.")
            }
        })()
    }, [access_token])

    return null
}