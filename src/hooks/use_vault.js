import { useState, useEffect, useMemo } from 'react'

import {
	useAccount,
	useContract,
	useContractWrite,
	useNetwork,
	useWaitForTransaction,
  useContractRead
} from "@starknet-react/core";

import { fractionVaultABI } from "@/lib/constants/fraction_vault";
import { flatABI } from "@/lib/constants/flat";
import { VAULT_ADDRESS, TOOGLE_SELECTOR } from "@/lib/constants/contract_address";



function useVault(depositedContractAddress){
    const { address } = useAccount();
    const [ currentController, setCurrentController] = useState('')
    const [ hasControl, setHasControl ] = useState(false)
    const [ doorOpen, setDoorOpen] = useState(false)

    const { contract } = useContract({
      abi: fractionVaultABI,
      address: VAULT_ADDRESS,
    });

    const { contract: vaultContract } = useContract({
      abi: flatABI,
      address: depositedContractAddress 
    })

    async function getController(){
      let currentController = await contract.call("get_controller", [depositedContractAddress])
      currentController = currentController.toString(16)
      console.log(currentController)
      setCurrentController(currentController)
      if (address == currentController){
        setHasControl(true)
      }
    }

    async function getDoorState(){
      let doorState = await vaultContract.call("get_door_state", [])
      console.log(doorState)
      setDoorOpen(doorState)
    }

    useEffect(() => {
      getController()
      getDoorState()
      return () => {
        ''
      }
    }, [])

    const calls = useMemo(() => {
      if (!depositedContractAddress|| !contract) return [];
      // return contract.populateTransaction["call_function"]([depositedContractAddress, TOOGLE_SELECTOR]);
      
    }, [contract, address])

    const { writeAsync, data, isPending } = useContractWrite({
      calls,
    });

    return { currentController, hasControl, writeAsync, doorOpen }
}

export default useVault