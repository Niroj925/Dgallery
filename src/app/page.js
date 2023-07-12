"use client";
import Upload from "./artifacts/contracts/Gallery.sol/Gallery.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import styles from "./page.module.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

 

  useEffect(() => {
    let providers

if (window.ethereum == null) {

    console.log("MetaMask not installed; using read-only defaults")
    providers = ethers.getDefaultProvider()
    setProvider(providers);
      console.log(providers)
} else {
    providers = new ethers.BrowserProvider(window.ethereum)
     setProvider(providers);
     console.log(providers)
}


    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x898A5E1136a97427Bb5be779b7bD2545CF9272b3";

        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
      <div className={styles.main}>
        <div className={styles.heading}>
           <h1 style={{ color: "white" }}>Decentralize Gallery</h1>
        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        </div>
       
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  );
}

export default App;