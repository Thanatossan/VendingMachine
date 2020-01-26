import React, { Fragment, useState, useEffect } from "react";
import VendingMachine from "./vendingMachine";

import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [vm, setVM] = useState({});
  const [message, setMessage] = useState();
  const [balance, setbalance] = useState(0);
  const [change, setChange] = useState([]);
  useEffect(() => {
    fetch("https://www.mocky.io/v2/5c77c5b330000051009d64c9")
      // fetch("https://my-json-server.typicode.com/adyngom/vmapi/db")
      .then(response => response.json())
      .then(jsonData => {
        setData(jsonData.data);
        setVM(VendingMachine(data));
      });
  }, [balance, data]);
  const sale = (pid, balance) => {
    return vm.sale(pid, balance);
  };
  const changeCal = balance => {
    var change = [];
    // const coinTpye = ["10","5","2","1"];
    const coinValue = [10, 5, 2, 1];
    var amount;
    for (var i = 0; i < coinValue.length; i++) {
      amount = Math.floor(balance / coinValue[i]);
      if (amount > 0) {
        for (var j = 0; j < amount; j++) {
          change.push(coinValue[i]);
          balance = balance - coinValue[i];
        }
      }
    }
    return change;
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          {Object.keys(data).map(id => {
            if (balance < data[id].price) {
              return (
                <React.Fragment key={id}>
                  <div className="col-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <img
                          className="card-img-top"
                          src={data[id].image}
                          alt={data[id].name}
                        />
                      </div>
                      <div className="card-body">
                        <div className="col">
                          <p> Price: {data[id].price} coin</p>
                          <p> {data[id].in_stock}</p>
                        </div>
                        <button
                          id={id}
                          className="btn btn-danger"
                          // onClick={() => {
                          //   console.log(data[id].in_stock);
                          // }}
                        >
                          {data[id].name}
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            } else {
              return (
                <React.Fragment key={id}>
                  <div className="col-4">
                    <div className="card text-center">
                      <div className="card-header">
                        <img
                          className="card-img-top"
                          src={data[id].image}
                          alt={data[id].name}
                        />
                      </div>
                      <div className="card-body">
                        <p> Price: {data[id].price} coin</p>
                        <p> {data[id].in_stock}</p>
                        <button
                          id={id}
                          className="btn btn-success"
                          onClick={e => {
                            setMessage(sale(e.target.id, { balance }));
                            setbalance(() => {
                              if (data[id].in_stock === true) {
                                setChange(changeCal(balance - data[id].price));

                                return 0;
                              } else {
                                return balance;
                              }
                            });

                            // setbalance(calBalance(e.target.id, { balance }));
                          }}
                        >
                          {data[id].name}
                        </button>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          })}
        </div>
        <div className="row">
          <div className="col ">
            <h4> Got Item </h4>
            <p>{message}</p>
          </div>

          <div className="col">
            <div className="row">
              <div className="col">
                <p> total</p>
                <p> {balance} </p>
              </div>
              <div className="col">
                {" "}
                <p> Change</p>
                <p>
                  [
                  {change.map(id => {
                    return <> {id} </>;
                  })}
                  ]
                </p>
              </div>
              <div className="col">
                <p> insert </p>
                {[1, 2, 5, 10].map(id => {
                  return (
                    <React.Fragment key={id}>
                      <button
                        onClick={e => {
                          setbalance(balance + id);
                          setChange([]);
                        }}
                      >
                        {id}
                      </button>
                    </React.Fragment>
                  );
                })}

                <button
                  onClick={() => {
                    setbalance(0);
                    setChange(changeCal(balance));
                  }}
                >
                  {" "}
                  refund{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default App;
