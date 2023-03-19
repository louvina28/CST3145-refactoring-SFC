<template>
    <div>
        <h1>Welcome to the Product List Page</h1>

        <div v-for="product in sortedProducts" class="product">
            <h1 v-text="product.subject"></h1>

            <figure>
                <img v-bind:src="imagesBaseURL + product.path"
                class="smallimage">
            </figure>

            <!--p v-text="product.description"></p-->
            <p>Subject: {{product.subject}}</p>
            <p>Location: {{product.location}}</p>
            <p>Price: {{product.price}}</p>
            <p>Space: {{product.space}}</p>

            <button v-if="canAddToCart(product)" v-on:click="addItemToCart
            (product)">
            <font-awesome-icon icon="fas fa-cart-plus"/>Add to the Cart
            </button>

            <button v-else disabled>Add to the Cart</button>
            <span v-if="itemsLeft(product) === 0">All out!</span>
            <span v-else-if="itemsLeft(product)< 5">Only {{itemsLeft(product)}} left</span>
            <span v-else>By now!</span>
            <div>
              
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ProductList",
    props: ["sortedProducts", "imagesBaseURL", "cart"],
    data() {
      return {}  
    },
methods: {
    canAddToCart(product) {
        return product.space > this.cartCount(product.id);
    },
    cartCount(id) {

        let count = 0;
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i] === id) {
                count++;
            }
        }

            return count;
    },
    addItemToCart: function (product) {
        this.$emit("add-item-to-cart", product);
    },
    itemsLeft(product) {
        return product.space - this.cartCount(product.id);
    }        
  }       
}
</script>