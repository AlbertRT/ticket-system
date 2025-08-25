"use client";

import React from "react";
import DeviceCard from "./DeviceCard";
import PinCard from "./PinCard";
import { useSecurityDetails } from "@/app/hook/useUserSecurityDetails";
import LoadingOverlay from "@/components/ui/loading-overlay";
import BiomtericCard from "./BiomtericCard";

export default function SecurityDashboard() {
	const { isLoading, refresh, data, isError } = useSecurityDetails();
	if (isLoading) return <LoadingOverlay fullscreen />;
	if (!data) return null;

    console.log(data);

	return (
		<div className="mt-9">
			<DeviceCard device={data.device} />

			{/* Biometrik & PIN */}
			<div className="space-y-4 mt-9">
				<BiomtericCard biometric={data.credential} />
				<PinCard pin={data.pin} />
			</div>
		</div>
	);
}
