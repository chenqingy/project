require(['config'],function(){
    require(['jquery','common','head_foot'],function($,common,head_foot){
        // 获取元素 商品数据的父级
        var $colContent=$('.col_content');
        // console.log($colContent);
        // 购物车总金额 一开始为零元
        var $total = $('.total');
        $total.html("￥0.00元");

        var carlist=[];
        var cookies=document.cookie;
        // console.log(cookies);
        /*
        carlist=[{"name":"华为（HUAWEI） P10（VTR-AL00） 128GB 移动联通电信4G手机 全网通 双卡双待（钻雕金） 钻雕金","price":"5688","qty":1,"id":"00000000001"}]
         */

        if(cookies.length>0){
            data();
        }
        function data(){
            cookies=cookies.split('=');
            carlist=JSON.parse(cookies[1]);
            // console.log(carlist);
            var $col_content = $('.col_content');
            carlist.map(function(cookie){
                $tr = $('<tr/>');
                // console.log(cookie);

                // 同一个商品的总共价格
                var col_total = cookie.price * cookie.qty;
                // console.log(col_total);
                
                var html=`
                    <td class="col_num"><label><input type="checkbox" checked="checked"/></label></td>
                    <td class="col_content" data-guid="${cookie.id}">
                        <div class="col_img item_img">
                            <img src="${cookie.imgurl}" style="width:75px;height:75px;margin:0 auto"/>
                        </div>
                        <div class="item_content">
                            <ul class="clearfix">
                                <li class="col_name">
                                    <a href="#">${cookie.name}</a>
                                </li>
                                <li class="col_quantity">
                                    <span class="down">-</span>
                                    <input type="text" value="${cookie.qty}"/>
                                    <span class="up">+</span>
                                </li>
                                <li class="col_price">
                                    ${cookie.price}
                                </li>
                                <li class="col_total">
                                    ${col_total}
                                </li>
                                <li class="col_op">
                                    <a href="#" class="deleteGoods">删除</a>
                                    |
                                    <a href="#">收藏</a>
                                </li>
                            </ul>
                        </div>
                    </td>
                `;
                $tr.html(html);

                // 将tr加入表格中
                $('tbody').append($tr);
               
            });

            
            // console.log(carlist);
            // 单个商品的数量
            $('tbody').on('click','.up',function(){
                // console.log(666);
                var qty =$(this).prev().val();
                qty=Number(qty)+1;
                // console.log(qty);
                $(this).prev().val(qty);

                // 更改单个商品的价格
                var col_total = $(this).parents('.item_content').find('.col_price').text();
                col_total *= qty;
                // console.log(col_total);
                $(this).parents('.item_content').find('.col_total').text(col_total);

                // 总价格
                var sum=0;
                // console.log($('tbody .col_total'));
                $('tbody .col_total').each(function(idx,item){
                    sum += Number(item.innerHTML);
                });
                sum = sum.toFixed(2);
                // console.log(sum);
                var total =`${sum}`;
                $total.html(total);

                // 增加的数量写入cookie
                changValue(qty,$(this));
                writeCookie();
                
                // 免运费
                freight();
            })
            .on('click','.down',function(){
                var qty =$(this).next().val();
                qty=Number(qty)-1;
                if(qty<=1){
                    qty=1
                };
                $(this).next().val(qty);
                
                // 更改单个商品的价格
                var col_total = $(this).parents('.item_content').find('.col_price').text();
                col_total *= qty;
                // console.log(col_total);
                $(this).parents('.item_content').find('.col_total').text(col_total);

                // 总价格
                var sum=0;
                // console.log($('tbody .col_total'));
                $('tbody .col_total').each(function(idx,item){
                    sum += Number(item.innerHTML);
                });
                sum = sum.toFixed(2);
                // console.log(sum);
                var total =`${sum}`;
                $total.html(total); 

                // 减少的数量写入cookie
                changValue(qty,$(this));
                writeCookie();

                // 免运费
                freight();
            })
            .on('click','.deleteGoods',function(){
                // 点击删除按钮找到对应的cookie对象 删除 再重新写入
                var $guid = $(this).parents('td').attr('data-guid');
                for(var i=0;i<carlist.length;i++){                   
                    if(carlist[i].id===$guid){
                        carlist.splice(i,1);
                        break;
                    }
                }
                writeCookie();
                // 重新写入cookie之后删除页面结构
                var $currenTr=$(this).parents('tr');
                console.log($currenTr);
                // $currenTr.html('');
                $currenTr[0].parentNode.removeChild($currenTr[0]);

            });
            // 值的变化之后改变cookie
            function changValue(qty,ele){
                var $guid = ele.parents('td').attr('data-guid');
                for(var i=0;i<carlist.length;i++){                   
                    // console.log($guid);
                    var $value = qty;
                    if(carlist[i].id===$guid){
                        console.log($value);
                        carlist[i].qty=$value;
                        // console.log(carlist[i].qty);
                        break;
                    }
                }               
            }
            // 写入cookie
            function writeCookie(){
                var date=new Date();
                date.setDate(date.getDate()+7);
                document.cookie= 'carlist='+JSON.stringify(carlist)+';expires='+date.toUTCString();
            }

            //总价格
            var sum=0;
            carlist.forEach(function(cookie){
                sum += cookie.price*cookie.qty;
            });
            sum = sum.toFixed(2);
            var total =`${sum}`;
            $total.html(total); 

            freight();
            // 免运费
            function freight(){
                // console.log($total.html());
                if($total.html()>=59){
                    // console.log(666);
                    $('.freight').hide();
                }else if($total.html()<59){
                    $('.freight').show().find('.price').html(59-$total.html());
                };
            }
                

            // 全选
            // 获取所有的复选框
            var $checkbox = $('tbody :checkbox');

            // 获取所有的行
            $('#all').on('click',function(){
                $checkbox.prop('checked',this.checked);
            }); 

                                
        }

        // 清空购物车
        $('#btnClear').on('click',function(){
            //location.reload();
            var date =new Date();
            date.setDate(date.getDate()-10);
            document.cookie='carlist=xxx;expires='+date.toUTCString();
            // for(var i=0;i<childs.length;i++){
                $('tbody').html('');
            // }
            $total.html("￥0.00元");
        });

        // 点击ul动画效果
        var $goodsItem = $('.goodsItem');
        $goodsItem.on('click','.next',function(){
            var $currenUl = $(this).prev().children('ul');
            $currenUl.animate({
                left: -1100
            });
        }).on('click','.prev',function(){
            var $currenUl = $(this).next().children('ul');
            $currenUl.animate({
                left: 0
            });
        })
        
       
        
    });
});