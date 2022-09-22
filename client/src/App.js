import "./App.css";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { SuitHeartFill } from "react-bootstrap-icons";
import artifact from "./artifacts/contracts/Donation.sol/Donation.json";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [amount, setAmount] = useState(0);
  const [donations, setDonations] = useState([]);

  const toString = (bytes32) => ethers.utils.parseBytes32String(bytes32);
  const toWei = (ether) => ethers.utils.parseEther(ether);
  const toEther = (wei) => ethers.utils.formatEther(wei).toString();

  useEffect(() => {
    const init = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const contract = await new ethers.Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        artifact.abi
      );
      setContract(contract);

      contract
        .connect(provider)
        .getDonations()
        .then((result) => {
          const donations = result.map((el) => [el[0], toEther(el[1])]);
          setDonations(donations);
        });
    };
    init();
  }, []);

  const isConnected = () => signer !== undefined;

  const getSigner = async (provider) => {
    provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
  };

  const connect = () => {
    getSigner(provider);
  };

  const sendDonation = async () => {
    const wei = toWei(amount);

    await signer.sendTransaction({
      to: contract.address,
      value: wei,
    });

    setAmount("0");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="row" style={{ width: "800px" }}>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <h1 className="donateHeader">Donate ETH</h1>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 amountButtonLeft">
                <a
                  onClick={() => setAmount("0.1")}
                  className={
                    "amountButton " + (amount === "0.1" ? "amountClicked" : "")
                  }
                >
                  0.1
                </a>
              </div>
              <div className="col-md-6 amountButtonRight">
                <a
                  onClick={() => setAmount("0.5")}
                  className={
                    "amountButton " + (amount === "0.5" ? "amountClicked" : "")
                  }
                >
                  0.5
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 amountButtonLeft">
                <a
                  onClick={() => setAmount("1")}
                  className={
                    "amountButton " + (amount === "1" ? "amountClicked" : "")
                  }
                >
                  1
                </a>
              </div>
              <div className="col-md-6 amountButtonRight">
                <a
                  onClick={() => setAmount("2")}
                  className={
                    "amountButton " + (amount === "2" ? "amountClicked" : "")
                  }
                >
                  2
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <a onClick={() => sendDonation()} className="amountButton">
                  Donate
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                {isConnected() ? (
                  <>
                    <span className="dot greenDot"></span>
                    <p style={{ fontSize: "25px" }}>Connected</p>
                  </>
                ) : (
                  <>
                    <span className="dot redDot"></span>
                    <p style={{ fontSize: "25px" }}>Not connected</p>
                    <button onClick={connect} className="btn btn-primary">
                      Connect Wallet
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-2"></div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-md-12">
                <h1 className="donateHeader">Recent Donations</h1>
              </div>
            </div>
            {donations.map((ds, idx) => (
              <>
                <div className="donationBubbleLeft">
                  <SuitHeartFill fill="#FF7F97" />
                  <span className="paddingLeft">
                    {ds[1]} ETH &nbsp;
                    <span className="byAddress">
                      by {ds[0]?.substring(0, 14)}...
                    </span>
                  </span>
                </div>
              </>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
