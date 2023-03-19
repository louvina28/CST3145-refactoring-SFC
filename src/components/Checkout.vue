<template>
    <div>
        <h1>Welcome to the Checkout</h1>

        <h2>Your current items in the cart are ({{ totalItemsInTheCart }} in total): </h2>
        <div>
            <div v-for="product in sortedProducts">

                <div v-if="atLeastOneInTheCart(product)" class="product">
                    <h3 v-text="product.subject"></h3>
                    <p><span>Product ID:</span>{{ " " + product.id }}</p>

                    <figure>
                        <img v-bind:src="imagesBaseURL + product.path"
                        class="smallimage">
                    </figure>

                    <p><span>Price:<font-awesome-icon icon="fas
                    fa-pound-sign" /></span>{{ " " + product.price }}</p>
                    <p>Available items: {{ itemsLeft(product) }} (<strong>In the cart you have added:
                    {{ cartCount(product.id) }}</strong>)</p>

                    <button v-on:click="manageRemoveItem(product)">Remove 1 from your cart</button>
            
                </div>
            </div>
        </div>
        <h2>Checkout Process</h2>

        <!--p>
            <strong>Name: </strong>
            <input type="name" v-model.trim="order.name">
        </p>

        <div class="checkoutContainer"> 
        <div v-for="item in cart" class="container">
          <img v-bind:src="item.path" />
          <p>Subject: {{item.subject}}</p>
          <p>Location: {{item.location}}</p>
          <p>Price: {{item.price}}</p>
          <p>Space: {{item.space}}</p>
          <button v-on:click="deleteItemFromCart(item),addSpaceValue(item)">Remove</button>
        </div>
        </div>       
        
        <div class="information">
          <h2>Enter Your Information</h2>
  
          <form id="form" action="/" method="GET" onkeyup="checkInput()">
            <div>
              <label for="name">Name</label>
              <input v-model.trim="order.name" id="name" name="name" type="text" required  onkeyup="lettersOnly(this)"/ >
            </div>
            <div>
              <label for="phone">Phone</label>
              <input v-model.number="order.phoneNumber" id="phone" name="phone" type="number" required onkeyup="numbersOnly(this)"/>
            </div>
            <button id="checkOut" type="button" disabled v-on:click="submitForm">Check Out</button>
          </form>
        </div-->
        </div>
</template>

<script>
export default {
    name: "Checkout",
    props: ["sortedProducts", "imagesBaseURL", "cart"],
    data() {
      return {}  
    },
    methods: {
        cartCount(id) {

            let count = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    count++;
                }
            }

            return count;
        },
        itemsLeft(product) {
            return product.space - this.cartCount(product.id);
        },    
        atLeastOneInTheCart(product) {
            return this.cart.includes(product.id);
        },
        manageRemoveItem: function (product) {
            this.$emit("manage-remove-item", product);
        }
    }, 
    computed: {
        totalItemsInTheCart: function () {
            return this.cart.length || "";
        },
    }
}
</script>