import logo from '../한강.png';
import React, { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT, } from "../utils/interact.js";
import Web3 from 'web3';
import erc721Abi from "../erc721Abi"
import TokenList from "./TokenList";
import axios from "axios";

function Main() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [erc721list, setErc721list] = useState([]);
  const [newErc721addr, setNewErc721Addr] = useState();
  const [NFTlist, setNFTlist] = useState([]);
  const [img, setImg] = useState('')
  const [web3, setWeb3] = useState();
  // let NFTlist = [1,2,3,4,5,6,7,8,9,10]

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
  const addNewErc721Token = async () => {

    const tokenContract = await new web3.eth.Contract(
      erc721Abi,
      '0x1af3dde6Cc151841CE93618bF10E07687c615D4A'
    );
    const totalSupply = await tokenContract.methods.totalSupply().call();
    // for (let i = 1; i <= totalSupply; i++) {
    //   const token_Id = await tokenContract.methods.tokenURI(i).call();
    //   JSON.parse(token_Id)
    //   const info = JSON.parse(token_Id);
    //   setName(info.name);
    //   setImg(info.image);
    //   setDescription(info.description)
    //   let tokenOwner = await tokenContract.methods
    //     .ownerOf(i)
    //     .call();
    //   if (String(tokenOwner).toLowerCase() === '0x6ffd74bac21fa086d645e6407f2e9bd19595b9e0'.toLowerCase()) {
    //     let tokenURI = await tokenContract.methods
    //       .tokenURI(i)
    //       .call();
    //     erc721list.push({name, img, description})
    //   }
    //   console.log(erc721list);
    // }
    let arr = [];
		  for (let i = 1; i <= totalSupply; i++) {
		      arr.push(i);
		  }
      for (let tokenId of arr) {
        let tokenOwner = await tokenContract.methods
            .ownerOf(tokenId)
            .call();
        if (String(tokenOwner).toLowerCase() === '0x6ffd74bac21fa086d645e6407f2e9bd19595b9e0'.toLowerCase()) {
            let tokenURI = await tokenContract.methods
                .tokenURI(tokenId)
                .call();
                    //   const info = JSON.parse(tokenId);
                    //   setName(info.name);
                    //   setImg(info.image);
                    //   setDescription(info.description)
                    const info = JSON.parse(tokenURI);

            setErc721list((prevState) => {
                return [...prevState, { info }];
            });
        }
    }
    console.log(erc721list);
  }


  return (
    <div className="App">
      <div class="container">
        <div className="row no-gutters">
          <button onClick={addNewErc721Token}>add new erc721</button>
          {
            erc721list.map((token) => {
              return (
                <div className="col-3">
                  <svg
                    className="bd-placeholder-img"
                    width="100%"
                    height="250"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Placeholder: Image"
                    preserveAspectRatio="xMidYMid slice"
                    role="img">
                  </svg>
                  {/* <h1 className="title">NFT</h1> */}
                  <div class="card">
                    <img class="card-img-top" src={token.info.image} alt={"logo"} />
                    <div class="card-body">
                      <h5 class="card-title">{token.info.name}</h5>
                      <p class="card-text">설명: {token.info.description} </p>
                      <a href="/Auction" class="btn btn-primary">구매</a>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Main;
