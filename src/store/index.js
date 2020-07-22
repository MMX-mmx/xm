import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'
//  vue 去使用vuex
Vue.use(Vuex);

// 实例化
let store = new Vuex.Store({
    state:{
        todolist:[],
        count:100,
        number:1,
        arr:[1,2,3,4,5,6,7,8],
        isLoading:false,
      //购物车信息
        shops:[],
      //判断是否登陆
      isLogin:false,
      user:{
          name:'admin',
          password:123456
      },
      //价格排序
      priceSort:0, //0表示顺序，1表示倒序
      //购物车全选
      chioceALL:false,
      //ajax请求来的数据
      ajxaShops:[],
    },
    mutations:{
        // 改变loading组件的隐藏显示
        changeLoading({ isLoading },bool) {
            isLoading = bool
        },
        changeNumber(state,num) {
            state.number = num
        },

    //  添加todolist数组
      addinfo(state,str){
          var obj= {
            ischoice:false,
            content:str
          };
          state.todolist.push(obj);
      },
      //勾选
      mychioce(state,index){
      if (state.todolist[index]['ischoice']){
        state.todolist[index]['ischoice']=false
      }else{
        state.todolist[index]['ischoice']=true
      }
      },
      //全选
      chioceAll(state,mychioce){
        // state.todolist[1].ischoice=true
        state.todolist.forEach(value => {
          value.ischoice=mychioce
        })
        console.log(state.todolist);
      },
      //删除所选
      deal(state){
        for (var i=state.todolist.length-1;i>-1;i--){
          console.log(11);
          if (state.todolist[i]["ischoice"]){
            console.log(state.todolist[i]);
            state.todolist.splice(i,1)
          }
        }
        console.log(state.todolist);
      },
      // 以下是商品页面的相关数据
      addshops(state,shop){
          if (state.shops.length==0){
            state.shops.push(shop);
          }else{
            let ishave=true;
            for (let i =0; i<state.shops.length;i++){
              if (state.shops[i]['productId']==shop['productId']){
                ishave=false;
                state.shops[i].nums++;
                break
              }
            }
            if (ishave){
              state.shops.push(shop);
            }
          }
      },
      //判断是否登陆
      login(state,logins){
        state.isLogin=logins;
      },
      //改变价格排序
      changePriceSort(state,sort){
          state.priceSort=sort
      },
      //改变商品的全选中状态
      changeChiose(state,mychioce){
        state.shops.forEach(value => {
          value.ischoice=mychioce
        });
        console.log(state.shops);
      },
      //单选改变状态
      changeChioseOne(state,index){

        let ishave=false;
        state.shops[index]['ischoice']=!state.shops[index]['ischoice'];
        state.shops.forEach(((value, index1) => {
          if (value.ischoice==false){
            ishave=true
          }
        }));
        if (ishave){
          state.chioceALL=false;
        }else{
          state.chioceALL=true;
        }
      },
      //改变全选按钮状态
      changechioceALL(state,mychioce){
        state.chioceALL=mychioce;
      },

      //改变数量
      changeNums(state,nums){
          let index =nums.index;
          //jisuan为0表示减法
          if (nums.jisuan==0){
            if(state.shops[index].nums<=1){
                alert("不能再减了");
            }else{
                state.shops[index].nums--
            }
          }else{
            if(state.shops[index].nums>=7){
              alert("存货不足");
            }else{
              state.shops[index].nums++
            }
          }
      },

      //删除
      dealOne(state,index){
          state.shops.splice(index,1)
      },
      //此处定义一个方法用来接受actions里面传递来的参数
      shopsAjax(state,res){
        state.ajxaShops=res
      }
    },
    // 相当于计算属性
    getters:{
        sum(state) {
            let sum = 0;
            state.arr.forEach((item) => {
                sum += item
            });
            return sum
        },
        //添加todolist的条数
        tiaoshu(state){
          return state.todolist.length
        },
      priceALL(state){
          let sum =0;
        state.shops.forEach(((value, index) => {
          if (value.ischoice){
            sum+=(value.nums*value.salePrice)
          }
        }));
        return sum
      }
    },
    //actions 异步请求需要在index用到
    actions:{
        //写法
      shopsAjax(context){
        axios.get("../../static/data/data.json").then((res)=>{
          if (res.status==200){
            // res.data.result.list;
            context.commit("shopsAjax",res.data.result.list)
          }
        })
      }
    },
  //数据长久化保存
    plugins: [createPersistedState()]
});
export default store
