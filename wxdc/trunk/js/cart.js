/**
 * Created by caiyu on 2016/6/23.
 * 购物车的实现
 */

var Cart = {

    /**
     * 总价格
     */
    totalPrice : 0,
    pushCart : function(merchantId,obj){

        //Storage.clear();

        var data = Storage.getItem(merchantId);

        //console.log(data);
        /**
         *如果购物车为空
         */
        if(!data){

            var arr = {};

            obj.total = 1;
            Cart.totalPrice += obj.price;

            arr[obj.goodsid] = obj;


            var value = JSON.stringify(arr);
            
            Storage.setItem(merchantId,value);

            
        }else{
            


            var value = JSON.parse(data);

            if(value.hasOwnProperty(obj.goodsid)){
                var item = value[obj.goodsid];

                console.log(typeof item.total);
                item.total += 1;
                Cart.totalPrice += item.price;

            }else{

                obj.total = 1;
                Cart.totalPrice += obj.price;

                value[obj.goodsid] = obj;

            }
            //console.log(JSON.stringify(value));
            Storage.setItem(merchantId,JSON.stringify(value));

            
        }
        // /**
        //  * 先从前端数据库中获取相应的信息
        //  */
        // var data = Storage.getItem(obj.goodsid);
        //
        // /**
        //  * 如果是第一次添加
        //  */
        // if(!data){
        //
        //     obj.total = 1;
        //     Cart.totalPrice += obj.price;
        //     Storage.setItem(obj.goodsid,config.jsonToStr(obj));
        //
        // }else{
        // /**
        //  * 如果已经添加过了
        //  */
        //     var obj = config.strToObj(data);
        //     obj.total +=1;
        //
        //     Cart.totalPrice += obj.price;
        //     Storage.setItem(obj.goodsid,config.jsonToStr(obj));
        // }

    },
    popCart : function(obj){

        var data = Storage.getItem(obj.goodsid);

        if(data){

            var obj = config.strToObj(data);

            if(obj.total == 1){

                Cart.totalPrice -= obj.totalPrice;

                Storage.removeItem(obj.goodsid);

            }else if( obj.total > 1){

                obj.total -= 1;

                Cart.totalPrice -= obj.totalPrice;

            }
            
        }

    }

}






