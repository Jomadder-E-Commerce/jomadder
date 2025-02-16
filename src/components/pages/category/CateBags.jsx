'use client'
import React, { useState, useEffect } from 'react';
import bag from '@/assets/category/bags/bag.jpg';
import Image from 'next/image';
import ProductCard from '@/components/shared/cards/ProductCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductGridSkeleton from '@/components/all-skeleton/ProductSkeleton/ProductSkeleton';
import { useGetProductsQuery } from '@/components/Redux/services/productApi/productApi';

const CateBags = ({button}) => {
    const [bags, setBags] = useState([]);

    // Simulated bag collection data 
    const bagData = [
        { id: 1, name: 'Elegant Leather Handbag', price: '200', image: bag },
        { id: 2, name: 'Vintage Canvas Backpack', price: '150', image: bag },
        { id: 3, name: 'Stylish Tote Bag', price: '175', image: bag },
        { id: 4, name: 'Crossbody Shoulder Bag', price: '190', image: bag },
        { id: 5, name: 'Elegant Leather Handbag', price: '200', image: bag },
        { id: 6, name: 'Vintage Canvas Backpack', price: '150', image: bag },
        { id: 7, name: 'Stylish Tote Bag', price: '175', image: bag },
        { id: 8, name: 'Crossbody Shoulder Bag', price: '190', image: bag },
        { id: 9, name: 'Stylish Tote Bag', price: '175', image: bag },
        { id: 10, name: 'Crossbody Shoulder Bag', price: '190', image: bag },
        { id: 11, name: 'Elegant Leather Handbag', price: '200', image: bag },
        { id: 12, name: 'Vintage Canvas Backpack', price: '150', image: bag },
        { id: 13, name: 'Stylish Tote Bag', price: '175', image: bag },
        { id: 14, name: 'Crossbody Shoulder Bag', price: '190', image: bag }
    ];

    // Simulating API call
    useEffect(() => {
            setBags(bagData); // Replace with real API call
    }, []);
    //     const { data, error, isLoading } = useGetProductsQuery({
    //     category: 'bag',
    //     page: 1,
    //     size: 10,
    //     price_start: 100,
    //     price_end: 500,
    //   });
    //   const items = data?.data?.data?.items
   const items = [
    {
        "item_id": "840519667567",
        "product_url": "https://detail.1688.com/offer/840519667567.html",
        "title": "高版本波士顿枕头包香布蕾牛仔丹宁单肩包rowan迷你手提斜挎包女",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01XcYoHM1stRgQimDY5_!!2218715555824-0-cib.jpg",
        "category_path": [],
        "price": "156.0",
        "price_info": {
            "sale_price": "156.0",
            "origin_price": "195.0"
        },
        "quantity_prices": [],
        "sale_info": {
            "sale_quantity": null,
            "sale_quantity_int": null,
            "orders_count": 8
        },
        "type": "bid",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "混批",
            "先采后付"
        ],
        "shop_info": {
            "login_id": "小旺财皮具",
            "member_id": "b2b-22187155558247c7ff",
            "biz_type": "",
            "company_name": "广州市白云区三元里邱云华皮具商行",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "3.0",
                "dispute_score": "5.0",
                "logistics_score": "5.0",
                "return_score": "3.5"
            }
        }
    },
    {
        "item_id": "823063819808",
        "product_url": "https://detail.1688.com/offer/823063819808.html",
        "title": "头层牛皮2024新款女包琳迪包单肩斜挎包枕头包百搭高级lindy小包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01uHlHCZ1wSCZcujOZg_!!2218145206306-0-cib.jpg",
        "category_path": [
            "201580619",
            "124016002",
            "1042954"
        ],
        "price": "168.0",
        "price_info": {
            "sale_price": "168.0",
            "origin_price": "168.0"
        },
        "quantity_prices": [],
        "sale_info": {
            "sale_quantity": "已售100+件",
            "sale_quantity_int": 100,
            "orders_count": 120
        },
        "type": "normal",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "混批",
            "先采后付"
        ],
        "shop_info": {
            "login_id": "戴氏皮具超级工厂",
            "member_id": "b2b-2218145206306661cf",
            "biz_type": "",
            "company_name": "广州戴氏皮具有限公司",
            "service_tags": [
                "深度验厂"
            ],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": true,
            "sore_info": {
                "composite_new_score": "4.5",
                "consultation_score": "4.0",
                "dispute_score": "4.0",
                "logistics_score": "3.0",
                "return_score": "4.0"
            }
        }
    },
    {
        "item_id": "823314083893",
        "product_url": "https://detail.1688.com/offer/823314083893.html",
        "title": "2024新款牛皮女包百搭手提包 ins欧美通勤真皮高级感大容量单肩包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01hFQClX1fUdCckFmdv_!!2200667764010-0-cib.jpg",
        "category_path": [
            "201554511",
            "124016002",
            "1042954"
        ],
        "price": "110.0",
        "price_info": {
            "sale_price": "110.0",
            "origin_price": "125.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1",
                "end_num": "49个",
                "price": "125.00"
            },
            {
                "begin_num": "50",
                "end_num": "99个",
                "price": "118.00"
            },
            {
                "begin_num": "100个",
                "end_num": "",
                "price": "113.00"
            }
        ],
        "sale_info": {
            "sale_quantity": "已售30+件",
            "sale_quantity_int": 30,
            "orders_count": 26
        },
        "type": "normal",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "11%",
        "goods_score": "4.0",
        "tags": [
            "48小时发货",
            "混批",
            "先采后付"
        ],
        "shop_info": {
            "login_id": "凯姿婷皮具",
            "member_id": "b2b-22006677640102609b",
            "biz_type": "生产加工",
            "company_name": "广州凯姿婷皮具有限公司",
            "service_tags": [
                "深度验商"
            ],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "5.0",
                "consultation_score": "4.5",
                "dispute_score": "4.0",
                "logistics_score": "4.0",
                "return_score": "4.0"
            }
        }
    },
    {
        "item_id": "678343461754",
        "product_url": "https://detail.1688.com/offer/678343461754.html",
        "title": "头层牛皮女包包2024新款高级感22bag垃圾购物袋小香风菱格腋下包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01jfI9jM1L65Xt2Wshw_!!2208644331249-0-cib.jpg",
        "category_path": [
            "201548714",
            "124016002",
            "1042954"
        ],
        "price": "181.0",
        "price_info": {
            "sale_price": "181.0",
            "origin_price": "181.0"
        },
        "quantity_prices": [],
        "sale_info": {
            "sale_quantity": "已售70+件",
            "sale_quantity_int": 70,
            "orders_count": 431
        },
        "type": "normal",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "22%",
        "goods_score": "5.0",
        "tags": [
            "7天无理由",
            "混批",
            "先采后付"
        ],
        "shop_info": {
            "login_id": "明夏皮具有限公司",
            "member_id": "b2b-2208644331249419f9",
            "biz_type": "生产加工",
            "company_name": "明夏（广州）皮具有限公司",
            "service_tags": [
                "深度验商"
            ],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "5.0",
                "consultation_score": "4.0",
                "dispute_score": "4.0",
                "logistics_score": "4.0",
                "return_score": "4.0"
            }
        }
    },
    {
        "item_id": "809428521758",
        "product_url": "https://detail.1688.com/offer/809428521758.html",
        "title": "外贸货源新款经典老花贝壳包AlmaBB手提斜跨单肩式女包实物带logo",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01HWBqeq1zvv6bYQyBY_!!2218123016777-0-cib.jpg",
        "category_path": [
            "201548714",
            "124016002",
            "1042954"
        ],
        "price": "190.0",
        "price_info": {
            "sale_price": "190.0",
            "origin_price": "190.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1",
                "end_num": "9个",
                "price": "190.00"
            },
            {
                "begin_num": "10",
                "end_num": "29个",
                "price": "180.00"
            },
            {
                "begin_num": "30个",
                "end_num": "",
                "price": "170.00"
            }
        ],
        "sale_info": {
            "sale_quantity": "已售10+件",
            "sale_quantity_int": 10,
            "orders_count": 7
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "25%",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "包邮",
            "7天无理由"
        ],
        "shop_info": {
            "login_id": "广州如风皮具",
            "member_id": "b2b-221812301677779275",
            "biz_type": "生产加工",
            "company_name": "广州如风皮具厂（个人独资）",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "3.0",
                "dispute_score": "5.0",
                "logistics_score": "3.0",
                "return_score": "4.5"
            }
        }
    },
    {
        "item_id": "811253889636",
        "product_url": "https://detail.1688.com/offer/811253889636.html",
        "title": "2024新款经典杨树林球纹圆饼包时尚百搭单肩斜跨式女包实物带logo",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01n4v9Rq1zvv6cCZJxr_!!2218123016777-0-cib.jpg",
        "category_path": [
            "201580619",
            "124016002",
            "1042954"
        ],
        "price": "220.0",
        "price_info": {
            "sale_price": "220.0",
            "origin_price": "220.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1",
                "end_num": "9个",
                "price": "220.00"
            },
            {
                "begin_num": "10",
                "end_num": "29个",
                "price": "210.00"
            },
            {
                "begin_num": "30个",
                "end_num": "",
                "price": "200.00"
            }
        ],
        "sale_info": {
            "sale_quantity": "已售20+件",
            "sale_quantity_int": 20,
            "orders_count": 12
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "25%",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "包邮",
            "7天无理由"
        ],
        "shop_info": {
            "login_id": "广州如风皮具",
            "member_id": "b2b-221812301677779275",
            "biz_type": "生产加工",
            "company_name": "广州如风皮具厂（个人独资）",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "3.0",
                "dispute_score": "5.0",
                "logistics_score": "3.0",
                "return_score": "4.5"
            }
        }
    },
    {
        "item_id": "768721142012",
        "product_url": "https://detail.1688.com/offer/768721142012.html",
        "title": "包包女秋冬新款quiltied tabby26酒神包绗缝链条小方包单肩斜挎包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01keSz2N2GoS4gzQpNT_!!2216688639062-0-cib.jpg",
        "category_path": [
            "201967404",
            "124016002",
            "1042954"
        ],
        "price": "425.0",
        "price_info": {
            "sale_price": "425.0",
            "origin_price": "425.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1个",
                "end_num": "",
                "price": "425.00"
            }
        ],
        "sale_info": {
            "sale_quantity": null,
            "sale_quantity_int": null,
            "orders_count": 0
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "0.0",
        "tags": [
            "48小时发货",
            "7天无理由",
            "混批"
        ],
        "shop_info": {
            "login_id": "乐怡箱包厂",
            "member_id": "b2b-2216688639062614c8",
            "biz_type": "",
            "company_name": "广州市乐怡箱包有限公司",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "3.5",
                "consultation_score": "3.0",
                "dispute_score": "4.0",
                "logistics_score": "2.0",
                "return_score": "3.5"
            }
        }
    },
    {
        "item_id": "844290719048",
        "product_url": "https://detail.1688.com/offer/844290719048.html",
        "title": "puzzle折叠包变形几何水桶包真皮女包大容量托特包单肩斜挎包包女",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01kcYqGX1ImHJzR2zp4_!!2218727550935-0-cib.jpg",
        "category_path": [
            "201554511",
            "124016002",
            "1042954"
        ],
        "price": "165.0",
        "price_info": {
            "sale_price": "165.0",
            "origin_price": "165.0"
        },
        "quantity_prices": [],
        "sale_info": {
            "sale_quantity": "已售30+件",
            "sale_quantity_int": 30,
            "orders_count": 1
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "混批",
            "先采后付"
        ],
        "shop_info": {
            "login_id": "广州胜烨箱包",
            "member_id": "b2b-22187275509353bdec",
            "biz_type": "",
            "company_name": "广州胜烨箱包商行（个人独资）",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "0.0",
                "dispute_score": "5.0",
                "logistics_score": "5.0",
                "return_score": "5.0"
            }
        }
    },
    {
        "item_id": "801287862279",
        "product_url": "https://detail.1688.com/offer/801287862279.html",
        "title": "百搭潮流单肩女包2024新款经典菱格女包斜挎包包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01gRcAA62MjlkpVy8UA_!!2056299864-0-cib.jpg",
        "category_path": [
            "201580619",
            "124016002",
            "1042954"
        ],
        "price": "115.0",
        "price_info": {
            "sale_price": "115.0",
            "origin_price": "115.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1",
                "end_num": "499个",
                "price": "115.00"
            },
            {
                "begin_num": "500",
                "end_num": "999个",
                "price": "110.00"
            },
            {
                "begin_num": "1000个",
                "end_num": "",
                "price": "105.00"
            }
        ],
        "sale_info": {
            "sale_quantity": null,
            "sale_quantity_int": null,
            "orders_count": 14
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "广州市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "3.0",
        "tags": [
            "48小时发货",
            "7天无理由",
            "混批"
        ],
        "shop_info": {
            "login_id": "xinlanpiju",
            "member_id": "b2b-2056299864",
            "biz_type": "生产加工",
            "company_name": "广州都喜路皮具有限公司",
            "service_tags": [
                "深度验厂"
            ],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": true,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "2.0",
                "dispute_score": "4.0",
                "logistics_score": "4.0",
                "return_score": "3.5"
            }
        }
    },
    {
        "item_id": "735205775177",
        "product_url": "https://detail.1688.com/offer/735205775177.html",
        "title": "TB新款Bon Bon糖果色mini翻盖配磁力按扣手提包单肩包斜挎包女包",
        "img": "https://cbu01.alicdn.com/img/ibank/O1CN01VsMdHP1FZVIa7ygQu_!!2209316980501-0-cib.jpg",
        "category_path": [
            "201554511",
            "124016002",
            "1042954"
        ],
        "price": "330.0",
        "price_info": {
            "sale_price": "330.0",
            "origin_price": "330.0"
        },
        "quantity_prices": [
            {
                "begin_num": "1",
                "end_num": "1件",
                "price": "330.00"
            },
            {
                "begin_num": "2",
                "end_num": "2件",
                "price": "320.00"
            },
            {
                "begin_num": "3件",
                "end_num": "",
                "price": "310.00"
            }
        ],
        "sale_info": {
            "sale_quantity": null,
            "sale_quantity_int": null,
            "orders_count": 10
        },
        "type": "p4p",
        "delivery_info": {
            "area_from": [
                "广东",
                "东莞市"
            ]
        },
        "item_repurchase_rate": "",
        "goods_score": "5.0",
        "tags": [
            "48小时发货",
            "7天无理由",
            "混批"
        ],
        "shop_info": {
            "login_id": "cag19810804001",
            "member_id": "b2b-2209316980501295a5",
            "biz_type": "生产加工",
            "company_name": "东莞市厚街世季箱包店",
            "service_tags": [],
            "is_tp": false,
            "is_super_factory": false,
            "factory_inspection": false,
            "sore_info": {
                "composite_new_score": "4.0",
                "consultation_score": "4.0",
                "dispute_score": "3.0",
                "logistics_score": "4.0",
                "return_score": "2.0"
            }
        }
    }
]
if (false) return <ProductGridSkeleton/>;


    return (
        <div className="my-6">
            {items?.length > 0 && (
                <div className="my-6">
                    <h3 className="mb-4 text-lg font-semibold text-center">Bag Collection</h3>
                    <div className="grid justify-center grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 justify-items-center">
                        {items?.map(bag => (
                            <ProductCard key={bag?.item_id} id={bag?.item_id} name={bag?.title} price={bag?.price} image={bag?.img}  />
                        ))}
                    </div>
                </div>
            )}
             <Link
            href="/all-products"
            className=" flex justify-center items-center mt-8 cursor-pointer"
            >
            <Button>{button}</Button>
          </Link>
        </div>
    );
};

export default CateBags;
