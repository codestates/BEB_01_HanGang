import './App.css';
import { useState, useEffect } from "react";
import Web3 from 'web3';
import React from "react"
import erc721Abi from "./erc721Abi"
import TokenList from "./components/TokenList";

function App() {
  const [erc721list, setErc721list] = useState([]); 
  const [newErc721addr, setNewErc721Addr] = useState();

  const [web3, setWeb3] = useState();
    useEffect(() => {
        if (typeof window.ethereum !== "undefined") { // window.ethereum이 있다면
            try {
                const web = new Web3(window.ethereum);  // 새로운 web3 객체를 만든다
                setWeb3(web);
            } catch (err) {
                console.log(err);
            }
        }
    }, []);

  const [account, setAccount] = useState('');
  
  const connectWallet = async () => {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
         });

    setAccount(accounts[0]);
};

const addNewErc721Token = async () => {
  const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      newErc721addr
  );
    const name = await tokenContract.methods.name().call();
	  const symbol = await tokenContract.methods.symbol().call();
	  const totalSupply = await tokenContract.methods.totalSupply().call();
    const addr = newErc721addr;

    let arr = [];
		  for (let i = 1; i <= totalSupply; i++) {
		      arr.push(i);
		  }
      for (let tokenId of arr) {
        let tokenOwner = await tokenContract.methods
            .ownerOf(tokenId)
            .call();
        if (String(tokenOwner).toLowerCase() === account) {
            let tokenURI = await tokenContract.methods
                .tokenURI(tokenId)
                .call();
            setErc721list((prevState) => {
                return [...prevState, { name, symbol, tokenId, tokenURI, addr }];
            });
        }
      }

} 

  return (
    <div className="App">
            <button
                className="metaConnect"
                onClick={() => {
                    connectWallet();
                }}
            >
                connect to MetaMask
            </button>
        <div className="userInfo">주소: {account}</div>  
        <div className="newErc721">
        <input
            type="text"
            onChange={(e) => {
                setNewErc721Addr(e.target.value);  
                // 입력받을 때마다 newErc721addr 갱신
            }}
        ></input>
        <button onClick={addNewErc721Token}>add new erc721</button>
      </div>    
      <TokenList web3={web3} account={account} erc721list={erc721list} />
    </div>
  );
}

export default App