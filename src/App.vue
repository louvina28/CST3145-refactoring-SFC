<template>
  <div id="app">

    <header>
      <h1>{{sitename}}</h1>
      <button @click="showCheckout">
          {{totalItemsInTheCart}}
          <font-awesome-icon icon="fas fa-shopping-cart" />
          Checkout
      </button>
      <button v-if="testConsole" @click="toggleShowTestConsole">
         <font-awesome-icon icon="fas fa-text-height"/>
          Test Console
      </button>
      <div v-if="testConsole && showTestConsole" class="test-console">
        <button @click="saveProductToDB" class="test-elem">
          <font-awesome-icon icon="fas fa-save"/>
            Test Save a Product to the DB
        </button>
        <button @click="deleteAllCaches" class="test-elem">
          <font-awesome-icon icon="fas fa-trash" />
          Delete All Caches
        </button>
        <button @click="reloadPage" class="test-elem">
          <font-awesome-icon icon="fas fa-sync" />
          Reload Page
        </button>
        <strong class="test-elem">HTTPS Test: </strong><a
        v-bind:href="serverURL" target="_blank">link</a>
        <button @click="unregisterAllServiceWorkers" class="test-elem">
          <font-awesome-icon icon="fab fa-uniregistry" />
          Unregister All ServiceWorkers
        </button>
      </div>
    </header>

    <main>
      <br>
      <component :is="currentView" :sortedProducts="sortedProducts"
      :imagesBaseURL="imagesBaseURL" :cart="cart"
      @add-item-to-cart="addItemToCart"
      @manage-remove-item="manageRemoveItem"></component>
      
    </main>
  </div>
</template>

<script>
import ProductList from "./components/ProductList.vue";
import Checkout from "./components/Checkout.vue";

import products from "./assets/json/products.json" 

export default {
    name: 'app',
    data() {
      return {
        sitename: "After School Club",
        cart: [],
        currentView: ProductList,
        products: products,
        //products: [],
        imagesBaseURL: "",
        //imagesBaseURL: "",
        serverURL: "http://localhost:3000/collections/products",
        //serverURL:"",
        testConsole: true,
        showTestConsole: true,
    }
  },
  components: {ProductList, Checkout},
  created: function() {
      if ("serviceWorker" in navigator) {
          navigator.serviceWorker.register("service-worker.js");
      }

      // fetch("http://localhost:3000/collections/products").then(
          //   function (response) {
          //     response.text().then(
          //       function (text) {
          //         alert(text);
          //       }
          //     )
          //   }
          // )

          //let webstore = this;

          // fetch(this.serverURL).then(
          //     function(response) {
          //         response.json().then(
          //           function(json) {
          //             //alert(json);
          //             //console.log(json);
          //             study.products = json;
          //           }
          //         )
          //     }
          // );
      },
  methods: {
  showCheckout() {
  if (this.currentView === ProductList) {this.currentView = Checkout}
  else { this.currentView = ProductList }
  //this.cart.push({id:1001})
  },
    toggleShowTestConsole() {
        this.showTestConsole = !this.toggleShowTestConsole;
    },
    saveProductToDB() {
      const newProduct = {
        "id": 1,
        "siteName": "After School Club",
        "subject": "English",
        "location": "Langley",
        "price": 50,
        "path": "images/English.png",
        "space": 5,
      }

      let webstore = this; 

      //set the url to your server and route
      fetch(this.serverURL, {
        method: "POST", //set the HTTP method as "POST"
        headers: {
          "Content-Type": "application/json", //set the data type as JSON
        },
        body: JSON.stringify(newProduct) //need to stringigy the JSON object
      }).then(
        function (response) {
          response.json().then(
            function (json) {
              alert("Success: " + json.acknowledged);
              console.log("Success: " + json.acknowledged);

              webstore.products.push(newProduct);
            }
          )
        }
      );
    },
    deleteAllCaches() {
      caches.keys().then(function(names) {
        for (let name of names)
          caches.delete(name);
      });
      
      console.log("All Caches Deleted");
    },
    reloadPage() {
      window.location.reload();
    },
    unregisterAllServiceWorkers() {
      navigator.serviceWorker.getRegistrations().then(function
      (registrations) {
        for (let registration of registratons) {
          registration.unregister()
        }
      });

      console.log("ServiceWorkers Unregistered");
    },
    addItemToCart: function (product) {
      this.cart.push(product.id);
    },
    removeItemFromCart(product) {
      let index = this.cart.indexOf(product.id);
      //At position index, remove 1 item
      this.cart.splice(index, 1);
    },
    manageRemoveItem(product) {
      this.removeItemFromCart(product);
      // if (!this.atLeastOneItemInTheCart) {
      //  this.showProduct = true;
      // }
      if (!this.atLeastOneItemInTheCart) {
        this.currentView = ProductList;
      }  
    }
  },  
  computed: {
      totalItemsInTheCart: function () {
        return this.cart.length || "";
      },
      sortedProducts() {
    
          function compare(a, b) {
              if (a.price > b.price) return +1;
              if (a.price < b.price) return -1;
              return 0;
        }

        return this.products.sort(compare);
    },
    atLeastOneItemInTheCart() {
      return this.totalItemsInTheCart >= 1;
    }
  }  
};
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
