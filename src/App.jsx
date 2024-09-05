import React, { useState, useEffect } from "react";
import { Inputbox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Get currency rates for the "from" currency
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  // Function to convert amount based on selected currencies
  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
    } else {
      setConvertedAmount(0);
    }
  };

  // Swap "from" and "to" currencies
  const swap = () => {
    const tempFrom = from;
    const tempTo = to;
    const tempAmount = amount;
    setFrom(tempTo);
    setTo(tempFrom);
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://imgs.search.brave.com/E9WbKgxkn0D2iW5BuwhhpGf9tU0imiioXta5NUP3h5k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY2/MTY3NDI5MS9waG90/by8xLTItNS0xMC0x/MDAtZGlmZmVyZW50/LWRvbGxhci1iaWxs/cy1pbi1hLXBpbGUt/YXMtYmFja2dyb3Vu/ZC53ZWJwP2E9MSZi/PTEmcz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/a2puNkowSXloazd4/VFphanF2dC1xeF84/VEhEa0xqLXhVMThw/QXpOSkVfRT0')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <Inputbox
                label="From"
                amount={amount}
                currencyOptions={options}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(newAmount) => setAmount(newAmount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                onClick={swap}
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
              >
                Swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <Inputbox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
