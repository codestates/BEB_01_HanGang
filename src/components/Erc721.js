import React, {useState} from 'react';
import erc721Abi from "../erc721Abi";

function Erc721({ web3, account, erc721list }) {
    const [to, setTo] = useState("");
	const sendToken = async (tokenAddr, tokenId) => {
        const tokenContract = await new web3.eth.Contract(
          erc721Abi,
          tokenAddr,
          {
              from: account,
          }
      );
      tokenContract.methods
          .transferFrom(account, to, tokenId)
          .send({
              from: account,
          })
          .on("receipt", (receipt) => {
              setTo("");
          });
    };
	return (
		  <div className="erc721list">
		      {erc721list.map((token) => {
		          return (
		              <div className="erc721token">
		                  Name: <span className="name">{token.name}</span><br/>
		                  description: <span className="symbol">{token.description}</span><br/>
		                  img <img src={token.img} width={300} />

		              </div>
		          );
		      })}
		  </div>
		);
}
export default Erc721;