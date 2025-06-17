import { headers } from "next/headers"
import {UAParser} from "ua-parser-js"

export async function parseUserDevice() {
    const headerList = await headers()
    const userAgent = headerList.get("user-agent") || ""

    const parser = new UAParser(userAgent)
    const result = parser.getResult()

    console.log(result)

    return {
        deviceName: `${result.browser.name || "Unknown"} ${result.browser.version} | ${result.os.name || "Unknown"}`,
        os: result.os.name,
        browser: result.browser.name,
        userAgent
    }
}
