<template>
<div>
  <div class="asd">
      <ul>
        <li @click="back('Home')">Home</li>
        <li>/</li>
        <li @click="back('Mycar')">Cart</li>
      </ul>
  </div>
  <div class="title">
    <div>item</div>
    <div>price</div>
    <div>quantity</div>
    <div>subtotle</div>
    <div>deal</div>
  </div>
  <div >
     <div v-for="(item,index) in shops" class="shops" :key="index">
       <div style="display: flex">
         <div style="line-height: 60px"><input type="checkbox" :checked="item.ischoice" @change="chioseOne(index)" class="shops_input"></div>
         <div style="padding: 0 10px"><img :src="item.productImage" alt="" class="pruductImg"></div>
         <div style="line-height: 60px">{{item.productName}}</div>
       </div>
       <div style="line-height: 60px">
         ￥{{item.salePrice}}
       </div>
       <div style="display: flex;">
          <div @click="reduceNums(index)" class="reduce">-</div>
          <div class="numbers">{{item.nums}}</div>
          <div @click="addNums(index)" class="add">+</div>
       </div>
       <div style="line-height: 60px;text-align: center">
          {{item.salePrice*item.nums}}
       </div>
       <div @click="deal(index)" style="line-height: 60px;text-align: center;cursor: pointer">
         删除
       </div>
     </div>
  </div>
  <div>
    <input type="checkbox" :checked="chioceALL" @change="chioseAll">全选
    <i class="priceAll">总价格：{{$store.getters.priceALL}}</i>
  </div>
</div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        name: "mycar",
        data() {
            return {
                // chioseALL:false,
                //总价
            }
        },
        computed:{
            ...mapState({shops:"shops",chioceALL:"chioceALL"}),

        },
        props: {

        },
        created() {
          // this.shopList=this.$store.state.shops;
          //   console.log(this.shopList);
        },
        components:{

        },
        mounted() {


        },
        methods:{
            ...mapMutations({changeChiose:"changeChiose"}),
            ...mapMutations({changeChioseOne:"changeChioseOne"}),
            ...mapMutations({changechioceALL:"changechioceALL"}),
            ...mapMutations({changeNums:"changeNums"}),
            ...mapMutations({dealOne:"dealOne"}),
            back(str){
              this.$router.push({
                name:str
              })
            },
            //删除
            deal(index){
                this.dealOne(index)
            },
            //数量减一  减法jisuan传0
            reduceNums(index){
                let obj ={
                    index:index,
                    jisuan:0
                }
                this.changeNums(obj)
            },
            //数量加一 加法jisuan传1
            addNums(index){
                let obj ={
                    index:index,
                    jisuan:1
                };
                this.changeNums(obj)
            },
        //    单选
            chioseOne(index){
                this.changeChioseOne(index);
            },
            //全选
            chioseAll(e){
                this.changeChiose(e.target.checked);
                this.changechioceALL(e.target.checked);
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
.title{
  display: flex;
  justify-content: space-around;
}
  .title div{
    min-width: 200px;
    text-align: center;
    flex: 1;
  }
  .shops{
    display: flex;
    justify-content: space-around;
  }
  .shops>div{
    flex: 1;
    min-width: 200px;
    text-align: center;
    margin: 20px 20px;
  }
  .pruductImg{
    width: 60px;
    height: 60px;
  }
  .reduce{
    width: 30px;
    height: 30px;
    background: #dddddd;
    text-align: center;
    line-height: 30px;
    margin-left: 60px;
    margin-top: 10px;
    cursor: pointer;
  }
  .numbers{
    width: 30px;
    height: 30px;
    background: #99a9bf;
    text-align: center;
    line-height: 30px;
    color: red;
    margin-top: 10px;
  }
  .add{
    width: 30px;
    height: 30px;
    background: #dddddd;
    text-align: center;
    line-height: 30px;
    margin-top: 10px;
    cursor: pointer;
  }
</style>
