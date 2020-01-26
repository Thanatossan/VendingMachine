export default function VendingMachine(list) {
  //   var total = balance || 0;
  const product = list || null;

  var sale = function(pid, balance) {
    if (product[pid].in_stock === true) {
      if (balance.balance >= product[pid].price) {
        balance.balance = balance.balance - product[pid].price;
        return product[pid].name;
      } else {
        return 0;
      }
    } else {
      alert("PRODUCT NOT AVALIABLE");
    }
  };
  return Object({ sale });
}
