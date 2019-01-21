// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

/*
 * When you compile and deploy your Voting contract,
 * truffle stores the abi and deployed address in a json
 * file in the build directory. We will use this information
 * to setup a Voting abstraction. We will use this abstraction
 * later to create an instance of the Voting contract.
 * Compare this against the index.js from our previous tutorial to see the difference
 * https://gist.github.com/maheshmurthy/f6e96d6b3fff4cd4fa7f892de8a1a1b4#file-index-js
 */
 import post_artifacts from '../../build/contracts/Post.json'

 var Post = contract(post_artifacts);

 var userPostCount=0;

window.App = {
  start: function() {
    Post.setProvider(web3.currentProvider);

   var self = this;
   self.readAllUserPost();
  },

  // Read all user Posts
  readAllUserPost:function(){
          var self = this;
          console.log("default post count "+userPostCount);
          Post.deployed().then(function(contractInstance) {
                 contractInstance.postCount.call().then(function(count) {
                 userPostCount=count;
                 console.log("post count "+userPostCount);
                   for(var i=0; i< userPostCount;i++){
                     self.populateTablePosts(i);
                   }

                 });
          });
  },
// Read all user Posts ends

  //Populate table Posts
  populateTablePosts:function(post){
        console.log("read post "+post);
          Post.deployed().then(function(contractInstance) {
               var serialNumber=Number(post)+1;
               console.log("read serial "+serialNumber);
                 contractInstance.readPostByIndex.call(post).then(function(results) {
                    $("#allPostsTable").append("<tr><td>"+serialNumber+"</td><td>"+results[1]+"</td><td>"+results[4]+"</td></tr>");
                     return;
                 });

          });
  },
  //Populate table Posts  ends







};

$( document ).ready(function() {
  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source like Metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

 //  // onClick for nav
 //  $('#pag-nav .navbar-nav').click(function() {
 //
 //    //console.log("Clicked");
 //    $('#pag-nav .navbar-nav li.active').removeClass('active');
 //    $(this).addClass('active');
 // });
 //  // onClick for nav ends

    App.start();
});
