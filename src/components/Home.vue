<template>
  <div>
<!--  头部-->
  <div class="userLogin">
        <span @click="myLogin">  {{showLogin}}</span>
  </div>
  <div class="asd">
      <ul>
        <li @click="back('Home')">Home</li>
        <li>/</li>
        <li @click="back('Mycar')">Cart</li>
      </ul>
  </div>
<!--  中心-->
  <el-row class="el" :gutter="10">

    <el-col :xs="0" :sm="4" :md="6" :lg="8" :xl="2">
      <div class="grid-content bg-purple">
          <div >Price：</div>
          <div v-for="(value,index) in priceList" :key="index" @click="changePrice(index)" :class="nums==index ? 'addcolor':'' " class="price">
              {{value}}
          </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="22"><div class="grid-content bg-purple-light">
          <div>
            <div style="height:50px; line-height:50px" :value="priceSort" @click="bindPriceSort">
              <span style="float:right; margin-right:20px">{{priceSortShow}}</span>
            </div>
          </div>
          <div  class="shops" >
            <div v-for="(item,index) in showList" :key="index" class="shop">
              <div>
                <img :src="item.productImage" alt="" class="img">
              </div>
              <div class="shop_name">
                  {{item.productName}}
              </div>
              <div class="shop_price">
                ￥{{item.salePrice}}
              </div>
              <div class="shop_buy" @click="addCar(index)">
                  点击购买
              </div>
            </div>
          </div>
    </div></el-col>
  </el-row>
<!--  加入购物车-->
  <el-dialog
    title="亲爱的客户"
    :visible.sync="dialogVisible"
    width="30%">
    <span>商品加入购物车成功</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">继续购物</el-button>
    <el-button type="primary" @click="gocar">前往购物车</el-button>
  </span>
  </el-dialog>
<!--  用户登陆验证-->
  <el-dialog
    title="登陆"
    :visible.sync="isLoginShow"
    width="30%">
    <div >
      <el-input
        placeholder="请输入用户"
        v-model="username"
        clearable>
      </el-input>
      <el-input placeholder="请输入密码" v-model="userPassword" show-password></el-input>
      <span slot="footer" class="dialog-footer">
           <el-button @click="goLogin">登 陆</el-button>
      </span>
    </div>
  </el-dialog>
<!--  用户退出验证-->
  <el-dialog
    title="退出"
    :visible.sync="isBackShow"
    width="30%">
    <div >
      <div>
        确认退出登陆
      </div>
      <span slot="footer" class="dialog-footer">

           <el-button @click="isBackShow = false">取 消</el-button>
           <el-button @click="outLogin">确 认</el-button>
      </span>
    </div>
  </el-dialog>
  </div>
</template>

<script>

import { mapState,mapMutations,mapActions } from 'vuex'  // 拿到vuex中提供的mapState

