import CounterDetail from "@/components/counter-detail";
import React, { Suspense } from 'react';

const ContractFractionalized = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<CounterDetail />
		</Suspense>
	);
};

export default ContractFractionalized;
