new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        more: '展开',
        addressList: [],
        currentId: 0,
        shippingMethod: 1,
        delFlag: false,
        curAddress: '',
        addFlag: false,

        username: '',
        address: '',
        tel: '',
        postCode: '',
        isDefault: false,
        addressId: 6

    },
    mounted() {
        this.$nextTick(function () {
            this.getAddressList();
        })
    },
    computed: {
        addressLimit() {
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods: {
        getAddressList() {
                var len = storageFeth("STROAGE_KEY").length;
                if(len > 0){
                    this.addressList = storageFeth("STROAGE_KEY");
                }else{
                    axios.get('data/address.json').then(res => {
                        var res = res.data;
                        if (res.status === 0) {
                            this.addressList = res.result;
                        }
                    });
                }
            },
            // 展开收起
            loadMore() {
                if (this.more == '展开') {
                    this.limitNum = this.addressList.length;
                    this.more = '收起';
                } else {
                    this.limitNum = 3;
                    this.more = '展开';
                }

            },
            // 设置默认地址
            setDefault(addressId) {
                this.addressList.forEach(function (address, index) {
                    if (address.addressId == addressId) {
                        address.isDefault = true;
                    } else {
                        address.isDefault = false;
                    }
                });
            },
            // 删除前准备
            delConfirm(item) {
                this.delFlag = true;
                this.curAddress = item;
            },
            // 删除
            delAddress() {
                var index = this.addressList.indexOf(this.curAddress);
                this.addressList.splice(index, 1);
                this.delFlag = false;
                storageSave(this.addressList);
            },
            // 添加前准备
            addConfirm(item) {
                this.addFlag = true;
                if(this.addressList.length > 0){
                    this.addressId =  parseInt(this.addressList[this.addressList.length - 1].addressId);
                }else{
                   this.addressId = 1; 
                }
                this.curAddress = item;
                if (this.curAddress === 0) {
                     this.addressId =  this.addressId + 1;
                     this.postCode = '';
                    this.isDefault = false;
                    this.username = '';
                    this.address = '';
                    this.tel = '';
                }else{
                    var index = this.addressList.indexOf(this.curAddress);
                    this.postCode = this.addressList[index].postCode,
                    this.isDefault = this.addressList[index].isDefault;
                    this.addressId = this.addressList[index].addressId;
                    this.username = this.addressList[index].userName;
                    this.address = this.addressList[index].streetName;
                    this.tel = this.addressList[index].tel; 
                }
            },
            // 添加地址
            addAddress() { 
                if (this.curAddress === undefined) {
                    this.addressList.push({
                        addressId: this.addressId++,
                        userName: this.username,
                        streetName: this.address,
                        postCode: this.postCode,
                        tel: this.tel,
                        isDefault: this.isDefault
                    });
                } else {
                    var index = this.addressList.indexOf(this.curAddress);
                    this.addressList.splice(index, 1, {
                        addressId: this.addressId,
                        userName: this.username,
                        streetName: this.address,
                        postCode: this.postCode,
                        tel: this.tel,
                        isDefault: this.isDefault
                    });
                }

                storageSave(this.addressList);
                this.username = '',
                    this.address = '',
                    this.del = '',
                    this.addFlag = false;
            }
    }

})

var STROAGE_KEY = 'stroage-vuejs';
/**
 * 设置浏览器本地存储
 * @param {*} STROAGE_KEY 
 */
function storageFeth(STROAGE_KEY) {
    return JSON.parse(window.localStorage.getItem(STROAGE_KEY) || '[]');
}

function storageSave(items) {
    window.localStorage.setItem("STROAGE_KEY", JSON.stringify(items))
};

