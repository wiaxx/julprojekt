function loadCart(){
    let cartItem = JSON.parse( localStorage.getItem('cart-item'));
    
    if( cartItem == null){
        return 0;
    }

    Object.values(cartItem).map(item => {
      let amount = item.price * item.qty;

      let row = document.createElement('tr');

      row.innerHTML = `
          <td><img src= "${item.img}" width="150"/></td>

          <td width="20%">${item.name}</td>
          <td width="20%">${item.qty}</td>
          <td width="20%">${item.price}</td>
          <td width="20%">${amount}</td>
      `;

      document.querySelector('.cart-item-list').appendChild( row );
    });

    let totalCost = localStorage.getItem('costTotal');

    let totalRow = document.createElement('tr');

    totalRow.innerHTML = `
          
              <td class="tfoot" colspan='4' align="left"><h2>Total</h2></td>
              <td class="tfoot">${totalCost}</td>
             
    `;
      document.querySelector('.cart-item-list').appendChild(totalRow);    
}
loadCart();