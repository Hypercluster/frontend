import { useContractWrite } from "wagmi";
import { HyperclusterABI } from "./abi";


// in case you don't know the address yet; 
export function wagmiProvider(address: any, args: [any]) {

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: address,
    abi: HyperclusterABI,
    functionName: 'addReferral',
    args: args,
  })

  const executeWrite = () => {
    write();
  }
  
  return executeWrite;

}