export default {
  name: '',
  data() { 
    return {
      //用来渲染页面的数组
      showList:[],
      //接受axios请求过来的数据
      getList:[],
      //价格列表数组
      priceList:["All","0-100","100-500","500-1000","1000-2000","2000"],
      //定义一个nums用来匹配点击的价格颜色
      nums:0,
      dialogVisible: false,
      //判断登陆
      isLoginShow:false,
        //判断退出
        isBackShow:false,
        //展示登陆信息
        showLogin:"未登陆",
        //用户名
        username:'',
        //密码
        userPassword:'',
        //价格排序
        priceSort:0,  //0表示顺序 1表示倒序
        //价格排序展示
        priceSortShow:"升序"
    }
  },
  computed:{
      ...mapState({isLogin:"isLogin"},{changePriceSort:"changePriceSort"})
  },
  props: {

  },
  created() {

  },
  components:{

  },
  mounted() {
    //获取请求来的数据
    //   this.$axios.get("../../static/data/data.json").then((res)=>{
    //       if (res.status==200){
    //           this.getList=res.data.result.list;
    //           this.showList=res.data.result.list;
    //           console.log(this.showList);
    //       }
    //   });
      this.shopsAjax(); //调用vuex里面的axios请求
      //将请求来的vuex值赋值给getList与showList //深拷贝JSON.parse(JSON.stringify(person))
      this.getList=JSON.parse(JSON.stringify(this.$store.state.ajxaShops));
      this.showList=JSON.parse(JSON.stringify(this.$store.state.ajxaShops));
      //判断用户登陆还是未登陆
      if(this.$store.state.isLogin){
          // this.showLogin=this.$store.state.user.name;
          this.showLogin='已登录';
      }else{
          this.showLogin="未登录"
      }
      if(this.$store.state.priceSort==0){
          this.priceSortShow="升序";
          this.sortOne()
      }else{
          this.priceSortShow="降序";
          this.sortTwo()
      }
},
  methods:{
    //mapMutations是用来获取mutations里面的方法，对应方法绑定是state里面的数据
      ...mapMutations({shops:"addshops"}),
      ...mapMutations({login:"login"}),
      ...mapMutations({changePriceSort:"changePriceSort"}),
      //...mapActions是用来遍历获取actions里面的方法，然后在页面用this.属性名()调用
      ...mapActions({shopsAjax:"shopsAjax"}),//方法1针对对象



    //选择不同价格
      changePrice(index){
        this.nums=index;
        this.showList=[];
        if (index==0){
            this.showList=this.getList;
        }else if (index==1){
            this.getList.forEach(((value, index1) => {
                if (value['salePrice']<100){
                    this.showList.push(value)
                }
            }))
        }else if (index==2){
            this.getList.forEach(((value, index1) => {
                if (value['salePrice']>=100 && value['salePrice']<500){
                    this.showList.push(value)
                }
            }))
        }else if (index==3){
            this.getList.forEach(((value, index1) => {
                if (value['salePrice']>=500 && value['salePrice']<1000){
                    this.showList.push(value)
                }
            }))
        }else if (index==4){
            this.getList.forEach(((value, index1) => {
                if (value['salePrice']>=1000 && value['salePrice']<2000){
                    this.showList.push(value)
                }
            }))
        }else{
            this.getList.forEach(((value, index1) => {
                if (value['salePrice']>=2000){
                    this.showList.push(value)
                }
            }))
        }

      },
      back(str){
        this.$router.push({
          name:str
        })
      },
      //前往购物车
      gocar(){
          this.$router.push({path:'./Mycar'});
      },
      //添加购物车
      addCar(index){
          let _self=this;
         if (_self.$store.state.isLogin){
             _self.dialogVisible=true;
             let shop=_self.showList[index];
             shop.nums=1;
             shop.ischoice=false;
             _self.shops(shop)
         }else{
             this.isLoginShow=true
         }
      },
      //用户登陆
      myLogin(){
          // console.log(this.$store.state.isLogin);
          if (this.$store.state.isLogin){
              this.isBackShow=true
          }else{
              this.isLoginShow=true
          }
      },
      //确定登陆
      goLogin(){
          if (this.$store.state.user.name==this.username && this.$store.state.user.password==this.userPassword){
              this.isLoginShow=false;
              this.login(true);
              this.showLogin='已登录';
          }else{
              alert('用户错误') 
          }
      },
      //退出登陆
      outLogin(){
          this.login(false);
          this.isBackShow=false;
          this.showLogin="未登录"
      },
      //价格排序
      bindPriceSort(){
        if (this.$store.state.priceSort==0){
            //倒序
            this.sortTwo()
        }else{
            //顺序
            this.sortOne()
        }
      },

      //封装一个价格排序方法 顺序
      sortOne(){
          // console.log('顺序');
          for (let i=0;i<this.showList.length;i++){
              for (let j=i;j<this.showList.length;j++){
                  if (this.showList[i]['salePrice']>this.showList[j]['salePrice']){
                      let obj =this.showList[i];
                      this.showList[i]=this.showList[j];
                      this.showList[j]=obj;
                  }
              }
          }
          this.$forceUpdate();
          this.priceSortShow="升序";
          this.changePriceSort(0)
      },
      //倒序
      sortTwo(){
          // console.log('倒序');
          for (let i=0;i<this.showList.length;i++){
              for (let j=i;j<this.showList.length;j++){
                  if (this.showList[i]['salePrice']<this.showList[j]['salePrice']){
                      let obj =this.showList[i];
                      this.showList[i]=this.showList[j];
                      this.showList[j]=obj;
                  }
              }
          }
          this.$forceUpdate();
          this.priceSortShow="降序";
          this.changePriceSort(1)
      }
  },
 }
</script>

<style scoped>
*{
  list-style: none;
}
.asd{
        width: 100%;
        height: 40px;
        background: #f6f6f6;
}
.asd>ul{
  display: flex;
  height: 40px;
}
.asd>ul>li{
  height: 40px;
  margin-left: 10px;
  line-height: 40px;
}
.el{
  width: 100%;
  background: #f6f7fc;
}
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #f6f7fc;
    text-align: center;
    margin-top: 100px;
  }
  .bg-purple-light {
    background: white;
    margin-top: 10px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .addcolor{
    color: red;
  }
  .price{
    padding: 10px 0;
    cursor: pointer;
  }
  .img{
    width: 200px;
    height: 240px;

  }
  .shops{
    display: flex;
    flex-wrap: wrap;
    background: white;
    font-size: 16px;
    margin-top: 10px;
  }
  .shop{
    border: 1px solid #dddddd;
    margin: 5px;
  }
  .shop:hover{
    /* box-shadow: 0 0 3px 3px rgba(0,0,0,0.2); */
    border: 1px solid orange;
  }
  .shop_price{
    color: red;
    padding: 0 0 0 10px;
  }
  .shop_name{
    padding: 0 0 10px 10px;
  }
  .shop_buy{
    width: 140px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border: 1px solid red;
    margin: 5px auto;
    cursor: pointer;
  }
  .userLogin{
    width: 80%;
    height: 50px;
    text-align: right;
    margin: auto;
    line-height: 50px;
  }
</style>
