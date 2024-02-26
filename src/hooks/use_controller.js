import { useState, useEffect } from 'react'

import {
	useAccount,
	useContract,
	useContractWrite,
	useNetwork,
	useWaitForTransaction,
} from "@starknet-react/core";


function useController(depositedContractAddress){

    const [ currentController, setCurrentController] = useState('')
    const { contract } = useContract({
		abi: fractionVaultABI,
		address: "depositedContractAddress",
	});


    async function get_controller(){

    }

    useEffect(() => {
        
    
      return () => {
        second
      }
    }, [third])
    


}