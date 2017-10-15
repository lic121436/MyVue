var vm = new Vue({
	el: "#app",
	data: {
		totalMoney: 0, // 总金额
		productList: [], // 从json读出的数据
		checkAllFlag: false, // 全选状态
		delFlag:false, // 删除状态
		curProduct: '' // 选中的商品
	},
	filters: {
        // 过滤金额
		formatMoney: function(value) {
			return "¥ " + value.toFixed(2);
		}
	},
	mounted: function() {
        // 渲染数据列表（加载前）
		this.$nextTick(function() {
			this.cartView()
		});
	},
	methods: {
        // 渲染数据列表
		cartView() {
			let that = this;
			axios.get('data/cartData.json').then(res => {
				this.productList = res.data.result.list;
				//					this.totalMoney = res.data.result.totalMoney;
			})
		},
        // 点击加减改变金额
		changeMoney(product, way) {
			if(way > 0) {
				product.productQuantity++;
			} else {
				product.productQuantity--;
				if(product.productQuantity < 1) {
					product.productQuantity = 1;
				}
			}
			this.calcTotalPrice();
		},
        // 设置按钮选中
		selectedProduct(item) {
			if(typeof item.checked === 'undefined') {
				//				Vue.set(item, "checked", true);
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked;
			}
			this.calcTotalPrice();
		},
        // 设置全选
		checkAll(flag) {
			this.checkAllFlag = flag;
			var that = this;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked === 'undefined') {
					that.$set(item, "checked", that.checkAllFlag);
				} else {
					item.checked = that.checkAllFlag;
				}
			});
			this.calcTotalPrice();
		},
        // 计算总金额
		calcTotalPrice: function() {
			var that = this;
			this.totalMoney = 0;
			this.productList.forEach(function(item, index) {
				if(item.checked){
					that.totalMoney += item.productPrice * item.productQuantity;
				}
			});
		},
        // 设置删除状态，与当前选中删除商品
		delConfirm: function(item){
			this.delFlag = true;
			this.curProduct = item;
		},
        // 删除商品
		delProduct: function(){
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index, 1);
			this.delFlag = false;
		}
	}
});

// 设置全局过滤 
Vue.filter('money', function(value, type) {
	return "¥ " + value.toFixed(2) + " " + type;
})