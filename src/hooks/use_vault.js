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
    const [ propertyAddress, setPropertyAddress ] = useState('1234 Starknet Lane')

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
      currentController = `0x${currentController.toString(16)}`
      setCurrentController(currentController)
      if (address == currentController){
        setHasControl(true)
      } else{
        setHasControl(false)
      }
    }

    async function getDoorState(){
      let doorState = await vaultContract.call("get_door_state", [])
      setDoorOpen(doorState)
    }

    useEffect(() => {

      const fetchControllerData = () => {
        console.log("fetching")
        if (address) {
          getController();
        }
      };

      fetchControllerData()
      getDoorState()
      const intervalId = setInterval(fetchControllerData, 5000);

      return () => {clearInterval(intervalId);}
    }, [address])

    const calls = useMemo(() => {
      if (!depositedContractAddress|| !contract) return [];
      return contract.populate("call_function", {
        contract_address: depositedContractAddress,
        function_selector: TOOGLE_SELECTOR,
        call_data: []
      })
      
      
      // Transaction["call_function"]([depositedContractAddress, TOOGLE_SELECTOR, []]); depositedContractAddress, TOOGLE_SELECTOR, ['']
      
    }, [contract, address])

    const { writeAsync, data, isPending } = useContractWrite({
      calls,
    });

    return { currentController, hasControl, writeAsync, doorOpen, propertyAddress }
}

export default useVault